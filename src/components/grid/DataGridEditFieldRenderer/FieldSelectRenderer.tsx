import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import $ from 'jquery';
import { DataGridEditField } from "../DataGridEditTypes";

export const FieldSelectRenderer = (field: DataGridEditField, item: any, setItem: (item: any) => void, maps: any) => {
    const selectRef: any = {};
    selectRef[field.index] = React.useRef(null);

    useEffect(() => {
        if (field.select2 && selectRef[field.index].current && (field.options || maps[field.index])) {
            console.log('Initializing Select2 for field:', field.index);
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
                    if (field.multiple) {
                        updatedItem[field.index] = (selectedValues as string[])?.join(',');
                    } else {
                        updatedItem[field.index] = (selectedValues as string[])?.[0] ?? '';
                    }
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

    if (field.options) {
        return (
            <Form.Select
                multiple={field.multiple}
                htmlSize={field.multiple ? (field.multipleSize ?? 3) : 1}
                value={field.multiple ? (item[field.index] ? '' + item[field.index] : '').split(',') : '' + [item[field.index]]}
                ref={selectRef[field.index]}
                onChange={(event) => {
                    if (field.multiple) {
                        const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
                        let updatedItem = { ...item };
                        updatedItem[field.index] = selectedOptions.join(',');
                        setItem(updatedItem);
                    } else {
                        let updatedItem = { ...item };
                        updatedItem[field.index] = event.target.value;
                        setItem(updatedItem);
                    }
                }}
            >
                <option value={0}>Select</option>
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
                multiple={field.multiple}
                htmlSize={field.multiple ? (field.multipleSize ?? 3) : 1}
                value={field.multiple ? (item[field.index] ? '' + item[field.index] : '').split(',') : '' + [item[field.index]]}
                ref={selectRef[field.index]}
                onChange={(event) => {
                    if (field.multiple) {
                        const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
                        let updatedItem = { ...item };
                        updatedItem[field.index] = selectedOptions.join(',');
                        setItem(updatedItem);
                    } else {
                        let updatedItem = { ...item };
                        updatedItem[field.index] = event.target.value;
                        setItem(updatedItem);
                    }
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
