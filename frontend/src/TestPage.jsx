import React from 'react';

const TestPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🎉 Stock Analysis Dashboard
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          React app is working! Firebase configuration needed.
        </p>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Next Steps:
          </h2>
          <ol className="text-left text-sm text-gray-600 space-y-2">
            <li>1. Set up Firebase project</li>
            <li>2. Add environment variables</li>
            <li>3. Enable Google Auth</li>
            <li>4. Configure Firestore & Storage</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
