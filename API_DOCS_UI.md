# API Documentation UI

## Overview

The root route (`/`) now displays a beautiful, modern API documentation page that guides users through all available endpoints and provides quick access to test them.

## Features

### 🎨 Modern Design
- **Gradient Background**: Professional purple gradient theme
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Card-Based Design**: Each API endpoint is clearly presented in an interactive card
- **Hover Effects**: Smooth animations and transitions on all interactive elements

### 📡 API Endpoints Documentation

The API docs page showcases all available endpoints:

#### 1. Real-Time Dashboard
- **Route**: `/api/resource-monitor`
- **Method**: GET
- **Description**: Interactive monitoring dashboard with live charts
- **Features**: WebSocket real-time updates, Chart.js visualizations
- **Action**: Click "Open" to view the dashboard in a new tab

#### 2. Health Check
- **Route**: `/health`
- **Method**: GET
- **Description**: Simple endpoint to verify server is running
- **Response**: JSON with server status
- **Action**: Click "Test" to check health in a new tab

#### 3. Resource Data API
- **Route**: `/api/resource-data`
- **Method**: GET
- **Description**: REST API for fetching metrics (JSON)
- **Features**: Returns last 60 data points, memory/CPU/uptime data
- **Action**: Click "Fetch" to get data in a new tab

#### 4. Heavy Task Simulator
- **Route**: `/heavy-task`
- **Method**: GET
- **Description**: CPU-intensive test endpoint
- **Use Case**: Test resource monitoring by triggering CPU/memory spike
- **Action**: Click "Trigger" to simulate heavy load in a new tab

### 🎯 User Experience Features

1. **Direct Tab Opening**: Every API action opens in a new browser tab
2. **Visual Method Badges**: GET/POST methods clearly labeled with color coding
3. **Response Examples**: JSON response examples for each endpoint
4. **Interactive Buttons**: Color-coded buttons for different actions
5. **Tags**: Quick visual tags (Real-Time, Monitoring, Heavy Load, Testing)
6. **Stats Dashboard**: Shows server stats (API count, system status, etc.)

### 🔗 Navigation

```
/ (Home - API Docs)
├── Dashboard Button → /api/resource-monitor
├── Health Check Button → /health
├── Data API Button → /api/resource-data
└── Heavy Task Button → /heavy-task
```

### 💻 Implementation Details

**File**: `views/api-docs.ejs`

The page includes:
- Clean HTML structure with semantic markup
- Modern CSS with gradients, flexbox, and grid layouts
- JavaScript function to open links in new tabs: `openInNewTab(url)`
- Mobile-responsive design with media queries
- Accessibility features (semantic HTML, proper contrast)

**Server Route**: `server.js`

```javascript
app.get('/', (req, res) => {
    res.render('api-docs');
});
```

## User Workflow

1. **User visits**: `http://localhost:3000`
2. **Sees**: Beautiful API documentation page with all endpoints
3. **Clicks**: Any action button (e.g., "Open Dashboard")
4. **Result**: New browser tab opens with the selected endpoint
5. **Dashboard**: Shows real-time monitoring with Socket.IO updates

## Visual Hierarchy

### Header Section
- Logo emoji (📡)
- Main title with subtitle
- Version badge

### Stats Section
- Quick overview of available features
- 4 stat cards showing:
  - Number of endpoints
  - System status
  - Real-time capability
  - Socket.IO status

### API Cards Section
- 4 responsive cards, one for each endpoint
- Hover effects and smooth transitions
- Method badges (GET)
- Endpoint paths
- Descriptions
- Response examples
- Action buttons

### Footer Section
- Security note
- Technology stack mention

## Color Scheme

- **Primary**: Purple Gradient (#667eea → #764ba2)
- **Success**: Green (#4ade80)
- **Info**: Blue (#1976d2)
- **Warning**: Orange (#f59e0b)
- **Danger**: Red (#d32f2f)

## Styling Features

1. **Gradients**: Professional gradient backgrounds
2. **Shadows**: Depth with box-shadow effects
3. **Rounded Corners**: Modern border-radius styling
4. **Backdrop Filters**: Glass-morphism effects
5. **Smooth Transitions**: All interactions have 0.3s ease transitions
6. **Hover States**: Cards lift on hover with transform effects

## Mobile Responsive Breakpoints

- **Desktop**: Full grid layout (380px min per card)
- **Tablet**: Adjusted card widths
- **Mobile**: Single column layout with full-width buttons

## Future Enhancements

1. **API Testing UI**: Inline API tester with request/response viewer
2. **Authentication**: Login section for protected endpoints
3. **WebSocket Status**: Live socket connection status indicator
4. **Metrics Widget**: Real-time mini metrics on the landing page
5. **Changelog**: Display recent updates and improvements
6. **Dark Mode**: Toggle between light and dark themes
7. **API Explorer**: Interactive query builder for endpoints

## Technical Stack

- **Frontend**: EJS templating, HTML5, CSS3, Vanilla JavaScript
- **Backend**: Express.js, Socket.IO
- **Styling**: CSS Grid, Flexbox, Gradients, Transitions
- **Interaction**: Window.open() for new tab navigation

## Testing

To verify the implementation:

1. Start the server: `npm run dev`
2. Visit: `http://localhost:3000`
3. Verify all buttons work and open in new tabs
4. Try the dashboard and see real-time updates
5. Test heavy-task endpoint and watch metrics spike

## Code Example

Opening a link in a new tab:

```javascript
function openInNewTab(url) {
    window.open(url, '_blank');
}

// Usage in HTML:
<button onclick="openInNewTab('/health')">Test</button>
```

This ensures users can test APIs without leaving the documentation page.
