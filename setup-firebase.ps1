# Firebase Environment Setup Helper

Write-Host "🔥 Firebase Environment Setup Helper" -ForegroundColor Red
Write-Host ""

Write-Host "Please follow these steps to get your Firebase configuration:" -ForegroundColor Yellow
Write-Host ""

Write-Host "1. Go to: https://console.firebase.google.com/" -ForegroundColor Cyan
Write-Host "2. Create a new project or select existing one" -ForegroundColor Cyan
Write-Host "3. Click the web icon (</>) to add a web app" -ForegroundColor Cyan
Write-Host "4. Copy the Firebase config object" -ForegroundColor Cyan
Write-Host ""

Write-Host "Once you have your Firebase config, run this script again with your values:" -ForegroundColor Green
Write-Host ""

$apiKey = Read-Host "Enter your Firebase API Key"
$authDomain = Read-Host "Enter your Auth Domain (e.g., project.firebaseapp.com)"
$projectId = Read-Host "Enter your Project ID"
$storageBucket = Read-Host "Enter your Storage Bucket (e.g., project.appspot.com)"
$messagingSenderId = Read-Host "Enter your Messaging Sender ID"
$appId = Read-Host "Enter your App ID"

Write-Host ""
Write-Host "Creating .env file..." -ForegroundColor Yellow

$envContent = @"
VITE_FIREBASE_API_KEY=$apiKey
VITE_FIREBASE_AUTH_DOMAIN=$authDomain
VITE_FIREBASE_PROJECT_ID=$projectId
VITE_FIREBASE_STORAGE_BUCKET=$storageBucket
VITE_FIREBASE_MESSAGING_SENDER_ID=$messagingSenderId
VITE_FIREBASE_APP_ID=$appId
"@

$envContent | Out-File -FilePath ".env" -Encoding UTF8

Write-Host "✅ .env file created successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Enable Authentication in Firebase Console" -ForegroundColor White
Write-Host "2. Enable Firestore Database" -ForegroundColor White
Write-Host "3. Enable Storage" -ForegroundColor White
Write-Host "4. Restart your dev server: npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "🎉 Your Firebase integration is ready!" -ForegroundColor Green
