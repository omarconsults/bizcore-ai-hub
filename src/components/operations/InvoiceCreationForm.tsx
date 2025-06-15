
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { X } from 'lucide-react';
import ClientInformationSection from './forms/ClientInformationSection';
import InvoiceDetailsSection from './forms/InvoiceDetailsSection';
import InvoiceItemsSection, { InvoiceItem } from './forms/InvoiceItemsSection';
import NotesSection from './forms/NotesSection';

interface InvoiceCreationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onInvoiceCreated: (invoice: any) => void;
}

const InvoiceCreationForm: React.FC<InvoiceCreationFormProps> = ({ 
  isOpen, 
  onClose, 
  onInvoiceCreated 
}) => {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    invoiceType: '',
    dueDate: '',
    notes: ''
  });
  
  const [items, setItems] = useState<InvoiceItem[]>([
    { description: '', quantity: 1, rate: 0, amount: 0 }
  ]);
  
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    
    // Calculate amount for this item
    if (field === 'quantity' || field === 'rate') {
      updatedItems[index].amount = updatedItems[index].quantity * updatedItems[index].rate;
    }
    
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, rate: 0, amount: 0 }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.amount, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.clientName || !formData.invoiceType || !formData.dueDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const newInvoice = {
      id: `INV-${String(Date.now()).slice(-6)}`,
      client: formData.clientName,
      clientEmail: formData.clientEmail,
      amount: calculateTotal(),
      dueDate: formData.dueDate,
      status: 'pending',
      type: formData.invoiceType,
      items: items,
      notes: formData.notes,
      createdAt: new Date().toISOString().split('T')[0]
    };

    onInvoiceCreated(newInvoice);
    
    toast({
      title: "Invoice Created",
      description: `Invoice ${newInvoice.id} has been created successfully.`,
    });

    // Reset form
    setFormData({
      clientName: '',
      clientEmail: '',
      invoiceType: '',
      dueDate: '',
      notes: ''
    });
    setItems([{ description: '', quantity: 1, rate: 0, amount: 0 }]);
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Create New Invoice</DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-1"
            >
              <X size={16} />
            </Button>
          </div>
          <DialogDescription>
            Create a professional invoice for your services or products.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <ClientInformationSection
            clientName={formData.clientName}
            clientEmail={formData.clientEmail}
            onInputChange={handleInputChange}
          />

          <InvoiceDetailsSection
            invoiceType={formData.invoiceType}
            dueDate={formData.dueDate}
            onInputChange={handleInputChange}
          />

          <InvoiceItemsSection
            items={items}
            onItemChange={handleItemChange}
            onAddItem={addItem}
            onRemoveItem={removeItem}
            calculateTotal={calculateTotal}
          />

          <NotesSection
            notes={formData.notes}
            onInputChange={handleInputChange}
          />

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-blue-900 hover:bg-blue-800">
              Create Invoice
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceCreationForm;
