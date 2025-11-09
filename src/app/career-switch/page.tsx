import { CareerSwitchForm } from './career-switch-form';

export const metadata = {
  title: 'Career Switch Advisor | Career Compass AI',
  description: 'Get a personalized roadmap to switch your career to a new field.',
};

export default function CareerSwitchPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline tracking-tight sm:text-5xl">Career Switch Advisor</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Planning a career change? Get a personalized, step-by-step roadmap from our AI coach.
        </p>
      </div>
      <CareerSwitchForm />
    </div>
  );
}
