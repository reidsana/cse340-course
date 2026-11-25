import {
    getAllOrganizations,
    getOrganizationDetails,
    createOrganization
} from '../models/organizations.js';

import { getProjectsByOrganizationId } from '../models/projects.js';

// Display all organizations
const showOrganizationsPage = async (req, res, next) => {
    try {
        const organizations = await getAllOrganizations();

        res.render('organizations', {
            title: 'Our Partner Organizations',
            organizations
        });
    } catch (error) {
        next(error);
    }
};

// Display one organization's details and projects
const showOrganizationDetailsPage = async (req, res, next) => {
    try {
        const organizationId = req.params.id;

        const organizationDetails =
            await getOrganizationDetails(organizationId);

        if (!organizationDetails) {
            const error = new Error('Organization Not Found');
            error.status = 404;
            return next(error);
        }

        const projects =
            await getProjectsByOrganizationId(organizationId);

        res.render('organization', {
            title: 'Organization Details',
            organizationDetails,
            projects
        });
    } catch (error) {
        next(error);
    }
};

const showNewOrganizationForm = async (req, res) => {
    const title = 'Add New Organization';

    res.render('new-organization', { title });
};


const processNewOrganizationForm = async (req, res) => {
    const { name, description, contactEmail } = req.body;

    const logoFilename = 'placeholder-logo.png';

    const organizationId = await createOrganization(
        name,
        description,
        contactEmail,
        logoFilename
    );

    req.flash('success', 'Organization added successfully!');

    res.redirect(`/organization/${organizationId}`);
};


export {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm
};





