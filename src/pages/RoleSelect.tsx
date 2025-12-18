import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/stores';
import { db } from '@/lib/db';
import type { User, UserRole } from '@/types';
import { Gamepad2, Stethoscope, Heart, ChevronRight } from 'lucide-react';

const roles = [
  {
    id: 'child' as UserRole,
    title: 'I am a Child',
    subtitle: 'Play & Learn',
    description: 'Fun speech games with rewards',
    icon: Gamepad2,
    color: 'bg-primary',
    borderColor: 'border-primary',
    path: '/child-setup',
  },
  {
    id: 'therapist' as UserRole,
    title: 'I am a Therapist',
    subtitle: 'Clinic Console',
    description: 'Assess, document, and plan therapy',
    icon: Stethoscope,
    color: 'bg-accent',
    borderColor: 'border-accent',
    path: '/therapist',
  },
  {
    id: 'parent' as UserRole,
    title: 'I am a Parent',
    subtitle: 'Track Progress',
    description: 'Monitor your child\'s journey',
    icon: Heart,
    color: 'bg-secondary',
    borderColor: 'border-secondary',
    path: '/parent',
  },
];

export default function RoleSelect() {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const handleRoleSelect = async (role: typeof roles[0]) => {
    // Create a demo user for MVP
    const user: User = {
      id: crypto.randomUUID(),
      name: role.id === 'child' ? 'Little Star' : role.id === 'therapist' ? 'Dr. Speech' : 'Parent',
      role: role.id,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    // Save to IndexedDB
    await db.users.put(user);
    
    // Update auth store
    setUser(user);
    
    // Navigate to the appropriate section
    navigate(role.path);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-20 -left-40 w-80 h-80 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-3xl text-foreground mb-2">
            Who are you?
          </h1>
          <p className="text-muted-foreground">
            Select your role to continue
          </p>
        </motion.div>

        {/* Role Cards */}
        <div className="max-w-md mx-auto space-y-4">
          {roles.map((role, index) => (
            <motion.button
              key={role.id}
              onClick={() => handleRoleSelect(role)}
              className={`w-full card-game-hover flex items-center gap-4 p-5 border-2 border-transparent hover:${role.borderColor} text-left group`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl ${role.color} flex items-center justify-center shrink-0`}>
                <role.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              
              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-xl text-foreground">{role.title}</h2>
                </div>
                <p className="text-sm font-medium text-muted-foreground">{role.subtitle}</p>
                <p className="text-xs text-muted-foreground mt-1">{role.description}</p>
              </div>

              {/* Arrow */}
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
            </motion.button>
          ))}
        </div>

        {/* Footer note */}
        <motion.p 
          className="text-center text-sm text-muted-foreground mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          You can switch roles anytime from settings
        </motion.p>
      </div>
    </div>
  );
}
