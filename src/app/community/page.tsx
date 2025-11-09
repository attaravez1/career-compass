import { communityPosts } from '@/lib/data';
import { PostCard } from './post-card';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';

export const metadata = {
    title: 'Community Forum | Career Compass AI',
    description: 'Connect with peers, share experiences, and get guidance from the community.',
  };

export default function CommunityPage() {
  return (
    <div className="bg-muted/40 flex-grow">
      <div className="container mx-auto py-12 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
            <div className="text-center md:text-left">
                <h1 className="text-4xl font-bold font-headline tracking-tight sm:text-5xl">Community Forum</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                Join the conversation, ask questions, and share your journey.
                </p>
            </div>
            <Button size="lg">
                <Pencil className="mr-2 h-5 w-5" />
                Start a Discussion
            </Button>
        </div>
        
        <div className="space-y-6 max-w-4xl mx-auto">
          {communityPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
