// file backend/src/routes/subject.ts
import express from 'express';
import pool from '../db';
import { RowDataPacket } from 'mysql2';

const router = express.Router();

const tableSearchConditions: any = {

};

// Get list of subjects with their active classes
router.post('/search/:table', (req, res) => {
    const table = req.params.table;
    const page = parseInt(req.body.page as string) || 1;
    const pageSize = parseInt(req.body.pageSize as string) || 10;
    const search = req.body.search ? `%${req.body.search}%` : '%';
    const offset = (page - 1) * pageSize;
    const settings: any = req.body.settings;
    const sorts: any = req.body.sorts;
    const filterData: any = req.body.filterData;

    let query = `
      SELECT 
        * FROM ${table} AS t
      WHERE 
    `;
    const params: Array<string | number> = [];
    let searchLikes: string[] = [];
    settings.columns.forEach((column: any) => {
        if (column.type !== 'actions') {
            searchLikes.push(`${column.index} LIKE ?`);
            params.push(search);
        }
    });

    query += '(' + searchLikes.join(' OR ') + ')';

    let filterConditions: string[] = [];

    for (let index in filterData) {
        if (filterData[index] !== '') {
            filterConditions.push(`${index} like ?`);
            params.push('%' + filterData[index] + '%');
        }
    }
    if (filterConditions.length > 0) {
        query += ` AND (${filterConditions.join(' AND ')})`;
    }

    let orderBys: string[] = [];
    sorts.forEach((sort: any) => {
        orderBys.push(`${sort.index} ${sort.direction}`);
    });
    let orderBy = orderBys.join(', ');

    query += ` ORDER BY ${orderBy} LIMIT ?, ?`;
    params.push(offset, pageSize);

    let totalCountQuery = `SELECT COUNT(*) as total FROM ${table} as t
    WHERE 
    `;
    totalCountQuery += '(' + searchLikes.join(' OR ') + ')';
    if (filterConditions.length > 0) {
        totalCountQuery += ` AND (${filterConditions.join(' AND ')})`;
    }

    pool.query<RowDataPacket[]>(totalCountQuery, params, (err, response) => {
        if (err) throw err;
        const total = response[0].total;
        pool.query<RowDataPacket[]>(query, params, (err, items) => {
            if (err) throw err;

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

export default router;