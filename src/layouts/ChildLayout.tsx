import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChildBottomNav } from '@/components/navigation/ChildBottomNav';
import { GameHeader } from '@/components/game/GameHeader';

export function ChildLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with hearts, streak, XP */}
      <GameHeader />
      
      {/* Main content area */}
      <motion.main 
        className="flex-1 overflow-auto pb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.main>
      
      {/* Bottom navigation */}
      <ChildBottomNav />
    </div>
  );
}
