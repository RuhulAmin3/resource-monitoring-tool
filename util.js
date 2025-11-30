import file from 'fs';

export const saveMemoryUsage = () => {
    setInterval(() => {

        const data = {
            memoryUsage: (process.memoryUsage().rss / (1024 * 1024)).toFixed(2),
            cpuUsage: process.cpuUsage(),
            uptime: process.uptime().toFixed(2),
            timestamp: new Date()
        };
        console.log("data", data);

        let existingData = [];
        try {
            existingData = JSON.parse(file.readFileSync('data.json', 'utf8'));
        } catch (err) {
            existingData = [];
        }

        existingData.push(data);

        file.writeFileSync('data.json', JSON.stringify(existingData, null, 2));
    }, 1000);
}