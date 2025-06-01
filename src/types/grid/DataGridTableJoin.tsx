
export interface DataGridTableJoin {
    table: string;
    alias?: string;
    type?: "inner" | "left" | "right";
    condition?: string;
}
