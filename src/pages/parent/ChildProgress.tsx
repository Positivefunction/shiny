import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ChildProgress() {
  return (
    <div className="space-y-6 py-4">
      <h1 className="font-display text-2xl">Progress</h1>
      <Card><CardHeader><CardTitle>Weekly Accuracy</CardTitle></CardHeader><CardContent className="h-48 flex items-center justify-center text-muted-foreground">Progress chart coming soon</CardContent></Card>
      <Card><CardHeader><CardTitle>Phoneme Progress</CardTitle></CardHeader><CardContent><div className="space-y-3">
        <div className="flex justify-between"><span>/r/ sound</span><span className="font-bold text-warning">65%</span></div>
        <div className="flex justify-between"><span>/s/ sound</span><span className="font-bold text-success">85%</span></div>
        <div className="flex justify-between"><span>/k/ sound</span><span className="font-bold text-success">90%</span></div>
      </div></CardContent></Card>
    </div>
  );
}
