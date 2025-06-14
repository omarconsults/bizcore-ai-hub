
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, PlayCircle, CheckCircle, BookOpen } from 'lucide-react';

const QuickAccess = () => {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle>Quick Access</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button variant="outline" className="w-full justify-start">
          <FileText className="mr-2" size={16} />
          Document Templates
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <PlayCircle className="mr-2" size={16} />
          Video Tutorials
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <CheckCircle className="mr-2" size={16} />
          Compliance Checklists
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <BookOpen className="mr-2" size={16} />
          Legal Guides
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickAccess;
