# 🚀 Quick Firebase Setup (5 Minutes)

## Current Status: ✅ React App Working
Your website is running at `http://localhost:3000` and showing the test page.

## 🔥 Firebase Integration Steps:

### **Option 1: Quick Setup (Recommended)**
Run the setup script in PowerShell:
```powershell
cd frontend
.\setup-firebase.ps1
```

### **Option 2: Manual Setup**

1. **Create Firebase Project**:
   - Go to: https://console.firebase.google.com/
   - Click "Add Project"
   - Name: `stock-analysis-hackathon`
   - Create project

2. **Add Web App**:
   - Click web icon `</>`
   - App name: `Stock Analysis Dashboard`
   - Click "Register App"
   - **Copy the config object**

3. **Enable Services**:
   - **Authentication**: Enable Google Sign-in
   - **Firestore**: Create database in test mode
   - **Storage**: Create storage bucket in test mode

4. **Create Environment File**:
   Create `frontend/.env` with your Firebase config:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

5. **Restart Dev Server**:
   ```bash
   npm run dev
   ```

## 🎯 What Happens Next:

- **Before Firebase**: Shows test page with setup instructions
- **After Firebase**: Shows full login page with Google Sign-in
- **After Login**: Shows dashboard with CSV upload and real-time results

## 📋 Firebase Services You Need:

✅ **Authentication** - Google Sign-in  
✅ **Firestore** - Real-time database for results  
✅ **Storage** - CSV file uploads  
✅ **Cloud Functions** - Backend processing (optional for demo)  

## 🎉 Ready to Go!

Once you complete the Firebase setup, your app will automatically switch to the full-featured version with all the hackathon functionality!

**Need help?** Check `FIREBASE_SETUP.md` for detailed instructions.
