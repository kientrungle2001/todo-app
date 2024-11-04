import { DataGridColumn } from "../DataGrid";

export const ColumnGroupRenderer = (column: DataGridColumn, item: any, table: string, inputableMap: any, setInputableMap: (inputableMap: any) => void, onAfterChangeStatus: (column: DataGridColumn, item: any) => void) => {
    if (!item[column.index]) {
        return '-';
    }
    return <img src={'https://stg.media.nextnobels.com' + item[column.index]} alt={item.id} style={{ maxWidth: "100px" }} onError={(e) => {
        const target = e.target as HTMLImageElement; // Type assertion for TypeScript
        target.src = 'https://stg.media.nextnobels.com/default/skin/nobel/themes/story/media/logo.png';
    }} />;
}