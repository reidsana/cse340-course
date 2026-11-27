import {
    getCategoryDetails,
    getProjectsByCategoryId,
    getAllCategories,
    getCategoriesByProjectId,
    updateCategoryAssignments
} from '../models/categories.js';

import {
    getProjectDetails
} from '../models/projects.js';

export const showCategoryDetailsPage = async (req, res, next) => {
    try {
        const categoryId = req.params.id;

        const category = await getCategoryDetails(categoryId);

        if (!category) {
            return res.status(404).render('404', {
                title: 'Category Not Found'
            });
        }

        const projects = await getProjectsByCategoryId(categoryId);

        res.render('category', {
            title: category.category_name,
            category,
            projects
        });
    } catch (error) {
        next(error);
    }
};

// Display the form for assigning categories to a project
export const showAssignCategoriesForm = async (req, res, next) => {
    try {
        const projectId = req.params.projectId;

        const projectDetails = await getProjectDetails(projectId);
        const categories = await getAllCategories();
        const assignedCategories = await getCategoriesByProjectId(projectId);

        if (!projectDetails) {
            return res.status(404).render('404', {
                title: 'Project Not Found'
            });
        }

        const title = 'Assign Categories to Project';

        res.render('assign-categories', {
            title,
            projectId,
            projectDetails,
            categories,
            assignedCategories
        });
    } catch (error) {
        next(error);
    }
};
// Process category assignments
export const processAssignCategoriesForm = async (req, res, next) => {
    try {
        const projectId = req.params.projectId;
        const selectedCategoryIds = req.body.categoryIds || [];

        const categoryIdsArray = Array.isArray(selectedCategoryIds)
            ? selectedCategoryIds
            : [selectedCategoryIds];

        await updateCategoryAssignments(projectId, categoryIdsArray);

        req.flash('success', 'Categories updated successfully.');

        res.redirect(`/project/${projectId}`);
    } catch (error) {
        next(error);
    }
};