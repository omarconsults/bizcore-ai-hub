
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DigitalPresenceHeader from './digital-presence/DigitalPresenceHeader';
import VisibilityScore from './digital-presence/VisibilityScore';
import AuditResults from './digital-presence/AuditResults';
import ImprovementChecklist from './digital-presence/ImprovementChecklist';

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

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <DigitalPresenceHeader
        businessName={businessName}
        setBusinessName={setBusinessName}
        websiteUrl={websiteUrl}
        setWebsiteUrl={setWebsiteUrl}
        onRunAnalysis={runAnalysis}
        isAnalyzing={isAnalyzing}
        hasAnalyzed={hasAnalyzed}
      />

      {hasAnalyzed && (
        <Tabs defaultValue="score" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="score">Visibility Score</TabsTrigger>
            <TabsTrigger value="audit">Audit Results</TabsTrigger>
            <TabsTrigger value="checklist">Fix-It Checklist</TabsTrigger>
          </TabsList>

          <TabsContent value="score" className="space-y-6">
            <VisibilityScore
              visibilityScore={visibilityScore}
              industryAverage={industryAverage}
              scoreBreakdown={scoreBreakdown}
              competitors={competitors}
            />
          </TabsContent>

          <TabsContent value="audit" className="space-y-6">
            <AuditResults auditResults={auditResults} />
          </TabsContent>

          <TabsContent value="checklist" className="space-y-6">
            <ImprovementChecklist
              checklist={checklist}
              checkedItems={checkedItems}
              onToggleItem={toggleChecklistItem}
            />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default DigitalPresenceAnalyzer;
