import { Form } from "react-bootstrap";
import { DataGridSortOption } from "@/types/grid/DataGridSortOption";
import { DataGridSort } from "@/types/grid/DataGridSort";
import { DataGridFilterColumn } from "@/types/grid/DataGridFilterColumn";
import { DataGridFilterColumnType } from "@/types/grid/DataGridFilterColumnType";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { buildTree, flatTree } from "@/api/tree";
import $ from "jquery";
import 'select2';
import { tableRepository } from "@/api/repositories/Table";

interface FiltersGridProps {
  filters: DataGridFilterColumn[];
  sortOptions?: DataGridSortOption[];
  filterData?: any;
  setFilterData: (filterData: any) => void;
  searchText?: string;
  setSearchText: (searchText: string) => void;
  sorts: DataGridSort[];
  setSorts: (sorts: DataGridSort[]) => void;
  defaultSorts?: DataGridSort[];
}

// Component tách riêng cho SELECT có select2
const SelectFilter: React.FC<{
  filter: DataGridFilterColumn,
  value: any,
  onChange: (value: any) => void,
  options: any[]
}> = ({ filter, value, onChange, options }) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (filter.select2 && selectRef.current) {
      const $select = $(selectRef.current);

      $select.select2({
        theme: 'bootstrap-5',
        placeholder: 'Chọn ' + filter.label,
        allowClear: true,
      });

      $select.on('change', function () {
        const selectedValues = $select.val();
        const value = typeof selectedValues === 'string' ? selectedValues : (selectedValues as string[])[0] ?? '';
        onChange(value);
      });

      return () => {
        $select.select2('destroy');
      };
    }
  }, [filter, options]);

  return (
    <Form.Select ref={selectRef} size="sm" value={value ?? ''} onChange={(e) => onChange(e.target.value)}>
      <option value="">Chọn {filter.label}</option>
      {options.map((option: any, index: number) => (
        <option
          key={option.value ?? option[filter.valueField as string] ?? index}
          value={option.value ?? option[filter.valueField as string]}
        >
          {filter.treeMode
            ? '|____'.repeat(option.__level + 1) + ' '
            : ''}
          {option.label ?? option[filter.labelField as string]}
        </option>
      ))}
    </Form.Select>
  );
};

export const FiltersGrid: React.FC<FiltersGridProps> = ({
  filters,
  sortOptions,
  sorts,
  setSorts,
  defaultSorts,
  filterData,
  setFilterData,
  searchText,
  setSearchText,
}) => {
  const [sortOptionSelected, setSortOptionSelected] = useState<string>('');
  const [maps, setMaps] = useState<{ [key: string]: any[] }>({});
  const router = useRouter();

  const FilterTextRenderer = (filter: DataGridFilterColumn) => (
    <Form.Control
      size="sm"
      type="text"
      value={filterData?.[filter.index] || ''}
      onChange={(e) =>
        setFilterData({ ...filterData, [filter.index]: e.target.value })
      }
      placeholder={filter.label}
    />
  );

  const FilterNumberRenderer = (filter: DataGridFilterColumn) => (
    <>
      <Form.Control
        type="number"
        value={filterData?.[filter.index]?.start || ''}
        onChange={(e) => {
          const updated = { ...filterData };
          if (!updated[filter.index]) updated[filter.index] = {};
          updated[filter.index].start = Number(e.target.value);
          setFilterData(updated);
        }}
        placeholder={"start " + filter.label}
      />
      <Form.Control
        type="number"
        value={filterData?.[filter.index]?.end || ''}
        onChange={(e) => {
          const updated = { ...filterData };
          if (!updated[filter.index]) updated[filter.index] = {};
          updated[filter.index].end = Number(e.target.value);
          setFilterData(updated);
        }}
        placeholder={"end " + filter.label}
      />
    </>
  );

  const FilterSelectRenderer = (filter: DataGridFilterColumn) => {
    const options = filter.options || maps[filter.index] || [];
    return (
      <SelectFilter
        filter={filter}
        value={filterData?.[filter.index]}
        onChange={(val) =>
          setFilterData({ ...filterData, [filter.index]: val })
        }
        options={options}
      />
    );
  };

  const FilterCheckboxRenderer = (filter: DataGridFilterColumn) => (
    <Form.Check
      type="checkbox"
      checked={filterData?.[filter.index] || false}
      onChange={(e) => {
        const updated = { ...filterData };
        updated[filter.index] = e.target.checked;
        setFilterData(updated);
      }}
    />
  );

  const FilterStatusRenderer = (filter: DataGridFilterColumn) => (
    <Form.Select
      size="sm"
      value={filterData?.[filter.index] || ''}
      onChange={(e) => {
        const updated = { ...filterData };
        updated[filter.index] = e.target.value;
        setFilterData(updated);
      }}
    >
      <option value="">Chọn {filter.label}</option>
      <option value={1}>{filter.map?.[1] || 'Active'}</option>
      <option value={0}>{filter.map?.[0] || 'Inactive'}</option>
    </Form.Select>
  );

  const FilterUndefinedRenderer = () => '-';

  const getFilterRenderer = (type: DataGridFilterColumnType) => {
    switch (type) {
      case DataGridFilterColumnType.TEXT:
        return FilterTextRenderer;
      case DataGridFilterColumnType.NUMBER:
      case DataGridFilterColumnType.DATE:
      case DataGridFilterColumnType.CURRENCY:
        return FilterNumberRenderer;
      case DataGridFilterColumnType.SELECT:
        return FilterSelectRenderer;
      case DataGridFilterColumnType.CHECKBOX:
        return FilterCheckboxRenderer;
      case DataGridFilterColumnType.STATUS:
        return FilterStatusRenderer;
      default:
        return FilterUndefinedRenderer;
    }
  };

  const renderFilter = (filter: DataGridFilterColumn) => {
    const renderer = getFilterRenderer(filter.type ?? DataGridFilterColumnType.TEXT);
    return renderer(filter);
  };

  useEffect(() => {
    const load = async () => {
      const updatedMaps = { ...maps };
      await Promise.all(
        filters.map(async (filter) => {
          if (
            filter.type === DataGridFilterColumnType.SELECT &&
            filter.table
          ) {
            let condition =
              typeof filter.tableCondition === 'function'
                ? filter.tableCondition(filterData)
                : filter.tableCondition;

            const fields = [filter.valueField, filter.labelField];
            if (filter.treeMode) fields.push(filter.treeParentField ?? 'parent');

            const data: any = {
              fields,
              condition,
              orderBy: filter.orderBy ?? (filter.treeMode ? 'ordering asc' : 'id asc'),
            };

            const response = await tableRepository.getItemsForSelect(filter.table, data);
            let items: any[] = response.data;
            if (filter.treeMode) {
              items = flatTree(buildTree(items, filter.treeParentField ?? 'parent'));
            }
            updatedMaps[filter.index] = items;
          }
        })
      );
      setMaps(updatedMaps);
    };

    load();
  }, [filterData]);

  return (
    <Form className="row g-1">
      <Form.Group controlId="formGroupSearch" className="mb-1 col-md-2">
        <Form.Control
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          size="sm"
          type="text"
          placeholder={`Từ khóa`}
        />
      </Form.Group>
      {filters.map((filter) => (
        <Form.Group
          controlId={"formGroup" + filter.index}
          key={filter.index}
          className={"mb-1 col-md-" + (filter.size ?? 2)}
        >
          {renderFilter(filter)}
        </Form.Group>
      ))}
      {sortOptions && (
        <Form.Group controlId="formGroupSort" className="mb-1 col-md-2">
          <Form.Select
            value={sortOptionSelected}
            size="sm"
            onChange={(e) => {
              setSortOptionSelected(e.target.value);
              const selected = sortOptions.find(
                (opt) => opt.index === e.target.value
              );
              setSorts(selected ? selected.sorts : defaultSorts ?? []);
            }}
          >
            <option value="">Chọn sắp xếp</option>
            {sortOptions.map((option) => (
              <option key={option.index} value={option.index}>
                {option.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      )}
    </Form>
  );
};
