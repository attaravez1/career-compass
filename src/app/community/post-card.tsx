import Image from 'next/image';
import type { Post } from '@/lib/data';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const authorInitials = post.author.split(' ').map(n => n[0]).join('');

  return (
    <Card className="w-full shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-start gap-4">
        <Avatar>
          <AvatarImage src={post.avatarUrl} alt={post.author} />
          <AvatarFallback>{authorInitials}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <h3 className="font-bold font-headline text-lg">{post.title}</h3>
          <p className="text-sm text-muted-foreground">
            Posted by {post.author} &middot; {post.timestamp}
          </p>
        </div>
        <Badge variant="outline">{post.category}</Badge>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3">{post.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MessageSquare className="h-4 w-4" />
          <span>{post.replies} Replies</span>
        </div>
        <Button variant="outline">Read More</Button>
      </CardFooter>
    </Card>
  );
}
