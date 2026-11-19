import express from 'express';

import {
    showOrganizationsPage,
    showOrganizationDetailsPage
} from './controllers/organizations.js';

import {
    showProjectsPage,
    showProjectDetailsPage
} from './controllers/projects.js';

const router = express.Router();

// Organizations list
router.get('/organizations', showOrganizationsPage);

// Organization details
router.get('/organization/:id', showOrganizationDetailsPage);

// Service projects list
router.get('/projects', showProjectsPage);

// Service project details
router.get('/project/:id', showProjectDetailsPage);

export default router;