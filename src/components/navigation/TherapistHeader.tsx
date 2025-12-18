import { useAuthStore, useUIStore, useSyncStore } from '@/stores';
import { Menu, Bell, Search, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function TherapistHeader() {
  const { user } = useAuthStore();
  const { toggleSidebar } = useUIStore();
  const { isOnline, pendingCount } = useSyncStore();

  return (
    <header className="sticky top-0 z-30 bg-card border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 gap-4">
        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="w-5 h-5" />
        </Button>

        {/* Search - hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search patients, packs..." 
              className="pl-9 bg-muted border-0"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Sync status */}
          <div className="flex items-center gap-2 text-sm">
            {isOnline ? (
              <Wifi className="w-4 h-4 text-success" />
            ) : (
              <WifiOff className="w-4 h-4 text-muted-foreground" />
            )}
            {pendingCount > 0 && (
              <span className="text-xs text-muted-foreground">
                {pendingCount} pending
              </span>
            )}
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
          </Button>

          {/* User avatar */}
          <Avatar className="w-8 h-8">
            <AvatarImage src={user?.avatarUrl} />
            <AvatarFallback className="bg-accent text-accent-foreground text-sm">
              {user?.name?.charAt(0) || 'T'}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
