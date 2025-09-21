# 🔗 Complete n8n Integration Setup

## 🎯 What We've Implemented

✅ **Direct Frontend Integration** - CSV upload now sends data directly to n8n webhook
✅ **Firebase Storage** - Files are still stored in Firebase Storage
✅ **Error Handling** - Graceful fallback if n8n is unavailable
✅ **Environment Configuration** - Easy webhook URL setup

## 🚀 Quick Setup (5 minutes)

### Step 1: Get Your n8n Webhook URL

1. **Go to your n8n instance** (e.g., https://your-n8n-instance.com)
2. **Create a new workflow**
3. **Add a "Webhook" node**
4. **Copy the webhook URL** (looks like: `https://your-n8n-instance.com/webhook/abc123`)

### Step 2: Configure Environment Variable

Add to your `frontend/.env` file:
```env
VITE_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/your-webhook-id
```

### Step 3: Create n8n Workflow

Here's the complete workflow structure:

#### Node 1: Webhook (Trigger)
- **Node Type**: Webhook
- **HTTP Method**: POST
- **Path**: `/webhook/your-webhook-id`
- **Response**: JSON

#### Node 2: Parse CSV Data
- **Node Type**: Code
- **Language**: JavaScript
```javascript
// Parse CSV data
const csvData = $input.first().json.csvData;
const userId = $input.first().json.userId;

// Split CSV into rows
const rows = csvData.split('\n').filter(row => row.trim());
const headers = rows[0].split(',');

// Extract ticker symbols
const tickers = [];
for (let i = 1; i < rows.length; i++) {
  const values = rows[i].split(',');
  const ticker = values[0]?.trim();
  if (ticker) {
    tickers.push(ticker);
  }
}

return {
  userId: userId,
  tickers: tickers,
  csvData: csvData,
  timestamp: new Date().toISOString()
};
```

#### Node 3: Get Financial News (for each ticker)
- **Node Type**: HTTP Request
- **Method**: GET
- **URL**: `https://api.example.com/news/{{$json.ticker}}`
- **Or use**: Alpha Vantage, Yahoo Finance, or any financial news API

#### Node 4: Analyze Sentiment
- **Node Type**: Code
- **Language**: JavaScript
```javascript
// Simple sentiment analysis (replace with AI service)
const newsData = $input.all();

const results = newsData.map(item => {
  const ticker = item.json.ticker;
  const headline = item.json.headline || 'Sample headline';
  const content = item.json.content || headline;
  
  // Simple sentiment analysis
  const positiveWords = ['strong', 'growth', 'profit', 'increase', 'up', 'rise'];
  const negativeWords = ['decline', 'loss', 'down', 'fall', 'weak', 'decrease'];
  
  let sentiment = 'Neutral';
  let impactScore = 50;
  
  const lowerContent = content.toLowerCase();
  const positiveCount = positiveWords.filter(word => lowerContent.includes(word)).length;
  const negativeCount = negativeWords.filter(word => lowerContent.includes(word)).length;
  
  if (positiveCount > negativeCount) {
    sentiment = 'Positive';
    impactScore = 60 + (positiveCount * 10);
  } else if (negativeCount > positiveCount) {
    sentiment = 'Negative';
    impactScore = 40 - (negativeCount * 10);
  }
  
  return {
    ticker: ticker,
    headline: headline,
    source: 'Financial News API',
    article_url: item.json.url || '#',
    analysis: {
      summary: `Analysis for ${ticker}: ${sentiment} sentiment detected`,
      sentiment: sentiment,
      impact_score: Math.max(0, Math.min(100, impactScore)),
      reasoning: `Based on ${positiveCount} positive and ${negativeCount} negative indicators`
    }
  };
});

return results;
```

#### Node 5: Send Results to Firebase
- **Node Type**: HTTP Request
- **Method**: POST
- **URL**: `https://us-central1-hackathon-4c912.cloudfunctions.net/receiveAnalysisResults`
- **Headers**: 
  - `Content-Type: application/json`
- **Body**:
```json
{
  "userId": "{{$('Parse CSV').item.json.userId}}",
  "results": "{{$json}}"
}
```

## 🔧 Alternative: Use Mock Data

If you don't have access to financial news APIs, use this mock data node:

#### Mock Analysis Node
- **Node Type**: Code
- **Language**: JavaScript
```javascript
const userId = $input.first().json.userId;
const tickers = $input.first().json.tickers;

const mockResults = tickers.map(ticker => ({
  ticker: ticker,
  headline: `${ticker} Reports Strong Q4 Performance`,
  source: 'Financial Times',
  article_url: `https://example.com/news/${ticker}`,
  analysis: {
    summary: `${ticker} shows positive momentum with strong fundamentals`,
    sentiment: Math.random() > 0.5 ? 'Positive' : 'Neutral',
    impact_score: Math.floor(Math.random() * 40) + 60,
    reasoning: 'Based on recent market analysis and company performance'
  }
}));

return {
  userId: userId,
  results: mockResults
};
```

## 🎯 Testing Your Integration

1. **Upload a CSV file** in your app
2. **Check browser console** for n8n webhook calls
3. **Check n8n workflow** for execution logs
4. **Check Firebase Firestore** for stored results
5. **Refresh your app** to see real-time results

## 🚀 Production Enhancements

### Add Real Financial APIs:
- **Alpha Vantage**: Free financial data API
- **Yahoo Finance**: Unofficial API
- **NewsAPI**: Financial news
- **OpenAI API**: For sentiment analysis

### Add Error Handling:
- Retry failed requests
- Fallback to mock data
- User notifications

### Add Caching:
- Cache news data
- Rate limiting
- Data freshness

## 🎉 You're Ready!

Your n8n integration is now complete! The workflow will:
1. ✅ Receive CSV data from your app
2. ✅ Parse ticker symbols
3. ✅ Fetch financial news
4. ✅ Analyze sentiment
5. ✅ Store results in Firebase
6. ✅ Display in real-time on your app

**Your hackathon project now has full n8n integration!** 🏆
