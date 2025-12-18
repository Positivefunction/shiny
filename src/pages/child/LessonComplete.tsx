import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Star, Zap, Trophy } from 'lucide-react';

export default function LessonComplete() {
  const navigate = useNavigate();
  return (
    <div className="min-h-full flex flex-col items-center justify-center px-4 py-8 text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-8xl mb-6">🎊</motion.div>
      <h1 className="font-display text-3xl text-foreground mb-2">Lesson Complete!</h1>
      <p className="text-muted-foreground mb-8">You're doing amazing!</p>
      <div className="flex gap-4 mb-8">
        <div className="card-game p-4 text-center"><Star className="w-8 h-8 text-xp mx-auto mb-1" /><span className="font-bold">3 Stars</span></div>
        <div className="card-game p-4 text-center"><Zap className="w-8 h-8 text-primary mx-auto mb-1" /><span className="font-bold">+30 XP</span></div>
      </div>
      <Button onClick={() => navigate('/child/quest')} className="btn-game btn-game-success">Continue</Button>
    </div>
  );
}
