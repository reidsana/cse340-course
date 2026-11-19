
import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { testConnection } from './src/models/db.js';
import { getAllProjects } from './src/models/projects.js';
import { getAllCategories } from './src/models/categories.js';
import router from './src/routes.js';

// Define the application environment
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'development';

// Define the port number
const PORT = process.env.PORT || 3000;

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express
const app = express();

// Configure EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Middleware to log all incoming requests
app.use((req, res, next) => {
    if (NODE_ENV === 'development') {
        console.log(`${req.method} ${req.url}`);
    }
    next();
});

// Middleware to make NODE_ENV available to all templates
app.use((req, res, next) => {
    res.locals.NODE_ENV = NODE_ENV;
    next();
});


// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', async (req, res) => {
    res.render('home', { title: 'Home' });
});

// Service projects route
app.get('/projects', async (req, res, next) => {
    try {
        const projects = await getAllProjects();

        console.log('Service Projects:', projects);

        res.render('projects', {
            title: 'Service Projects',
            projects
        });
    } catch (error) {
        next(error);
    }
});

// Categories route
app.get('/categories', async (req, res, next) => {
    try {
        const categories = await getAllCategories();

        console.log('Categories:', categories);

        res.render('categories', {
            title: 'Categories',
            categories
        });

    } catch (error) {
        next(error);
    }
});

// Register application routes
app.use(router);

// Test route for 500 errors
app.get('/test-error', (req, res, next) => {
    const err = new Error('This is a test error');
    err.status = 500;
    next(err);
});
// Catch-all route for 404 errors
app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

// Global error handler
app.use((err, req, res, next) => {
    // Log error details for debugging
    console.error('Error occurred:', err.message);
    console.error('Stack trace:', err.stack);

    // Determine status and template
    const status = err.status || 500;
    const template = status === 404 ? '404' : '500';

    // Prepare data for the template
    const context = {
        title: status === 404 ? 'Page Not Found' : 'Server Error',
        error: err.message,
        stack: err.stack
    };

    // Render the appropriate error template
    res.status(status).render(`errors/${template}`, context);
});

// Start the server
app.listen(PORT, async () => {
    try {
        await testConnection();
        console.log(`Server is running at http://127.0.0.1:${PORT}`);
        console.log(`Environment: ${NODE_ENV}`);
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
});


