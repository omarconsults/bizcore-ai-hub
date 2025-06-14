
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Search, 
  Globe, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Twitter,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Users,
  Eye,
  Star,
  Clock,
  Target
} from 'lucide-react';

const DigitalPresenceAnalyzer = () => {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  // Mock data for demonstration
  const visibilityScore = 68;
  const industryAverage = 72;

  const auditResults = {
    website: { found: true, score: 80, issues: ['Slow loading speed', 'Missing meta descriptions'] },
    social: {
      instagram: { found: true, score: 65, lastPost: '2 weeks ago', followers: 245 },
      facebook: { found: true, score: 70, lastPost: '1 week ago', followers: 180 },
      linkedin: { found: false, score: 0 },
      twitter: { found: true, score: 45, lastPost: '3 weeks ago', followers: 89 }
    },
    listings: {
      googleBusiness: { found: false, score: 0 },
      vconnect: { found: true, score: 60 },
      nairaland: { found: false, score: 0 }
    }
  };

  const scoreBreakdown = [
    { category: 'Website & SEO', score: 80, weight: 30 },
    { category: 'Social Media', score: 65, weight: 25 },
    { category: 'Business Listings', score: 30, weight: 15 },
    { category: 'Content Engagement', score: 55, weight: 20 },
    { category: 'Brand Consistency', score: 75, weight: 10 }
  ];

  const checklist = [
    {
      id: 'google-business',
      title: 'Create Google My Business Profile',
      description: 'Get found when customers search for businesses like yours',
      timeEstimate: '10 mins',
      priority: 'high',
      category: 'Listings'
    },
    {
      id: 'instagram-bio',
      title: 'Update Instagram Bio with CTA',
      description: 'Add a clear call-to-action and link to drive traffic',
      timeEstimate: '5 mins',
      priority: 'medium',
      category: 'Social Media'
    },
    {
      id: 'linkedin-profile',
      title: 'Set up LinkedIn Business Page',
      description: 'Establish professional credibility and reach B2B customers',
      timeEstimate: '15 mins',
      priority: 'high',
      category: 'Social Media'
    },
    {
      id: 'website-speed',
      title: 'Optimize Website Loading Speed',
      description: 'Improve user experience and search engine rankings',
      timeEstimate: '30 mins',
      priority: 'medium',
      category: 'Website'
    },
    {
      id: 'content-schedule',
      title: 'Create Weekly Content Schedule',
      description: 'Maintain consistent online presence with regular posts',
      timeEstimate: '20 mins',
      priority: 'low',
      category: 'Content'
    }
  ];

  const competitors = [
    {
      name: 'FoodHub Lagos',
      followers: { instagram: 1200, facebook: 800 },
      features: ['Instagram Stories Highlights', 'Google Business Reviews', 'Weekly posts']
    },
    {
      name: 'Abuja Eats',
      followers: { instagram: 950, facebook: 600 },
      features: ['TikTok presence', 'Customer testimonials', 'Location tagging']
    }
  ];

  const runAnalysis = () => {
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasAnalyzed(true);
    }, 3000);
  };

  const toggleChecklistItem = (itemId: string) => {
    setCheckedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <Search className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Digital Presence Analyzer</h1>
            <p className="text-gray-600">Discover how visible and credible your business appears online</p>
          </div>
        </div>

        {!hasAnalyzed && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="business-name">Business Name</Label>
                <Input
                  id="business-name"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Enter your business name"
                />
              </div>
              <div>
                <Label htmlFor="website-url">Website URL (Optional)</Label>
                <Input
                  id="website-url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://yourbusiness.com"
                />
              </div>
            </div>
            <Button 
              onClick={runAnalysis} 
              disabled={!businessName || isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? 'Analyzing Your Digital Presence...' : 'Start Analysis'}
            </Button>
          </div>
        )}

        {isAnalyzing && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Scanning social media, websites, and business listings...</p>
          </div>
        )}
      </div>

      {hasAnalyzed && (
        <Tabs defaultValue="score" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="score">Visibility Score</TabsTrigger>
            <TabsTrigger value="audit">Audit Results</TabsTrigger>
            <TabsTrigger value="checklist">Fix-It Checklist</TabsTrigger>
          </TabsList>

          <TabsContent value="score" className="space-y-6">
            {/* Visibility Score Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Your Visibility Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-6xl font-bold mb-2">
                    <span className={getScoreColor(visibilityScore)}>{visibilityScore}</span>
                    <span className="text-gray-400 text-3xl">/100</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    <span>Industry Average: {industryAverage}</span>
                    {visibilityScore < industryAverage ? (
                      <TrendingUp className="w-4 h-4 text-red-500" />
                    ) : (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  {scoreBreakdown.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{item.category}</span>
                        <span className={getScoreColor(item.score)}>{item.score}/100</span>
                      </div>
                      <Progress value={item.score} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Competitor Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Competitor Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {competitors.map((competitor, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">{competitor.name}</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Followers:</p>
                          <p>Instagram: {competitor.followers.instagram.toLocaleString()}</p>
                          <p>Facebook: {competitor.followers.facebook.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1">What they do well:</p>
                          <div className="flex flex-wrap gap-1">
                            {competitor.features.map((feature, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audit" className="space-y-6">
            {/* Website Audit */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Website & SEO Audit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {auditResults.website.found ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    <span className="font-medium">Website Found</span>
                  </div>
                  <span className={`font-bold ${getScoreColor(auditResults.website.score)}`}>
                    {auditResults.website.score}/100
                  </span>
                </div>
                {auditResults.website.issues.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Issues to fix:</p>
                    {auditResults.website.issues.map((issue, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        <span>{issue}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Social Media Audit */}
            <Card>
              <CardHeader>
                <CardTitle>Social Media Presence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(auditResults.social).map(([platform, data]) => {
                    const PlatformIcon = {
                      instagram: Instagram,
                      facebook: Facebook,
                      linkedin: Linkedin,
                      twitter: Twitter
                    }[platform];

                    return (
                      <div key={platform} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <PlatformIcon className="w-5 h-5" />
                            <span className="font-medium capitalize">{platform}</span>
                          </div>
                          {data.found ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                        {data.found ? (
                          <div className="text-sm space-y-1">
                            <p>Score: <span className={getScoreColor(data.score)}>{data.score}/100</span></p>
                            {data.followers && <p>Followers: {data.followers}</p>}
                            {data.lastPost && <p>Last post: {data.lastPost}</p>}
                          </div>
                        ) : (
                          <p className="text-sm text-red-600">Profile not found</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Business Listings */}
            <Card>
              <CardHeader>
                <CardTitle>Business Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(auditResults.listings).map(([platform, data]) => (
                    <div key={platform} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-2">
                        {data.found ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                        <span className="font-medium capitalize">{platform.replace(/([A-Z])/g, ' $1').trim()}</span>
                      </div>
                      <span className={`font-bold ${getScoreColor(data.score)}`}>
                        {data.score}/100
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="checklist" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Your Improvement Checklist
                </CardTitle>
                <p className="text-gray-600">Complete these tasks to boost your visibility score</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {checklist.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <input
                            type="checkbox"
                            checked={checkedItems.includes(item.id)}
                            onChange={() => toggleChecklistItem(item.id)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1">{item.title}</h4>
                            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                            <div className="flex items-center gap-4 text-xs">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{item.timeEstimate}</span>
                              </div>
                              <Badge className={getPriorityColor(item.priority)}>
                                {item.priority} priority
                              </Badge>
                              <Badge variant="outline">{item.category}</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Progress Tracking</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <Progress value={(checkedItems.length / checklist.length) * 100} className="flex-1" />
                    <span className="text-sm font-medium">
                      {checkedItems.length}/{checklist.length} complete
                    </span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Estimated score improvement: +{checkedItems.length * 3} points
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default DigitalPresenceAnalyzer;
