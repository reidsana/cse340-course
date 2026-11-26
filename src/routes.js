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
    projectValidation
} from './controllers/projects.js';

import {
    showCategoryDetailsPage
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
export default router;