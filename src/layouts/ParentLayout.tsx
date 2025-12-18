import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ParentBottomNav } from '@/components/navigation/ParentBottomNav';
import { ParentHeader } from '@/components/navigation/ParentHeader';

export function ParentLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <ParentHeader />
      
      {/* Main content area */}
      <motion.main 
        className="flex-1 overflow-auto pb-20 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.main>
      
      {/* Bottom navigation */}
      <ParentBottomNav />
    </div>
  );
}
