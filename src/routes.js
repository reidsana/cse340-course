import express from 'express';

import {
    showOrganizationsPage,
    showOrganizationDetailsPage
} from './controllers/organizations.js';

const router = express.Router();

// Organizations list
router.get('/organizations', showOrganizationsPage);

// Organization details
router.get('/organization/:id', showOrganizationDetailsPage);

export default router;