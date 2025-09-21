# Firebase Setup Checklist

## ✅ Step 1: Create Firebase Project
- [ ] Go to https://console.firebase.google.com/
- [ ] Click "Add Project"
- [ ] Enter project name: "stock-analysis-hackathon"
- [ ] Create project

## ✅ Step 2: Add Web App
- [ ] Click web icon `</>` in project dashboard
- [ ] Enter app nickname: "Stock Analysis Dashboard"
- [ ] Click "Register App"
- [ ] Copy the Firebase config object

## ✅ Step 3: Enable Authentication
- [ ] Go to "Authentication" in left sidebar
- [ ] Click "Get Started"
- [ ] Go to "Sign-in method" tab
- [ ] Enable "Google" provider
- [ ] Add your email as project support email
- [ ] Save

## ✅ Step 4: Enable Firestore Database
- [ ] Go to "Firestore Database" in left sidebar
- [ ] Click "Create Database"
- [ ] Choose "Start in test mode" (for hackathon)
- [ ] Select location closest to you
- [ ] Click "Done"

## ✅ Step 5: Enable Storage
- [ ] Go to "Storage" in left sidebar
- [ ] Click "Get Started"
- [ ] Choose "Start in test mode" (for hackathon)
- [ ] Select same location as Firestore
- [ ] Click "Done"

## ✅ Step 6: Get Your Config
After completing steps 1-5, you'll have a config object like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

## ✅ Step 7: Update Environment Variables
Create a file called `.env` in the frontend folder with:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Replace the values with your actual Firebase config values.

## ✅ Step 8: Test Integration
- [ ] Restart your dev server: `npm run dev`
- [ ] Open http://localhost:3000
- [ ] You should see the login page instead of the test page
- [ ] Try signing in with Google

## 🎉 You're Done!
Your Firebase integration is complete and ready for the hackathon!
