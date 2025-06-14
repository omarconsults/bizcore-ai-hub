
import React, { useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, FileText, CheckCircle } from 'lucide-react';

interface FileUploadFormProps {
  isOpen: boolean;
  onClose: () => void;
  onFilesUploaded: (files: File[]) => void;
}

interface UploadedFile {
  file: File;
  id: string;
  status: 'uploading' | 'completed' | 'error';
}

const FileUploadForm: React.FC<FileUploadFormProps> = ({ 
  isOpen, 
  onClose, 
  onFilesUploaded 
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = useCallback(async (files: FileList) => {
    const newFiles: UploadedFile[] = Array.from(files).map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      status: 'uploading' as const
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Simulate upload process
    for (const uploadFile of newFiles) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUploadedFiles(prev => 
        prev.map(f => 
          f.id === uploadFile.id 
            ? { ...f, status: 'completed' as const }
            : f
        )
      );
    }

    toast({
      title: "Files Uploaded",
      description: `${files.length} file(s) uploaded successfully.`,
    });

    onFilesUploaded(Array.from(files));
  }, [onFilesUploaded, toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="text-blue-900" size={20} />
            Upload Documents
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging 
                ? 'border-blue-900 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <Upload className="mx-auto text-gray-400 mb-4" size={48} />
            <h4 className="text-lg font-medium text-gray-900 mb-2">
              {isDragging ? 'Drop files here' : 'Upload Documents'}
            </h4>
            <p className="text-gray-600 mb-4">
              Drag and drop files here or click to browse
            </p>
            <input
              type="file"
              multiple
              className="hidden"
              id="file-upload"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={handleFileInput}
            />
            <label htmlFor="file-upload">
              <Button variant="outline" asChild>
                <span>Choose Files</span>
              </Button>
            </label>
            <p className="text-xs text-gray-500 mt-2">
              Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB each)
            </p>
          </div>

          {uploadedFiles.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">Uploaded Files</h4>
                <div className="space-y-2">
                  {uploadedFiles.map((uploadFile) => (
                    <div key={uploadFile.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        <FileText className="text-blue-900" size={16} />
                        <span className="text-sm">{uploadFile.file.name}</span>
                        {uploadFile.status === 'uploading' && (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-900"></div>
                        )}
                        {uploadFile.status === 'completed' && (
                          <CheckCircle className="text-emerald-600" size={16} />
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(uploadFile.id)}
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-between">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button 
              onClick={onClose}
              disabled={uploadedFiles.some(f => f.status === 'uploading')}
              className="bg-blue-900 hover:bg-blue-800"
            >
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FileUploadForm;
