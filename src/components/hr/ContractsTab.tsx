
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
    { name: 'Musa Bello.pdf', type: 'Full-time', date: '2024-03-10' },
    { name: 'Freelance_Tobi.docx', type: 'Freelance', date: '2024-03-08' },
    { name: 'Intern_Sarah.pdf', type: 'Internship', date: '2024-03-05' },
  ];

  const generateContractContent = (data: ContractData) => {
    const today = new Date().toLocaleDateString();
    const startDateStr = data.startDate ? format(data.startDate, 'PPP') : 'TBD';
    
    return `
EMPLOYMENT CONTRACT

Contract Type: ${data.type.toUpperCase()}
Generated on: ${today}

ARTICLE I - POSITION AND DUTIES
The Employee shall serve as ${data.role} and shall perform such duties and responsibilities as are customarily associated with this position.

ARTICLE II - COMPENSATION
${data.salary ? `Salary: ${data.salary} per annum` : 'Compensation to be determined'}

ARTICLE III - COMMENCEMENT
This agreement shall commence on ${startDateStr}.

ARTICLE IV - TERMS AND CONDITIONS
This contract is governed by the laws of Nigeria and applicable labor regulations.

[Additional clauses and terms would be included based on contract type and specific requirements]

SIGNATURES
Employer: _________________________ Date: _________

Employee: _________________________ Date: _________

---
This contract was generated using BizCore HR Tools and should be reviewed by legal counsel before execution.
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
      title: "Contract Generated",
      description: "Your contract has been generated successfully!"
    });
  };

  const handleExportContract = () => {
    if (!generatedContract) return;

    const blob = new Blob([generatedContract], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${contractData.role.replace(/\s+/g, '_')}_Contract.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Contract Exported",
      description: "Contract has been downloaded successfully."
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
      subject: `Employment Contract - ${contractData.role}`,
      html: `
        <h2>Employment Contract</h2>
        <p>Please find your employment contract below:</p>
        <pre style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; white-space: pre-wrap;">${generatedContract}</pre>
        <p>Best regards,<br>HR Department</p>
      `,
      text: `Employment Contract\n\n${generatedContract}\n\nBest regards,\nHR Department`
    };

    const result = await sendEmail(emailData);
    
    if (result.success) {
      setRecipientEmail('');
      toast({
        title: "Contract Sent",
        description: `Contract has been sent to ${recipientEmail}`
      });
    }
  };

  const downloadContract = (contractName: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${contractName}...`
    });
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Create New Contract
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
            <Label htmlFor="role">Role</Label>
            <Input 
              id="role"
              placeholder="e.g. Sales Manager"
              value={contractData.role}
              onChange={(e) => setContractData({...contractData, role: e.target.value})}
            />
          </div>

          <div>
            <Label htmlFor="salary">Salary</Label>
            <Input 
              id="salary"
              placeholder="e.g. ₦500,000"
              value={contractData.salary}
              onChange={(e) => setContractData({...contractData, salary: e.target.value})}
            />
          </div>

          <div>
            <Label>Start Date</Label>
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
                  {contractData.startDate ? format(contractData.startDate, "PPP") : "Pick a date"}
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
            Generate Contract
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Contracts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentContracts.map((contract, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">{contract.name}</p>
                  <p className="text-xs text-gray-500">{contract.type} • {contract.date}</p>
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
              Generated Contract
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="text-sm whitespace-pre-wrap font-mono">
                {generatedContract}
              </pre>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="email">Send to Email</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="email"
                    type="email"
                    placeholder="recipient@company.com"
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
                Close
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
