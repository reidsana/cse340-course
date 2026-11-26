import { body, validationResult } from 'express-validator';

import {
    getUpcomingProjects,
    getProjectDetails,
    createProject
} from '../models/projects.js';

import {
    getCategoriesByProjectId
} from '../models/categories.js';

import {
    getAllOrganizations
} from '../models/organizations.js';

// Define validation rules for the new project form
const projectValidation = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Project title is required')
        .isLength({ min: 3, max: 200 })
        .withMessage('Project title must be between 3 and 200 characters'),

    body('description')
        .trim()
        .notEmpty()
        .withMessage('Project description is required')
        .isLength({ max: 1000 })
        .withMessage('Project description cannot exceed 1000 characters'),

    body('location')
        .trim()
        .notEmpty()
        .withMessage('Project location is required')
        .isLength({ max: 200 })
        .withMessage('Project location cannot exceed 200 characters'),

    body('date')
        .notEmpty()
        .withMessage('Project date is required')
        .isISO8601()
        .withMessage('Please provide a valid project date'),

    body('organizationId')
        .notEmpty()
        .withMessage('Please select an organization')
        .isInt()
        .withMessage('Please select a valid organization')
];

// Number of upcoming projects to display
const NUMBER_OF_UPCOMING_PROJECTS = 5;

// Display the next five upcoming projects
const showProjectsPage = async (req, res, next) => {
    try {
        const projects = await getUpcomingProjects(
            NUMBER_OF_UPCOMING_PROJECTS
        );
        console.log('Upcoming Projects:', projects);


        res.render('projects', {
            title: 'Upcoming Service Projects',
            projects
        });
    } catch (error) {
        next(error);
    }
};

// Display one project's details
const showProjectDetailsPage = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const project = await getProjectDetails(projectId);

        if (!project) {
            const error = new Error('Project Not Found');
            error.status = 404;
            return next(error);
        }

        const categories = await getCategoriesByProjectId(projectId);

        res.render('project', {
            title: 'Project Details',
            project,
            categories
        });
    } catch (error) {
        next(error);
    }
};

// Display the new project form
const showNewProjectForm = async (req, res) => {
    const organizations = await getAllOrganizations();

    const title = 'Add New Service Project';

    res.render('new-project', {
        title,
        organizations
    });
};

// Process the new project form submission
const processNewProjectForm = async (req, res) => {
    const results = validationResult(req);

    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect('/new-project');
    }

    const {
        title,
        description,
        location,
        date,
        organizationId
    } = req.body;

    try {
        const newProjectId = await createProject(
            title,
            description,
            location,
            date,
            organizationId
        );

        req.flash(
            'success',
            'New service project created successfully!'
        );

        res.redirect(`/project/${newProjectId}`);

    } catch (error) {
        console.error('Error creating new project:', error);

        req.flash(
            'error',
            'There was an error creating the service project.'
        );

        res.redirect('/new-project');
    }
};

export {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    projectValidation,
    processNewProjectForm
};