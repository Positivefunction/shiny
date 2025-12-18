import { useAuthStore } from '@/stores';
import { Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ParentHeader() {
  const { user } = useAuthStore();

  return (
    <header className="sticky top-0 z-40 bg-card border-b border-border safe-area-top">
      <div className="flex items-center justify-between h-14 px-4">
        <div>
          <h1 className="font-display text-lg text-foreground">VANI AI</h1>
          <p className="text-xs text-muted-foreground">Parent Dashboard</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
