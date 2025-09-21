const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
admin.initializeApp();

/**
 * HTTP Cloud Function to receive analysis results from n8n
 * This function can be called directly from n8n workflows
 */
exports.receiveAnalysisResults = functions.https.onRequest(async (req, res) => {
  // Set CORS headers
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }
  
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }
  
  try {
    const { userId, results } = req.body;
    
    if (!userId || !results) {
      res.status(400).send('Missing userId or results');
      return;
    }
    
    console.log('Received analysis results for user:', userId);
    console.log('Number of results:', results.length);
    
    // Store results in Firestore
    const db = admin.firestore();
    const resultsRef = db.collection('analysis_results').doc(userId);
    
    await resultsRef.set({
      results: results,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      processedAt: new Date().toISOString()
    });
    
    console.log('Analysis results stored in Firestore for user:', userId);
    
    res.status(200).json({
      success: true,
      userId,
      resultsCount: results.length,
      message: 'Results stored successfully'
    });
    
  } catch (error) {
    console.error('Error storing analysis results:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});