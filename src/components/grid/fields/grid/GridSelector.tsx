import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { GridDialog } from './GridDialog';
import { TableGridSettings } from '../../TableGrid';
import { DataGridEditField } from '../../DataGridEditTypes';
import { tableRepository } from '@/api/repositories/Table';

interface GridSelectorProps {
    item: any;
    field: DataGridEditField;
    value: any;
    setValue: (value: any) => void;
    hideInput?: boolean;
    selectLabel?: string;
    settings: TableGridSettings;
}

export const GridSelector: React.FC<GridSelectorProps> = ({ item, field, value, setValue, hideInput, selectLabel, settings }) => {
    const [show, setShow] = useState(false);
    const [label, setLabel] = useState<string>('(empty)');

    const handleOpenDialog = () => setShow(true);
    const handleCloseDialog = () => setShow(false);
    const handleItemSelect = (item: any) => {
        if (item) {
            if (field.valueField) {
                setValue(item[field.valueField]);
            } else {
                setValue(item.id);
            }
        } else {
            setValue(null);
        }
        setShow(false);
    };
    React.useEffect(() => {
        if (value && field.table) {
            tableRepository.get(field.table, value).then((resp: any) => {
                setLabel(resp.data[field.labelField ?? 'name']);
            });
        } else {
            setLabel('(empty)');
        }
    }, [value]);

    return (
        <div>
            <div className="input-group mb-3">
                {hideInput ? null : <input
                    type="text" readOnly
                    className="form-control"
                    placeholder={selectLabel ? selectLabel : 'Chọn bản ghi'}
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                />}

                <Button variant="info" onClick={handleOpenDialog}>
                    {selectLabel ? selectLabel : 'Chọn bản ghi'}
                </Button>
                <Button variant="danger" onClick={() => {
                    setValue(null);
                }}>
                    {'Làm trống'}
                </Button>
            </div>
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
