import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, FileText } from 'lucide-react';

export default function PatientProfile() {
  const { patientId } = useParams();
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-3xl">👤</div>
        <div><h1 className="font-display text-2xl">Aarav Kumar</h1><p className="text-muted-foreground">Age 6 • Hindi, English</p></div>
      </div>
      <div className="flex gap-3">
        <Button className="flex-1"><Play className="w-4 h-4 mr-2" />Start Session</Button>
        <Button variant="outline" className="flex-1"><FileText className="w-4 h-4 mr-2" />View Reports</Button>
      </div>
      <Card><CardHeader><CardTitle>Progress Overview</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">Overall accuracy: 75% • Weak targets: /r/, /s/</p></CardContent></Card>
      <Card><CardHeader><CardTitle>Recent Sessions</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">No sessions yet</p></CardContent></Card>
    </div>
  );
}
