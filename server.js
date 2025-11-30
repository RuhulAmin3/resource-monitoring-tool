import express from 'express';
import { saveMemoryUsage } from './util.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

saveMemoryUsage();

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Resource Monitoring Tool API' });
});

app.get('/health', (req, res) => {
    res.json({ status: 'Server is running' });
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
