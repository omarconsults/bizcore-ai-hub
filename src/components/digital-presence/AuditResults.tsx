
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Globe, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Twitter,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';

interface AuditData {
  website: { found: boolean; score: number; issues: string[] };
  social: {
    instagram: { found: boolean; score: number; lastPost?: string; followers?: number };
    facebook: { found: boolean; score: number; lastPost?: string; followers?: number };
    linkedin: { found: boolean; score: number };
    twitter: { found: boolean; score: number; lastPost?: string; followers?: number };
  };
  listings: {
    googleBusiness: { found: boolean; score: number };
    vconnect: { found: boolean; score: number };
    nairaland: { found: boolean; score: number };
  };
}

interface AuditResultsProps {
  auditResults: AuditData;
}

const AuditResults = ({ auditResults }: AuditResultsProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
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
                      {'followers' in data && <p>Followers: {data.followers}</p>}
                      {'lastPost' in data && <p>Last post: {data.lastPost}</p>}
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
    </div>
  );
};

export default AuditResults;
