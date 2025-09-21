import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import FileUploader from '../components/FileUploader';
import ResultsDisplay from '../components/ResultsDisplay';
import { LogOut, User, Upload, TrendingUp, BarChart3, Activity, Sparkles } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleUploadStart = () => {
    setUploading(true);
    setUploadSuccess(false);
  };

  const handleUploadComplete = () => {
    setUploading(false);
    setUploadSuccess(true);
    // Reset success message after 3 seconds
    setTimeout(() => setUploadSuccess(false), 3000);
  };

  const handleUploadError = () => {
    setUploading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Enhanced Header */}
      <header className="glass-effect border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">
                  Stock Analysis Dashboard
                </h1>
                <p className="text-sm text-gray-600">AI-Powered Portfolio Insights</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3 bg-white/50 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                <div className="h-8 w-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {user?.displayName?.split(' ')[0] || 'User'}
                  </p>
                  <p className="text-xs text-gray-500">Portfolio Analyst</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-all duration-300 bg-white/50 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20 hover:bg-white/70"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {/* Enhanced Welcome Section */}
          <div className="text-center fade-in">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="h-6 w-6 text-yellow-500 mr-3" />
              <h2 className="text-4xl font-bold text-gray-900">
                Welcome back, {user?.displayName?.split(' ')[0] || 'User'}!
              </h2>
              <Sparkles className="h-6 w-6 text-yellow-500 ml-3" />
            </div>
            <p className="text-xl text-gray-600 mb-8">
              Upload your stock portfolio CSV to get real-time financial news analysis powered by AI
            </p>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              <div className="card card-hover text-center">
                <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Analysis</h3>
                <p className="text-sm text-gray-600">Get instant insights on your portfolio performance</p>
              </div>
              <div className="card card-hover text-center">
                <Activity className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Sentiment</h3>
                <p className="text-sm text-gray-600">AI-powered sentiment analysis of market news</p>
              </div>
              <div className="card card-hover text-center">
                <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Impact Scoring</h3>
                <p className="text-sm text-gray-600">Quantified impact scores for each analysis</p>
              </div>
            </div>
          </div>

          {/* Enhanced Upload Success Message */}
          {uploadSuccess && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 bounce-in">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                    <Upload className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-green-800">
                    🎉 File uploaded successfully!
                  </h3>
                  <p className="text-sm text-green-600">
                    Analysis is in progress... Results will appear below in real-time
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced File Upload Section */}
          <div className="card card-hover slide-up">
            <FileUploader
              onUploadStart={handleUploadStart}
              onUploadComplete={handleUploadComplete}
              onUploadError={handleUploadError}
              uploading={uploading}
            />
          </div>

          {/* Enhanced Results Section */}
          <div className="card card-hover slide-up">
            <ResultsDisplay userId={user?.uid} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
