
'use client';

import { useState, useMemo } from 'react';
import type { Career } from '@/lib/data';
import { CareerCard } from './career-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface CareersClientPageProps {
  careers: Career[];
  categories: string[];
}

export function CareersClientPage({ careers, categories }: CareersClientPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCareers = useMemo(() => {
    return careers.filter((career) => {
      const matchesCategory = selectedCategory === 'All' || career.category === selectedCategory;
      const matchesSearch = searchTerm === '' || 
                            career.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            career.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [careers, selectedCategory, searchTerm]);

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSearchTerm('');
  };
  
  const showClearButton = selectedCategory !== 'All' || searchTerm !== '';

  return (
    <div>
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by career title or skill..."
            className="w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex justify-center flex-wrap gap-2">
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
          {showClearButton && (
            <Button variant="ghost" onClick={handleClearFilters}>
              Clear All
            </Button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCareers.map((career) => (
          <CareerCard key={career.slug} career={career} />
        ))}
      </div>
      {filteredCareers.length === 0 && (
        <p className="text-center text-muted-foreground mt-8 text-lg">
          No careers found matching your criteria. Try adjusting your search or filters.
        </p>
      )}
    </div>
  );
}
