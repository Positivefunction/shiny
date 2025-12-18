import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Clock } from 'lucide-react';

const exercises = [
  { id: '1', name: 'R Sound Practice', duration: '5 min', desc: 'Practice words with /r/' },
  { id: '2', name: 'S Blends', duration: '5 min', desc: 'Words starting with st-, sp-, sk-' },
];

export default function HomePractice() {
  return (
    <div className="space-y-6 py-4">
      <h1 className="font-display text-2xl">Home Practice</h1>
      <Card className="bg-primary/5 border-primary/20"><CardContent className="pt-6"><p className="text-sm">Today's goal: <span className="font-bold">10 minutes</span> of practice</p><div className="mt-2 progress-game"><div className="progress-game-fill" style={{ width: '30%' }} /></div></CardContent></Card>
      <div className="space-y-3">
        {exercises.map((ex) => (
          <Card key={ex.id} className="card-game-hover">
            <CardContent className="flex items-center gap-4 py-4">
              <Button size="icon" className="shrink-0"><Play className="w-4 h-4" /></Button>
              <div className="flex-1"><h3 className="font-semibold">{ex.name}</h3><p className="text-sm text-muted-foreground">{ex.desc}</p></div>
              <div className="text-sm text-muted-foreground flex items-center gap-1"><Clock className="w-4 h-4" />{ex.duration}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
