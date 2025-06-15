
import React, { useState } from 'react';
import { Instagram, Twitter, Linkedin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SocialMediaForm from './social/SocialMediaForm';
import PlatformCard from './social/PlatformCard';
import HashtagsCard from './social/HashtagsCard';
import ImagePromptCard from './social/ImagePromptCard';
import { useSocialMediaAI } from '@/hooks/useSocialMediaAI';

const SocialMediaGenerator = () => {
  const { toast } = useToast();
  const [topic, setTopic] = useState('');
  const [postType, setPostType] = useState('');
  const [brandTone, setBrandTone] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  
  const { generateContent, isGenerating, generatedContent } = useSocialMediaAI();

  const handleGenerateContent = async () => {
    if (!topic || !postType || !brandTone || !targetAudience) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to generate content",
        variant: "destructive"
      });
      return;
    }

    await generateContent({
      topic,
      postType,
      brandTone,
      targetAudience
    });
  };

  const copyToClipboard = (text: string, platform: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${platform} content copied to clipboard`
    });
  };

  return (
    <div className="space-y-6">
      <SocialMediaForm
        topic={topic}
        setTopic={setTopic}
        postType={postType}
        setPostType={setPostType}
        brandTone={brandTone}
        setBrandTone={setBrandTone}
        targetAudience={targetAudience}
        setTargetAudience={setTargetAudience}
        isGenerating={isGenerating}
        onGenerate={handleGenerateContent}
      />

      {generatedContent && (
        <div className="grid md:grid-cols-3 gap-6">
          <PlatformCard
            title="Instagram"
            icon={<Instagram className="text-pink-600" size={20} />}
            content={generatedContent.content.instagram}
            onContentChange={() => {}} // Content is AI generated, no manual editing needed
            onCopy={() => copyToClipboard(generatedContent.content.instagram, 'Instagram')}
          />

          <PlatformCard
            title="Twitter"
            icon={<Twitter className="text-blue-500" size={20} />}
            content={generatedContent.content.twitter}
            onContentChange={() => {}}
            onCopy={() => copyToClipboard(generatedContent.content.twitter, 'Twitter')}
            showCharacterCount={true}
            maxCharacters={280}
          />

          <PlatformCard
            title="LinkedIn"
            icon={<Linkedin className="text-blue-700" size={20} />}
            content={generatedContent.content.linkedin}
            onContentChange={() => {}}
            onCopy={() => copyToClipboard(generatedContent.content.linkedin, 'LinkedIn')}
          />
        </div>
      )}

      {generatedContent && generatedContent.hashtags.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6">
          <HashtagsCard
            hashtags={generatedContent.hashtags}
            onCopyAll={() => copyToClipboard(generatedContent.hashtags.join(' '), 'Hashtags')}
          />

          <ImagePromptCard
            imagePrompt={generatedContent.imagePrompt}
            onCopy={() => copyToClipboard(generatedContent.imagePrompt, 'Image Prompt')}
          />
        </div>
      )}
    </div>
  );
};

export default SocialMediaGenerator;
