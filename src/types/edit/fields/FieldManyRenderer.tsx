import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import $ from 'jquery';
import { DataGridEditField } from "@/types/edit/DataGridEditField";
import { DataGridEditMode as EditMode } from "@/types/edit/DataGridEditMode";
import { useRouter } from "next/router";
import { tableRepository } from "@/api/repositories/Table";

export const FieldManyRenderer = (field: DataGridEditField, item: any, setItem: (item: any) => void, maps: any, mode: EditMode) => {

    const [label, setLabel] = useState<string>('');
    const selectRef: any = {};
    selectRef[field.index] = React.useRef(null);
    const router = useRouter();

    useEffect(() => {
        if (mode == EditMode.ADD
            && typeof item[field.index] !== 'undefined'
            && typeof router.query['field_' + field.index] !== 'undefined') {
            return () => { }
        }
        if (field.select2 && selectRef[field.index].current && (field.options || maps[field.index])) {
            const $select = $(selectRef[field.index].current);

            $select.select2({
                theme: 'bootstrap-5', // Optional: you can customize the theme
                placeholder: 'Select',
                allowClear: true,
            });

            // When the selection changes, update the item state
            $select.on('change', function () {
                const selectedValues = $select.val();
                if (typeof selectedValues !== 'undefined') {
                    let updatedItem = { ...item };
                    updatedItem[field.index] = (selectedValues as string[])?.join(',');
                    setItem(updatedItem);
                }
            });

            // Clean up Select2 on unmount
            return () => {
                if ($select) {
                    try {
                        $select.select2('destroy');
                    } catch (error) {
                    }
                }
            };
        }
    }, [field, item, maps[field.index], field.options]); // Re-run when options or maps change

    useEffect(() => {
        if (mode == EditMode.ADD
            && typeof item[field.index] !== 'undefined'
            && typeof router.query['field_' + field.index] !== 'undefined') {
            tableRepository.get(field.table ?? '', item[field.index]).then((resp: any) => {
                if (resp) {
                    setLabel(resp.data[field.labelField ?? '']);
                }
            })
        }
    }, [mode, item, router.query]);

    if (mode == EditMode.ADD
        && typeof item[field.index] !== 'undefined'
        && typeof router.query['field_' + field.index] !== 'undefined') {
        return <>
            <Form.Control readOnly value={label} />
            <Form.Control type="hidden" readOnly value={item[field.index]} name={field.index} ref={selectRef[field.index]} />
        </>
    }
    if (field.options) {
        return (
            <Form.Select
                multiple={true}
                htmlSize={field.multipleSize ?? 3}
                value={(item[field.index] ? '' + item[field.index] : '').split(',')}
                ref={selectRef[field.index]}
                onChange={(event) => {
                    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
                    let updatedItem = { ...item };
                    updatedItem[field.index] = selectedOptions.join(',');
                    setItem(updatedItem);
                }}
            >
                <option value={''}>Select</option>
                {field.options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </Form.Select>
        );
    } else if (typeof maps[field.index] === 'object') {
        return (
            <Form.Select
                multiple={true}
                htmlSize={field.multipleSize ?? 3}
                value={(item[field.index] ? '' + item[field.index] : '').split(',')}
                ref={selectRef[field.index]}
                onChange={(event) => {
                    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
                    let updatedItem = { ...item };
                    updatedItem[field.index] = selectedOptions.join(',');
                    setItem(updatedItem);

                }}
            >
                <option value={0}>Select</option>
                {maps[field.index].map((option: any) => (
                    <option key={option[field.valueField as string]} value={option[field.valueField as string]}>
                        {field.treeMode ? '|____'.repeat(option.__level) : ''}
                        {field.map ? field.map[option[field.valueField as string]] : option[field.labelField as string]}
                    </option>
                ))}
            </Form.Select>
        );
    } else {
        return (
            <Form.Select value={item[field.index]} onChange={(event) => {
                let updatedItem = { ...item };
                updatedItem[field.index] = event.target.value;
                setItem(updatedItem);
            }}>
                <option value={0}>Select</option>
            </Form.Select>
        );
    }
};
