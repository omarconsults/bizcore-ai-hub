
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEmailService } from '@/hooks/useEmailService';
import RichTextEditor from '@/components/ui/rich-text-editor';
import { Mail, Send, Loader2, FileText, Briefcase, UserPlus, Calendar } from 'lucide-react';

const EmailComposer = () => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [template, setTemplate] = useState('');
  const { sendEmail, loading } = useEmailService();

  const emailTemplates = [
    {
      id: 'business_proposal',
      name: 'Business Proposal',
      icon: Briefcase,
      subject: 'Strategic Business Partnership Proposal - [Your Company Name]',
      content: `<h2><strong>Strategic Business Partnership Proposal</strong></h2>

<p>Dear [Recipient Name],</p>

<p>I hope this email finds you well and thriving in your business endeavors.</p>

<p>I am writing to introduce <strong>[Your Company Name]</strong> and present an exciting business partnership opportunity that I believe could be mutually beneficial for both our organizations.</p>

<h3><strong>About [Your Company Name]:</strong></h3>
<p>We are a [brief company description] specializing in [your main services/products]. With [number] years of experience in the Nigerian market, we have successfully [key achievement or credential].</p>

<h3><strong>Partnership Opportunity:</strong></h3>
<p>We have identified a strategic opportunity where our companies can collaborate to:</p>
<ul>
<li><strong>Benefit 1</strong> - specific value proposition</li>
<li><strong>Benefit 2</strong> - market expansion opportunity</li>
<li><strong>Benefit 3</strong> - cost savings or efficiency gains</li>
<li><strong>Benefit 4</strong> - competitive advantage</li>
</ul>

<h3><strong>Our Proposal:</strong></h3>
<p>We propose a [type of partnership] that would enable both organizations to:</p>
<ol>
<li><strong>Market Expansion</strong>: Leverage each other's customer base and market presence</li>
<li><strong>Resource Optimization</strong>: Share expertise, technology, and operational capabilities</li>
<li><strong>Risk Mitigation</strong>: Diversify business risks through collaborative efforts</li>
<li><strong>Innovation</strong>: Combine our unique strengths to develop innovative solutions</li>
</ol>

<h3><strong>Next Steps:</strong></h3>
<p>I would welcome the opportunity to discuss this proposal in detail. I am available for:</p>
<ul>
<li>A face-to-face meeting at your convenience</li>
<li>A virtual presentation of our partnership framework</li>
<li>A preliminary discussion via phone call</li>
</ul>

<p>Thank you for considering this opportunity. I look forward to your positive response and the possibility of building a strong, profitable partnership.</p>

<p><strong>Best regards,</strong><br><br>
[Your Full Name]<br>
[Your Title]<br>
[Your Company Name]<br>
[Phone Number]<br>
[Email Address]</p>`
    },
    {
      id: 'job_application',
      name: 'Job Application',
      icon: UserPlus,
      subject: 'Application for [Position Title] - [Your Full Name]',
      content: `<h2><strong>Job Application</strong></h2>

<p>Dear Hiring Manager,</p>

<p>I am writing to express my strong interest in the <strong>[Position Title]</strong> position advertised on [where you found the job posting]. With my [number] years of experience in [relevant field] and proven track record in the Nigerian market, I am confident that I would be a valuable addition to your team.</p>

<h3><strong>Why I'm the Right Fit:</strong></h3>

<h4><strong>Professional Experience:</strong></h4>
<p>In my current role as [Current Position] at [Current Company], I have successfully:</p>
<ul>
<li>Achievement 1 with specific metrics/results</li>
<li>Achievement 2 with quantifiable impact</li>
<li>Achievement 3 demonstrating relevant skills</li>
<li>Achievement 4 showing growth/leadership</li>
</ul>

<h4><strong>Key Qualifications:</strong></h4>
<ul>
<li>✓ [Degree/Certification] in [Field] from [Institution]</li>
<li>✓ [Number] years of progressive experience in [Industry]</li>
<li>✓ Expertise in [specific skills/technologies relevant to the role]</li>
<li>✓ Strong understanding of Nigerian market dynamics and business culture</li>
</ul>

<h4><strong>Core Competencies:</strong></h4>
<ul>
<li><strong>Leadership & Team Management</strong>: Successfully led teams of [number] people</li>
<li><strong>Strategic Planning</strong>: Developed strategies resulting in [specific outcomes]</li>
<li><strong>Market Analysis</strong>: Conducted research leading to [business impact]</li>
<li><strong>Project Management</strong>: Delivered [number] projects on time and within budget</li>
</ul>

<p>I am particularly excited about [specific aspect of the company/role] and believe my experience in [relevant area] would be immediately beneficial to your organization.</p>

<p>I have attached my detailed resume and would welcome the opportunity to discuss how my skills and experience can contribute to your team's success.</p>

<p>Thank you for considering my application. I look forward to hearing from you soon.</p>

<p><strong>Warm regards,</strong><br><br>
[Your Full Name]<br>
[Phone Number]<br>
[Email Address]</p>`
    },
    {
      id: 'meeting_request',
      name: 'Meeting Request',
      icon: Calendar,
      subject: 'Request for Strategic Business Meeting - [Purpose/Topic]',
      content: `<h2><strong>Meeting Request</strong></h2>

<p>Dear [Recipient Name],</p>

<p>I hope this message finds you in good health and high spirits.</p>

<p>I am reaching out to request a meeting to discuss <strong>[specific purpose/opportunity]</strong> that I believe could be of mutual interest to both our organizations.</p>

<h3><strong>Meeting Purpose:</strong></h3>
<p>The primary objective of this meeting is to:</p>
<ul>
<li>Objective 1 - specific goal or outcome</li>
<li>Objective 2 - discussion topic or decision needed</li>
<li>Objective 3 - collaboration opportunity or business matter</li>
</ul>

<h3><strong>Proposed Agenda:</strong></h3>
<ol>
<li><strong>Introduction & Company Updates</strong> (10 minutes)
   <ul><li>Brief overview of recent developments in both organizations</li></ul>
</li>
<li><strong>Main Discussion Points</strong> (30 minutes)
   <ul>
   <li>Topic 1 with brief description</li>
   <li>Topic 2 with brief description</li>
   <li>Topic 3 with brief description</li>
   </ul>
</li>
<li><strong>Opportunities & Next Steps</strong> (15 minutes)
   <ul><li>Identification of potential collaboration areas and follow-up actions</li></ul>
</li>
</ol>

<h3><strong>Proposed Meeting Details:</strong></h3>
<ul>
<li><strong>Duration</strong>: Approximately 1 hour</li>
<li><strong>Suggested Dates</strong>: 
  <ul>
  <li>Option 1: [Date] at [Time]</li>
  <li>Option 2: [Date] at [Time]</li>
  <li>Option 3: [Date] at [Time]</li>
  </ul>
</li>
<li><strong>Format</strong>: [In-person / Virtual / Hybrid]</li>
<li><strong>Location</strong>: [Specific address if in-person]</li>
</ul>

<p>I understand your time is valuable, and I am committed to making this meeting worthwhile and productive. I am flexible with timing and can adjust to accommodate your schedule.</p>

<p>Please let me know your availability, and I will send a calendar invitation with all relevant details.</p>

<p>Thank you for considering this request. I look forward to our productive discussion.</p>

<p><strong>Best regards,</strong><br><br>
[Your Full Name]<br>
[Your Title]<br>
[Your Company Name]<br>
[Phone Number]</p>`
    },
    {
      id: 'invoice_follow_up',
      name: 'Invoice Follow-up',
      icon: FileText,
      subject: 'Friendly Reminder: Invoice #[Invoice Number] Payment Due',
      content: `<h2><strong>Payment Reminder</strong></h2>

<p>Dear [Client Name],</p>

<p>I hope this email finds you well and that your business is thriving.</p>

<p>I am writing to follow up on <strong>Invoice #[Invoice Number]</strong> dated [Invoice Date] for services rendered to [Client Company Name]. According to our records, this invoice has a payment due date of [Due Date] and remains outstanding.</p>

<h3><strong>Invoice Details:</strong></h3>
<ul>
<li><strong>Invoice Number</strong>: #[Invoice Number]</li>
<li><strong>Invoice Date</strong>: [Date]</li>
<li><strong>Due Date</strong>: [Due Date]</li>
<li><strong>Amount Due</strong>: ₦[Amount]</li>
<li><strong>Services Provided</strong>: [Brief description]</li>
</ul>

<h3><strong>Payment Options:</strong></h3>
<ol>
<li><strong>Bank Transfer</strong> (Preferred Method)
   <ul>
   <li>Account Name: [Company Name]</li>
   <li>Account Number: [Account Number]</li>
   <li>Bank: [Bank Name]</li>
   </ul>
</li>
<li><strong>Mobile Money Transfer</strong>: [Mobile Money Details]</li>
<li><strong>Check Payment</strong>: Payable to [Company Name]</li>
</ol>

<h3><strong>Important Notes:</strong></h3>
<ul>
<li>Please include Invoice #[Invoice Number] as reference for all payments</li>
<li>Send payment confirmation to [email] for immediate account updating</li>
<li>Contact us immediately if there are any discrepancies</li>
</ul>

<p>If payment has already been made, please accept our apologies for this reminder and kindly send us the payment confirmation details.</p>

<p>We greatly value our business relationship and want to ensure continued smooth operations. Your prompt attention to this matter would be greatly appreciated.</p>

<p>If you have any questions about this invoice, please don't hesitate to contact me directly.</p>

<p>Thank you for your prompt attention to this matter.</p>

<p><strong>Best regards,</strong><br><br>
[Your Full Name]<br>
[Your Title]<br>
[Company Name]<br>
[Phone Number]</p>`
    }
  ];

  const handleTemplateSelect = (templateId: string) => {
    const selectedTemplate = emailTemplates.find(t => t.id === templateId);
    if (selectedTemplate) {
      setSubject(selectedTemplate.subject);
      setMessage(selectedTemplate.content);
      setTemplate(templateId);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!to || !subject || !message) {
      return;
    }

    const emailData = {
      to,
      subject,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px 20px; background-color: #ffffff;">
          <div style="border-bottom: 3px solid #10b981; padding-bottom: 20px; margin-bottom: 30px;">
            <h1 style="color: #1f2937; margin: 0; font-size: 24px; font-weight: 600;">
              ${subject}
            </h1>
          </div>
          
          <div style="line-height: 1.6; color: #374151; font-size: 16px;">
            ${message}
          </div>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; background-color: #f9fafb; padding: 20px; border-radius: 8px;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              This email was sent via <strong>BizCore Professional Email System</strong><br>
              <em>Powering Business Communication Excellence</em>
            </p>
          </div>
        </div>
      `,
      text: message.replace(/<[^>]*>/g, ''), // Strip HTML for text version
    };

    const result = await sendEmail(emailData);
    
    if (result.success) {
      setTo('');
      setSubject('');
      setMessage('');
      setTemplate('');
    }
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="text-blue-600" size={24} />
          Professional Email Composer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSend} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="template">Email Template (Optional)</Label>
            <Select value={template} onValueChange={handleTemplateSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a professional template or start from scratch" />
              </SelectTrigger>
              <SelectContent>
                {emailTemplates.map((tmpl) => (
                  <SelectItem key={tmpl.id} value={tmpl.id}>
                    <div className="flex items-center gap-2">
                      <tmpl.icon size={16} />
                      {tmpl.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="to">Recipient Email</Label>
            <Input
              id="to"
              type="email"
              placeholder="recipient@company.com"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subject">Subject Line</Label>
            <Input
              id="subject"
              placeholder="Professional email subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Email Content</Label>
            <RichTextEditor
              value={message}
              onChange={setMessage}
              placeholder="Compose your professional message here..."
              className="min-h-[300px]"
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              type="submit" 
              disabled={loading || !to || !subject || !message}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Send className="mr-2 h-4 w-4" />
              Send Professional Email
            </Button>
            
            {template && (
              <Button 
                type="button" 
                variant="outline"
                onClick={() => {
                  setTemplate('');
                  setSubject('');
                  setMessage('');
                }}
              >
                Clear Template
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EmailComposer;
