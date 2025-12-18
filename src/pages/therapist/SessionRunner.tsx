import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Mic, Volume2, ChevronRight } from 'lucide-react';

export default function SessionRunner() {
  const { sessionId } = useParams();
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <div className="card-game w-full max-w-md p-8 text-center">
        <div className="text-6xl mb-4">🍎</div>
        <h2 className="font-display text-3xl mb-2">Apple</h2>
        <p className="text-muted-foreground mb-6">Ask the child to say this word</p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" size="lg"><Volume2 className="w-5 h-5" /></Button>
          <Button size="lg" className="btn-game btn-game-primary"><Mic className="w-5 h-5 mr-2" />Record</Button>
          <Button variant="outline" size="lg"><ChevronRight className="w-5 h-5" /></Button>
        </div>
      </div>
    </div>
  );
}
