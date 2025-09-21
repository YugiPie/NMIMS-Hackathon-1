import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { TrendingUp, LogIn, Sparkles, BarChart3, Shield, Zap } from 'lucide-react';

const LoginPage = () => {
  const { signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      await signInWithGoogle();
    } catch (error) {
      setError('Failed to sign in. Please try again.');
      console.error('Sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200/30 rounded-full floating-animation"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-indigo-200/30 rounded-full floating-animation" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 left-40 w-28 h-28 bg-purple-200/30 rounded-full floating-animation" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 bg-pink-200/30 rounded-full floating-animation" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 max-w-md w-full space-y-8 p-8">
        {/* Header with enhanced design */}
        <div className="text-center fade-in">
          <div className="mx-auto h-20 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl bounce-in">
            <TrendingUp className="h-10 w-10 text-white" />
          </div>
          <h1 className="mt-6 text-4xl font-bold gradient-text">
            Stock Analysis Dashboard
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Upload your portfolio CSV and get real-time financial news analysis
          </p>
        </div>

        {/* Features preview */}
        <div className="grid grid-cols-3 gap-4 slide-up">
          <div className="text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20">
            <BarChart3 className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="text-xs text-gray-600">Real-time Analysis</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20">
            <Shield className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-xs text-gray-600">Secure Upload</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20">
            <Zap className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <p className="text-xs text-gray-600">Instant Results</p>
          </div>
        </div>

        {/* Login card with enhanced design */}
        <div className="card card-hover">
          <div className="space-y-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="h-5 w-5 text-yellow-500 mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Welcome to the Future of Portfolio Analysis
                </h3>
                <Sparkles className="h-5 w-5 text-yellow-500 ml-2" />
              </div>
              <p className="text-sm text-gray-600">
                Sign in with your Google account to access advanced AI-powered financial insights
              </p>
            </div>

            {error && (
              <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl p-4 bounce-in">
                <p className="text-sm text-red-600 text-center">{error}</p>
              </div>
            )}

            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full btn-primary group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center">
                {loading ? (
                  <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Signing you in...</span>
                  </div>
                ) : (
                  <>
                    <LogIn className="h-5 w-5 mr-3" />
                    <span>Sign in with Google</span>
                  </>
                )}
              </div>
            </button>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                🔒 Your data is encrypted and secure
              </p>
            </div>
          </div>
        </div>

        {/* Footer with enhanced design */}
        <div className="text-center fade-in">
          <p className="text-xs text-gray-500">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
          <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-400">
            <span>🚀 Powered by AI</span>
            <span>•</span>
            <span>⚡ Real-time Updates</span>
            <span>•</span>
            <span>🎯 Smart Analysis</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
