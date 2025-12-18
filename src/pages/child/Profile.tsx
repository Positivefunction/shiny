import { useGameStore, useAuthStore } from '@/stores';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, Settings } from 'lucide-react';

export default function Profile() {
  const { xp, streak, hearts } = useGameStore();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="min-h-full px-4 py-6">
      <div className="max-w-md mx-auto text-center">
        <div className="text-6xl mb-4">🦁</div>
        <h1 className="font-display text-2xl">{user?.name || 'Little Star'}</h1>
        <p className="text-muted-foreground mb-6">Level 1 Explorer</p>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="card-game p-4"><div className="text-2xl font-bold text-primary">{xp}</div><div className="text-xs text-muted-foreground">XP</div></div>
          <div className="card-game p-4"><div className="text-2xl font-bold text-streak">{streak}</div><div className="text-xs text-muted-foreground">Streak</div></div>
          <div className="card-game p-4"><div className="text-2xl font-bold text-destructive">{hearts}</div><div className="text-xs text-muted-foreground">Hearts</div></div>
        </div>
        <Button variant="outline" onClick={handleLogout} className="w-full"><LogOut className="w-4 h-4 mr-2" />Switch Role</Button>
      </div>
    </div>
  );
}
