import { motion } from 'framer-motion';
import { TrendingUp, Calendar, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ParentDashboard() {
  return (
    <div className="space-y-6 py-4">
      <h1 className="font-display text-2xl">Welcome, Parent</h1>
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="text-4xl">🦁</div>
            <div><h3 className="font-semibold">Aarav is doing great!</h3><p className="text-sm text-muted-foreground">7-day streak • 250 XP this week</p></div>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-2 gap-4">
        <Card><CardHeader className="pb-2"><TrendingUp className="w-5 h-5 text-success" /></CardHeader><CardContent><div className="text-2xl font-bold">78%</div><p className="text-xs text-muted-foreground">Accuracy</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><Calendar className="w-5 h-5 text-primary" /></CardHeader><CardContent><div className="text-2xl font-bold">5</div><p className="text-xs text-muted-foreground">Sessions</p></CardContent></Card>
      </div>
      <Card><CardHeader><CardTitle>This Week's Focus</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">Working on /r/ and /s/ sounds</p></CardContent></Card>
    </div>
  );
}
