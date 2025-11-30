import express from 'express';
import { saveMemoryUsage, getResourceData } from './util.js';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3000;

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Start saving resource data every second
saveMemoryUsage();
// Routes
app.get('/api/resource-monitor', (req, res) => {
    res.render('index');
});


app.get('/health', (req, res) => {
    res.json({ status: 'Server is running' });
});


// heavy task simulation route
app.get('/heavy-task', (req, res) => {
    // Simulate a heavy task
    let sum = 0;
    let obj = {}
    for (let i = 0; i < 1e8; i++) {
        obj[i] = i;
        sum += i;
    }
    res.json({ result: sum });
});


// API endpoint to get resource monitoring data
app.get("/api/resource-data", (req, res) => {
    try {
        const data = getResourceData();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch resource data' });
    }
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
