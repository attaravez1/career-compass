import { careers } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, GraduationCap, DollarSign, Wrench } from 'lucide-react';

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return careers.map((career) => ({
    slug: career.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const career = careers.find((c) => c.slug === params.slug);
  if (!career) {
    return {
      title: 'Career Not Found',
    };
  }
  return {
    title: `${career.title} | Career Compass AI`,
    description: career.description,
  };
}

export default function CareerDetailPage({ params }: Props) {
  const career = careers.find((c) => c.slug === params.slug);

  if (!career) {
    notFound();
  }

  const image = PlaceHolderImages.find((img) => img.id === career.imagePlaceholderId);

  return (
    <div className="bg-card">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Badge variant="secondary" className="mb-4">{career.category}</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold font-headline mb-4">{career.title}</h1>
            <p className="text-lg text-muted-foreground mb-8">{career.longDescription}</p>

            <h2 className="text-2xl font-bold font-headline mb-4">Required Skills</h2>
            <div className="flex flex-wrap gap-2">
              {career.skills.map((skill) => (
                <Badge key={skill} variant="outline">{skill}</Badge>
              ))}
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              {image && (
                <div className="relative aspect-video w-full mb-4 overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={image.imageUrl}
                    alt={career.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    data-ai-hint={image.imageHint}
                  />
                </div>
              )}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Briefcase className="w-6 h-6 text-primary" />
                    <span>Career Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <DollarSign className="w-5 h-5 mt-1 text-primary/80" />
                    <div>
                      <h4 className="font-semibold text-foreground">Average Salary</h4>
                      <p>{career.avgSalary}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-5 h-5 mt-1 text-primary/80" />
                    <div>
                      <h4 className="font-semibold text-foreground">Education</h4>
                      <p>{career.requiredEducation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
