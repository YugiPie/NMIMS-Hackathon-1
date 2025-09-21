import React, { useState, useRef } from 'react';
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebaseConfig';
import { useAuth } from '../contexts/AuthContext';
import { Upload, FileText, AlertCircle, CheckCircle, Sparkles, Zap } from 'lucide-react';

const FileUploader = ({ onUploadStart, onUploadComplete, onUploadError, uploading }) => {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (!file) return;

    // Validate file type
    if (!file.name.toLowerCase().endsWith('.csv')) {
      setError('Please select a CSV file only.');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB.');
      return;
    }

    setError('');
    setSelectedFile(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      onUploadStart();
      setError('');

      // Get current user ID from auth context
      const userId = user?.uid;
      if (!userId) {
        setError('User not authenticated. Please sign in again.');
        onUploadError();
        return;
      }
      
      // Read CSV file content
      const csvContent = await readFileAsText(selectedFile);
      
      // Upload to Firebase Storage
      const fileName = `${Date.now()}-${selectedFile.name}`;
      const fileRef = ref(storage, `portfolios/${userId}/${fileName}`);
      await uploadBytes(fileRef, selectedFile);
      
      console.log('File uploaded successfully:', fileName);
      
      // Send to n8n webhook for analysis
      await sendToN8n(userId, csvContent);
      
      onUploadComplete();
      setSelectedFile(null);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      // Show success message
      setError('');
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload file. Please try again.');
      onUploadError();
    }
  };

  // Helper function to read file as text
  const readFileAsText = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    });
  };

  // Send CSV data to n8n webhook
  const sendToN8n = async (userId, csvData) => {
    try {
      // Get n8n webhook URL from environment or use a default
      const n8nWebhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://your-n8n-instance.com/webhook/your-webhook-id';
      
      if (n8nWebhookUrl === 'https://your-n8n-instance.com/webhook/your-webhook-id') {
        console.log('n8n webhook URL not configured, skipping n8n integration');
        return;
      }

      const payload = {
        userId: userId,
        csvData: csvData,
        timestamp: new Date().toISOString()
      };

      console.log('Sending to n8n webhook:', n8nWebhookUrl);
      
      const response = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`n8n webhook failed: ${response.status}`);
      }

      const result = await response.json();
      console.log('n8n webhook response:', result);
      
    } catch (error) {
      console.error('n8n webhook error:', error);
      // Don't throw error here - let the upload complete even if n8n fails
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="h-6 w-6 text-yellow-500 mr-2" />
          <h3 className="text-2xl font-bold text-gray-900">
            Upload Portfolio CSV
          </h3>
          <Sparkles className="h-6 w-6 text-yellow-500 ml-2" />
        </div>
        <p className="text-lg text-gray-600 mb-6">
          Upload a CSV file containing your stock portfolio. Get instant AI-powered analysis of market sentiment and impact scores.
        </p>
        
        {/* Sample file info */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
          <p className="text-sm text-blue-800 font-medium mb-2">📋 Expected CSV Format:</p>
          <div className="text-xs text-blue-700 font-mono bg-white/50 rounded p-2">
            ticker,shares,price,value<br/>
            AAPL,50,150.25,7512.50<br/>
            GOOGL,10,2800.00,28000.00
          </div>
        </div>
      </div>

      {/* Enhanced File Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
          dragActive
            ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 scale-105 shadow-xl'
            : 'border-gray-300 hover:border-blue-400 hover:bg-gradient-to-br hover:from-gray-50 hover:to-blue-50'
        } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={uploading}
        />
        
        <div className="space-y-6">
          <div className="mx-auto h-16 w-16 text-gray-400">
            {selectedFile ? (
              <div className="h-full w-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
            ) : (
              <div className="h-full w-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                <Upload className="h-8 w-8 text-white" />
              </div>
            )}
          </div>
          
          <div>
            <p className="text-xl font-semibold text-gray-900 mb-2">
              {selectedFile ? (
                <span className="text-green-600">✓ {selectedFile.name}</span>
              ) : (
                'Drop your CSV file here'
              )}
            </p>
            <p className="text-sm text-gray-600">
              {selectedFile ? 'Ready to upload!' : 'or click to browse files'}
            </p>
          </div>

          {selectedFile && (
            <div className="flex items-center justify-center space-x-3 text-sm text-gray-600 bg-white/50 rounded-xl p-3">
              <FileText className="h-5 w-5 text-blue-500" />
              <span className="font-medium">{formatFileSize(selectedFile.size)}</span>
              <span className="text-gray-400">•</span>
              <span className="text-green-600 font-medium">Valid CSV</span>
            </div>
          )}

          {!selectedFile && (
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
              <span>📊 Supports CSV files</span>
              <span>•</span>
              <span>🔒 Secure upload</span>
              <span>•</span>
              <span>⚡ Instant analysis</span>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Error Message */}
      {error && (
        <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl p-4 bounce-in">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
            <p className="text-sm text-red-700 font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* Enhanced Upload Button */}
      <div className="flex justify-center">
        <button
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center space-x-3">
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>Uploading & Analyzing...</span>
              </>
            ) : selectedFile ? (
              <>
                <Zap className="h-5 w-5" />
                <span>Upload & Analyze Portfolio</span>
              </>
            ) : (
              <>
                <Upload className="h-5 w-5" />
                <span>Select File First</span>
              </>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default FileUploader;
