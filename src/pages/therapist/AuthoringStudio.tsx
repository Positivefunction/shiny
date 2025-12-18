import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';

const packs = [
  { id: '1', name: 'Initial Consonants', cards: 20, lang: 'Hindi' },
  { id: '2', name: 'Final Sounds', cards: 15, lang: 'English' },
  { id: '3', name: 'Minimal Pairs', cards: 24, lang: 'Tamil' },
];

export default function AuthoringStudio() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl">Authoring Studio</h1>
        <Link to="/therapist/authoring/pack"><Button><Plus className="w-4 h-4 mr-2" />New Pack</Button></Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {packs.map((pack, i) => (
          <motion.div key={pack.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Link to={`/therapist/authoring/pack/${pack.id}`} className="card-game-hover p-6 block">
              <Package className="w-8 h-8 text-accent mb-3" />
              <h3 className="font-semibold">{pack.name}</h3>
              <p className="text-sm text-muted-foreground">{pack.cards} cards • {pack.lang}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
