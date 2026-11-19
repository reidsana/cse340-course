import db from './db.js';

export const getAllProjects = async () => {
    const sql = `
        SELECT
            p.project_id,
            p.organization_id,
            p.title,
            p.description,
            p.location,
            p.project_date,
            o.name AS organization_name
        FROM service_project p
        JOIN organization o
            ON p.organization_id = o.organization_id
        ORDER BY p.project_date ASC;
    `;

    const result = await db.query(sql);
    return result.rows;
};

export const getProjectsByOrganizationId = async (organizationId) => {
    const sql = `
        SELECT
            project_id,
            organization_id,
            title,
            description,
            location,
            project_date
        FROM service_project
        WHERE organization_id = $1
        ORDER BY project_date ASC;
    `;

    const result = await db.query(sql, [organizationId]);
    return result.rows;
};

export const getUpcomingProjects = async (number_of_projects) => {
    const sql = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.project_date AS date,
            p.location,
            p.organization_id,
            o.name AS organization_name
        FROM service_project p
        JOIN organization o
            ON p.organization_id = o.organization_id
        WHERE p.project_date >= CURRENT_DATE
        ORDER BY p.project_date ASC
        LIMIT $1;
    `;

    const result = await db.query(sql, [number_of_projects]);
    return result.rows;
};

export const getProjectDetails = async (id) => {
    const sql = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.project_date AS date,
            p.location,
            p.organization_id,
            o.name AS organization_name
        FROM service_project p
        JOIN organization o
            ON p.organization_id = o.organization_id
        WHERE p.project_id = $1;
    `;

    const result = await db.query(sql, [id]);

    return result.rows.length > 0 ? result.rows[0] : null;
};