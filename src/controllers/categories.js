import { body, validationResult } from 'express-validator';

import {
    getCategoryDetails,
    getProjectsByCategoryId,
    getAllCategories,
    getCategoriesByProjectId,
    updateCategoryAssignments,
    createCategory,
    updateCategory
} from '../models/categories.js';

import {
    getProjectDetails
} from '../models/projects.js';

// Validation rules for category forms
export const categoryValidation = [
    body('category_name')
        .trim()
        .notEmpty()
        .withMessage('Category name is required')
        .isLength({ min: 3, max: 100 })
        .withMessage('Category name must be between 3 and 100 characters')
];

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

// Display the new category form
export const showNewCategoryForm = (req, res) => {
    res.render('new-category', {
        title: 'Create New Category'
    });
};

// Process the new category form
export const processNewCategoryForm = async (req, res, next) => {
    const results = validationResult(req);

    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect('/new-category');
    }

    const { category_name } = req.body;

    try {
        const newCategoryId = await createCategory(category_name);

        req.flash('success', 'Category created successfully!');

        res.redirect(`/category/${newCategoryId}`);
    } catch (error) {
        next(error);
    }
};

// Display the edit category form
export const showEditCategoryForm = async (req, res, next) => {
    try {
        const categoryId = req.params.id;

        const category = await getCategoryDetails(categoryId);

        if (!category) {
            return res.status(404).render('404', {
                title: 'Category Not Found'
            });
        }

        res.render('edit-category', {
            title: 'Edit Category',
            category
        });
    } catch (error) {
        next(error);
    }
};

// Process the edit category form
export const processEditCategoryForm = async (req, res, next) => {
    const results = validationResult(req);

    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect(`/edit-category/${req.params.id}`);
    }

    const categoryId = req.params.id;
    const { category_name } = req.body;

    try {
        await updateCategory(categoryId, category_name);

        req.flash('success', 'Category updated successfully!');

        res.redirect(`/category/${categoryId}`);
    } catch (error) {
        next(error);
    }
};