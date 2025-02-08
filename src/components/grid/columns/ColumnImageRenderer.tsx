import { replaceMediaUrl } from "@/api/defaultSettings";
import { DataGridColumn } from "../DataGridColumnTypes";

export const ColumnImageRenderer = (column: DataGridColumn, item: any) => {
    if (!item[column.index]) {
        return '-';
    }
    return <img src={replaceMediaUrl(item[column.index])} alt={item.id} style={{ maxWidth: "100px" }} onError={(e) => {
        const target = e.target as HTMLImageElement; // Type assertion for TypeScript
        target.src = 'https://stg.media.nextnobels.com/default/skin/nobel/themes/story/media/logo.png';
    }} />;
}