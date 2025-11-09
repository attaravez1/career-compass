'use client';

import { useState } from 'react';
import type { Career } from '@/lib/data';
import { CareerCard } from './career-card';
import { Button } from '@/components/ui/button';

interface CareersClientPageProps {
  careers: Career[];
  categories: string[];
}

export function CareersClientPage({ careers, categories }: CareersClientPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredCareers =
    selectedCategory === 'All'
      ? careers
      : careers.filter((career) => career.category === selectedCategory);

  return (
    <div>
      <div className="flex justify-center flex-wrap gap-2 mb-8">
        <Button
          variant={selectedCategory === 'All' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('All')}
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCareers.map((career) => (
          <CareerCard key={career.slug} career={career} />
        ))}
      </div>
      {filteredCareers.length === 0 && (
        <p className="text-center text-muted-foreground mt-8">No careers found in this category.</p>
      )}
    </div>
  );
}
