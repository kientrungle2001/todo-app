import { DataGridColumn } from "../DataGridColumnTypes";

export const ColumnReferenceRenderer = (column: DataGridColumn, item: any, table: string, inputableMap: any, setInputableMap: (inputableMap: any) => void) => {
    let items = item[column.index];
    return <>
        {items.map((refItem: any, index: number) => {
            return <em key={index}>
                {index !== 0 && <br />}
                #{refItem.id} {refItem.label}
            </em>
        })}
    </>
};