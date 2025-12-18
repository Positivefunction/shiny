import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle } from 'lucide-react';

const posts = [
  { id: '1', author: 'Priya M.', content: 'My son finally said "rabbit" correctly! So proud! 🐰', likes: 12, time: '2h ago' },
  { id: '2', author: 'Rahul K.', content: 'Any tips for practicing /s/ sounds at home?', likes: 5, time: '5h ago' },
];

export default function Community() {
  return (
    <div className="space-y-6 py-4">
      <h1 className="font-display text-2xl">Parent Community</h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-sm">👤</div><span className="font-medium">{post.author}</span><span className="text-xs text-muted-foreground">{post.time}</span></div>
              <p className="mb-3">{post.content}</p>
              <div className="flex gap-4">
                <Button variant="ghost" size="sm"><Heart className="w-4 h-4 mr-1" />{post.likes}</Button>
                <Button variant="ghost" size="sm"><MessageCircle className="w-4 h-4 mr-1" />Reply</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
