import Link from 'next/link';
import Image from 'next/image';
import type { Career } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface CareerCardProps {
  career: Career;
}

export function CareerCard({ career }: CareerCardProps) {
  const image = PlaceHolderImages.find((img) => img.id === career.imagePlaceholderId);

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-primary/20">
      <CardHeader>
        {image && (
          <div className="relative aspect-video w-full mb-4">
            <Image
              src={image.imageUrl}
              alt={career.title}
              fill
              className="object-cover rounded-t-lg"
              data-ai-hint={image.imageHint}
            />
          </div>
        )}
        <Badge variant="secondary" className="w-fit">{career.category}</Badge>
        <CardTitle className="font-headline pt-2">{career.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{career.description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button asChild variant="default" className="w-full">
          <Link href={`/careers/${career.slug}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
