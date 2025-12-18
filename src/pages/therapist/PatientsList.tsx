import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const patients = [
  { id: '1', name: 'Aarav Kumar', age: 6, lastSession: '2 days ago', progress: 75 },
  { id: '2', name: 'Diya Sharma', age: 5, lastSession: 'Today', progress: 82 },
  { id: '3', name: 'Vihaan Patel', age: 7, lastSession: '1 week ago', progress: 60 },
];

export default function PatientsList() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl">Patients</h1>
        <Button><Plus className="w-4 h-4 mr-2" />Add Patient</Button>
      </div>
      <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Search patients..." className="pl-9" /></div>
      <div className="space-y-3">
        {patients.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
            <Link to={`/therapist/patients/${p.id}`} className="card-game-hover flex items-center gap-4 p-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-xl">👤</div>
              <div className="flex-1"><h3 className="font-semibold">{p.name}</h3><p className="text-sm text-muted-foreground">Age {p.age} • {p.lastSession}</p></div>
              <div className="text-right"><div className="text-lg font-bold text-primary">{p.progress}%</div><div className="text-xs text-muted-foreground">accuracy</div></div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
