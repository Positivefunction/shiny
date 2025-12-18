import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGameStore } from '@/stores';
import { Lock, Star, Check, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

// Demo quest nodes for MVP
const demoNodes = [
  { id: '1', packId: 'pack-1', name: 'First Sounds', status: 'completed', stars: 3 },
  { id: '2', packId: 'pack-2', name: 'Animal Names', status: 'completed', stars: 2 },
  { id: '3', packId: 'pack-3', name: 'Colors & Shapes', status: 'current', stars: 0 },
  { id: '4', packId: 'pack-4', name: 'Family Words', status: 'unlocked', stars: 0 },
  { id: '5', packId: 'pack-5', name: 'Food & Drinks', status: 'locked', stars: 0 },
  { id: '6', packId: 'pack-6', name: 'Action Words', status: 'locked', stars: 0 },
  { id: '7', packId: 'pack-7', name: 'Numbers', status: 'locked', stars: 0 },
  { id: '8', packId: 'pack-8', name: 'Body Parts', status: 'locked', stars: 0 },
];

export default function QuestMap() {
  const navigate = useNavigate();
  const { currentLanguage } = useGameStore();
  const [nodes, setNodes] = useState(demoNodes);

  const handleNodeClick = (node: typeof demoNodes[0]) => {
    if (node.status === 'locked') return;
    navigate(`/child/lesson/${node.packId}`);
  };

  return (
    <div className="min-h-full px-4 py-6">
      {/* Header */}
      <motion.div 
        className="text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display text-2xl text-foreground">
          Your Quest
        </h1>
        <p className="text-sm text-muted-foreground">
          Learning {currentLanguage.charAt(0).toUpperCase() + currentLanguage.slice(1)}
        </p>
      </motion.div>

      {/* Quest Path */}
      <div className="relative max-w-xs mx-auto">
        {/* Connection line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-muted -translate-x-1/2 rounded-full" />
        
        {/* Nodes */}
        <div className="relative space-y-6">
          {nodes.map((node, index) => {
            const isEven = index % 2 === 0;
            const offsetClass = isEven ? '-translate-x-12' : 'translate-x-12';
            
            return (
              <motion.div
                key={node.id}
                className={cn("flex items-center justify-center", offsetClass)}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, type: "spring" }}
              >
                <button
                  onClick={() => handleNodeClick(node)}
                  disabled={node.status === 'locked'}
                  className={cn(
                    "relative flex flex-col items-center",
                    node.status === 'locked' && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {/* Node circle */}
                  <div className={cn(
                    "quest-node w-20 h-20 text-2xl",
                    node.status === 'completed' && "quest-node-completed",
                    node.status === 'current' && "quest-node-unlocked animate-pulse",
                    node.status === 'unlocked' && "quest-node-unlocked",
                    node.status === 'locked' && "quest-node-locked"
                  )}>
                    {node.status === 'locked' && <Lock className="w-6 h-6" />}
                    {node.status === 'completed' && <Check className="w-8 h-8" />}
                    {node.status === 'current' && <Play className="w-8 h-8 fill-current" />}
                    {node.status === 'unlocked' && <Play className="w-8 h-8" />}
                  </div>

                  {/* Stars */}
                  {node.status === 'completed' && (
                    <div className="flex gap-0.5 mt-1">
                      {[1, 2, 3].map((s) => (
                        <Star 
                          key={s}
                          className={cn(
                            "w-4 h-4",
                            s <= node.stars 
                              ? "fill-xp text-xp" 
                              : "text-muted"
                          )}
                        />
                      ))}
                    </div>
                  )}

                  {/* Label */}
                  <span className={cn(
                    "mt-2 text-xs font-medium text-center max-w-20",
                    node.status === 'current' 
                      ? "text-primary font-bold" 
                      : "text-muted-foreground"
                  )}>
                    {node.name}
                  </span>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Current lesson prompt */}
      <motion.div 
        className="fixed bottom-24 left-4 right-4 max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <button
          onClick={() => handleNodeClick(nodes.find(n => n.status === 'current')!)}
          className="w-full btn-game btn-game-success py-4 text-lg"
        >
          <Play className="w-5 h-5 mr-2 fill-current" />
          Continue Learning
        </button>
      </motion.div>
    </div>
  );
}
