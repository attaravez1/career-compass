import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import TypingAnimation from '@/components/typing-animation';
import { Bot, ClipboardCheck, ScanLine, Compass, Users, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import {PlaceHolderImages} from '@/lib/placeholder-images';

const features = [
  {
    icon: Bot,
    title: 'AI Chatbot Counselor',
    description: 'Get instant career advice and suggestions through an interactive AI-powered chatbot.',
    href: '/chatbot',
  },
  {
    icon: ClipboardCheck,
    title: 'AI Career Quiz',
    description: 'Assess your interests and skills with a quick quiz to receive personalized career recommendations.',
    href: '/quiz',
  },
  {
    icon: ScanLine,
    title: 'Resume/Skill Analyzer',
    description: 'Match your unique skills and resume content with ideal career options and see how you stack up.',
    href: '/analyzer',
  },
  {
    icon: Compass,
    title: 'Career Explorer',
    description: 'Browse through a vast database of popular careers, with filters and detailed information.',
    href: '/careers',
  },
  {
    icon: Users,
    title: 'Community Forum',
    description: 'Connect with peers, share experiences, and get guidance from a community of students.',
    href: '/community',
  },
];

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image');

  return (
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-32 lg:py-40 bg-card overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold tracking-tight font-headline sm:text-5xl md:text-6xl lg:text-7xl">
                Find Your <span className="text-primary">Future</span> with
                <br />
                Career Compass AI
              </h1>
              <div className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto h-8 flex justify-center items-center">
                <TypingAnimation texts={['Navigate your career path.', 'Discover your potential.', 'Get AI-powered guidance.']} />
              </div>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button asChild size="lg">
                  <Link href="/careers">
                    Start Exploring
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/quiz">Take the Quiz</Link>
                </Button>
              </div>
            </div>
          </div>
          {heroImage && (
             <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover -z-10 opacity-10"
                data-ai-hint={heroImage.imageHint}
                priority
            />
          )}
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight font-headline sm:text-4xl">Your Personal Career Toolkit</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Everything you need to make informed decisions about your professional journey, all in one place.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <Card key={feature.title} className="flex flex-col transform transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-primary/20 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <feature.icon className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Button asChild variant="link" className="p-0 h-auto font-semibold">
                      <Link href={feature.href}>
                        Get Started <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
  );
}
