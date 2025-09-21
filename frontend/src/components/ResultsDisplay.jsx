import React, { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { TrendingUp, TrendingDown, Minus, ExternalLink, Clock, Play, Sparkles, BarChart3, Activity, Zap } from 'lucide-react';

const ResultsDisplay = ({ userId }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [simulating, setSimulating] = useState(false);

  useEffect(() => {
    if (!userId) return;

    // Set up real-time listener for user's analysis results
    const resultsRef = doc(db, 'analysis_results', userId);
    
    const unsubscribe = onSnapshot(
      resultsRef,
      (doc) => {
        setLoading(false);
        if (doc.exists()) {
          const data = doc.data();
          setResults(data.results || []);
          setError('');
        } else {
          setResults([]);
          setError('');
        }
      },
      (error) => {
        console.error('Error listening to results:', error);
        setLoading(false);
        setError('Failed to load analysis results. Make sure Firestore is enabled.');
      }
    );

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [userId]);

  // Mock analysis function for testing
  const simulateAnalysis = async () => {
    if (!userId) return;
    
    setSimulating(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock analysis results
    const mockResults = [
      {
        ticker: "AAPL",
        headline: "Apple Reports Strong Q4 Earnings with Record Revenue",
        source: "Financial Times",
        article_url: "https://example.com/apple-earnings",
        analysis: {
          summary: "Apple exceeded expectations with strong iPhone sales and services growth driving record quarterly revenue.",
          sentiment: "Positive",
          impact_score: 85,
          reasoning: "Revenue growth of 15% year-over-year and strong guidance for next quarter indicate continued momentum."
        }
      },
      {
        ticker: "GOOGL",
        headline: "Google Faces Regulatory Challenges in EU Market",
        source: "Reuters",
        article_url: "https://example.com/google-regulation",
        analysis: {
          summary: "New EU regulations could impact Google's advertising revenue and market position in Europe.",
          sentiment: "Negative",
          impact_score: 65,
          reasoning: "Regulatory headwinds may require significant changes to business model and could affect profitability."
        }
      },
      {
        ticker: "MSFT",
        headline: "Microsoft Azure Growth Accelerates in Cloud Computing Race",
        source: "Bloomberg",
        article_url: "https://example.com/microsoft-azure",
        analysis: {
          summary: "Microsoft's Azure platform shows strong growth, gaining market share in competitive cloud computing sector.",
          sentiment: "Positive",
          impact_score: 78,
          reasoning: "Consistent growth in cloud services and enterprise adoption driving revenue expansion."
        }
      }
    ];
    
    // Store results in Firestore
    try {
      const resultsRef = doc(db, 'analysis_results', userId);
      await setDoc(resultsRef, {
        results: mockResults,
        timestamp: new Date(),
        processedAt: new Date().toISOString()
      });
      
      console.log('Mock analysis results stored successfully');
    } catch (error) {
      console.error('Error storing mock results:', error);
      setError('Failed to store analysis results. Make sure Firestore is enabled.');
    }
    
    setSimulating(false);
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive':
        return <TrendingUp className="h-4 w-4" />;
      case 'negative':
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <Minus className="h-4 w-4" />;
    }
  };

  const getSentimentClass = (sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive':
        return 'sentiment-positive';
      case 'negative':
        return 'sentiment-negative';
      default:
        return 'sentiment-neutral';
    }
  };

  const getImpactColor = (score) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-6 w-6 text-yellow-500 mr-2" />
            <h3 className="text-2xl font-bold text-gray-900">
              Analysis Results
            </h3>
            <Sparkles className="h-6 w-6 text-yellow-500 ml-2" />
          </div>
          <p className="text-lg text-gray-600">
            Real-time financial news analysis for your portfolio
          </p>
        </div>
        
        <div className="flex items-center justify-center py-16">
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-lg font-semibold text-gray-700">Loading analysis results...</p>
              <p className="text-sm text-gray-500">Preparing your portfolio insights</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-6 w-6 text-yellow-500 mr-2" />
            <h3 className="text-2xl font-bold text-gray-900">
              Analysis Results
            </h3>
            <Sparkles className="h-6 w-6 text-yellow-500 ml-2" />
          </div>
          <p className="text-lg text-gray-600">
            Real-time financial news analysis for your portfolio
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-2xl p-8 bounce-in">
          <div className="text-center space-y-6">
            <div className="mx-auto h-16 w-16 bg-gradient-to-r from-red-400 to-rose-500 rounded-full flex items-center justify-center">
              <Activity className="h-8 w-8 text-white" />
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-red-800">Connection Issue</h4>
              <p className="text-sm text-red-600">{error}</p>
            </div>
            <button
              onClick={simulateAnalysis}
              disabled={simulating}
              className="btn-primary disabled:opacity-50 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center space-x-3">
                {simulating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Simulating Analysis...</span>
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5" />
                    <span>Try Demo Analysis</span>
                  </>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="h-6 w-6 text-yellow-500 mr-2" />
          <h3 className="text-2xl font-bold text-gray-900">
            Analysis Results
          </h3>
          <Sparkles className="h-6 w-6 text-yellow-500 ml-2" />
        </div>
        <p className="text-lg text-gray-600 mb-6">
          Real-time financial news analysis for your portfolio
        </p>
        
        {results.length === 0 && (
          <button
            onClick={simulateAnalysis}
            disabled={simulating}
            className="btn-primary disabled:opacity-50 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center space-x-3">
              {simulating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Simulating Analysis...</span>
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5" />
                  <span>Try Demo Analysis</span>
                </>
              )}
            </div>
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="text-center py-16">
          <div className="mx-auto h-20 w-20 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mb-6">
            <Clock className="h-10 w-10 text-white" />
          </div>
          <h4 className="text-2xl font-semibold text-gray-900 mb-4">
            No analysis results yet
          </h4>
          <p className="text-lg text-gray-600 mb-6">
            Upload a CSV file to start analyzing your portfolio
          </p>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 max-w-md mx-auto">
            <p className="text-sm text-blue-800 font-medium mb-2">💡 Quick Start:</p>
            <p className="text-sm text-blue-700">
              Upload your portfolio CSV or click "Try Demo Analysis" to see sample results
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Results summary */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-green-800">
                    Analysis Complete!
                  </h4>
                  <p className="text-sm text-green-600">
                    {results.length} stock{results.length !== 1 ? 's' : ''} analyzed
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">
                  {Math.round(results.reduce((acc, r) => acc + (r.analysis?.impact_score || 0), 0) / results.length)}
                </div>
                <div className="text-xs text-green-500">Avg Impact</div>
              </div>
            </div>
          </div>

          {/* Results cards */}
          <div className="grid gap-6">
            {results.map((result, index) => (
              <div key={index} className="card card-hover slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="space-y-6">
                  {/* Header with ticker and sentiment */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-4 py-2 rounded-xl text-lg font-bold shadow-sm">
                        {result.ticker}
                      </div>
                      <div className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-semibold border ${getSentimentClass(result.analysis?.sentiment)}`}>
                        {getSentimentIcon(result.analysis?.sentiment)}
                        <span>{result.analysis?.sentiment || 'Neutral'}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-3xl font-bold ${getImpactColor(result.analysis?.impact_score)}`}>
                        {result.analysis?.impact_score || 0}
                      </div>
                      <div className="text-sm text-gray-500 font-medium">Impact Score</div>
                    </div>
                  </div>

                  {/* Headline */}
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
                      {result.headline}
                    </h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="font-medium">Source: {result.source}</span>
                      {result.article_url && (
                        <a
                          href={result.article_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>Read full article</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Summary */}
                  {result.analysis?.summary && (
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-200">
                      <h5 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                        <Activity className="h-4 w-4 mr-2 text-blue-600" />
                        Summary
                      </h5>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {result.analysis.summary}
                      </p>
                    </div>
                  )}

                  {/* Reasoning */}
                  {result.analysis?.reasoning && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                      <h5 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                        <BarChart3 className="h-4 w-4 mr-2 text-indigo-600" />
                        Analysis Reasoning
                      </h5>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {result.analysis.reasoning}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;