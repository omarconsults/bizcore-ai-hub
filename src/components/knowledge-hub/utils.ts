
import { PlayCircle, Download, FileText, BookOpen } from 'lucide-react';

export const getTypeIcon = (type: string) => {
  switch (type) {
    case 'video': return PlayCircle;
    case 'template': return Download;
    case 'guide': return FileText;
    case 'course': return BookOpen;
    default: return FileText;
  }
};

export const getTypeColor = (type: string) => {
  switch (type) {
    case 'video': return 'bg-blue-100 text-blue-800';
    case 'template': return 'bg-emerald-100 text-emerald-800';
    case 'guide': return 'bg-purple-100 text-purple-800';
    case 'course': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};
