import { useGameStore } from '@/stores';
import { motion } from 'framer-motion';
import { Heart, Flame, Zap } from 'lucide-react';

export function GameHeader() {
  const { hearts, streak, xp } = useGameStore();

  return (
    <header className="sticky top-0 z-40 bg-card border-b border-border safe-area-top">
      <div className="flex items-center justify-between h-14 px-4">
        {/* Hearts */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.05, type: "spring" }}
            >
              <Heart 
                className={`w-5 h-5 ${i < hearts ? 'fill-destructive text-destructive' : 'text-muted'}`}
              />
            </motion.div>
          ))}
        </div>

        {/* Streak */}
        <motion.div 
          className="streak-badge"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Flame className="w-4 h-4" />
          <span>{streak}</span>
        </motion.div>

        {/* XP */}
        <motion.div 
          className="xp-badge"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Zap className="w-4 h-4" />
          <span>{xp}</span>
        </motion.div>
      </div>
    </header>
  );
}
