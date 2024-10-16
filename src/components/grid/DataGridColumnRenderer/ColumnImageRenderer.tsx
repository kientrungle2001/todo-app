import { DataGridColumn } from "../DataGrid";

export const ColumnImageRenderer = (column: DataGridColumn, item: any) => {
    if (!item[column.index]) {
        return '-';
    }
    return <img src={'http://media.nextnobels.com' + item[column.index]} alt={item.id} style={{ maxWidth: "100px" }} onError={(e) => {
        const target = e.target as HTMLImageElement; // Type assertion for TypeScript
        target.src = 'http://media.nextnobels.com/default/skin/nobel/themes/story/media/logo.png';
    }} />;
}