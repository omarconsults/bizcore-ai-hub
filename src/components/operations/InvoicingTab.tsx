
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Receipt, Download, Plus, Eye } from 'lucide-react';

interface Invoice {
  id: string;
  client: string;
  amount: number;
  dueDate: string;
  status: string;
}

interface InvoicingTabProps {
  pendingInvoices: Invoice[];
  formatCurrency: (amount: number) => string;
  setShowInvoiceForm: (show: boolean) => void;
  handleViewInvoice: (invoiceId: string) => void;
  handleSendReminder: (invoiceId: string) => void;
}

const InvoicingTab: React.FC<InvoicingTabProps> = ({ 
  pendingInvoices, 
  formatCurrency, 
  setShowInvoiceForm, 
  handleViewInvoice, 
  handleSendReminder 
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Invoice Management</h3>
        <Button 
          className="bg-blue-900 hover:bg-blue-800"
          onClick={() => setShowInvoiceForm(true)}
        >
          <Plus className="mr-2" size={16} />
          Create Invoice
        </Button>
      </div>

      {/* Pending Invoices */}
      <div>
        <h4 className="text-md font-medium text-gray-900 mb-4">Pending Invoices</h4>
        <div className="space-y-3">
          {pendingInvoices.map((invoice, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="text-blue-900" size={20} />
                <div>
                  <h4 className="font-medium text-gray-900">{invoice.id}</h4>
                  <p className="text-sm text-gray-600">{invoice.client} • Due: {invoice.dueDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{formatCurrency(invoice.amount)}</div>
                  <Badge className={invoice.status === 'overdue' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}>
                    {invoice.status}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleViewInvoice(invoice.id)}
                  >
                    <Eye className="mr-1" size={14} />
                    View
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleSendReminder(invoice.id)}
                  >
                    Send Reminder
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invoice Templates */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-4">
          <Button 
            variant="outline" 
            className="h-20 flex-col"
            onClick={() => setShowInvoiceForm(true)}
          >
            <Receipt className="mb-2" size={20} />
            Service Invoice
          </Button>
          <Button 
            variant="outline" 
            className="h-20 flex-col"
            onClick={() => setShowInvoiceForm(true)}
          >
            <FileText className="mb-2" size={20} />
            Product Invoice
          </Button>
          <Button 
            variant="outline" 
            className="h-20 flex-col"
            onClick={() => setShowInvoiceForm(true)}
          >
            <Download className="mb-2" size={20} />
            Recurring Invoice
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoicingTab;
