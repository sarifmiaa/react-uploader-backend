# File Upload Backend

A robust Node.js TypeScript Express backend for handling file uploads with progress tracking.

## Features

- ✅ File upload with 10MB size limit
- ✅ Progress tracking during uploads
- ✅ CORS support for frontend integration
- ✅ Security middleware (Helmet, Rate limiting)
- ✅ TypeScript support
- ✅ Health check endpoint
- ✅ File type validation
- ✅ Unique filename generation
- ✅ Error handling

## API Endpoints

### Health Check
```
GET /api/health
```
Returns server health status and system information.

### File Upload
```
POST /api/files/upload
Content-Type: multipart/form-data
Headers: x-upload-id (optional)

Body: form-data with 'file' field
```

### Upload Progress
```
GET /api/files/progress/:uploadId
```
Get upload progress by upload ID.

### List Files
```
GET /api/files/list
```
List uploaded files (basic endpoint for future enhancement).

## Supported File Types

- Images: JPEG, PNG, GIF, WebP
- Documents: PDF, TXT, JSON, CSV
- Office: Excel, Word documents

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)

## File Storage

Files are stored in the `uploads/` directory with unique filenames to prevent conflicts.

## CORS Configuration

Configured to allow requests from:
- http://localhost:5173 (Vite dev server)
- http://localhost:3000 (React dev server)
- http://127.0.0.1:5173

## Rate Limiting

- 100 requests per 15 minutes per IP
- Can be adjusted in server configuration

## Security Features

- Helmet.js for security headers
- File type validation
- File size limits
- Rate limiting
- Input sanitization