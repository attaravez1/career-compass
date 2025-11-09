import { QuizForm } from './quiz-form';

export const metadata = {
    title: 'AI Career Quiz | Career Compass AI',
    description: 'Assess your interests and skills through a multiple-choice quiz to get personalized career recommendations.',
};

export default function QuizPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline tracking-tight sm:text-5xl">AI Career Quiz</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Answer a few questions to discover career paths that align with your personality and interests.
        </p>
      </div>
      <QuizForm />
    </div>
  );
}
