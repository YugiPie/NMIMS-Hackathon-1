#!/bin/bash

# Stock Analysis Dashboard Deployment Script

echo "🚀 Starting deployment process..."

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI is not installed. Please install it first:"
    echo "npm install -g firebase-tools"
    exit 1
fi

# Check if user is logged in to Firebase
if ! firebase projects:list &> /dev/null; then
    echo "❌ Please login to Firebase first:"
    echo "firebase login"
    exit 1
fi

echo "📦 Installing dependencies..."

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

# Install functions dependencies
echo "Installing functions dependencies..."
cd ../functions
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install functions dependencies"
    exit 1
fi

cd ..

echo "🔧 Building frontend..."
cd frontend
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed"
    exit 1
fi
cd ..

echo "🚀 Deploying Firebase Functions..."
firebase deploy --only functions
if [ $? -ne 0 ]; then
    echo "❌ Functions deployment failed"
    exit 1
fi

echo "🛡️ Deploying security rules..."
firebase deploy --only firestore:rules,storage:rules
if [ $? -ne 0 ]; then
    echo "❌ Security rules deployment failed"
    exit 1
fi

echo "✅ Deployment completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Deploy your frontend to a hosting platform (Vercel, Netlify, etc.)"
echo "2. Configure your n8n webhook URL:"
echo "   firebase functions:config:set n8n.webhook_url=\"https://your-n8n-instance.com/webhook/your-webhook-id\""
echo "3. Test the application with the sample CSV file"
echo ""
echo "🎉 Your Stock Analysis Dashboard is ready!"
