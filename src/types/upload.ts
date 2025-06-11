export interface UploadProgress {
  uploadId: string;
  filename: string;
  totalSize: number;
  uploadedSize: number;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  startTime: number;
  endTime?: number;
  error?: string;
}

export interface UploadResponse {
  success: boolean;
  message: string;
  uploadId: string;
  file?: {
    filename: string;
    originalName: string;
    size: number;
    mimetype: string;
    path: string;
  };
}

export interface ProgressResponse {
  success: boolean;
  progress?: UploadProgress;
  message?: string;
}