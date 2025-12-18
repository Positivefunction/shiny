import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Save, Image } from 'lucide-react';

export default function PackBuilder() {
  const { packId } = useParams();
  const [packName, setPackName] = useState(packId ? 'Initial Consonants' : '');
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl">{packId ? 'Edit Pack' : 'New Pack'}</h1>
        <Button><Save className="w-4 h-4 mr-2" />Save</Button>
      </div>
      <Card>
        <CardHeader><CardTitle>Pack Details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><label className="text-sm font-medium">Pack Name</label><Input value={packName} onChange={(e) => setPackName(e.target.value)} placeholder="Enter pack name" /></div>
          <div><label className="text-sm font-medium">Language</label><Input placeholder="Hindi" /></div>
          <div><label className="text-sm font-medium">Target Phonemes</label><Input placeholder="/k/, /g/, /t/" /></div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="flex items-center justify-between">Cards<Button size="sm"><Plus className="w-4 h-4 mr-1" />Add Card</Button></CardTitle></CardHeader>
        <CardContent><p className="text-muted-foreground text-center py-8">No cards yet. Click "Add Card" to create your first card.</p></CardContent>
      </Card>
    </div>
  );
}
