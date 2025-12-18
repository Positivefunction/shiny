import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';

export default function SessionReview() {
  const { sessionId } = useParams();
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl">Session Review</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card><CardHeader><CardTitle>Session Summary</CardTitle></CardHeader><CardContent><p>Total Cards: 10 • Correct: 8 • Accuracy: 80%</p></CardContent></Card>
        <Card><CardHeader><CardTitle>SOAP Note</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">Auto-generated note will appear here...</p><Button className="mt-4"><FileText className="w-4 h-4 mr-2" />Generate SOAP</Button></CardContent></Card>
      </div>
      <Card><CardHeader><CardTitle>Attempts</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">Review individual attempts here...</p></CardContent></Card>
      <Button><Download className="w-4 h-4 mr-2" />Export Report</Button>
    </div>
  );
}
