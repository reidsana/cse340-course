import express from 'express';

import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm
} from './controllers/organizations.js';


import {
    showProjectsPage,
    showProjectDetailsPage
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
router.post('/new-organization', processNewOrganizationForm);
export default router;