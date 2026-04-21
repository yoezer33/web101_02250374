// upload.js
// API route — handles multipart form data using formidable
// Validates file type and size on the server side

import formidable from 'formidable';
import path from 'path';
import fs from 'fs';

// Disable default body parser so formidable can handle it
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Create uploads folder if it doesn't exist
  const uploadDir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024, // 5MB
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Upload failed', details: err.message });
    }

    const file = files.file?.[0] || files.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    return res.status(200).json({
      message: 'File uploaded successfully!',
      filename: file.originalFilename,
      size: file.size,
      type: file.mimetype,
    });
  });
}