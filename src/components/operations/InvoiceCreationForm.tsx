import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { X, Plus, Trash2 } from 'lucide-react';

interface InvoiceCreationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onInvoiceCreated: (invoice: any) => void;
}

interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

const InvoiceCreationForm: React.FC<InvoiceCreationFormProps> = ({ isOpen, onClose, onInvoiceCreated }) => {
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
          {/* Client Information */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Client Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="clientName">Client Name *</Label>
                <Input
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) => handleInputChange('clientName', e.target.value)}
                  placeholder="Enter client name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="clientEmail">Client Email *</Label>
                <Input
                  id="clientEmail"
                  type="email"
                  value={formData.clientEmail}
                  onChange={(e) => handleInputChange('clientEmail', e.target.value)}
                  placeholder="client@example.com"
                  required
                />
              </div>
            </div>
          </div>

          {/* Invoice Details */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Invoice Details</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="invoiceType">Invoice Type *</Label>
                <Select onValueChange={(value) => handleInputChange('invoiceType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="service">Service Invoice</SelectItem>
                    <SelectItem value="product">Product Invoice</SelectItem>
                    <SelectItem value="consultation">Consultation</SelectItem>
                    <SelectItem value="recurring">Recurring Invoice</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date *</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleInputChange('dueDate', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Invoice Items */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-gray-900">Invoice Items</h4>
              <Button type="button" onClick={addItem} size="sm" variant="outline">
                <Plus size={16} className="mr-1" />
                Add Item
              </Button>
            </div>
            
            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-end">
                  <div className="col-span-5">
                    <Label>Description</Label>
                    <Input
                      value={item.description}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      placeholder="Item description"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Qty</Label>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
                      min="1"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Rate (₦)</Label>
                    <Input
                      type="number"
                      value={item.rate}
                      onChange={(e) => handleItemChange(index, 'rate', parseInt(e.target.value) || 0)}
                      min="0"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Amount</Label>
                    <Input
                      value={`₦${item.amount.toLocaleString()}`}
                      readOnly
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="col-span-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(index)}
                      disabled={items.length === 1}
                      className="p-2"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-right">
              <div className="text-lg font-semibold">
                Total: ₦{calculateTotal().toLocaleString()}
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Additional notes or terms..."
              rows={3}
            />
          </div>

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
