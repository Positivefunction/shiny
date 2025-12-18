import { motion } from 'framer-motion';
import { Users, FileText, TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const stats = [
  { label: 'Active Patients', value: '12', icon: Users, color: 'text-primary' },
  { label: 'Sessions This Week', value: '24', icon: Clock, color: 'text-accent' },
  { label: 'Reports Generated', value: '8', icon: FileText, color: 'text-secondary' },
  { label: 'Avg. Accuracy', value: '78%', icon: TrendingUp, color: 'text-success' },
];

export default function TherapistDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl">Welcome back, Dr. Speech</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card>
              <CardHeader className="pb-2"><stat.icon className={`w-5 h-5 ${stat.color}`} /></CardHeader>
              <CardContent><div className="text-2xl font-bold">{stat.value}</div><p className="text-xs text-muted-foreground">{stat.label}</p></CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <Card><CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">No recent sessions. Start a new session with a patient.</p></CardContent></Card>
    </div>
  );
}
