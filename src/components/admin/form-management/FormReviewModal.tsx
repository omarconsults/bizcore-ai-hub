
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, MessageCircle, FileText, Download } from 'lucide-react';
import { FormSubmission, FormReviewAction } from './types';

interface FormReviewModalProps {
  form: FormSubmission | null;
  isOpen: boolean;
  onClose: () => void;
  onReview: (formId: string, action: FormReviewAction) => void;
}

const FormReviewModal = ({ form, isOpen, onClose, onReview }: FormReviewModalProps) => {
  const [notes, setNotes] = useState('');
  const [actionType, setActionType] = useState<'approve' | 'reject' | 'request-clarification' | null>(null);

  if (!form) return null;

  const handleReview = () => {
    if (!actionType || !notes.trim()) return;

    onReview(form.id, {
      type: actionType,
      notes: notes.trim(),
      reviewer_id: 'current-admin-id'
    });

    setNotes('');
    setActionType(null);
    onClose();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'under-review': 'bg-blue-100 text-blue-800',
      'approved': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800',
      'needs-clarification': 'bg-orange-100 text-orange-800'
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800'}>
        {status.replace('-', ' ')}
      </Badge>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Review Form Submission</span>
            {getStatusBadge(form.status)}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Business Name</label>
                  <p className="text-gray-900">{form.business_name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">User Email</label>
                  <p className="text-gray-900">{form.user_email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Form Type</label>
                  <p className="text-gray-900 capitalize">{form.form_type.replace('-', ' ')}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Submitted</label>
                  <p className="text-gray-900">{formatDate(form.submitted_at)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form Data */}
          <Card>
            <CardHeader>
              <CardTitle>Form Data</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto">
                {JSON.stringify(form.form_data, null, 2)}
              </pre>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Documents</CardTitle>
            </CardHeader>
            <CardContent>
              {form.documents.length > 0 ? (
                <div className="space-y-3">
                  {form.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="text-blue-600" size={20} />
                        <div>
                          <p className="font-medium text-gray-900">{doc.name}</p>
                          <p className="text-sm text-gray-500">
                            {(doc.file_size / 1024 / 1024).toFixed(2)} MB • {formatDate(doc.uploaded_at)}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download size={14} className="mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No documents uploaded</p>
              )}
            </CardContent>
          </Card>

          {/* Previous Review */}
          {form.reviewed_at && (
            <Card>
              <CardHeader>
                <CardTitle>Previous Review</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><strong>Reviewed by:</strong> {form.reviewed_by}</p>
                  <p><strong>Reviewed at:</strong> {formatDate(form.reviewed_at)}</p>
                  {form.reviewer_notes && (
                    <div>
                      <strong>Notes:</strong>
                      <p className="mt-1 p-3 bg-gray-50 rounded-lg">{form.reviewer_notes}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Review Actions */}
          {form.status !== 'approved' && (
            <Card>
              <CardHeader>
                <CardTitle>Review Action</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Button
                    variant={actionType === 'approve' ? 'default' : 'outline'}
                    onClick={() => setActionType('approve')}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle size={16} />
                    Approve
                  </Button>
                  <Button
                    variant={actionType === 'reject' ? 'destructive' : 'outline'}
                    onClick={() => setActionType('reject')}
                    className="flex items-center gap-2"
                  >
                    <XCircle size={16} />
                    Reject
                  </Button>
                  <Button
                    variant={actionType === 'request-clarification' ? 'default' : 'outline'}
                    onClick={() => setActionType('request-clarification')}
                    className="flex items-center gap-2"
                  >
                    <MessageCircle size={16} />
                    Request Clarification
                  </Button>
                </div>

                {actionType && (
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Review Notes {actionType === 'approve' ? '(optional)' : '(required)'}
                    </label>
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={
                        actionType === 'approve' 
                          ? 'Add any approval notes...'
                          : actionType === 'reject'
                          ? 'Please explain why this form is being rejected...'
                          : 'Please specify what clarification is needed...'
                      }
                      rows={4}
                    />
                  </div>
                )}

                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleReview}
                    disabled={!actionType || (actionType !== 'approve' && !notes.trim())}
                  >
                    Submit Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FormReviewModal;
