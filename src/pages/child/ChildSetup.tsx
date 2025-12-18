import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore, useGameStore } from '@/stores';
import { db } from '@/lib/db';
import type { ChildProfile, SupportedLanguage } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronRight } from 'lucide-react';

const avatars = [
  { id: 'lion', emoji: '🦁', name: 'Leo' },
  { id: 'elephant', emoji: '🐘', name: 'Gaja' },
  { id: 'peacock', emoji: '🦚', name: 'Mayur' },
  { id: 'parrot', emoji: '🦜', name: 'Tota' },
  { id: 'tiger', emoji: '🐯', name: 'Sher' },
  { id: 'monkey', emoji: '🐵', name: 'Bandar' },
];

export default function ChildSetup() {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();
  const { setProfile } = useGameStore();
  
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  const [step, setStep] = useState<'name' | 'avatar'>('name');

  const handleContinue = async () => {
    if (step === 'name' && name.trim()) {
      setStep('avatar');
      return;
    }

    if (step === 'avatar') {
      // Create child profile
      const profile: ChildProfile = {
        id: crypto.randomUUID(),
        userId: user?.id || crypto.randomUUID(),
        name: name.trim() || 'Little Star',
        avatarId: selectedAvatar.id,
        languagePrefs: ['english', 'hindi'],
        primaryLanguage: 'english' as SupportedLanguage,
        streak: 0,
        xp: 0,
        hearts: 5,
        maxHearts: 5,
        level: 1,
        badges: [],
        lastActiveAt: Date.now(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      // Save profile
      await db.childProfiles.put(profile);

      // Update user with child role if needed
      if (user) {
        const updatedUser = { ...user, name: name.trim() || user.name, role: 'child' as const };
        await db.users.put(updatedUser);
        setUser(updatedUser);
      }

      // Set game profile
      setProfile(profile);

      // Navigate to language selection
      navigate('/child/language');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-20 w-60 h-60 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-40 -left-20 w-60 h-60 rounded-full bg-xp/10 blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-12">
        {step === 'name' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-sm mx-auto text-center"
          >
            <motion.div 
              className="text-6xl mb-6"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              👋
            </motion.div>
            
            <h1 className="font-display text-3xl text-foreground mb-2">
              Hello there!
            </h1>
            <p className="text-muted-foreground mb-8">
              What's your name?
            </p>

            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Type your name..."
              className="text-center text-lg h-14 rounded-2xl border-2 focus:border-primary mb-6"
              autoFocus
            />

            <Button
              onClick={handleContinue}
              disabled={!name.trim()}
              className="btn-game btn-game-primary w-full"
            >
              Continue
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        )}

        {step === 'avatar' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-sm mx-auto text-center"
          >
            <h1 className="font-display text-3xl text-foreground mb-2">
              Hi {name}! 
            </h1>
            <p className="text-muted-foreground mb-8">
              Pick your friend
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {avatars.map((avatar) => (
                <motion.button
                  key={avatar.id}
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`aspect-square rounded-3xl flex flex-col items-center justify-center transition-all ${
                    selectedAvatar.id === avatar.id
                      ? 'bg-primary/10 border-4 border-primary scale-105'
                      : 'bg-card border-2 border-border hover:border-primary/50'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-4xl mb-1">{avatar.emoji}</span>
                  <span className="text-xs font-medium text-muted-foreground">{avatar.name}</span>
                </motion.button>
              ))}
            </div>

            <Button
              onClick={handleContinue}
              className="btn-game btn-game-primary w-full"
            >
              Let's Go!
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
