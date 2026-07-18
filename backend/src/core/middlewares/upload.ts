import multer from 'multer';
import { ValidationError } from '../errors';

// Use memory storage for processing text files quickly without touching disk
const storage = multer.memoryStorage();

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimeTypes = ['text/plain', 'text/markdown'];
  const allowedExtensions = /\.(txt|md)$/i;

  const isMimeTypeAllowed = allowedMimeTypes.includes(file.mimetype) || file.mimetype === 'application/octet-stream';
  const isExtensionAllowed = allowedExtensions.test(file.originalname);

  if (isMimeTypeAllowed && isExtensionAllowed) {
    cb(null, true);
  } else {
    cb(new ValidationError('Invalid file type. Only .txt and .md files are allowed.') as any);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});
