
import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { testConnection } from './src/models/db.js';

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

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', async (req, res) => {
    res.render('home', { title: 'Home' });
});

// Organizations route
app.get('/organizations', async (req, res) => {
    res.render('organizations', { title: 'Organizations' });
});

// Service projects route
app.get('/projects', async (req, res) => {
    res.render('projects', { title: 'Service Projects' });
});

// Categories route
app.get('/categories', async (req, res) => {
    res.render('categories', { title: 'Categories' });
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


