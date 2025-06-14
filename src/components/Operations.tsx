
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import OperationsHeader from './operations/OperationsHeader';
import FinancialOverview from './operations/FinancialOverview';
import FinancialOverviewTab from './operations/FinancialOverviewTab';
import InvoicingTab from './operations/InvoicingTab';
import PayrollTab from './operations/PayrollTab';
import ReportsTab from './operations/ReportsTab';
import AddEmployeeForm from './operations/AddEmployeeForm';
import InvoiceCreationForm from './operations/InvoiceCreationForm';

const Operations = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddEmployeeForm, setShowAddEmployeeForm] = useState(false);
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const { toast } = useToast();

  const monthlyFinancials = {
    revenue: 2400000,
    expenses: 1650000,
    profit: 750000,
    growth: 12
  };

  const [recentTransactions, setRecentTransactions] = useState([
    { date: '2024-03-15', type: 'income', description: 'Client Payment - Fashion Consultation', amount: 150000, category: 'Services' },
    { date: '2024-03-14', type: 'expense', description: 'Office Rent', amount: -200000, category: 'Overhead' },
    { date: '2024-03-13', type: 'income', description: 'Product Sales - Online Store', amount: 85000, category: 'Products' },
    { date: '2024-03-12', type: 'expense', description: 'Marketing Campaign', amount: -50000, category: 'Marketing' },
    { date: '2024-03-11', type: 'income', description: 'Wholesale Order', amount: 300000, category: 'Products' }
  ]);

  const [pendingInvoices, setPendingInvoices] = useState([
    { id: 'INV-001', client: 'Lagos Fashion Week', amount: 500000, dueDate: '2024-03-20', status: 'pending' },
    { id: 'INV-002', client: 'Bella Stores', amount: 250000, dueDate: '2024-03-25', status: 'overdue' },
    { id: 'INV-003', client: 'Style Central', amount: 180000, dueDate: '2024-04-01', status: 'pending' }
  ]);

  const [payrollSummary, setPayrollSummary] = useState([
    { name: 'Adaora Okafor', role: 'Founder/CEO', salary: 400000, status: 'paid' },
    { name: 'Emeka Johnson', role: 'Designer', salary: 250000, status: 'paid' },
    { name: 'Funmi Adebayo', role: 'Sales Manager', salary: 180000, status: 'pending' },
    { name: 'David Okwu', role: 'Operations Assistant', salary: 120000, status: 'pending' }
  ]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleEmployeeAdded = (newEmployee) => {
    setPayrollSummary(prev => [...prev, newEmployee]);
  };

  const handleInvoiceCreated = (newInvoice) => {
    setPendingInvoices(prev => [...prev, newInvoice]);
  };

  const handleProcessPayroll = () => {
    toast({
      title: "Payroll Processing",
      description: "Payroll has been processed successfully for all pending employees.",
    });
    
    setPayrollSummary(prev => 
      prev.map(employee => ({ ...employee, status: 'paid' }))
    );
  };

  const handleGenerateReport = (reportType) => {
    toast({
      title: "Report Generated",
      description: `${reportType} report is being prepared for download.`,
    });
  };

  const handleViewInvoice = (invoiceId) => {
    toast({
      title: "Opening Invoice",
      description: `Viewing details for ${invoiceId}.`,
    });
  };

  const handleSendReminder = (invoiceId) => {
    toast({
      title: "Reminder Sent",
      description: `Payment reminder sent for ${invoiceId}.`,
    });
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <OperationsHeader 
        monthlyFinancials={monthlyFinancials}
        formatCurrency={formatCurrency}
      />

      {/* Financial Overview */}
      <FinancialOverview 
        monthlyFinancials={monthlyFinancials}
        formatCurrency={formatCurrency}
      />

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', name: 'Financial Overview' },
              { id: 'invoicing', name: 'Invoicing' },
              { id: 'payroll', name: 'Payroll' },
              { id: 'reports', name: 'Reports' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-900 text-blue-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <FinancialOverviewTab
              recentTransactions={recentTransactions}
              formatCurrency={formatCurrency}
            />
          )}

          {activeTab === 'invoicing' && (
            <InvoicingTab
              pendingInvoices={pendingInvoices}
              formatCurrency={formatCurrency}
              setShowInvoiceForm={setShowInvoiceForm}
              handleViewInvoice={handleViewInvoice}
              handleSendReminder={handleSendReminder}
            />
          )}

          {activeTab === 'payroll' && (
            <PayrollTab
              payrollSummary={payrollSummary}
              formatCurrency={formatCurrency}
              setShowAddEmployeeForm={setShowAddEmployeeForm}
              handleProcessPayroll={handleProcessPayroll}
            />
          )}

          {activeTab === 'reports' && (
            <ReportsTab
              handleGenerateReport={handleGenerateReport}
            />
          )}
        </div>
      </div>

      {/* Forms */}
      <AddEmployeeForm
        isOpen={showAddEmployeeForm}
        onClose={() => setShowAddEmployeeForm(false)}
        onEmployeeAdded={handleEmployeeAdded}
      />

      <InvoiceCreationForm
        isOpen={showInvoiceForm}
        onClose={() => setShowInvoiceForm(false)}
        onInvoiceCreated={handleInvoiceCreated}
      />
    </div>
  );
};

export default Operations;
