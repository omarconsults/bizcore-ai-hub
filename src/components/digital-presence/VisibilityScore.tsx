
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Eye, TrendingUp, Users } from 'lucide-react';

interface ScoreBreakdownItem {
  category: string;
  score: number;
  weight: number;
}

interface Competitor {
  name: string;
  followers: { instagram: number; facebook: number };
  features: string[];
}

interface VisibilityScoreProps {
  visibilityScore: number;
  industryAverage: number;
  scoreBreakdown: ScoreBreakdownItem[];
  competitors: Competitor[];
}

const VisibilityScore = ({ visibilityScore, industryAverage, scoreBreakdown, competitors }: VisibilityScoreProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default VisibilityScore;
