import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Go two levels up from /src/utils to project root, then into uploads
const UPLOAD_DIR = path.join(__dirname, '..', '..', 'uploads');

export function cleanUploadsFolder() {
  fs.readdir(UPLOAD_DIR, (err, files) => {
    if (err) {
      console.error('Failed to read upload directory:', err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(UPLOAD_DIR, file);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Failed to delete file:', filePath, err);
        } else {
          console.log('Deleted file:', filePath);
        }
      });
    });
  });
}
