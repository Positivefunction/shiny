import { motion } from 'framer-motion';
import { Trophy, Star, Flame, Target } from 'lucide-react';

const badges = [
  { id: '1', name: 'First Word', icon: '🎯', earned: true },
  { id: '2', name: '7-Day Streak', icon: '🔥', earned: true },
  { id: '3', name: 'Perfect Lesson', icon: '⭐', earned: false },
  { id: '4', name: 'Speed Star', icon: '⚡', earned: false },
];

export default function Rewards() {
  return (
    <div className="min-h-full px-4 py-6">
      <h1 className="font-display text-2xl text-foreground text-center mb-6">Your Rewards</h1>
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {badges.map((badge, i) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`card-game p-6 text-center ${!badge.earned && 'opacity-50'}`}
          >
            <div className="text-4xl mb-2">{badge.icon}</div>
            <h3 className="font-semibold text-sm">{badge.name}</h3>
            {badge.earned && <span className="text-xs text-success">Earned!</span>}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
