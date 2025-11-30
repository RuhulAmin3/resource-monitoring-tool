# Resource Monitoring Tool

A real-time system resource monitoring dashboard built with Node.js, Express.js, EJS, and Chart.js.

## Features

✨ **Real-time Monitoring Dashboard**
- Live memory usage tracking (in MB)
- CPU usage monitoring (User and System time in ms)
- Server uptime tracking
- Automatic data refresh every 2 seconds

📊 **Interactive Charts**
- Line charts for memory usage, CPU usage, and uptime
- Doughnut chart for CPU breakdown
- Responsive design that works on all devices
- Beautiful gradient UI with smooth animations

🔄 **Auto Data Collection**
- Automatically collects system metrics every second
- Stores data in `data.json` for persistence
- Shows last 60 data points on charts for better visualization

## Project Structure

```
.
├── server.js                 # Express server setup
├── util.js                   # Utility functions for data collection
├── package.json              # Project dependencies
├── data.json                 # Resource metrics storage
├── views/
│   └── index.ejs            # EJS template with Chart.js dashboard
├── public/                   # Static files (CSS, JS, images)
└── README.md                # This file
```

## Installation

1. Clone or download the project
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000` (or PORT environment variable if set)

## API Endpoints

### GET `/`
Renders the resource monitoring dashboard
- Response: HTML page with interactive charts

### GET `/api/resource-data`
Returns the latest resource monitoring data
- Response: JSON with arrays of memory, CPU, and uptime metrics
```json
{
  "memoryUsage": [45.2, 45.3, ...],
  "cpuUser": [0.078, 0.093, ...],
  "cpuSystem": [0.046, 0.062, ...],
  "uptime": [2.12, 4.12, ...],
  "timestamps": ["10:33:52", "10:33:54", ...]
}
```

### GET `/health`
Health check endpoint
- Response: `{ "status": "Server is running" }`

## Technologies Used

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework (ES modules - `type: module`)
- **EJS**: Template engine for rendering HTML
- **Chart.js**: JavaScript charting library
- **CSS3**: Modern styling with gradients and animations

## Data Metrics Collected

- **Memory Usage**: RSS memory in MB (megabytes)
- **CPU User Time**: User CPU time in microseconds
- **CPU System Time**: System CPU time in microseconds
- **Uptime**: Server uptime in seconds
- **Timestamp**: Collection time in ISO format

## Features Explanation

### Real-time Updates
The dashboard fetches new data every 2 seconds and updates all charts without page refresh using Chart.js animation.

### Responsive Design
The dashboard uses CSS Grid and Flexbox to adapt to different screen sizes, from mobile to desktop.

### Memory Efficient
Only the last 60 data points are displayed on charts to keep the dashboard responsive and memory-efficient.

### Beautiful UI
- Gradient background (purple theme)
- Card-based layout with shadows and hover effects
- Color-coded statistics
- Pulse animation for the "live" indicator

## Browser Compatibility

- Chrome/Chromium 45+
- Firefox 45+
- Safari 10+
- Edge 12+

## Environment Variables

- `PORT`: Server port (default: 3000)

## Notes

- Data is stored in `data.json` and persists across server restarts
- The chart updates smoothly without full page reloads
- All times are displayed in local timezone
- CPU times are converted from microseconds to milliseconds for readability

## Future Enhancements

- Add WebSocket support for real-time updates without polling
- Export data as CSV/JSON
- Add custom time range selection
- Add alerts for high memory/CPU usage
- Database integration for long-term storage
- User authentication
