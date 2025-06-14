import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  FileText, 
  Download,
  Calendar,
  Zap
} from 'lucide-react';
import ComplianceSetupForm from './compliance/ComplianceSetupForm';
import DocumentGeneratorForm from './compliance/DocumentGeneratorForm';
import FileUploadForm from './compliance/FileUploadForm';

const ComplianceHub = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showComplianceSetup, setShowComplianceSetup] = useState(false);
  const [showDocumentGenerator, setShowDocumentGenerator] = useState(false);
  const [selectedDocumentType, setSelectedDocumentType] = useState('');
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

  const documentTemplates = [
    { name: 'Privacy Policy Generator', description: 'NDPR-compliant privacy policy', icon: FileText },
    { name: 'Employment Contract Template', description: 'Standard employment agreement', icon: FileText },
    { name: 'Non-Disclosure Agreement', description: 'Protect confidential information', icon: FileText },
    { name: 'Terms of Service Template', description: 'Website/app terms and conditions', icon: FileText },
    { name: 'Vendor Agreement Template', description: 'Supplier/contractor agreement', icon: FileText },
    { name: 'Data Processing Agreement', description: 'NDPR-compliant DPA template', icon: FileText }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-800';
      case 'due-soon': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="text-emerald-600" size={16} />;
      case 'due-soon': return <Clock className="text-yellow-600" size={16} />;
      case 'overdue': return <AlertTriangle className="text-red-600" size={16} />;
      case 'pending': return <Clock className="text-gray-600" size={16} />;
      default: return <Clock className="text-gray-600" size={16} />;
    }
  };

  const handleComplianceAction = (item) => {
    toast({
      title: "Compliance Action",
      description: `Starting process for ${item.name}`,
    });
  };

  const handleDocumentGenerate = (templateName: string) => {
    setSelectedDocumentType(templateName);
    setShowDocumentGenerator(true);
  };

  const handleFilesUploaded = (files: File[]) => {
    toast({
      title: "Files Uploaded",
      description: `${files.length} file(s) added to your document vault.`,
    });
  };

  const overallCompliance = 73;
  const overdueItems = complianceItems.flatMap(cat => cat.items).filter(item => item.status === 'overdue').length;
  const dueSoonItems = complianceItems.flatMap(cat => cat.items).filter(item => item.status === 'due-soon').length;

  return (
    <>
      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Shield className="text-blue-900" size={28} />
                Compliance Hub
              </h1>
              <p className="text-gray-600 mt-1">Stay compliant with Nigerian business regulations and requirements</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Compliance Score</div>
              <div className="text-2xl font-bold text-emerald-600">{overallCompliance}%</div>
            </div>
          </div>
          <div className="mt-4">
            <Progress value={overallCompliance} className="h-3" />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Overdue Items</p>
                  <p className="text-2xl font-bold text-red-600">{overdueItems}</p>
                </div>
                <AlertTriangle className="text-red-600" size={24} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Due Soon</p>
                  <p className="text-2xl font-bold text-yellow-600">{dueSoonItems}</p>
                </div>
                <Clock className="text-yellow-600" size={24} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-emerald-600">8</p>
                </div>
                <CheckCircle className="text-emerald-600" size={24} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', name: 'Compliance Overview' },
                { id: 'documents', name: 'Document Generator' },
                { id: 'calendar', name: 'Compliance Calendar' },
                { id: 'vault', name: 'Document Vault' }
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
              <div className="space-y-6">
                {complianceItems.map((category, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.category}</h3>
                    <div className="space-y-3">
                      {category.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            {getStatusIcon(item.status)}
                            <div>
                              <h4 className="font-medium text-gray-900">{item.name}</h4>
                              <p className="text-sm text-gray-600">{item.description}</p>
                              {item.dueDate && (
                                <p className="text-xs text-gray-500 mt-1">Due: {item.dueDate}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge className={getStatusColor(item.status)}>
                              {item.status.replace('-', ' ')}
                            </Badge>
                            {item.status !== 'completed' && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleComplianceAction(item)}
                              >
                                {item.status === 'overdue' ? 'Fix Now' : 'Start'}
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'documents' && (
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Document Generator</h3>
                  <p className="text-gray-600">Generate legally compliant documents for your business</p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {documentTemplates.map((template, index) => (
                    <Card key={index} className="border border-gray-200 hover:border-blue-900 transition-colors cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <template.icon className="text-blue-900" size={20} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{template.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                            <Button 
                              size="sm" 
                              className="mt-3 bg-blue-900 hover:bg-blue-800"
                              onClick={() => handleDocumentGenerate(template.name)}
                            >
                              <Zap className="mr-1" size={14} />
                              Generate
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'calendar' && (
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Compliance Calendar</h3>
                  <p className="text-gray-600">Never miss important deadlines and renewal dates</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <Calendar className="mx-auto text-gray-400 mb-4" size={48} />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Calendar Integration Coming Soon</h4>
                  <p className="text-gray-600 mb-4">
                    We're building a comprehensive compliance calendar with automated reminders and notifications.
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => setShowComplianceSetup(true)}
                  >
                    Set Up Reminders
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'vault' && (
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Document Vault</h3>
                  <p className="text-gray-600">Safely store and manage all your business documents</p>
                </div>
                
                <div className="space-y-4">
                  {['Certificate of Incorporation', 'Memorandum of Association', 'Tax Clearance Certificate', 'NDPR Compliance Certificate'].map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="text-blue-900" size={20} />
                        <div>
                          <h4 className="font-medium text-gray-900">{doc}</h4>
                          <p className="text-sm text-gray-600">Uploaded March {15 + index}, 2024</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="mr-1" size={14} />
                        Download
                      </Button>
                    </div>
                  ))}
                  
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
                    onClick={() => setShowFileUpload(true)}
                  >
                    <FileText className="mx-auto text-gray-400 mb-4" size={48} />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Upload Documents</h4>
                    <p className="text-gray-600 mb-4">Drag and drop files here or click to browse</p>
                    <Button variant="outline">
                      Choose Files
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <ComplianceSetupForm
        isOpen={showComplianceSetup}
        onClose={() => setShowComplianceSetup(false)}
      />

      <DocumentGeneratorForm
        isOpen={showDocumentGenerator}
        onClose={() => setShowDocumentGenerator(false)}
        documentType={selectedDocumentType}
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
