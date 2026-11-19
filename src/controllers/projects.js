import {
    getUpcomingProjects,
    getProjectDetails
} from '../models/projects.js';

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

        res.render('project', {
            title: 'Project Details',
            project
        });
    } catch (error) {
        next(error);
    }
};

export {
    showProjectsPage,
    showProjectDetailsPage
};