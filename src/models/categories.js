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

export const getCategoryDetails = async (categoryId) => {
    const sql = `
        SELECT
            category_id,
            category_name
        FROM category
        WHERE category_id = $1;
    `;

    const result = await db.query(sql, [categoryId]);

    return result.rows.length > 0 ? result.rows[0] : null;
};

export const getCategoriesByProjectId = async (projectId) => {
    const sql = `
        SELECT
            c.category_id,
            c.category_name
        FROM category c
        JOIN project_category pc
            ON c.category_id = pc.category_id
        WHERE pc.project_id = $1
        ORDER BY c.category_name ASC;
    `;

    const result = await db.query(sql, [projectId]);
    return result.rows;
};

// Assign a category to a service project
const assignCategoryToProject = async (projectId, categoryId) => {
    const sql = `
        INSERT INTO project_category (project_id, category_id)
        VALUES ($1, $2);
    `;

    await db.query(sql, [projectId, categoryId]);
};

export const getProjectsByCategoryId = async (categoryId) => {
    const sql = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.project_date,
            p.location,
            p.organization_id
        FROM service_project p
        JOIN project_category pc
            ON p.project_id = pc.project_id
        WHERE pc.category_id = $1
        ORDER BY p.project_date ASC;
    `;

    const result = await db.query(sql, [categoryId]);
    return result.rows;
};

// Update all category assignments for a service project
export const updateCategoryAssignments = async (projectId, categoryIds) => {
    const deleteSql = `
        DELETE FROM project_category
        WHERE project_id = $1;
    `;

    await db.query(deleteSql, [projectId]);

    for (const categoryId of categoryIds) {
        await assignCategoryToProject(projectId, categoryId);
    }
};