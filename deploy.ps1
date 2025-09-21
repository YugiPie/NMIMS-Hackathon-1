# Stock Analysis Dashboard Deployment Script (PowerShell)

Write-Host "🚀 Starting deployment process..." -ForegroundColor Green

# Check if Firebase CLI is installed
try {
    firebase --version | Out-Null
} catch {
    Write-Host "❌ Firebase CLI is not installed. Please install it first:" -ForegroundColor Red
    Write-Host "npm install -g firebase-tools" -ForegroundColor Yellow
    exit 1
}

# Check if user is logged in to Firebase
try {
    firebase projects:list | Out-Null
} catch {
    Write-Host "❌ Please login to Firebase first:" -ForegroundColor Red
    Write-Host "firebase login" -ForegroundColor Yellow
    exit 1
}

Write-Host "📦 Installing dependencies..." -ForegroundColor Blue

# Install frontend dependencies
Write-Host "Installing frontend dependencies..." -ForegroundColor Cyan
Set-Location frontend
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install frontend dependencies" -ForegroundColor Red
    exit 1
}

# Install functions dependencies
Write-Host "Installing functions dependencies..." -ForegroundColor Cyan
Set-Location ../functions
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install functions dependencies" -ForegroundColor Red
    exit 1
}

Set-Location ..

Write-Host "🔧 Building frontend..." -ForegroundColor Blue
Set-Location frontend
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Frontend build failed" -ForegroundColor Red
    exit 1
}
Set-Location ..

Write-Host "🚀 Deploying Firebase Functions..." -ForegroundColor Blue
firebase deploy --only functions
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Functions deployment failed" -ForegroundColor Red
    exit 1
}

Write-Host "🛡️ Deploying security rules..." -ForegroundColor Blue
firebase deploy --only firestore:rules,storage:rules
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Security rules deployment failed" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Deployment completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Yellow
Write-Host "1. Deploy your frontend to a hosting platform (Vercel, Netlify, etc.)" -ForegroundColor White
Write-Host "2. Configure your n8n webhook URL:" -ForegroundColor White
Write-Host "   firebase functions:config:set n8n.webhook_url=`"https://your-n8n-instance.com/webhook/your-webhook-id`"" -ForegroundColor Gray
Write-Host "3. Test the application with the sample CSV file" -ForegroundColor White
Write-Host ""
Write-Host "🎉 Your Stock Analysis Dashboard is ready!" -ForegroundColor Green
