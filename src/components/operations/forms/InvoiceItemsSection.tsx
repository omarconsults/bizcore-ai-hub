
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';

export interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface InvoiceItemsSectionProps {
  items: InvoiceItem[];
  onItemChange: (index: number, field: keyof InvoiceItem, value: string | number) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
  calculateTotal: () => number;
}

const InvoiceItemsSection: React.FC<InvoiceItemsSectionProps> = ({
  items,
  onItemChange,
  onAddItem,
  onRemoveItem,
  calculateTotal
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-gray-900">Invoice Items</h4>
        <Button type="button" onClick={onAddItem} size="sm" variant="outline">
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
                onChange={(e) => onItemChange(index, 'description', e.target.value)}
                placeholder="Item description"
              />
            </div>
            <div className="col-span-2">
              <Label>Qty</Label>
              <Input
                type="number"
                value={item.quantity}
                onChange={(e) => onItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
                min="1"
              />
            </div>
            <div className="col-span-2">
              <Label>Rate (₦)</Label>
              <Input
                type="number"
                value={item.rate}
                onChange={(e) => onItemChange(index, 'rate', parseInt(e.target.value) || 0)}
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
                onClick={() => onRemoveItem(index)}
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
  );
};

export default InvoiceItemsSection;
