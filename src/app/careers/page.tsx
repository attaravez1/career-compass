import { careers, careerCategories } from '@/lib/data';
import { CareersClientPage } from './careers-client-page';

export const metadata = {
  title: 'Career Explorer | Career Compass AI',
  description: 'Browse popular career categories with filters and detailed information.',
};

export default function CareersPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline tracking-tight sm:text-5xl">Career Explorer</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Discover a world of career opportunities. Filter by category to find your perfect fit.
        </p>
      </div>
      <CareersClientPage careers={careers} categories={careerCategories} />
    </div>
  );
}
