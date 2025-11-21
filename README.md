# TinyLink - URL Shortener

A full-stack URL shortener built with React, Node.js, Express, and PostgreSQL. Create short links, track clicks, and manage your URLs with a clean, responsive interface.

## Features

- Create custom or auto-generated short links
- Track click statistics for each link
- Search and filter your links
- Responsive design with Tailwind CSS
- Fast redirects with click tracking
- Easy link management (delete links)
- PostgreSQL database for reliability
- URL validation and error handling
- Modern React frontend with component-based architecture
- React Router for seamless navigation

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: PostgreSQL

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone <https://github.com/farzank69/tinyURL.git>
cd tinyURL
```

2. Install all dependencies:
```bash
npm run install:all
```

3. Start both servers:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

### Health Check
- `GET /healthz` - Returns server health status

### Link Management
- `POST /api/links` - Create a new short link
- `GET /api/links` - Get all links
- `GET /api/links/:code` - Get stats for a specific link
- `DELETE /api/links/:code` - Delete a link

### Redirect
- `GET /:code` - Redirect to target URL (302)

## API Examples

### Create a Link
```bash
POST /api/links
Content-Type: application/json

{
  "target_url": "https://example.com",
  "code": "mylink"  // optional, 6-8 alphanumeric characters
}
```

Response:
```json
{
  "code": "mylink",
  "target_url": "https://example.com",
  "short_url": "http://localhost:3000/mylink",
  "clicks": 0,
  "created_at": "2025-11-21T12:00:00.000Z"
}
```

### Get All Links
```bash
GET /api/links
```

### Delete a Link
```bash
DELETE /api/links/mylink
```

## Development Scripts

- `npm run dev` - Start both backend and frontend servers
- `npm run install:all` - Install all dependencies

## Features Overview

### Dashboard (`http://localhost:5173/`)
- Create new short links with optional custom codes
- View all links in a sortable table
- Search/filter links by code or URL
- Copy short URLs to clipboard
- Delete links
- Responsive design for mobile and desktop
- Toast notifications for user feedback

### Stats Page (`http://localhost:5173/stats/:code`)
- View detailed statistics for a link
- See total clicks and last clicked time
- Quick actions: visit link, copy URL
- Delete link from stats page
- Responsive card layout

### Redirect (`http://localhost:3000/:code`)
- Fast 302 redirects
- Automatic click tracking
- 404 for non-existent or deleted links

## Author

Farzan Khan | Built as a take-home assignment for URL shortening service.
