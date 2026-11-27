import express from 'express';

import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    showEditOrganizationForm,
    processEditOrganizationForm,
    organizationValidation
} from './controllers/organizations.js';


import {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    projectValidation,
    showEditProjectForm,
    processEditProjectForm
} from './controllers/projects.js';

import {
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    categoryValidation
} from './controllers/categories.js';

const router = express.Router();


// Organizations list
router.get('/organizations', showOrganizationsPage);

// Organization details
router.get('/organization/:id', showOrganizationDetailsPage);

// Service projects list
router.get('/projects', showProjectsPage);

// Service project details
router.get('/project/:id', showProjectDetailsPage);

// Category details
router.get('/category/:id', showCategoryDetailsPage);

// Routes for creating a new category
router.get('/new-category', showNewCategoryForm);

router.post(
    '/new-category',
    categoryValidation,
    processNewCategoryForm
);

// Routes for editing an existing category
router.get('/edit-category/:id', showEditCategoryForm);

router.post(
    '/edit-category/:id',
    categoryValidation,
    processEditCategoryForm
);

// Route for new organization page
router.get('/new-organization', showNewOrganizationForm);

// Route to handle new organization form submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);

// Route to display the edit organization form
router.get('/edit-organization/:id', showEditOrganizationForm);

// Route to handle the edit organization form submission
router.post(
    '/edit-organization/:id',
    organizationValidation,
    processEditOrganizationForm
);

// Route for new service project page
router.get('/new-project', showNewProjectForm);

// Route to handle new service project form submission
router.post('/new-project', projectValidation, processNewProjectForm);

// Routes to handle assigning categories to a project
router.get(
    '/assign-categories/:projectId',
    showAssignCategoriesForm
);

router.post(
    '/assign-categories/:projectId',
    processAssignCategoriesForm
);

// Routes to edit an existing service project
router.get('/edit-project/:id', showEditProjectForm);

router.post(
    '/edit-project/:id',
    projectValidation,
    processEditProjectForm
);

export default router;