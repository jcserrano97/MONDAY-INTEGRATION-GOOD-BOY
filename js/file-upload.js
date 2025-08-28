class FileUpload {
  constructor() {
    this.maxFileSize = 15 * 1024 * 1024; // 15MB
    this.maxFiles = 10;
    this.allowedTypes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/svg+xml',
      'application/pdf'
    ];
    this.uploadedFiles = [];
    this.mondayAPI = null;
    
    // Initialize Monday.com API if available
    if (window.MondayAPI) {
      this.mondayAPI = new MondayAPI();
    }
  }

  init() {
    this.setupDropZone();
    this.setupFileInput();
    this.loadUploadedFiles();
  }

  setupDropZone() {
    const dropZone = document.querySelector('.file-upload');
    if (!dropZone) return;

    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', (e) => {
      e.preventDefault();
      dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('dragover');
      
      const files = Array.from(e.dataTransfer.files);
      this.handleFiles(files);
    });

    dropZone.addEventListener('click', () => {
      const fileInput = document.querySelector('#file-input');
      if (fileInput) {
        fileInput.click();
      }
    });
  }

  setupFileInput() {
    const fileInput = document.querySelector('#file-input');
    if (!fileInput) return;

    fileInput.addEventListener('change', (e) => {
      const files = Array.from(e.target.files);
      this.handleFiles(files);
      // Clear the input so the same file can be selected again if needed
      e.target.value = '';
    });
  }

  async handleFiles(files) {
    // Validate file count
    if (this.uploadedFiles.length + files.length > this.maxFiles) {
      this.showError(`Maximum ${this.maxFiles} files allowed`);
      return;
    }

    // Filter valid files
    const validFiles = files.filter(file => this.validateFile(file));
    
    if (validFiles.length === 0) {
      this.showError('No valid files selected');
      return;
    }

    // Show upload progress
    this.showUploadProgress(validFiles.length);

    // Process files
    const uploadPromises = validFiles.map(file => this.processFile(file));
    
    try {
      await Promise.all(uploadPromises);
      this.showSuccess(`Successfully added ${validFiles.length} file${validFiles.length !== 1 ? 's' : ''}`);
    } catch (error) {
      console.error('Error processing files:', error);
      this.showError('Some files failed to process');
    }

    this.hideUploadProgress();
    this.updateFileList();
    this.saveUploadedFiles();
  }

  validateFile(file) {
    // Check file type
    if (!this.allowedTypes.includes(file.type)) {
      this.showError(`${file.name}: File type not supported. Please upload PNG, JPG, SVG, or PDF files.`);
      return false;
    }

    // Check file size
    if (file.size > this.maxFileSize) {
      this.showError(`${file.name}: File size must be less than 15MB`);
      return false;
    }

    // Check for duplicate names
    if (this.uploadedFiles.some(uploaded => uploaded.name === file.name)) {
      this.showError(`${file.name}: A file with this name has already been uploaded`);
      return false;
    }

    return true;
  }

  async processFile(file) {
    // Create local file reference
    const fileId = `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const fileData = {
      id: fileId,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'processed',
      url: null,
      mondayFileId: null,
      uploadedAt: new Date().toISOString()
    };

    // Create object URL for preview
    if (file.type.startsWith('image/')) {
      fileData.url = URL.createObjectURL(file);
      fileData.preview = true;
    }

    // Store file data temporarily (in a real app, you might upload to a temporary storage)
    fileData.file = file; // Keep reference to actual File object for later upload

    this.uploadedFiles.push(fileData);
    return fileData;
  }

  removeFile(fileId) {
    const fileIndex = this.uploadedFiles.findIndex(f => f.id === fileId);
    if (fileIndex === -1) return;

    const file = this.uploadedFiles[fileIndex];
    
    // Clean up object URL if it exists
    if (file.url && file.preview) {
      URL.revokeObjectURL(file.url);
    }

    // Remove from array
    this.uploadedFiles.splice(fileIndex, 1);
    
    this.updateFileList();
    this.saveUploadedFiles();
    
    this.showSuccess('File removed successfully');
  }

  updateFileList() {
    const fileList = document.querySelector('.uploaded-files') || document.querySelector('#uploaded-files-list');
    if (!fileList) return;

    if (this.uploadedFiles.length === 0) {
      fileList.innerHTML = '<p class="text-secondary">No files uploaded yet</p>';
      return;
    }

    fileList.innerHTML = this.uploadedFiles.map(file => `
      <div class="file-item" data-file-id="${file.id}">
        <div class="file-info">
          <div class="file-icon">${this.getFileIcon(file.type)}</div>
          <div class="file-details">
            <div class="file-name">${file.name}</div>
            <div class="file-meta">
              ${this.formatFileSize(file.size)} • ${this.getFileTypeLabel(file.type)}
              <span class="file-status status-${file.status}">${this.getStatusLabel(file.status)}</span>
            </div>
          </div>
        </div>
        <div class="file-actions">
          ${file.url && file.preview ? `
            <button type="button" class="btn-preview" onclick="window.open('${file.url}', '_blank')">
              Preview
            </button>
          ` : ''}
          <button type="button" class="btn-remove" onclick="window.app?.fileUpload?.removeFile('${file.id}') || removeFile('${file.id}')">
            Remove
          </button>
        </div>
      </div>
    `).join('');

    // Update file count display if it exists
    const fileCount = document.querySelector('.file-count');
    if (fileCount) {
      fileCount.textContent = `${this.uploadedFiles.length} file${this.uploadedFiles.length !== 1 ? 's' : ''} uploaded`;
    }
  }

  loadUploadedFiles() {
    try {
      const savedData = JSON.parse(localStorage.getItem('goodboy-form-data') || '{}');
      if (savedData.uploadedFiles && Array.isArray(savedData.uploadedFiles)) {
        // Filter out any invalid file data and restore what we can
        this.uploadedFiles = savedData.uploadedFiles.filter(file => 
          file && file.id && file.name && file.size && file.type
        );
        this.updateFileList();
      }
    } catch (error) {
      console.error('Error loading uploaded files:', error);
      this.uploadedFiles = [];
    }
  }

  saveUploadedFiles() {
    try {
      const existingData = JSON.parse(localStorage.getItem('goodboy-form-data') || '{}');
      
      // Save file metadata (without the File object which can't be serialized)
      const fileMetadata = this.uploadedFiles.map(file => ({
        id: file.id,
        name: file.name,
        size: file.size,
        type: file.type,
        status: file.status,
        url: file.preview ? null : file.url, // Don't save object URLs
        mondayFileId: file.mondayFileId,
        uploadedAt: file.uploadedAt
      }));

      const updatedData = {
        ...existingData,
        uploadedFiles: fileMetadata
      };

      localStorage.setItem('goodboy-form-data', JSON.stringify(updatedData));
    } catch (error) {
      console.error('Error saving uploaded files:', error);
    }
  }

  showUploadProgress(fileCount) {
    const progressContainer = document.querySelector('.upload-progress');
    if (progressContainer) {
      progressContainer.innerHTML = `
        <div class="progress-bar">
          <div class="progress-fill" style="width: 0%"></div>
        </div>
        <p>Processing ${fileCount} file${fileCount > 1 ? 's' : ''}...</p>
      `;
      progressContainer.style.display = 'block';

      // Simulate progress
      const progressFill = progressContainer.querySelector('.progress-fill');
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        progressFill.style.width = `${Math.min(progress, 90)}%`;
        if (progress >= 90) {
          clearInterval(interval);
        }
      }, 100);
    }
  }

  hideUploadProgress() {
    const progressContainer = document.querySelector('.upload-progress');
    if (progressContainer) {
      const progressFill = progressContainer.querySelector('.progress-fill');
      if (progressFill) {
        progressFill.style.width = '100%';
      }
      
      setTimeout(() => {
        progressContainer.style.display = 'none';
      }, 500);
    }
  }

  // Utility methods
  getFileIcon(type) {
    if (type.startsWith('image/')) return '🖼️';
    if (type === 'application/pdf') return '📄';
    if (type.includes('svg')) return '🎨';
    return '📁';
  }

  getFileTypeLabel(type) {
    const typeMap = {
      'image/png': 'PNG Image',
      'image/jpeg': 'JPEG Image',
      'image/jpg': 'JPG Image',
      'image/svg+xml': 'SVG Vector',
      'application/pdf': 'PDF Document'
    };
    return typeMap[type] || type.split('/').pop().toUpperCase();
  }

  getStatusLabel(status) {
    const statusMap = {
      'processing': 'Processing',
      'processed': 'Ready',
      'uploading': 'Uploading',
      'uploaded': 'Uploaded',
      'failed': 'Failed'
    };
    return statusMap[status] || status;
  }

  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  showError(message) {
    if (window.showAlert) {
      window.showAlert(message, 'error');
    } else if (window.app && window.app.showAlert) {
      window.app.showAlert(message, 'error');
    } else {
      console.error('File Upload Error:', message);
      alert(message);
    }
  }

  showSuccess(message) {
    if (window.showAlert) {
      window.showAlert(message, 'success');
    } else if (window.app && window.app.showAlert) {
      window.app.showAlert(message, 'success');
    } else {
      console.log('File Upload Success:', message);
    }
  }

  // Monday.com integration methods
  async uploadPendingFilesToMonday(mondayItemId) {
    if (!this.mondayAPI) {
      console.warn('Monday.com API not available');
      return;
    }

    const pendingFiles = this.uploadedFiles.filter(f => 
      f.status === 'processed' && f.file && !f.mondayFileId
    );
    
    if (pendingFiles.length === 0) return;

    for (const fileData of pendingFiles) {
      try {
        fileData.status = 'uploading';
        this.updateFileList();

        const mondayFile = await this.mondayAPI.uploadFile(mondayItemId, fileData.file);
        
        fileData.status = 'uploaded';
        fileData.mondayFileId = mondayFile.id;
        fileData.url = mondayFile.url;
        
        // Clean up local file reference
        delete fileData.file;
        if (fileData.preview && fileData.url.startsWith('blob:')) {
          URL.revokeObjectURL(fileData.url);
        }
        
      } catch (error) {
        console.error(`Failed to upload ${fileData.name} to Monday.com:`, error);
        fileData.status = 'failed';
      }
    }

    this.updateFileList();
    this.saveUploadedFiles();
  }

  // Get files ready for submission
  getFilesForSubmission() {
    return this.uploadedFiles.map(file => ({
      id: file.id,
      name: file.name,
      size: file.size,
      type: file.type,
      status: file.status,
      mondayFileId: file.mondayFileId,
      uploadedAt: file.uploadedAt
    }));
  }

  // Clear all files
  clearAllFiles() {
    // Clean up object URLs
    this.uploadedFiles.forEach(file => {
      if (file.url && file.preview) {
        URL.revokeObjectURL(file.url);
      }
    });

    this.uploadedFiles = [];
    this.updateFileList();
    this.saveUploadedFiles();
    
    this.showSuccess('All files cleared');
  }
}

// Make available globally
window.FileUpload = FileUpload;

// Global helper function for removing files (used in HTML onclick)
window.removeFile = function(fileId) {
  if (window.app && window.app.fileUpload) {
    window.app.fileUpload.removeFile(fileId);
  }
};