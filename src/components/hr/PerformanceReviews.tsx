
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Plus, Star } from 'lucide-react';
import { TeamMember } from './types';

interface PerformanceReviewsProps {
  teamMembers: TeamMember[];
}

export const PerformanceReviews: React.FC<PerformanceReviewsProps> = ({
  teamMembers
}) => {
  const { toast } = useToast();

  const startNewReviewCycle = () => {
    toast({
      title: "Review Cycle Started",
      description: "New performance review cycle has been initiated."
    });
  };

  const viewReview = (memberName: string) => {
    toast({
      title: "Performance Review",
      description: `Opening review for ${memberName}...`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Performance Reviews</h3>
        <Button onClick={startNewReviewCycle} className="bg-blue-900 hover:bg-blue-800">
          <Plus className="mr-2 h-4 w-4" />
          New Review Cycle
        </Button>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <Card key={member.id}>
            <CardContent className="p-4">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold mx-auto">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-medium">{member.name}</h4>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
                <div className="flex justify-center">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => viewReview(member.name)}
                >
                  View Review
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
