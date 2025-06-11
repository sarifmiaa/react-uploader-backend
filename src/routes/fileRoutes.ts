import { Router } from 'express';
import multer from 'multer';
import type { Request, Response, NextFunction } from 'express';
import { uploadStorage, fileFilter } from '../config/multerConfig';

const router = Router();

// Multer configuration
const upload = multer({
  storage: uploadStorage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
    files: 1,
  },
});

// Upload endpoint
router.post('/upload', (req: Request, res: Response, next: NextFunction) => {
  upload.single('file')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      const message =
        err.code === 'LIMIT_FILE_SIZE'
          ? 'File size exceeds 10MB limit'
          : err.code === 'LIMIT_FILE_COUNT'
          ? 'Only one file allowed per upload'
          : `Multer error: ${err.message}`;

      return res.status(400).json({
        success: false,
        message,
      });
    }

    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message || 'Upload failed',
      });
    }

    const file = req.file;
    if (!file) {
      return res.status(400).json({
        success: false,
        message: 'No file provided',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'File uploaded successfully',
      file: {
        filename: file.filename,
        originalName: file.originalname,
        size: file.size,
        mimetype: file.mimetype
      },
    });
  });
});

export { router as fileRouter };
