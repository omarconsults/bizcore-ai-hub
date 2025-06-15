
import React, { useState } from 'react';
import { Instagram, Twitter, Linkedin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SocialMediaForm from './social/SocialMediaForm';
import PlatformCard from './social/PlatformCard';
import HashtagsCard from './social/HashtagsCard';
import ImagePromptCard from './social/ImagePromptCard';
import { getSampleContent, generateHashtags } from './social/contentGenerator';

const SocialMediaGenerator = () => {
  const { toast } = useToast();
  const [topic, setTopic] = useState('');
  const [postType, setPostType] = useState('');
  const [brandTone, setBrandTone] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [generatedContent, setGeneratedContent] = useState({
    instagram: '',
    twitter: '',
    linkedin: '',
    hashtags: [],
    imagePrompt: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const generateContent = async () => {
    if (!topic || !postType || !brandTone || !targetAudience) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to generate content",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI content generation
    setTimeout(() => {
      const content = {
        instagram: `🚀 ${topic}\n\n${getSampleContent(postType, brandTone)} Perfect for ${targetAudience.toLowerCase()}! 💫\n\nWhat do you think? Drop your thoughts below! 👇`,
        twitter: `${getSampleContent(postType, brandTone, true)} Perfect for ${targetAudience.toLowerCase()}! 🔥`,
        linkedin: `${topic}\n\n${getSampleContent(postType, brandTone, false, true)}\n\nWhat's your experience with this? Share your thoughts in the comments.`,
        hashtags: generateHashtags(topic, postType),
        imagePrompt: `${topic} - ${postType.toLowerCase()} visual with ${brandTone.toLowerCase()} style, Nigerian context, professional quality`
      };
      
      setGeneratedContent(content);
      setIsGenerating(false);
      
      toast({
        title: "Content Generated! ✨",
        description: "Your social media posts are ready to use"
      });
    }, 2000);
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
        onGenerate={generateContent}
      />

      {(generatedContent.instagram || generatedContent.twitter || generatedContent.linkedin) && (
        <div className="grid md:grid-cols-3 gap-6">
          <PlatformCard
            title="Instagram"
            icon={<Instagram className="text-pink-600" size={20} />}
            content={generatedContent.instagram}
            onContentChange={(content) => setGeneratedContent({...generatedContent, instagram: content})}
            onCopy={() => copyToClipboard(generatedContent.instagram, 'Instagram')}
          />

          <PlatformCard
            title="Twitter"
            icon={<Twitter className="text-blue-500" size={20} />}
            content={generatedContent.twitter}
            onContentChange={(content) => setGeneratedContent({...generatedContent, twitter: content})}
            onCopy={() => copyToClipboard(generatedContent.twitter, 'Twitter')}
            showCharacterCount={true}
            maxCharacters={280}
          />

          <PlatformCard
            title="LinkedIn"
            icon={<Linkedin className="text-blue-700" size={20} />}
            content={generatedContent.linkedin}
            onContentChange={(content) => setGeneratedContent({...generatedContent, linkedin: content})}
            onCopy={() => copyToClipboard(generatedContent.linkedin, 'LinkedIn')}
          />
        </div>
      )}

      {generatedContent.hashtags.length > 0 && (
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
