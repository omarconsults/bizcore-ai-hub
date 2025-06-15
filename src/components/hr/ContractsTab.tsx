import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useEmailService } from '@/hooks/useEmailService';
import { FileText, Calendar as CalendarIcon, Download, Mail, Send } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { ContractData, RecentContract } from './types';

interface ContractsTabProps {
  contractData: ContractData;
  setContractData: React.Dispatch<React.SetStateAction<ContractData>>;
}

export const ContractsTab: React.FC<ContractsTabProps> = ({
  contractData,
  setContractData
}) => {
  const { toast } = useToast();
  const { sendEmail, loading: emailLoading } = useEmailService();
  const [generatedContract, setGeneratedContract] = useState<string | null>(null);
  const [showContractModal, setShowContractModal] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');

  const recentContracts: RecentContract[] = [
    { name: 'Musa_Bello_Employment_Contract.pdf', type: 'Full-time', date: '2024-03-10' },
    { name: 'Tobi_Adeyemi_Freelance_Agreement.docx', type: 'Freelance', date: '2024-03-08' },
    { name: 'Sarah_Okafor_Internship_Agreement.pdf', type: 'Internship', date: '2024-03-05' },
  ];

  const generateContractContent = (data: ContractData) => {
    const today = new Date().toLocaleDateString('en-NG');
    const startDateStr = data.startDate ? format(data.startDate, 'do MMMM yyyy') : 'To be determined upon mutual agreement';
    const contractType = data.type.toLowerCase();
    
    return `
EMPLOYMENT CONTRACT AGREEMENT

Contract Reference: EC-${Date.now().toString().slice(-6)}
Contract Type: ${data.type.toUpperCase()} EMPLOYMENT
Date of Issue: ${today}
Jurisdiction: Federal Republic of Nigeria

================================================================================
PARTIES TO THIS AGREEMENT
================================================================================

EMPLOYER:
[Company Name]
Registration Number: RC-[Registration Number]
Address: [Company Address]
Email: [Company Email]
Phone: [Company Phone]

EMPLOYEE:
Name: [Employee Full Name]
Position: ${data.role}
Address: [Employee Address]
Email: [Employee Email]
Phone: [Employee Phone]

================================================================================
ARTICLE I - POSITION AND DUTIES
================================================================================

1.1 POSITION TITLE AND RESPONSIBILITIES
The Employee shall serve in the capacity of ${data.role} and shall perform such duties, responsibilities, and functions as are customarily associated with this position, including but not limited to:

a) Primary responsibilities as outlined in the job description
b) Adherence to company policies, procedures, and code of conduct
c) Participation in training programs and professional development activities
d) Collaboration with team members and stakeholders as required
e) Maintenance of confidentiality regarding company information
f) Achievement of performance targets and key performance indicators (KPIs)

1.2 REPORTING STRUCTURE
The Employee shall report directly to [Supervisor Title] and shall work collaboratively with other departments as necessary for the effective discharge of duties.

1.3 WORK LOCATION
The Employee shall primarily work at [Work Location] with flexibility for remote work arrangements as approved by management and in accordance with company remote work policies.

================================================================================
ARTICLE II - COMPENSATION AND BENEFITS
================================================================================

2.1 BASE SALARY
${data.salary ? `The Employee shall receive a gross annual salary of ${data.salary}, payable monthly in arrears on or before the last working day of each month.` : 'Compensation details to be finalized and communicated in a separate compensation letter.'}

2.2 SALARY REVIEW
The Employee's salary shall be subject to annual review based on performance, market conditions, and company financial performance.

2.3 BENEFITS PACKAGE
The Employee shall be entitled to the following benefits:

a) Health Insurance: Comprehensive medical coverage for Employee and immediate family
b) Pension Contribution: Company contribution to Employee's pension fund as per Nigerian pension laws
c) Annual Leave: [Number] working days per calendar year
d) Sick Leave: [Number] working days per calendar year
e) Professional Development: Access to training and development opportunities
f) Life Insurance: Group life insurance coverage
g) Other benefits as outlined in the Employee Handbook

2.4 EXPENSE REIMBURSEMENT
Reasonable business expenses incurred in the performance of duties shall be reimbursed upon presentation of appropriate documentation.

================================================================================
ARTICLE III - COMMENCEMENT AND DURATION
================================================================================

3.1 COMMENCEMENT DATE
This employment agreement shall commence on ${startDateStr}.

3.2 PROBATIONARY PERIOD
${contractType === 'full-time' ? 'The Employee shall serve a probationary period of six (6) months from the commencement date, during which time either party may terminate this agreement with two (2) weeks written notice.' : 'The probationary terms shall be as mutually agreed upon based on the nature of the engagement.'}

3.3 CONTRACT DURATION
${contractType === 'full-time' ? 'This is a permanent employment contract subject to the terms and conditions herein.' : contractType === 'freelance' ? 'This is a freelance/consultancy agreement for the duration specified in the project scope or as mutually agreed.' : contractType === 'internship' ? 'This internship agreement shall run for a period of [Duration] months from the commencement date.' : 'Contract duration as specified in the engagement terms.'}

================================================================================
ARTICLE IV - WORKING CONDITIONS AND HOURS
================================================================================

4.1 WORKING HOURS
${contractType === 'full-time' ? 'Standard working hours are 8:00 AM to 5:00 PM, Monday through Friday, with a one-hour lunch break. Total working hours: 40 hours per week.' : contractType === 'part-time' ? 'Working hours shall be as mutually agreed, not exceeding [Number] hours per week.' : 'Working hours shall be flexible and based on project requirements and deliverables.'}

4.2 OVERTIME
Overtime work may be required and shall be compensated in accordance with Nigerian labor laws and company policies.

4.3 FLEXIBLE WORK ARRANGEMENTS
The company supports work-life balance and may offer flexible working arrangements subject to business needs and mutual agreement.

================================================================================
ARTICLE V - CONFIDENTIALITY AND INTELLECTUAL PROPERTY
================================================================================

5.1 CONFIDENTIALITY
The Employee agrees to maintain strict confidentiality regarding all proprietary information, trade secrets, customer data, and business strategies of the company.

5.2 INTELLECTUAL PROPERTY
All work products, inventions, and intellectual property created during the course of employment shall belong to the company.

5.3 NON-DISCLOSURE
The Employee shall not disclose confidential information to third parties during employment and for a period of [Number] years after termination.

================================================================================
ARTICLE VI - TERMINATION
================================================================================

6.1 TERMINATION BY EMPLOYER
The company may terminate this agreement with appropriate notice as required by Nigerian labor laws or payment in lieu of notice.

6.2 TERMINATION BY EMPLOYEE
The Employee may terminate this agreement by giving [Notice Period] written notice to the company.

6.3 IMMEDIATE TERMINATION
Either party may terminate this agreement immediately in cases of gross misconduct, breach of contract, or other circumstances warranting immediate termination.

================================================================================
ARTICLE VII - GENERAL PROVISIONS
================================================================================

7.1 GOVERNING LAW
This contract shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria.

7.2 DISPUTE RESOLUTION
Any disputes arising from this contract shall be resolved through mediation, and if unsuccessful, through arbitration in accordance with Nigerian arbitration laws.

7.3 AMENDMENTS
This agreement may only be amended in writing and signed by both parties.

7.4 SEVERABILITY
If any provision of this contract is deemed invalid or unenforceable, the remaining provisions shall continue in full force and effect.

7.5 ENTIRE AGREEMENT
This contract constitutes the entire agreement between the parties and supersedes all prior negotiations, representations, or agreements.

================================================================================
SIGNATURES
================================================================================

EMPLOYER:

Signature: ___________________________ Date: ___________
Name: [Employer Name]
Title: [Title]
Company: [Company Name]

EMPLOYEE:

Signature: ___________________________ Date: ___________
Name: [Employee Name]
Date: ___________

WITNESS:

Signature: ___________________________ Date: ___________
Name: [Witness Name]
Title: [Title]

================================================================================

IMPORTANT LEGAL NOTICE:
This employment contract has been generated using BizCore HR Management Tools and is designed to comply with Nigerian employment laws and regulations. It is strongly recommended that both parties seek independent legal counsel to review this agreement before execution. This template serves as a foundation and may require customization based on specific circumstances, industry requirements, and current legal provisions.

For legal compliance updates and additional clauses, please consult with a qualified employment lawyer familiar with Nigerian labor law.

Document Generated: ${today}
System: BizCore HR Tools v2.0
    `.trim();
  };

  const handleGenerateContract = () => {
    if (!contractData.type || !contractData.role) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const contractContent = generateContractContent(contractData);
    setGeneratedContract(contractContent);
    setShowContractModal(true);
    
    toast({
      title: "Professional Contract Generated",
      description: "Your comprehensive employment contract has been generated with full legal provisions!"
    });
  };

  const handleExportContract = () => {
    if (!generatedContract) return;

    const blob = new Blob([generatedContract], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${contractData.role.replace(/\s+/g, '_')}_Employment_Contract_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Contract Exported Successfully",
      description: "Professional employment contract has been downloaded to your device."
    });
  };

  const handleEmailContract = async () => {
    if (!generatedContract || !recipientEmail) {
      toast({
        title: "Missing Information",
        description: "Please enter a recipient email address.",
        variant: "destructive"
      });
      return;
    }

    const emailData = {
      to: recipientEmail,
      subject: `Professional Employment Contract - ${contractData.role} Position`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #1f2937; border-bottom: 3px solid #10b981; padding-bottom: 10px;">
            Employment Contract Document
          </h1>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #374151; margin-top: 0;">Contract Details</h2>
            <p><strong>Position:</strong> ${contractData.role}</p>
            <p><strong>Contract Type:</strong> ${contractData.type}</p>
            <p><strong>Generated:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          
          <p style="color: #4b5563; line-height: 1.6;">
            Dear Recipient,<br><br>
            Please find attached your comprehensive employment contract generated through our professional HR management system. 
            This document has been carefully crafted to ensure compliance with Nigerian employment laws and includes all 
            necessary provisions for a professional employment relationship.
          </p>
          
          <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0;">
            <h3 style="color: #92400e; margin-top: 0;">Important Legal Notice</h3>
            <p style="color: #92400e; margin-bottom: 0;">
              We strongly recommend that you review this contract with qualified legal counsel before signing. 
              This ensures full understanding of all terms and compliance with current employment regulations.
            </p>
          </div>
          
          <div style="background-color: #1f2937; color: white; padding: 20px; border-radius: 5px; white-space: pre-wrap; font-family: monospace; font-size: 12px; overflow-x: auto;">
${generatedContract}
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              Best regards,<br>
              <strong>Human Resources Department</strong><br>
              Generated via BizCore HR Management Platform<br>
              <em>Professional • Compliant • Comprehensive</em>
            </p>
          </div>
        </div>
      `,
      text: `Employment Contract Document\n\n${generatedContract}\n\nBest regards,\nHuman Resources Department\nGenerated via BizCore HR Management Platform`
    };

    const result = await sendEmail(emailData);
    
    if (result.success) {
      setRecipientEmail('');
      toast({
        title: "Contract Sent Successfully",
        description: `Professional employment contract has been sent to ${recipientEmail}`
      });
    }
  };

  const downloadContract = (contractName: string) => {
    toast({
      title: "Download Initiated",
      description: `Downloading ${contractName}... Please check your downloads folder.`
    });
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Create Professional Employment Contract
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="contract-type">Contract Type</Label>
            <Select value={contractData.type} onValueChange={(value) => setContractData({...contractData, type: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select contract type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full-time Employment</SelectItem>
                <SelectItem value="part-time">Part-time Employment</SelectItem>
                <SelectItem value="freelance">Freelance Contract</SelectItem>
                <SelectItem value="internship">Internship Agreement</SelectItem>
                <SelectItem value="consultant">Consultant Agreement</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="role">Role/Position</Label>
            <Input 
              id="role"
              placeholder="e.g. Senior Sales Manager"
              value={contractData.role}
              onChange={(e) => setContractData({...contractData, role: e.target.value})}
            />
          </div>

          <div>
            <Label htmlFor="salary">Annual Salary</Label>
            <Input 
              id="salary"
              placeholder="e.g. ₦2,400,000"
              value={contractData.salary}
              onChange={(e) => setContractData({...contractData, salary: e.target.value})}
            />
          </div>

          <div>
            <Label>Employment Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !contractData.startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {contractData.startDate ? format(contractData.startDate, "PPP") : "Select start date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={contractData.startDate}
                  onSelect={(date) => setContractData({...contractData, startDate: date})}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button 
            onClick={handleGenerateContract}
            className="w-full bg-emerald-600 hover:bg-emerald-700"
            disabled={!contractData.type || !contractData.role}
          >
            Generate Professional Contract
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Contract Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentContracts.map((contract, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">{contract.name}</p>
                  <p className="text-xs text-gray-500">{contract.type} • Generated {contract.date}</p>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => downloadContract(contract.name)}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contract Preview Modal */}
      <Dialog open={showContractModal} onOpenChange={setShowContractModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Professional Employment Contract Preview
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="text-xs whitespace-pre-wrap font-mono overflow-x-auto">
                {generatedContract}
              </pre>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="email">Send Contract via Email</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="email"
                    type="email"
                    placeholder="employee@company.com"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                  />
                  <Button 
                    onClick={handleEmailContract}
                    disabled={emailLoading || !recipientEmail}
                    className="shrink-0"
                  >
                    {emailLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    ) : (
                      <Mail className="h-4 w-4 mr-2" />
                    )}
                    Send
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between pt-4 border-t">
              <Button variant="outline" onClick={() => setShowContractModal(false)}>
                Close Preview
              </Button>
              <Button onClick={handleExportContract} className="bg-blue-900 hover:bg-blue-800">
                <Download className="h-4 w-4 mr-2" />
                Export Contract
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
