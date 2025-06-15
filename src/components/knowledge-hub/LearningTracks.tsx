
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LearningTrack } from './types';
import { useToast } from '@/hooks/use-toast';

interface LearningTracksProps {
  tracks: LearningTrack[];
}

const LearningTracks = ({ tracks }: LearningTracksProps) => {
  const { toast } = useToast();

  const handleTrackAction = (track: LearningTrack) => {
    const action = track.progress > 0 ? 'Continuing' : 'Starting';
    toast({
      title: `${action} Learning Track`,
      description: `${action} "${track.title}" track...`,
    });
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle>Learning Tracks</CardTitle>
        <p className="text-sm text-gray-600">Structured learning paths for your business journey</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {tracks.map((track, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">{track.title}</h4>
            <p className="text-sm text-gray-600 mb-3">{track.description}</p>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{track.lessons} lessons • {track.duration}</span>
                <Badge variant="outline">{track.level}</Badge>
              </div>
              
              {track.progress > 0 && (
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="text-emerald-600">{track.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-emerald-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${track.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              <Button 
                size="sm" 
                className="w-full mt-3 bg-blue-900 hover:bg-blue-800"
                onClick={() => handleTrackAction(track)}
              >
                {track.progress > 0 ? 'Continue' : 'Start Track'}
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default LearningTracks;
