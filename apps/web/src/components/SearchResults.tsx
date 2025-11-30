import { Official } from '@/types/official';
import { OfficialCard } from './OfficialCard';
import { SearchX } from 'lucide-react';
import ms from 'ms';

interface SearchResultsProps {
  results: {
    took: number;
    results: Official[];
  };
  onOfficialClick: (official: Official) => void;
  query: string;
}

export function SearchResults({
  results,
  onOfficialClick,
  query,
}: SearchResultsProps) {
  if (results.results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 fade-in">
        <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
          <SearchX className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No results found
        </h3>
        <p className="text-muted-foreground text-center max-w-md">
          We couldn't find any officials matching "{query}". Try different
          keywords or check your spelling.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      <p className="text-xs text-muted-foreground text-center">
        Found&nbsp;
        <span className="text-primary font-semibold">
          {results.results.length}
        </span>
        &nbsp;result{results.results.length !== 1 ? 's' : ''} for "{query}"
        in&nbsp;
        {ms(results.took)}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {results.results.map((official, index) => (
          <OfficialCard
            key={official.id}
            official={official}
            onClick={() => onOfficialClick(official)}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
