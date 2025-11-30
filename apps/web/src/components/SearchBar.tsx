import { useState } from 'react';
import { Search, Sparkles, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (query: string) => void;
  mode: 'search' | 'ask';
  onModeChange: (mode: 'search' | 'ask') => void;
  isLoading?: boolean;
  className?: string;
  query: string;
  setQuery: (string) => void;
}

export function SearchBar({
  onSearch,
  mode,
  onModeChange,
  isLoading,
  className,
  query,
  setQuery,
}: SearchBarProps) {
  const handleSubmit = () => {
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className={cn('w-full max-w-2xl mx-auto', className)}>
      {/* Mode Toggle */}
      <div className="flex justify-center mb-4 gap-2">
        <button
          onClick={() => onModeChange('search')}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2',
            mode === 'search'
              ? 'bg-primary text-primary-foreground shadow-lg glow-green'
              : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
          )}
        >
          <Search className="w-4 h-4" />
          Search
        </button>
        <button
          onClick={() => onModeChange('ask')}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2',
            mode === 'ask'
              ? 'bg-primary text-primary-foreground shadow-lg glow-green'
              : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
          )}
        >
          <Sparkles className="w-4 h-4" />
          Ask AI
        </button>
      </div>

      {/* Search Input */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
        <div className="relative flex items-center bg-card border border-border rounded-2xl overflow-hidden search-glow transition-all duration-300">
          <div className="pl-5 pr-2">
            {mode === 'search' ? (
              <Search className="w-5 h-5 text-muted-foreground" />
            ) : (
              <Sparkles className="w-5 h-5 text-primary" />
            )}
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              mode === 'search'
                ? 'Search for government officials...'
                : 'Ask anything about Nigerian officials...'
            }
            className="flex-1 py-4 px-2 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-base"
          />
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading || !query.trim()}
            className="m-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-accent transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed items-center gap-2 hidden sm:flex"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : mode === 'search' ? (
              'Search'
            ) : (
              'Ask'
            )}
          </button>
        </div>
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        disabled={isLoading || !query.trim()}
        className="px-6 w-full py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-accent transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2 block sm:hidden"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin mx-auto" />
        ) : mode === 'search' ? (
          'Search'
        ) : (
          'Ask'
        )}
      </button>

      {/* Helper Text */}
      <p className="text-center text-muted-foreground text-sm mt-3">
        {mode === 'search'
          ? 'Search by name, state, position, or party'
          : 'Ask questions like: "Who is the Governor of Lagos?"'}
      </p>
    </div>
  );
}
