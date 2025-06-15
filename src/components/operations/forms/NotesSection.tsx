
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface NotesSectionProps {
  notes: string;
  onInputChange: (field: string, value: string) => void;
}

const NotesSection: React.FC<NotesSectionProps> = ({
  notes,
  onInputChange
}) => {
  return (
    <div>
      <Label htmlFor="notes">Notes (Optional)</Label>
      <Textarea
        id="notes"
        value={notes}
        onChange={(e) => onInputChange('notes', e.target.value)}
        placeholder="Additional notes or terms..."
        rows={3}
      />
    </div>
  );
};

export default NotesSection;
