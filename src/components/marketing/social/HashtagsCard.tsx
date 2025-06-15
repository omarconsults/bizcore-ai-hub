
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Hash, Copy } from 'lucide-react';

interface HashtagsCardProps {
  hashtags: string[];
  onCopyAll: () => void;
}

const HashtagsCard = ({ hashtags, onCopyAll }: HashtagsCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Hash className="text-blue-600" size={20} />
          Recommended Hashtags
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {hashtags.map((hashtag, index) => (
            <Badge key={index} variant="secondary" className="cursor-pointer hover:bg-blue-100">
              {hashtag}
            </Badge>
          ))}
        </div>
        <Button 
          size="sm" 
          variant="outline" 
          className="mt-4"
          onClick={onCopyAll}
        >
          <Copy size={14} className="mr-1" />
          Copy All
        </Button>
      </CardContent>
    </Card>
  );
};

export default HashtagsCard;
