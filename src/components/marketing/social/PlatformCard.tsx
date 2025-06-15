
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Calendar } from 'lucide-react';

interface PlatformCardProps {
  title: string;
  icon: React.ReactNode;
  content: string;
  onContentChange: (content: string) => void;
  onCopy: () => void;
  showCharacterCount?: boolean;
  maxCharacters?: number;
}

const PlatformCard = ({
  title,
  icon,
  content,
  onContentChange,
  onCopy,
  showCharacterCount = false,
  maxCharacters
}: PlatformCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          className="min-h-[120px] text-sm"
        />
        {showCharacterCount && maxCharacters && (
          <div className="text-xs text-gray-500">
            Characters: {content.length}/{maxCharacters}
          </div>
        )}
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline"
            onClick={onCopy}
          >
            <Copy size={14} className="mr-1" />
            Copy
          </Button>
          <Button size="sm" variant="outline">
            <Calendar size={14} className="mr-1" />
            Schedule
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlatformCard;
