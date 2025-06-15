import React, { useState } from 'react';
import ComplianceHeader from './compliance/ComplianceHeader';
import ComplianceStats from './compliance/ComplianceStats';
import ComplianceTabs from './compliance/ComplianceTabs';
import ComplianceOverview from './compliance/ComplianceOverview';
import DocumentGenerator from './compliance/DocumentGenerator';
import ComplianceCalendar from './compliance/ComplianceCalendar';
import DocumentVault from './compliance/DocumentVault';
import ComplianceSetupForm from './compliance/ComplianceSetupForm';
import FileUploadForm from './compliance/FileUploadForm';
import { useToast } from '@/hooks/use-toast';

const ComplianceHub = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showComplianceSetup, setShowComplianceSetup] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const { toast } = useToast();

  const complianceItems = [
    {
      category: 'Corporate Registration',
      items: [
        { name: 'CAC Certificate', status: 'completed', dueDate: null, description: 'Certificate of Incorporation obtained' },
        { name: 'Annual Returns', status: 'due-soon', dueDate: '2024-04-15', description: 'File annual returns with CAC' },
        { name: 'Share Allotment Return', status: 'completed', dueDate: null, description: 'Filed successfully' }
      ]
    },
    {
      category: 'Tax Compliance',
      items: [
        { name: 'Company Income Tax', status: 'overdue', dueDate: '2024-03-31', description: 'Submit annual tax returns' },
        { name: 'VAT Registration', status: 'completed', dueDate: null, description: 'Registered for VAT' },
        { name: 'PAYE Returns', status: 'due-soon', dueDate: '2024-04-10', description: 'Monthly employee tax returns' },
        { name: 'Withholding Tax', status: 'pending', dueDate: '2024-04-30', description: 'Submit WHT returns' }
      ]
    },
    {
      category: 'Data Protection',
      items: [
        { name: 'NDPR Compliance', status: 'due-soon', dueDate: '2024-04-20', description: 'Update privacy policy and data audit' },
        { name: 'Data Processing Agreement', status: 'pending', dueDate: '2024-05-01', description: 'Review and update DPA' }
      ]
    },
    {
      category: 'Industry Licenses',
      items: [
        { name: 'Business Premises Registration', status: 'completed', dueDate: null, description: 'Lagos State permit obtained' },
        { name: 'Fire Safety Certificate', status: 'due-soon', dueDate: '2024-04-25', description: 'Renew fire safety certification' },
        { name: 'NAFDAC Permit', status: 'pending', dueDate: '2024-05-15', description: 'Required for food/cosmetic products' }
      ]
    }
  ];

  const handleFilesUploaded = (files: File[]) => {
    toast({
      title: "Files Uploaded",
      description: `${files.length} file(s) added to your document vault.`,
    });
  };

  const overallCompliance = 73;
  const overdueItems = complianceItems.flatMap(cat => cat.items).filter(item => item.status === 'overdue').length;
  const dueSoonItems = complianceItems.flatMap(cat => cat.items).filter(item => item.status === 'due-soon').length;
  const completedItems = 8;

  return (
    <>
      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
        <ComplianceHeader overallCompliance={overallCompliance} />
        
        <ComplianceStats 
          overdueItems={overdueItems}
          dueSoonItems={dueSoonItems}
          completedItems={completedItems}
        />

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <ComplianceTabs activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="p-6">
            {activeTab === 'overview' && (
              <ComplianceOverview complianceItems={complianceItems} />
            )}

            {activeTab === 'documents' && (
              <DocumentGenerator />
            )}

            {activeTab === 'calendar' && (
              <ComplianceCalendar onSetupReminders={() => setShowComplianceSetup(true)} />
            )}

            {activeTab === 'vault' && (
              <DocumentVault onUploadFiles={() => setShowFileUpload(true)} />
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <ComplianceSetupForm
        isOpen={showComplianceSetup}
        onClose={() => setShowComplianceSetup(false)}
      />

      <FileUploadForm
        isOpen={showFileUpload}
        onClose={() => setShowFileUpload(false)}
        onFilesUploaded={handleFilesUploaded}
      />
    </>
  );
};

export default ComplianceHub;
