
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';

interface Employee {
  name: string;
  role: string;
  salary: number;
  status: string;
}

interface PayrollTabProps {
  payrollSummary: Employee[];
  formatCurrency: (amount: number) => string;
  setShowAddEmployeeForm: (show: boolean) => void;
  handleProcessPayroll: () => void;
}

const PayrollTab: React.FC<PayrollTabProps> = ({ 
  payrollSummary, 
  formatCurrency, 
  setShowAddEmployeeForm, 
  handleProcessPayroll 
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Payroll Management</h3>
        <div className="flex gap-3">
          <Button 
            variant="outline"
            onClick={() => setShowAddEmployeeForm(true)}
          >
            <Plus className="mr-2" size={16} />
            Add Employee
          </Button>
          <Button 
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={handleProcessPayroll}
          >
            Process Payroll
          </Button>
        </div>
      </div>

      {/* Payroll Summary */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>This Month's Payroll</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Salaries</span>
                <span className="font-semibold">₦950,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">PAYE Tax</span>
                <span className="font-semibold">₦95,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pension (7.5%)</span>
                <span className="font-semibold">₦71,250</span>
              </div>
              <hr />
              <div className="flex justify-between text-lg font-bold">
                <span>Net Payroll</span>
                <span>₦783,750</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Payroll Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Next payroll run</span>
                <Badge className="bg-blue-100 text-blue-800">March 30</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tax filing due</span>
                <Badge className="bg-yellow-100 text-yellow-800">April 10</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Pension remittance</span>
                <Badge className="bg-emerald-100 text-emerald-800">April 15</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Employee Payroll */}
      <div>
        <h4 className="text-md font-medium text-gray-900 mb-4">Employee Payroll</h4>
        <div className="space-y-3">
          {payrollSummary.map((employee, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold">
                  {employee.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{employee.name}</h4>
                  <p className="text-sm text-gray-600">{employee.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{formatCurrency(employee.salary)}</div>
                  <Badge className={employee.status === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-yellow-100 text-yellow-800'}>
                    {employee.status}
                  </Badge>
                </div>
                <Button size="sm" variant="outline">
                  View Payslip
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PayrollTab;
