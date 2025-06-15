
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEmailService } from '@/hooks/useEmailService';
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
      content: `Dear [Recipient Name],

I hope this email finds you well and thriving in your business endeavors.

I am writing to introduce [Your Company Name] and present an exciting business partnership opportunity that I believe could be mutually beneficial for both our organizations.

**About [Your Company Name]:**
We are a [brief company description] specializing in [your main services/products]. With [number] years of experience in the Nigerian market, we have successfully [key achievement or credential].

**Partnership Opportunity:**
We have identified a strategic opportunity where our companies can collaborate to:
• [Benefit 1 - specific value proposition]
• [Benefit 2 - market expansion opportunity]
• [Benefit 3 - cost savings or efficiency gains]
• [Benefit 4 - competitive advantage]

**Our Proposal:**
We propose a [type of partnership - joint venture, strategic alliance, supplier agreement, etc.] that would enable both organizations to:

1. **Market Expansion**: Leverage each other's customer base and market presence
2. **Resource Optimization**: Share expertise, technology, and operational capabilities
3. **Risk Mitigation**: Diversify business risks through collaborative efforts
4. **Innovation**: Combine our unique strengths to develop innovative solutions

**Next Steps:**
I would welcome the opportunity to discuss this proposal in detail and explore how we can create value together. I am available for:
• A face-to-face meeting at your convenience
• A virtual presentation of our partnership framework
• A preliminary discussion via phone call

**Expected Outcomes:**
Based on our market analysis, this partnership could potentially:
• Increase revenue by [percentage/amount] for both parties
• Reduce operational costs by [percentage/amount]
• Expand market reach to [new markets/demographics]
• Accelerate growth timeline by [timeframe]

I have attached a preliminary partnership outline and our company profile for your review. I am confident that together, we can create significant value in the Nigerian market.

Thank you for considering this opportunity. I look forward to your positive response and the possibility of building a strong, profitable partnership.

Best regards,

[Your Full Name]
[Your Title]
[Your Company Name]
[Phone Number]
[Email Address]
[Company Website]

P.S. I am also available for an informal coffee meeting to discuss this opportunity in a relaxed setting.`
    },
    {
      id: 'job_application',
      name: 'Job Application',
      icon: UserPlus,
      subject: 'Application for [Position Title] - [Your Full Name]',
      content: `Dear Hiring Manager / [Hiring Manager Name],

I am writing to express my strong interest in the [Position Title] position advertised on [where you found the job posting]. With my [number] years of experience in [relevant field] and proven track record in the Nigerian market, I am confident that I would be a valuable addition to your team.

**Why I'm the Right Fit:**

**Professional Experience:**
In my current role as [Current Position] at [Current Company], I have successfully:
• [Achievement 1 with specific metrics/results]
• [Achievement 2 with quantifiable impact]
• [Achievement 3 demonstrating relevant skills]
• [Achievement 4 showing growth/leadership]

**Key Qualifications:**
✓ [Degree/Certification] in [Field] from [Institution]
✓ [Number] years of progressive experience in [Industry]
✓ Expertise in [specific skills/technologies relevant to the role]
✓ Proven ability to [key requirement from job description]
✓ Strong understanding of Nigerian market dynamics and business culture

**Core Competencies:**
• **Leadership & Team Management**: Successfully led teams of [number] people, achieving [specific results]
• **Strategic Planning**: Developed and implemented strategies that resulted in [specific outcomes]
• **Market Analysis**: Conducted comprehensive market research leading to [business impact]
• **Project Management**: Delivered [number] projects on time and within budget
• **Stakeholder Management**: Built strong relationships with clients, vendors, and internal teams

**What I Bring to Your Organization:**
• Deep knowledge of Nigerian business environment and regulatory landscape
• Strong network of professional contacts across [relevant industries]
• Proven ability to drive results in challenging market conditions
• Innovative approach to problem-solving and process improvement
• Excellent communication skills in English and [local languages]

**My Vision for This Role:**
If selected for this position, I plan to:
1. **First 30 Days**: Conduct thorough assessment of current processes and team dynamics
2. **First 90 Days**: Implement quick wins while developing comprehensive improvement strategy
3. **First 6 Months**: Execute strategic initiatives to drive measurable business results
4. **First Year**: Establish sustainable systems for continued growth and success

I am particularly excited about [specific aspect of the company/role that interests you] and believe my experience in [relevant area] would be immediately beneficial to your organization.

I have attached my detailed resume and would welcome the opportunity to discuss how my skills and experience can contribute to your team's success. I am available for an interview at your convenience and can provide additional references upon request.

Thank you for considering my application. I look forward to hearing from you soon.

Warm regards,

[Your Full Name]
[Phone Number]
[Email Address]
[LinkedIn Profile]
[Portfolio/Website if applicable]

Attachments: Resume, Portfolio, References (available upon request)`
    },
    {
      id: 'meeting_request',
      name: 'Meeting Request',
      icon: Calendar,
      subject: 'Request for Strategic Business Meeting - [Purpose/Topic]',
      content: `Dear [Recipient Name],

I hope this message finds you in good health and high spirits.

I am reaching out to request a meeting to discuss [specific purpose/opportunity] that I believe could be of mutual interest to both our organizations.

**Meeting Purpose:**
The primary objective of this meeting is to:
• [Objective 1 - specific goal or outcome]
• [Objective 2 - discussion topic or decision needed]
• [Objective 3 - collaboration opportunity or business matter]

**Background Context:**
[Provide brief context about why this meeting is important, any previous interactions, or relevant business developments]

**Proposed Agenda:**
1. **Introduction & Company Updates** (10 minutes)
   - Brief overview of recent developments in both organizations
   
2. **Main Discussion Points** (30 minutes)
   - [Topic 1 with brief description]
   - [Topic 2 with brief description]
   - [Topic 3 with brief description]

3. **Opportunities & Next Steps** (15 minutes)
   - Identification of potential collaboration areas
   - Discussion of mutual benefits and value creation
   - Agreement on follow-up actions and timelines

4. **Q&A Session** (5 minutes)
   - Open discussion for any additional questions or concerns

**Proposed Meeting Details:**
• **Duration**: Approximately 1 hour
• **Suggested Dates**: 
  - Option 1: [Date] at [Time]
  - Option 2: [Date] at [Time]
  - Option 3: [Date] at [Time]
• **Format**: [In-person at your office / Virtual via Zoom/Teams / Hybrid]
• **Location**: [Specific address if in-person]

**Value Proposition:**
This meeting could lead to:
• [Benefit 1 - specific value for the recipient]
• [Benefit 2 - business opportunity]
• [Benefit 3 - strategic advantage]

**Preparation:**
To make our time together as productive as possible, I will:
• Prepare detailed presentation materials
• Bring relevant data and market analysis
• Share agenda in advance for your review

I understand your time is valuable, and I am committed to making this meeting worthwhile and productive. I am flexible with timing and can adjust to accommodate your schedule.

Please let me know your availability, and I will send a calendar invitation with all relevant details.

Thank you for considering this request. I look forward to our productive discussion and the potential for future collaboration.

Best regards,

[Your Full Name]
[Your Title]
[Your Company Name]
[Direct Phone Number]
[Email Address]

P.S. If you prefer to discuss this opportunity via phone first, I am available at [phone number] during business hours.`
    },
    {
      id: 'invoice_follow_up',
      name: 'Invoice Follow-up',
      icon: FileText,
      subject: 'Friendly Reminder: Invoice #[Invoice Number] Payment Due',
      content: `Dear [Client Name],

I hope this email finds you well and that your business is thriving.

I am writing to follow up on Invoice #[Invoice Number] dated [Invoice Date] for services rendered to [Client Company Name]. According to our records, this invoice has a payment due date of [Due Date] and remains outstanding.

**Invoice Details:**
• Invoice Number: #[Invoice Number]
• Invoice Date: [Date]
• Due Date: [Due Date]
• Amount Due: ₦[Amount]
• Services Provided: [Brief description of services/products]

**Payment Terms Reminder:**
As per our service agreement, payment terms are [payment terms, e.g., "Net 30 days"]. We understand that business operations can be complex, and occasional delays in payment processing can occur.

**Outstanding Amount:**
The current outstanding balance is ₦[Amount]. This amount includes:
• [Service/Product 1]: ₦[Amount]
• [Service/Product 2]: ₦[Amount]
• [Any applicable taxes]: ₦[Amount]
• **Total Amount Due**: ₦[Total Amount]

**Payment Options:**
For your convenience, we offer multiple payment methods:

1. **Bank Transfer** (Preferred Method)
   - Account Name: [Company Name]
   - Account Number: [Account Number]
   - Bank: [Bank Name]
   - Sort Code: [Sort Code]

2. **Mobile Money Transfer**
   - [Mobile Money Details]

3. **Check Payment**
   - Payable to: [Company Name]
   - Mail to: [Company Address]

4. **Online Payment**
   - Payment Portal: [Website/Platform]
   - Reference: Invoice #[Invoice Number]

**Important Notes:**
• Please include Invoice #[Invoice Number] as reference for all payments
• Send payment confirmation to [email] for immediate account updating
• Contact us immediately if there are any discrepancies with the invoice

**Next Steps:**
If payment has already been made, please accept our apologies for this reminder and kindly send us the payment confirmation details for our records.

If you are experiencing any challenges with payment, please do not hesitate to contact us. We are open to discussing:
• Alternative payment arrangements
• Payment plan options
• Any concerns about the invoice or services provided

**Late Payment Policy:**
Please note that as per our terms and conditions, a late payment fee of [percentage]% per month may apply to overdue invoices. We prefer to work with our valued clients to resolve payment matters amicably.

**Relationship Value:**
We greatly value our business relationship and want to ensure continued smooth operations. Your prompt attention to this matter would be greatly appreciated and will help us maintain the high level of service you've come to expect.

If you have any questions about this invoice or need additional documentation, please don't hesitate to contact me directly at [phone number] or [email address].

Thank you for your prompt attention to this matter. We look forward to your payment and to continuing our successful business partnership.

Best regards,

[Your Full Name]
[Your Title]
[Company Name]
[Direct Phone Number]
[Email Address]
[Company Website]

**Attachment**: Invoice #[Invoice Number] (PDF)`
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
          
          <div style="line-height: 1.6; color: #374151; white-space: pre-wrap; font-size: 16px;">
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
      text: message,
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
            <Textarea
              id="message"
              placeholder="Compose your professional message here..."
              className="min-h-[300px]"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
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
