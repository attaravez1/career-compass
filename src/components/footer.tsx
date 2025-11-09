import Link from 'next/link';
import { Compass } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <Compass className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg font-headline">Career Compass AI</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Link href="/chatbot" className="hover:text-primary">Chatbot</Link>
            <Link href="/quiz" className="hover:text-primary">Quiz</Link>
            <Link href="/analyzer" className="hover:text-primary">Analyzer</Link>
            <Link href="/career-switch" className="hover:text-primary">Switcher</Link>
            <Link href="/careers" className="hover:text-primary">Explorer</Link>
            <Link href="/community" className="hover:text-primary">Community</Link>
          </nav>
          <div className="text-sm text-muted-foreground text-center md:text-right">
            &copy; {new Date().getFullYear()} Career Compass AI. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
