
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Image, Copy } from 'lucide-react';

interface ImagePromptCardProps {
  imagePrompt: string;
  onCopy: () => void;
}

const ImagePromptCard = ({ imagePrompt, onCopy }: ImagePromptCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Image className="text-green-600" size={20} />
          Image Prompt
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{imagePrompt}</p>
        <Button 
          size="sm" 
          variant="outline"
          onClick={onCopy}
        >
          <Copy size={14} className="mr-1" />
          Copy Prompt
        </Button>
      </CardContent>
    </Card>
  );
};

export default ImagePromptCard;
