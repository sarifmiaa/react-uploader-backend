import fs from 'fs';
import path from 'path';

export const createUploadsDirectory = (): void => {
  const uploadsDir = path.join(process.cwd(), 'uploads');
  
  if (!fs.existsSync(uploadsDir)) {
    try {
      fs.mkdirSync(uploadsDir, { recursive: true });
      console.log('📁 Created uploads directory:', uploadsDir);
    } catch (error) {
      console.error('❌ Failed to create uploads directory:', error);
      process.exit(1);
    }
  } else {
    console.log('📁 Uploads directory already exists:', uploadsDir);
  }
};

export const getFileStats = (filePath: string) => {
  try {
    return fs.statSync(filePath);
  } catch (error) {
    return null;
  }
};

export const deleteFile = (filePath: string): boolean => {
  try {
    fs.unlinkSync(filePath);
    return true;
  } catch (error) {
    console.error('Failed to delete file:', error);
    return false;
  }
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};