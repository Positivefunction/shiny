import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Reports() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl">Reports</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card><CardHeader><CardTitle>Accuracy Trends</CardTitle></CardHeader><CardContent className="h-48 flex items-center justify-center text-muted-foreground">Chart will appear here</CardContent></Card>
        <Card><CardHeader><CardTitle>Phoneme Analysis</CardTitle></CardHeader><CardContent className="h-48 flex items-center justify-center text-muted-foreground">Analysis will appear here</CardContent></Card>
      </div>
    </div>
  );
}
