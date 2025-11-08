# Leendet - SaaS Platform for Academic Loans & Inventory Management

## Project Overview
Leendet is a SaaS platform for managing loans and academic inventories ("Plataforma SaaS para gestión de préstamos e inventarios académicos"). The project was imported from GitHub with minimal initial content, and a basic working application has been set up.

## Current State
- **Status**: Initial working application deployed
- **Language**: Node.js (v20)
- **Framework**: Express.js
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Port**: 5000 (frontend)
- **Server**: Listening on 0.0.0.0:5000 for Replit proxy compatibility

## Project Architecture
```
/
├── server.js          # Express server (port 5000)
├── package.json       # Node.js dependencies
├── public/            # Static frontend files
│   ├── index.html     # Main landing page
│   ├── styles.css     # Styling
│   └── app.js         # Client-side JavaScript
├── README.md          # Project description
├── LICENSE            # MIT License
└── .gitignore         # Git ignore rules
```

## Features Implemented
- Landing page with project overview
- Feature showcase (Loans, Inventory, Users, Reports)
- Health check API endpoint (`/api/health`)
- Responsive design with gradient theme
- Server status indicator

## Technical Details
- **Server**: Express.js running on 0.0.0.0:5000
- **Deployment**: Configured for autoscale deployment
- **API Endpoints**:
  - `GET /` - Main application page
  - `GET /api/health` - Server health check

## Recent Changes
- 2025-11-08: Initial GitHub import to Replit
- 2025-11-08: Created basic Express.js application structure
- 2025-11-08: Added Spanish-language landing page with feature cards
- 2025-11-08: Configured workflow and deployment settings
- 2025-11-08: Verified application runs successfully

## Next Steps
- Add user authentication system
- Implement database schema for loans and inventory
- Create CRUD operations for inventory items
- Build loan management interface
- Add user role management
- Implement reporting and analytics
