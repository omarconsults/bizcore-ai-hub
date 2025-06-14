
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, Copy, Download } from 'lucide-react';

export const HiringAssistant: React.FC = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [generatedJD, setGeneratedJD] = useState('');
  const { toast } = useToast();

  const generateJobDescription = () => {
    if (!jobTitle) {
      toast({
        title: "Missing Information",
        description: "Please enter a job title first.",
        variant: "destructive"
      });
      return;
    }
    
    const template = `Job Title: ${jobTitle}

Job Summary:
We are seeking a highly motivated ${jobTitle} to join our dynamic team. The successful candidate will be responsible for driving results and contributing to our company's growth.

Key Responsibilities:
• Lead and manage team initiatives
• Develop and implement strategic plans
• Collaborate with cross-functional teams
• Monitor performance metrics and KPIs
• Ensure compliance with company policies

Requirements:
• Bachelor's degree in relevant field
• 3+ years of experience in similar role
• Strong communication and leadership skills
• Proficiency in relevant software tools
• Ability to work in fast-paced environment

What We Offer:
• Competitive salary package
• Health insurance coverage
• Professional development opportunities
• Flexible working arrangements
• Performance-based bonuses`;

    setGeneratedJD(template);
    toast({
      title: "Job Description Generated",
      description: "Your job description has been created successfully!"
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedJD);
    toast({
      title: "Copied!",
      description: "Job description copied to clipboard."
    });
  };

  const downloadJobDescription = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedJD], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${jobTitle.replace(/\s+/g, '_')}_Job_Description.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Downloaded",
      description: "Job description downloaded successfully!"
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            AI Hiring Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="job-title">Job Title</Label>
            <Input 
              id="job-title"
              placeholder="e.g. Sales Lead"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>
          
          <Button 
            onClick={generateJobDescription}
            className="w-full bg-blue-900 hover:bg-blue-800"
            disabled={!jobTitle}
          >
            Generate Job Description
          </Button>

          {generatedJD && (
            <div className="space-y-3">
              <div className="bg-gray-50 p-4 rounded-lg max-h-64 overflow-y-auto">
                <pre className="text-sm whitespace-pre-wrap">{generatedJD}</pre>
              </div>
              <div className="flex gap-2">
                <Button onClick={copyToClipboard} variant="outline" className="flex-1">
                  <Copy className="mr-2 h-4 w-4" />
                  Copy to Clipboard
                </Button>
                <Button onClick={downloadJobDescription} variant="outline" className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
