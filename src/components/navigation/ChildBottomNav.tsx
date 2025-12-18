import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Map, Gift, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/child/quest', icon: Map, label: 'Learn' },
  { to: '/child/rewards', icon: Gift, label: 'Rewards' },
  { to: '/child/profile', icon: User, label: 'Profile' },
];

export function ChildBottomNav() {
  const location = useLocation();

  return (
    <nav className="bottom-nav">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "bottom-nav-item relative flex-1",
                isActive && "bottom-nav-item-active"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="child-nav-indicator"
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <item.icon className={cn(
                "w-6 h-6 transition-transform",
                isActive && "scale-110"
              )} />
              <span className="text-xs font-semibold">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
