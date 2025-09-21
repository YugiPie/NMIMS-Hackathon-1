# 🚀 Quick Start Guide

## Prerequisites
- Node.js 18+ installed
- Firebase CLI installed (`npm install -g firebase-tools`)
- Firebase project created
- n8n instance with webhook endpoint

## 1. Firebase Setup (5 minutes)

```bash
# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init
# Select: Functions, Firestore, Storage, Emulators
```

## 2. Environment Setup (2 minutes)

Create `frontend/.env`:
```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 3. Install Dependencies (1 minute)

```bash
# Install all dependencies
npm run install-all
```

## 4. Configure n8n Webhook (1 minute)

```bash
firebase functions:config:set n8n.webhook_url="https://your-n8n-instance.com/webhook/your-webhook-id"
```

## 5. Start Development (30 seconds)

```bash
# Start Firebase emulators
firebase emulators:start

# In another terminal, start frontend
cd frontend && npm run dev
```

## 6. Test the Application

1. Open http://localhost:3000
2. Sign in with Google
3. Upload `sample-portfolio.csv`
4. Watch real-time analysis results appear!

## 🎯 Key Features Implemented

✅ **Google Authentication** - Secure login with Firebase Auth  
✅ **CSV Upload** - Drag-and-drop file upload to Firebase Storage  
✅ **Real-time Updates** - Live Firestore listeners for instant results  
✅ **Modern UI** - Clean React + Tailwind CSS interface  
✅ **Serverless Backend** - Firebase Cloud Functions for processing  
✅ **n8n Integration** - Webhook-based workflow triggering  
✅ **Security Rules** - User-specific data isolation  

## 📁 Project Structure

```
├── frontend/           # React app (Vite + Tailwind)
├── functions/          # Firebase Cloud Functions
├── firebase.json       # Firebase configuration
├── firestore.rules     # Database security rules
├── storage.rules       # Storage security rules
└── sample-portfolio.csv # Test data
```

## 🔧 Cloud Functions

- `processPortfolioCSV` - Auto-triggered on CSV upload
- `manualProcessCSV` - Manual processing endpoint
- `receiveAnalysisResults` - Receives n8n results

## 🚀 Deployment

```bash
# Deploy everything
./deploy.ps1  # Windows PowerShell
# or
./deploy.sh   # Unix/Linux/Mac
```

## 📊 Expected n8n Response Format

```json
{
  "userId": "user123",
  "results": [
    {
      "ticker": "AAPL",
      "headline": "Apple Reports Strong Q4 Earnings",
      "source": "Financial Times",
      "article_url": "https://example.com/article",
      "analysis": {
        "summary": "Positive earnings report with strong revenue growth",
        "sentiment": "Positive",
        "impact_score": 85,
        "reasoning": "Revenue exceeded expectations by 15%"
      }
    }
  ]
}
```

## 🎉 You're Ready!

Your full-stack serverless stock analysis application is now complete and ready for your hackathon presentation!
