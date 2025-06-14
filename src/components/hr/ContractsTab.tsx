
import React from 'react';
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
import { useToast } from '@/hooks/use-toast';
import { FileText, Calendar as CalendarIcon, Download } from 'lucide-react';
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

  const recentContracts: RecentContract[] = [
    { name: 'Musa Bello.pdf', type: 'Full-time', date: '2024-03-10' },
    { name: 'Freelance_Tobi.docx', type: 'Freelance', date: '2024-03-08' },
    { name: 'Intern_Sarah.pdf', type: 'Internship', date: '2024-03-05' },
  ];

  const handleGenerateContract = () => {
    if (!contractData.type || !contractData.role) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    console.log('Generating contract with data:', contractData);
    toast({
      title: "Contract Generated",
      description: "Contract generation started! You will receive an email when ready."
    });
    
    setContractData({
      type: '',
      role: '',
      salary: '',
      startDate: undefined
    });
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
    </div>
  );
};
