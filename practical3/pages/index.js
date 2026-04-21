import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

export default function Home() {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadResult, setUploadResult] = useState(null);
  const [fileError, setFileError] = useState('');

  const { register, handleSubmit, reset } = useForm();

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setFileError('');
    setUploadResult(null);

    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      if (rejection.errors[0].code === 'file-too-large') {
        setFileError('File is too large. Maximum size is 5MB.');
      } else if (rejection.errors[0].code === 'file-invalid-type') {
        setFileError('Invalid file type. Only JPEG, PNG and PDF allowed.');
      }
      return;
    }

    if (acceptedFiles.length > 0) {
      const droppedFile = acceptedFiles[0];
      setFile(droppedFile);
      if (droppedFile.type.startsWith('image/')) {
        const previewUrl = URL.createObjectURL(droppedFile);
        setFilePreview({ url: previewUrl, name: droppedFile.name, type: droppedFile.type });
      } else if (droppedFile.type === 'application/pdf') {
        setFilePreview({ name: droppedFile.name, type: droppedFile.type });
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [], 'application/pdf': [] },
    maxSize: 5 * 1024 * 1024,
    multiple: false
  });

  const onSubmit = async (data) => {
    if (!file) { setFileError('Please select a file first.'); return; }
    setIsUploading(true);
    setUploadProgress(0);
    setUploadResult(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', data.name || file.name);
      const response = await axios.post('/api/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const percentage = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
          setUploadProgress(percentage);
        }
      });
      setUploadResult({ success: true, message: 'File uploaded successfully!', data: response.data });
    } catch (error) {
      setUploadResult({ success: false, message: error.response?.data?.error || 'Upload failed. Please try again.' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleReset = () => {
    setFile(null); setFilePreview(null); setUploadResult(null);
    setUploadProgress(0); setFileError(''); reset();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: #0a0a0f;
          min-height: 100vh;
        }

        .page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }

        .page::before {
          content: '';
          position: fixed;
          top: -30%;
          left: -20%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        .page::after {
          content: '';
          position: fixed;
          bottom: -20%;
          right: -10%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        .card {
          width: 100%;
          max-width: 480px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 2.5rem;
          backdrop-filter: blur(20px);
          position: relative;
          z-index: 1;
        }

        .header { margin-bottom: 2rem; }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(99,102,241,0.15);
          border: 1px solid rgba(99,102,241,0.3);
          border-radius: 100px;
          padding: 4px 12px;
          font-size: 11px;
          font-weight: 500;
          color: #a5b4fc;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .title {
          font-family: 'Syne', sans-serif;
          font-size: 2rem;
          font-weight: 800;
          color: #f8f8ff;
          line-height: 1.1;
          margin-bottom: 0.4rem;
        }

        .subtitle {
          font-size: 0.875rem;
          color: rgba(255,255,255,0.4);
          font-weight: 300;
        }

        .label {
          display: block;
          font-size: 0.75rem;
          font-weight: 500;
          color: rgba(255,255,255,0.5);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }

        .input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 0.75rem 1rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          color: #f8f8ff;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          margin-bottom: 1.25rem;
        }

        .input::placeholder { color: rgba(255,255,255,0.2); }

        .input:focus {
          border-color: rgba(99,102,241,0.5);
          background: rgba(99,102,241,0.05);
        }

        .dropzone {
          border: 2px dashed rgba(255,255,255,0.12);
          border-radius: 16px;
          padding: 2.5rem 1.5rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.25s ease;
          background: rgba(255,255,255,0.02);
          margin-bottom: 1rem;
        }

        .dropzone:hover, .dropzone.active {
          border-color: rgba(99,102,241,0.6);
          background: rgba(99,102,241,0.05);
        }

        .dropzone-icon {
          width: 52px;
          height: 52px;
          background: rgba(99,102,241,0.15);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          font-size: 1.5rem;
          transition: transform 0.2s;
        }

        .dropzone:hover .dropzone-icon { transform: translateY(-3px); }

        .dropzone-title {
          font-family: 'Syne', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          color: #f8f8ff;
          margin-bottom: 0.25rem;
        }

        .dropzone-sub {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.3);
        }

        .chips {
          display: flex;
          gap: 6px;
          justify-content: center;
          margin-top: 0.75rem;
        }

        .chip {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 100px;
          padding: 2px 10px;
          font-size: 0.7rem;
          color: rgba(255,255,255,0.35);
          font-weight: 500;
        }

        .error-msg {
          font-size: 0.8rem;
          color: #f87171;
          margin-bottom: 0.75rem;
          padding: 0.5rem 0.75rem;
          background: rgba(248,113,113,0.08);
          border-radius: 8px;
          border-left: 3px solid #f87171;
        }

        .preview-box {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 0.75rem;
          margin-bottom: 1rem;
        }

        .preview-label {
          font-size: 0.7rem;
          font-weight: 500;
          color: rgba(255,255,255,0.3);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }

        .preview-img {
          max-width: 100%;
          max-height: 140px;
          border-radius: 8px;
          object-fit: cover;
        }

        .pdf-preview {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0.5rem 0.75rem;
          background: rgba(239,68,68,0.08);
          border-radius: 8px;
          border: 1px solid rgba(239,68,68,0.15);
        }

        .pdf-icon {
          width: 32px;
          height: 32px;
          background: rgba(239,68,68,0.15);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #f87171;
          font-size: 0.8rem;
          font-weight: 700;
          flex-shrink: 0;
        }

        .pdf-name {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.6);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .progress-wrap { margin-bottom: 1rem; }

        .progress-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.4rem;
        }

        .progress-label {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.4);
        }

        .progress-pct {
          font-size: 0.75rem;
          color: #a5b4fc;
          font-weight: 600;
        }

        .progress-track {
          width: 100%;
          height: 4px;
          background: rgba(255,255,255,0.08);
          border-radius: 100px;
          overflow: hidden;
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #6366f1, #ec4899);
          border-radius: 100px;
          transition: width 0.3s ease;
        }

        .result-box {
          border-radius: 12px;
          padding: 1rem;
          margin-bottom: 1rem;
        }

        .result-box.success {
          background: rgba(52,211,153,0.07);
          border: 1px solid rgba(52,211,153,0.2);
        }

        .result-box.error {
          background: rgba(248,113,113,0.07);
          border: 1px solid rgba(248,113,113,0.2);
        }

        .result-title {
          font-family: 'Syne', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .result-box.success .result-title { color: #34d399; }
        .result-box.error .result-title { color: #f87171; }

        .result-meta {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .result-row {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.45);
        }

        .result-link {
          font-size: 0.78rem;
          color: #818cf8;
          text-decoration: none;
          display: inline-block;
          margin-top: 4px;
        }

        .result-link:hover { color: #a5b4fc; text-decoration: underline; }

        .btn-row {
          display: flex;
          gap: 10px;
        }

        .btn-upload {
          flex: 1;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: #fff;
          border: none;
          border-radius: 12px;
          padding: 0.875rem 1.5rem;
          font-family: 'Syne', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
          letter-spacing: 0.02em;
        }

        .btn-upload:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        .btn-upload:disabled { opacity: 0.4; cursor: not-allowed; }

        .btn-reset {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.5);
          border-radius: 12px;
          padding: 0.875rem 1.25rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }

        .btn-reset:hover { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.7); }
      `}</style>

      <main className="page">
        <div className="card">
          <div className="header">
            <div className="badge">⬆ Secure Upload</div>
            <h1 className="title">Drop your file.</h1>
            <p className="subtitle">JPEG, PNG or PDF — up to 5 MB</p>
          </div>

          <label className="label">File label (optional)</label>
          <input
            {...register('name')}
            type="text"
            placeholder="Give your file a name..."
            className="input"
          />

          <div
            {...getRootProps()}
            className={`dropzone${isDragActive ? ' active' : ''}`}
          >
            <input {...getInputProps()} />
            <div className="dropzone-icon">
              {isDragActive ? '🎯' : '📂'}
            </div>
            {isDragActive ? (
              <p className="dropzone-title">Release to drop</p>
            ) : (
              <>
                <p className="dropzone-title">Drag & drop here</p>
                <p className="dropzone-sub">or click to browse your files</p>
                <div className="chips">
                  <span className="chip">JPEG</span>
                  <span className="chip">PNG</span>
                  <span className="chip">PDF</span>
                  <span className="chip">Max 5MB</span>
                </div>
              </>
            )}
          </div>

          {fileError && <div className="error-msg">{fileError}</div>}

          {filePreview && (
            <div className="preview-box">
              <p className="preview-label">Preview</p>
              {filePreview.type.startsWith('image/') ? (
                <img src={filePreview.url} alt={filePreview.name} className="preview-img" />
              ) : (
                <div className="pdf-preview">
                  <div className="pdf-icon">PDF</div>
                  <span className="pdf-name">{filePreview.name}</span>
                </div>
              )}
            </div>
          )}

          {isUploading && (
            <div className="progress-wrap">
              <div className="progress-header">
                <span className="progress-label">Uploading...</span>
                <span className="progress-pct">{uploadProgress}%</span>
              </div>
              <div className="progress-track">
                <div className="progress-bar" style={{ width: `${uploadProgress}%` }} />
              </div>
            </div>
          )}

          {uploadResult && (
            <div className={`result-box ${uploadResult.success ? 'success' : 'error'}`}>
              <p className="result-title">
                {uploadResult.success ? '✓ ' : '✗ '}{uploadResult.message}
              </p>
              {uploadResult.success && uploadResult.data && (
                <div className="result-meta">
                  <span className="result-row">📄 {uploadResult.data.filename}</span>
                  <span className="result-row">📦 {(uploadResult.data.size / 1024).toFixed(1)} KB · {uploadResult.data.mimetype}</span>
                  {uploadResult.data.url && (
                    <a href={uploadResult.data.url} target="_blank" rel="noopener noreferrer" className="result-link">
                      View uploaded file →
                    </a>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="btn-row">
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isUploading || !file}
              className="btn-upload"
            >
              {isUploading ? `Uploading ${uploadProgress}%…` : 'Upload File'}
            </button>
            <button type="button" onClick={handleReset} className="btn-reset">
              Reset
            </button>
          </div>
        </div>
      </main>
    </>
  );
}