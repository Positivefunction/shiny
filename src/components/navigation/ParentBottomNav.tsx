import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, TrendingUp, BookOpen, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/parent', icon: Home, label: 'Home', exact: true },
  { to: '/parent/progress', icon: TrendingUp, label: 'Progress' },
  { to: '/parent/practice', icon: BookOpen, label: 'Practice' },
  { to: '/parent/community', icon: Users, label: 'Community' },
];

export function ParentBottomNav() {
  const location = useLocation();

  return (
    <nav className="bottom-nav">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = item.exact 
            ? location.pathname === item.to
            : location.pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "bottom-nav-item relative flex-1",
                isActive && "text-secondary"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="parent-nav-indicator"
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-secondary rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <item.icon className={cn(
                "w-5 h-5 transition-transform",
                isActive && "scale-110"
              )} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
