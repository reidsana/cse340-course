import db from './db.js';

export const getAllCategories = async () => {
    const sql = `
        SELECT category_id, category_name
        FROM category
        ORDER BY category_name ASC;
    `;

    const result = await db.query(sql);
    return result.rows;
};