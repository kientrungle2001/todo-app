// file backend/src/routes/subject.ts
import express from 'express';
import pool from '../db';
import { RowDataPacket } from 'mysql2';

const router = express.Router();

enum DataGridColumnType {
    TEXT = "text",
    NUMBER = "number",
    DATE = "date",
    CURRENCY = "currency",
    STATUS = "status",
    ACTIONS = "actions"
}

enum DataGridFilterColumnType {
    TEXT = "text",
    NUMBER = "number",
    DATE = "date",
    CURRENCY = "currency",
    SELECT = "select",
    CHECKBOX = "checkbox",
    STATUS = "status"
}

enum DataGridColumnActionType {
    EDIT = "edit",
    DELETE = "delete"
}

interface DataGridTableJoin {
    table: string;
    alias?: string;
    type?: "inner" | "left" | "right";
    condition?: string;
}

interface DataGridPagination {
    page: number;
    pageSize: number;
}

interface DataGridColumn {
    index: string;
    label: string;
    type?: DataGridColumnType;
    format?: string;
    options?: any[];
    sortable?: boolean;
    actionType?: DataGridColumnActionType;
    width?: string;
    map?: any;
}

interface DataGridFilterColumn {
    index: string;
    label: string;
    sqlIndex?: string;
    comparisonOperator?: "like" | "equal";
    type?: DataGridFilterColumnType;
    table?: string;
    valueField?: string;
    labelField?: string;
    format?: string;
    options?: any[];
    map?: any;
}

interface DataGridSort {
    index: string;
    direction: DataGridSortDirection;
}

enum DataGridSortDirection {
    ASCENDING = "asc",
    DESCENDING = "desc"
}

interface DataGridSortOption {
    index: string;
    label: string;
    sorts: DataGridSort[];
}

enum DataGridEditFieldType {
    TEXT = "text",
    NUMBER = "number",
    DATE = "date",
    CURRENCY = "currency",
    SELECT = "select",
    CHECKBOX = "checkbox",
    STATUS = "status",
    EDITOR = "editor"
};

enum DataGridEditMode {
    ADD = "add",
    EDIT = "edit"
}

interface DataGridEditField {
    index: string;
    label: string;
    type: DataGridEditFieldType;
    size?: number;
    options?: any[];
    map?: any;
    table?: string;
    valueField?: string;
    labelField?: string;
}

interface DataGridSettings {
    fields?: string | string[];
    searchFields?: string[];
    joins?: DataGridTableJoin[];
    pagination: DataGridPagination;
    columns: DataGridColumn[];
    filters: DataGridFilterColumn[];
    sortOptions: DataGridSortOption[];
    defaultSorts: DataGridSort[];
    table: string;
    addFields: DataGridEditField[];
    editFields?: DataGridEditField[];
}

// Get list of subjects with their active classes
router.post('/search/:table', (req, res) => {
    const table = req.params.table;
    const page = req.body.page || 1;
    const pageSize = req.body.pageSize || 10;
    const search = req.body.search ? `%${req.body.search}%` : '%';
    const offset = (page - 1) * pageSize;
    const settings: DataGridSettings = req.body.settings;
    const sorts: DataGridSort[] = req.body.sorts;
    const filterData: any = req.body.filterData;

    let fields = '*';

    if (settings.fields) {
        if (typeof settings.fields === 'string') {
            fields = settings.fields;
        } else {
            if (Array.isArray(settings.fields)) {
                fields = (settings.fields as Array<string>).map(field => field.indexOf('.') === -1 ? `t.${field}` : field).join(', ');
            }
        }
    }

    let joins = '';

    if (settings.joins) {
        settings.joins.forEach(join => {
            joins += ` ${join.type} JOIN ${join.table} AS ${join.alias || join.table} ON ${join.condition}`;
        });
    }

    let query = `
      SELECT 
        ${fields} FROM ${table} AS t ${joins}
      WHERE 
    `;
    const params: Array<string | number> = [];
    let searchLikes: string[] = [];
    if (settings.searchFields) {
        settings.searchFields.forEach(field => {
            if (field.indexOf('.') === -1) {
                searchLikes.push(`t.${field} LIKE ?`);
            } else {
                searchLikes.push(`(${field}) LIKE ?`);
            }
            params.push(search);
        });
    } else {
        settings.columns.forEach(column => {
            if (column.type !== 'actions') {
                searchLikes.push(`t.${column.index} LIKE ?`);
                params.push(search);
            }
        });
    }


    query += '(' + searchLikes.join(' OR ') + ')';

    let filterConditions: string[] = [];

    settings.filters.forEach((filter: any) => {
        if (typeof filterData[filter.index] !== 'undefined' && filterData[filter.index] !== '') {
            if (filter.type === DataGridFilterColumnType.SELECT) {
                filterConditions.push(`t.${filter.index} = ?`);
                params.push(filterData[filter.index]);
            } else {
                filterConditions.push(`t.${filter.index} like ?`);
                params.push('%' + filterData[filter.index] + '%');
            }

        }
    });
    if (filterConditions.length > 0) {
        query += ` AND (${filterConditions.join(' AND ')})`;
    }

    let orderBys: string[] = [];
    sorts.forEach((sort: any) => {
        orderBys.push(`t.${sort.index} ${sort.direction}`);
    });
    let orderBy = orderBys.join(', ');

    query += ` ORDER BY ${orderBy} LIMIT ?, ?`;
    params.push(offset, pageSize);

    let totalCountQuery = `SELECT COUNT(*) as total FROM ${table} AS t ${joins}
    WHERE 
    `;
    totalCountQuery += '(' + searchLikes.join(' OR ') + ')';
    if (filterConditions.length > 0) {
        totalCountQuery += ` AND (${filterConditions.join(' AND ')})`;
    }

    pool.query<RowDataPacket[]>(totalCountQuery, params, (err, response) => {
        if (err) {
            console.log(totalCountQuery);
            throw err;
        }
        const total = response[0].total;
        pool.query<RowDataPacket[]>(query, params, (err, items) => {
            if (err) {
                console.log(query);
                throw err;
            }

            res.json({ items: items, totalItems: total });
        });
    });
});

router.post('/:table/detail/:id', (req, res) => {
    const table = req.params.table;
    const { id } = req.params;
    pool.query<RowDataPacket[]>(`SELECT * FROM ${table} WHERE id =?`, [id], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});

router.put('/:table/update/:id', (req, res) => {
    const table = req.params.table;
    const { id } = req.params;
    const { fields, item } = req.body;
    const params: any[] = [];
    let updateQuery = `UPDATE \`${table}\` SET `;
    let updateFields: string[] = [];
    fields.forEach((field: any) => {
        updateFields.push(`${field.index} =?`);
        params.push(item[field.index]);
    });
    updateQuery += updateFields.join(', ');
    updateQuery += ' WHERE id =?';
    params.push(id);

    pool.query(updateQuery, params, (err) => {
        if (err) throw err;
        res.status(200).send(item);
    });
});

router.put('/:table/update-column', (req, res) => {
    const table = req.params.table;
    const column: DataGridColumn = req.body.column;
    const values: any[] = req.body.values;
    values.forEach((item: any, index: number) => {
        let params:any[] = [];
        let updateQuery = `UPDATE \`${table}\` SET \`${column.index}\` =? WHERE id =?`;
        params.push(item.value, item.id);
        pool.query(updateQuery, params, (err) => {
            if (err) throw err;
        });
    });
    res.status(200).send('Column updated');
});

router.delete('/:table/delete/:id', (req, res) => {
    const table = req.params.table;
    const { id } = req.params;
    pool.query('DELETE FROM \`' + table + '\` WHERE id =?', [id], (err) => {
        if (err) throw err;
        res.status(200).send('Item deleted');
    });
});

router.post('/:table/create', (req, res) => {
    const table = req.params.table;
    const { fields, item } = req.body;
    const params: any[] = [];
    let insertQuery = `INSERT INTO \`${table}\` (${fields.map((field: any) => field.index).join(', ')}) VALUES (`;
    let insertFields: string[] = [];
    fields.forEach((field: any) => {
        insertFields.push('?');
        params.push(item[field.index]);
    });
    insertQuery += insertFields.join(', ') + ')';
    pool.query(insertQuery, params, (err, result) => {
        if (err) throw err;
        res.status(201).send(item);
    });
});

router.post('/:table/map', (req, res) => {
    const table = req.params.table;
    const { fields } = req.body;
    pool.query<RowDataPacket[]>(`SELECT ${fields.join(', ')} FROM ${table}`, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

export default router;
