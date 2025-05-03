import { DataGridEditField, DataGridEditFieldType } from "../DataGridEditTypes";
import { FieldCheckboxRenderer } from "./FieldCheckboxRenderer";
import { FieldDateRenderer } from "./FieldDateRenderer";
import { FieldEditorRenderer } from "./FieldEditorRenderer";
import { FieldGridRenderer } from "./FieldGridRenderer";
import { FieldImageRenderer } from "./FieldImageRenderer";
import { FieldNumberRenderer } from "./FieldNumberRenderer";
import { FieldSelectRenderer } from "./FieldSelectRenderer";
import { FieldStatusRenderer } from "./FieldStatusRenderer";
import { FieldTextRenderer } from "./FieldTextRenderer";
import { FieldUndefinedRenderer } from "./FieldUndefinedRenderer";
import {
    DataGridEditMode as EditMode
} from "@/components/grid/DataGridEditTypes";

export const getFieldRenderer = (fieldType: DataGridEditFieldType) => {
    switch (fieldType) {
        case DataGridEditFieldType.TEXT:
            return FieldTextRenderer;
        case DataGridEditFieldType.NUMBER:
            return FieldNumberRenderer;
        case DataGridEditFieldType.STATUS:
            return FieldStatusRenderer;
        case DataGridEditFieldType.DATE:
            return FieldDateRenderer;
        case DataGridEditFieldType.SELECT:
            return FieldSelectRenderer;
        case DataGridEditFieldType.CHECKBOX:
            return FieldCheckboxRenderer;
        case DataGridEditFieldType.EDITOR:
            return FieldEditorRenderer;
        case DataGridEditFieldType.IMAGE:
            return FieldImageRenderer;
        case DataGridEditFieldType.GRID:
            return FieldGridRenderer;
        default:
            return FieldUndefinedRenderer;
    }

}

export const renderField = (field: DataGridEditField, item: any, setItem: (item: any) => void, maps: any, mode: EditMode) => {
    const renderer = getFieldRenderer(field.type);
    return renderer(field, item, setItem, maps, mode);
}
