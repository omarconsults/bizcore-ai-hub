
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
    },
    {
      category: 'Export & Trade',
      items: [
        { name: 'NEPC Registration', status: 'pending', dueDate: '2024-06-01', description: 'Register with Nigerian Export Promotion Council' },
        { name: 'Export License', status: 'pending', dueDate: '2024-06-15', description: 'Obtain export license for international trade' },
        { name: 'Form M Registration', status: 'pending', dueDate: '2024-05-30', description: 'Import duty documentation' }
      ]
    },
    {
      category: 'Quality & Standards',
      items: [
        { name: 'SON Certification', status: 'pending', dueDate: '2024-07-01', description: 'Standards Organisation of Nigeria certification' },
        { name: 'ISO Certification', status: 'pending', dueDate: '2024-08-01', description: 'International quality management standards' },
        { name: 'Product Testing', status: 'pending', dueDate: '2024-06-20', description: 'Required product quality testing' }
      ]
    },
    {
      category: 'Health & Safety',
      items: [
        { name: 'NAFDAC Registration', status: 'pending', dueDate: '2024-05-25', description: 'Food, drug, and cosmetic product registration' },
        { name: 'Environmental Impact Assessment', status: 'pending', dueDate: '2024-07-15', description: 'Required for manufacturing operations' },
        { name: 'Occupational Health & Safety', status: 'pending', dueDate: '2024-06-10', description: 'Workplace safety compliance' }
      ]
    },
    {
      category: 'Professional Bodies',
      items: [
        { name: 'Professional Registration', status: 'pending', dueDate: '2024-06-30', description: 'Register with relevant professional body' },
        { name: 'Continuing Education', status: 'pending', dueDate: '2024-12-31', description: 'Complete required professional development' },
        { name: 'Annual Practicing Fee', status: 'due-soon', dueDate: '2024-04-30', description: 'Pay annual professional body fees' }
      ]
    }
  ];

  const handleFilesUploaded = (files: File[]) => {
    toast({
      title: "Files Uploaded",
      description: `${files.length} file(s) added to your document vault.`,
    });
  };

  const overallCompliance = 68; // Updated to reflect more comprehensive compliance
  const overdueItems = complianceItems.flatMap(cat => cat.items).filter(item => item.status === 'overdue').length;
  const dueSoonItems = complianceItems.flatMap(cat => cat.items).filter(item => item.status === 'due-soon').length;
  const completedItems = complianceItems.flatMap(cat => cat.items).filter(item => item.status === 'completed').length;

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
