import { AnalyzerForm } from './analyzer-form';

export default function AnalyzerPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline tracking-tight sm:text-5xl">Resume & Skill Analyzer</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Paste your resume or list your skills to get AI-driven career recommendations.
        </p>
      </div>
      <AnalyzerForm />
    </div>
  );
}
