
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useTokens } from '@/hooks/useTokens';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { UserPlus, Copy, Download, Zap, Coins, Loader2 } from 'lucide-react';

export const HiringAssistant: React.FC = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [keySkills, setKeySkills] = useState('');
  const [jobType, setJobType] = useState('');
  const [location, setLocation] = useState('');
  const [specificRequirements, setSpecificRequirements] = useState('');
  const [generatedJD, setGeneratedJD] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const { tokenBalance, consumeTokens } = useTokens();

  const generateJobDescriptionWithAI = async () => {
    const prompt = `Generate a comprehensive, professional job description for a ${jobTitle} position.

Job Details:
- Position: ${jobTitle}
- Department: ${department}
- Experience Level: ${experienceLevel}
- Location: ${location}
- Job Type: ${jobType}
- Key Skills Required: ${keySkills}
- Specific Requirements: ${specificRequirements}

Please create a detailed job description that includes:

1. **Position Overview**: Compelling summary of the role and its importance
2. **Key Responsibilities**: 8-12 specific, actionable responsibilities
3. **Required Qualifications**: Education, experience, and technical skills
4. **Preferred Qualifications**: Nice-to-have skills and experience
5. **Core Competencies**: Soft skills and behavioral requirements
6. **Performance Metrics**: How success will be measured
7. **Career Growth**: Development and advancement opportunities
8. **Company Benefits**: Comprehensive benefits package
9. **Work Environment**: Culture, team dynamics, and working conditions
10. **Application Process**: Clear instructions for candidates

Make this job description:
- Attractive to top talent in the Nigerian job market
- Compliant with Nigerian employment laws
- Inclusive and diverse
- Specific enough to attract qualified candidates
- Professional yet engaging in tone

Format the output as a complete, ready-to-post job description that would be competitive in today's job market.`;

    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          message: prompt,
          conversationHistory: [],
          systemPrompt: `You are an expert HR professional and recruitment specialist with deep knowledge of the Nigerian job market. Create compelling, comprehensive job descriptions that attract top talent while ensuring legal compliance and inclusivity. Your job descriptions should be detailed, professional, and tailored to the Nigerian business environment.`
        }
      });

      if (error) {
        console.error('AI service error:', error);
        throw new Error('Failed to generate job description');
      }

      return data.response;
    } catch (error) {
      console.error('Job description generation error:', error);
      throw error;
    }
  };

  const generateJobDescription = async () => {
    if (!jobTitle) {
      toast({
        title: "Missing Information",
        description: "Please enter a job title first.",
        variant: "destructive"
      });
      return;
    }

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to generate AI-powered job descriptions.",
        variant: "destructive"
      });
      return;
    }

    const canConsume = await consumeTokens(5, 'job_description_generation', `Generated job description for ${jobTitle}`);
    
    if (!canConsume) {
      return;
    }

    setIsGenerating(true);
    
    try {
      const aiGeneratedJD = await generateJobDescriptionWithAI();
      setGeneratedJD(aiGeneratedJD);
      
      toast({
        title: "Job Description Generated",
        description: "Your comprehensive job description has been created successfully using AI!"
      });
    } catch (error) {
      console.error('Error generating job description:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate job description. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
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
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            AI-Powered Hiring Assistant
            {user && (
              <div className="flex items-center gap-1 text-xs bg-blue-100 px-2 py-1 rounded ml-auto">
                <Coins size={12} />
                {tokenBalance.availableTokens} tokens
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="job-title">Job Title *</Label>
              <Input 
                id="job-title"
                placeholder="e.g. Senior Software Engineer"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="department">Department</Label>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="HR">Human Resources</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Customer Success">Customer Success</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Legal">Legal</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="experience-level">Experience Level</Label>
              <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Entry Level (0-2 years)">Entry Level (0-2 years)</SelectItem>
                  <SelectItem value="Mid Level (3-5 years)">Mid Level (3-5 years)</SelectItem>
                  <SelectItem value="Senior Level (6-8 years)">Senior Level (6-8 years)</SelectItem>
                  <SelectItem value="Lead Level (9+ years)">Lead Level (9+ years)</SelectItem>
                  <SelectItem value="Executive Level">Executive Level</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="job-type">Job Type</Label>
              <Select value={jobType} onValueChange={setJobType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Freelance">Freelance</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location"
                placeholder="e.g. Lagos, Nigeria"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="key-skills">Key Skills Required</Label>
            <Textarea 
              id="key-skills"
              placeholder="List the essential skills, technologies, and qualifications required for this role..."
              value={keySkills}
              onChange={(e) => setKeySkills(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="specific-requirements">Specific Requirements & Additional Details</Label>
            <Textarea 
              id="specific-requirements"
              placeholder="Any specific requirements, company culture notes, or additional details about the role..."
              value={specificRequirements}
              onChange={(e) => setSpecificRequirements(e.target.value)}
            />
          </div>

          {!user && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-amber-800">Please log in to generate AI-powered job descriptions (5 tokens required)</p>
            </div>
          )}

          {user && tokenBalance.availableTokens < 5 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">You need 5 tokens to generate job descriptions. Please purchase more tokens.</p>
            </div>
          )}
          
          <Button 
            onClick={generateJobDescription}
            className="w-full bg-blue-900 hover:bg-blue-800"
            disabled={!jobTitle || isGenerating || !user || tokenBalance.availableTokens < 5}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating with AI...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-4 w-4" />
                Generate AI Job Description (5 tokens)
              </>
            )}
          </Button>

          {generatedJD && (
            <div className="space-y-3">
              <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                <h3 className="font-medium mb-2">AI-Generated Job Description:</h3>
                <pre className="text-sm whitespace-pre-wrap font-sans">{generatedJD}</pre>
              </div>
              <div className="flex gap-2">
                <Button onClick={copyToClipboard} variant="outline" className="flex-1">
                  <Copy className="mr-2 h-4 w-4" />
                  Copy to Clipboard
                </Button>
                <Button onClick={downloadJobDescription} variant="outline" className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Download Document
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
