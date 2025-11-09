
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import * as React from 'react';

const navLinks = [
  { href: '/chatbot', label: 'Chatbot' },
  { href: '/quiz', label: 'Quiz' },
  { href: '/analyzer', label: 'Analyzer' },
  { href: '/careers', label: 'Explorer' },
  { href: '/community', label: 'Community' },
];

export default function Header() {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="flex items-center gap-2 font-bold font-headline">
            <Compass className="h-6 w-6 text-primary" />
            <span className="text-lg">Career Compass AI</span>
          </Link>
        </div>
        
        <div className="flex flex-1 items-center justify-between">
           <div className="md:hidden">
             <Link href="/" className="flex items-center gap-2 font-bold font-headline">
                <Compass className="h-6 w-6 text-primary" />
                <span className="sr-only">Career Compass AI</span>
             </Link>
           </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors hover:text-primary',
                  pathname?.startsWith(link.href) ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-8">
                    <Link href="/" className="flex items-center gap-2 font-bold font-headline" onClick={() => setIsSheetOpen(false)}>
                      <Compass className="h-6 w-6 text-primary" />
                      <span className="text-lg">Career Compass AI</span>
                    </Link>
                  </div>
                  <nav className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          'text-lg transition-colors hover:text-primary',
                          pathname?.startsWith(link.href) ? 'text-primary font-semibold' : 'text-muted-foreground'
                        )}
                        onClick={() => setIsSheetOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
