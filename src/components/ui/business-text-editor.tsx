
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import RichTextEditor from './rich-text-editor';
import { FileText, Download, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BusinessTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  showTemplates?: boolean;
  showActions?: boolean;
  documentType?: string;
}

const BusinessTextEditor: React.FC<BusinessTextEditorProps> = ({
  value,
  onChange,
  placeholder,
  className,
  showTemplates = true,
  showActions = true,
  documentType = 'document'
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const { toast } = useToast();

  const businessTemplates = {
    'business-letter': {
      name: 'Business Letter',
      content: `<p><strong>[Your Company Name]</strong><br>
[Your Address]<br>
[City, State, Postal Code]<br>
[Date]</p>

<p><strong>[Recipient Name]</strong><br>
[Recipient Title]<br>
[Company Name]<br>
[Address]</p>

<p><strong>Subject: [Subject Line]</strong></p>

<p>Dear [Recipient Name],</p>

<p>[Opening paragraph - state the purpose of your letter]</p>

<p>[Body paragraphs - provide details, explanations, or requests]</p>

<p>[Closing paragraph - summarize and state next steps]</p>

<p>Sincerely,<br>
[Your Name]<br>
[Your Title]</p>`
    },
    'meeting-minutes': {
      name: 'Meeting Minutes',
      content: `<h2><strong>Meeting Minutes</strong></h2>

<p><strong>Date:</strong> [Date]<br>
<strong>Time:</strong> [Start Time] - [End Time]<br>
<strong>Location:</strong> [Location/Platform]<br>
<strong>Chair:</strong> [Meeting Chair]</p>

<h3><strong>Attendees:</strong></h3>
<ul>
<li>[Name 1] - [Title]</li>
<li>[Name 2] - [Title]</li>
</ul>

<h3><strong>Agenda Items:</strong></h3>
<ol>
<li><strong>[Agenda Item 1]</strong>
<ul>
<li>Discussion: [Summary of discussion]</li>
<li>Decision: [Decision made]</li>
<li>Action: [Action items and responsible parties]</li>
</ul>
</li>
</ol>

<h3><strong>Next Steps:</strong></h3>
<ul>
<li>[Action item 1] - [Responsible person] - [Due date]</li>
</ul>

<p><strong>Next Meeting:</strong> [Date and time]</p>`
    },
    'policy-document': {
      name: 'Policy Document',
      content: `<h1><strong>[Policy Title]</strong></h1>

<h2><strong>1. Purpose</strong></h2>
<p>[Describe the purpose and scope of this policy]</p>

<h2><strong>2. Scope</strong></h2>
<p>[Define who this policy applies to]</p>

<h2><strong>3. Policy Statement</strong></h2>
<p>[Main policy statement and principles]</p>

<h2><strong>4. Procedures</strong></h2>
<ol>
<li><strong>[Step 1]:</strong> [Description]</li>
<li><strong>[Step 2]:</strong> [Description]</li>
</ol>

<h2><strong>5. Responsibilities</strong></h2>
<ul>
<li><strong>[Role/Position]:</strong> [Responsibilities]</li>
</ul>

<h2><strong>6. Compliance</strong></h2>
<p>[Compliance requirements and consequences]</p>

<h2><strong>7. Review</strong></h2>
<p>This policy will be reviewed [frequency] or as needed.</p>

<p><strong>Effective Date:</strong> [Date]<br>
<strong>Approved By:</strong> [Name, Title]<br>
<strong>Next Review:</strong> [Date]</p>`
    }
  };

  const handleTemplateSelect = (templateKey: string) => {
    if (templateKey && businessTemplates[templateKey as keyof typeof businessTemplates]) {
      const template = businessTemplates[templateKey as keyof typeof businessTemplates];
      onChange(template.content);
      setSelectedTemplate(templateKey);
      toast({
        title: "Template Applied",
        description: `${template.name} template has been loaded.`
      });
    }
  };

  const copyToClipboard = () => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = value;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    navigator.clipboard.writeText(textContent);
    toast({
      title: "Copied to Clipboard",
      description: "Content copied successfully!"
    });
  };

  const downloadDocument = () => {
    const blob = new Blob([value], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${documentType.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Document Downloaded",
      description: "Your document has been downloaded successfully!"
    });
  };

  return (
    <div className={className}>
      {showTemplates && (
        <div className="mb-4">
          <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a business template..." />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(businessTemplates).map(([key, template]) => (
                <SelectItem key={key} value={key}>
                  <div className="flex items-center gap-2">
                    <FileText size={16} />
                    {template.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <RichTextEditor
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mb-4"
      />

      {showActions && (
        <div className="flex gap-2">
          <Button variant="outline" onClick={copyToClipboard} className="flex-1">
            <Copy className="mr-2 h-4 w-4" />
            Copy Text
          </Button>
          <Button variant="outline" onClick={downloadDocument} className="flex-1">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          {selectedTemplate && (
            <Button 
              variant="outline" 
              onClick={() => {
                setSelectedTemplate('');
                onChange('');
              }}
            >
              Clear
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default BusinessTextEditor;
