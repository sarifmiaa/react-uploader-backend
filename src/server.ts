import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import cron from 'node-cron';

import { fileRouter } from './routes/fileRoutes';
import { healthRouter } from './routes/healthRoutes';
import { errorHandler } from './middleware/errorHandler';
import { createUploadsDirectory } from './utils/fileUtils';
import { cleanUploadsFolder } from './utils/cleanup';

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// Access logs middleware
app.use(morgan('combined'));

// CORS configuration
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-upload-id'],
  credentials: true,
}));

// Body parsing middleware
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Create uploads directory if it doesn't exist
createUploadsDirectory();

// Routes
app.use('/api/health', healthRouter);
app.use('/api/files', fileRouter);

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

// Schedule cron job to clean uploads folder every 3 minutes
cron.schedule('*/1 * * * *', () => {
  console.log('🔄 Running scheduled cleanup of uploads folder...');
  cleanUploadsFolder();
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📁 Upload directory: ./uploads`);
  console.log(`🔗 API endpoints:`);
  console.log(`   Health: http://localhost:${PORT}/api/health`);
  console.log(`   Upload: http://localhost:${PORT}/api/files/upload`);
});
