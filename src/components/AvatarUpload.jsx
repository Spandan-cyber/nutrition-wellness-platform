import { useState, useRef } from 'react';
import './AvatarUpload.css';

const AvatarUpload = ({ currentImage, onImageChange, userName }) => {
  const [preview, setPreview] = useState(currentImage || null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target.result;
        setPreview(imageData);
        localStorage.setItem('userAvatar', imageData);
        onImageChange(imageData);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file');
    }
  };

  // Handle file input change
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // Handle click on avatar
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // Get initials from name
  const getInitials = (name) => {
    return name
      ? name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2)
      : 'U';
  };

  return (
    <div className="avatar-upload-container">
      <div
        className={`avatar-upload-area ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleAvatarClick}
      >
        {preview ? (
          <img src={preview} alt="User Avatar" className="avatar-image" />
        ) : (
          <div className="default-avatar">
            <svg
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              className="line-art-avatar"
            >
              {/* Head */}
              <circle cx="50" cy="30" r="15" fill="none" stroke="#10b981" strokeWidth="2" />

              {/* Body */}
              <path
                d="M 50 45 L 50 70"
                stroke="#10b981"
                strokeWidth="2"
                fill="none"
              />

              {/* Left Arm */}
              <path
                d="M 50 50 L 30 60"
                stroke="#10b981"
                strokeWidth="2"
                fill="none"
              />

              {/* Right Arm */}
              <path
                d="M 50 50 L 70 60"
                stroke="#10b981"
                strokeWidth="2"
                fill="none"
              />

              {/* Left Leg */}
              <path
                d="M 50 70 L 40 90"
                stroke="#10b981"
                strokeWidth="2"
                fill="none"
              />

              {/* Right Leg */}
              <path
                d="M 50 70 L 60 90"
                stroke="#10b981"
                strokeWidth="2"
                fill="none"
              />

              {/* Eyes */}
              <circle cx="45" cy="27" r="2" fill="#10b981" />
              <circle cx="55" cy="27" r="2" fill="#10b981" />

              {/* Smile */}
              <path
                d="M 45 32 Q 50 34 55 32"
                stroke="#10b981"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
            <p className="avatar-placeholder-text">
              {getInitials(userName)}
            </p>
          </div>
        )}

        <div className="avatar-overlay">
          <span className="upload-icon">📷</span>
          <p className="upload-text">
            {preview ? 'Change Avatar' : 'Upload Avatar'}
          </p>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
      />

      <p className="upload-hint">
        Click or drag an image to upload. Supports JPG, PNG, GIF, WebP
      </p>

      {preview && (
        <button
          className="remove-avatar-btn"
          onClick={() => {
            setPreview(null);
            localStorage.removeItem('userAvatar');
            onImageChange(null);
          }}
        >
          Remove Avatar
        </button>
      )}
    </div>
  );
};

export default AvatarUpload;
