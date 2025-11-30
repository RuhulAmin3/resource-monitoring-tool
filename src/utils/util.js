import file from 'fs';

let io = null;

export const saveMemoryUsage = (socketIO) => {
    io = socketIO;
    setInterval(() => {
        const data = {
            memoryUsage: (process.memoryUsage().rss / (1024 * 1024)).toFixed(2),
            cpuUsage: process.cpuUsage(),
            uptime: process.uptime().toFixed(2),
            timestamp: new Date()
        };

        let existingData = [];
        try {
            existingData = JSON.parse(file.readFileSync('data.json', 'utf8'));
        } catch (err) {
            existingData = [];
        }

        existingData.push(data);

        file.writeFileSync('data.json', JSON.stringify(existingData, null, 2));

        // Emit real-time data to all connected clients via Socket.IO
        if (io) {
            const formattedData = {
                memoryUsage: parseFloat(data.memoryUsage),
                cpuUser: (data.cpuUsage.user / 1000).toFixed(2),
                cpuSystem: (data.cpuUsage.system / 1000).toFixed(2),
                uptime: parseFloat(data.uptime),
                timestamp: new Date(data.timestamp).toLocaleTimeString()
            };

            io.emit('resource-update', formattedData);
        }
    }, 1000);
}

export const attachSocketListener = (socketIO) => {
    io = socketIO;
}

export const getResourceData = () => {
    try {
        const rawData = file.readFileSync('data.json', 'utf8');
        const data = JSON.parse(rawData);

        // Get last 60 data points for better visualization
        const recentData = data.slice(-60);

        return {
            memoryUsage: recentData.map(d => parseFloat(d.memoryUsage)),
            cpuUser: recentData.map(d => (d.cpuUsage.user / 1000).toFixed(2)),
            cpuSystem: recentData.map(d => (d.cpuUsage.system / 1000).toFixed(2)),
            uptime: recentData.map(d => parseFloat(d.uptime)),
            timestamps: recentData.map(d => {
                const date = new Date(d.timestamp);
                return date.toLocaleTimeString();
            })
        };
    } catch (err) {
        console.error('Error reading resource data:', err);
        return {
            memoryUsage: [],
            cpuUser: [],
            cpuSystem: [],
            uptime: [],
            timestamps: []
        };
    }
}