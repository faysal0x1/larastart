import { useState, useRef, useEffect } from 'react';

const FileUploadComponent = ({ 
  files = [], 
  setFiles, 
  maxFileSize = 5, 
  error = '',
  required = false,
  onChange = null,
  accept = "image/*",
  multiple = true,
  title = "Files",
  previewType = "image",
  className = ""
}) => {
  const fileInputRef = useRef(null);
  
  // Error state management
  const [localError, setLocalError] = useState(error);
  
  // Update local error when prop changes
  useEffect(() => {
    setLocalError(error);
  }, [error]);
  
  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    
    if (newFiles.length === 0) return;
    
    // Validate file sizes
    const oversizedFiles = newFiles.filter(file => file.size > maxFileSize * 1024 * 1024);
    const validFiles = newFiles.filter(file => file.size <= maxFileSize * 1024 * 1024);
    
    if (oversizedFiles.length > 0) {
      setLocalError(`${oversizedFiles.length} file(s) exceeded the ${maxFileSize}MB limit`);
      setTimeout(() => setLocalError(''), 5000); // Clear error after 5 seconds
    } else {
      setLocalError('');
    }
    
    const updatedFiles = multiple ? [...files, ...validFiles] : validFiles;
    
    // Call setFiles handler
    setFiles(updatedFiles);
    
    // Call additional onChange handler if provided
    if (onChange) {
      onChange(updatedFiles);
    }
    
    // Reset input value to allow selecting the same file again
    e.target.value = null;
  };
  
  const removeFile = (index, e) => {
    e.stopPropagation();
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    
    // Call additional onChange handler if provided
    if (onChange) {
      onChange(newFiles);
    }
  };
  
  const renderPreview = (file, index) => {
    if (previewType === "image" && file.type.startsWith("image/")) {
      return (
        <div key={`file-${index}`} className="relative group rounded-lg overflow-hidden bg-gray-100">
          <img
            src={URL.createObjectURL(file)}
            alt={`File ${index + 1}`}
            className="w-full h-28 object-cover"
            onLoad={(e) => URL.revokeObjectURL(e.target.src)} // Clean up object URL after load
          />
          <button
            type="button"
            onClick={(e) => removeFile(index, e)}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Remove file"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs truncate px-2 py-1">
            {file.name}
          </div>
        </div>
      );
    } else {
      // Default file preview for non-images
      return (
        <div key={`file-${index}`} className="relative group rounded-lg overflow-hidden border border-gray-200">
          <div className="flex items-center p-3 bg-gray-50">
            <svg className="h-8 w-8 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-sm truncate flex-1">{file.name}</span>
            <button
              type="button"
              onClick={(e) => removeFile(index, e)}
              className="text-red-500 p-1 ml-2"
              aria-label="Remove file"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      );
    }
  };
  
  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {title}{required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition cursor-pointer ${
            localError ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-400'
          }`}
          onClick={() => fileInputRef.current.click()}
        >
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
          <p className="mt-1 text-sm text-gray-600">
            {multiple ? 'Click to upload files' : 'Click to upload a file'}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            {accept.replace('*', '').toUpperCase().replace(/[/.]/g, '')} up to {maxFileSize}MB
          </p>
          <input
            type="file"
            className="hidden"
            multiple={multiple}
            accept={accept}
            onChange={handleFileUpload}
            ref={fileInputRef}
          />
        </div>
        {localError && (
          <p className="mt-1 text-sm text-red-600">{localError}</p>
        )}
      </div>

      {files.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded files:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {files.map((file, index) => renderPreview(file, index))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadComponent;