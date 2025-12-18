import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TherapistSidebar } from '@/components/navigation/TherapistSidebar';
import { TherapistHeader } from '@/components/navigation/TherapistHeader';
import { useUIStore } from '@/stores';
import { cn } from '@/lib/utils';

export function TherapistLayout() {
  const { isSidebarOpen } = useUIStore();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <TherapistSidebar />
      
      {/* Main content area */}
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300",
        isSidebarOpen ? "md:ml-64" : "md:ml-16"
      )}>
        {/* Header */}
        <TherapistHeader />
        
        {/* Page content */}
        <motion.main 
          className="flex-1 overflow-auto p-4 md:p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
}
