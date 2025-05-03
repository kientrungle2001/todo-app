import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { GridDialog } from './GridDialog';
import { TableGridSettings } from '../../TableGrid';
import { DataGridEditField } from '../../DataGridEditTypes';

interface GridSelectorProps {
    field: DataGridEditField;
    value: any;
    setValue: (value: any) => void;
    hideInput?: boolean;
    selectLabel?: string;
    settings: TableGridSettings;
}

export const GridSelector: React.FC<GridSelectorProps> = ({ field, value, setValue, hideInput, selectLabel, settings }) => {
    const [show, setShow] = useState(false);

    const handleOpenDialog = () => setShow(true);
    const handleCloseDialog = () => setShow(false);
    const handleItemSelect = (item: any) => {
        setValue(item.id);
    };

    return (
        <div>
            <div className="input-group mb-3">
                {hideInput ? null : <input
                    type="text"
                    className="form-control"
                    placeholder={selectLabel ? selectLabel : 'Chọn bản ghi'}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />}

                <Button variant="info" onClick={handleOpenDialog}>
                    {selectLabel ? selectLabel : 'Chọn bản ghi'}
                </Button>
            </div>
            <GridDialog
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
