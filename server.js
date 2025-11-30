import express from 'express';
import { saveMemoryUsage, getResourceData, attachSocketListener } from './util.js';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const PORT = process.env.PORT || 3000;

// Create HTTP server and Socket.IO instance
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Start saving resource data every second and attach Socket.IO listener
saveMemoryUsage(io);
attachSocketListener(io);

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);
    // Send initial data to newly connected client
    try {
        const initialData = getResourceData();
        socket.emit('initial-data', initialData);
    } catch (err) {
        console.error('Error sending initial data:', err);
    }

    // Handle client disconnect
    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});

// Routes
app.get('/api/resource-monitor', (req, res) => {
    res.render('index');
});

app.get('/', (req, res) => {
    res.render('api-docs');
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

// API endpoint to get resource monitoring data (fallback)
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
httpServer.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`⚡ Socket.IO real-time monitoring active`);
});
