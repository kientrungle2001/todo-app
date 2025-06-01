import React, { useEffect, useState } from "react";
import { GridDialog } from "./GridDialog";
import { GridSelectorHeader } from "./GridSelectorHeader";
import { TableGridSettings } from "../../../TableGridSettings";
import { DataGridEditField } from "@/types/edit/DataGridEditField";
import { tableRepository } from "@/api/repositories/Table";

interface GridSelectorProps {
  item: any;
  field: DataGridEditField;
  value: any;
  setValue: (value: any) => void;
  hideInput?: boolean;
  selectLabel?: string;
  settings: TableGridSettings;
}

export const GridSelector: React.FC<GridSelectorProps> = ({
  item,
  field,
  value,
  setValue,
  hideInput,
  selectLabel,
  settings,
}) => {
  const [show, setShow] = useState(false);
  const [label, setLabel] = useState<string>("(empty)");

  const handleOpenDialog = () => setShow(true);
  const handleCloseDialog = () => setShow(false);

  const handleItemSelect = (item: any) => {
    if (item) {
      setValue(field.valueField ? item[field.valueField] : item.id);
    } else {
      setValue(null);
    }
    setShow(false);
  };

  useEffect(() => {
    if (value && field.table) {
      tableRepository.get(field.table, value).then((resp: any) => {
        setLabel(resp.data[field.labelField ?? "name"]);
      });
    } else {
      setLabel("(empty)");
    }
  }, [value]);

  return (
    <div>
      <GridSelectorHeader
        label={label}
        handleOpen={handleOpenDialog}
        handleClear={() => setValue(null)}
        hideInput={hideInput}
      />

      <GridDialog
        item={item}
        field={field}
        settings={settings}
        show={show}
        onClose={handleCloseDialog}
        value={value}
        onSelect={handleItemSelect}
      />
    </div>
  );
};
