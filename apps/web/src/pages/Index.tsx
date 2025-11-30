import { useState } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { SearchResults } from '@/components/SearchResults';
import { AIResponse } from '@/components/AIResponse';
import { OfficialModal } from '@/components/OfficialModal';
import { LoadingState } from '@/components/LoadingState';
import { searchOfficials, askAI } from '@/lib/api';
import { Official, AISearchResponse } from '@/types/official';
import { Landmark, Shield, Users } from 'lucide-react';

const Index = () => {
  const [mode, setMode] = useState<'search' | 'ask'>('search');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<{
    took: number;
    results: Official[];
  }>({ took: 0, results: [] });
  const [aiResponse, setAiResponse] = useState<AISearchResponse | null>(null);
  const [selectedOfficial, setSelectedOfficial] = useState<Official | null>(
    null
  );
  const [hasSearched, setHasSearched] = useState(false);
  const [lastQuery, setLastQuery] = useState('');
  const [query, setQuery] = useState('');

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setHasSearched(true);
    setLastQuery(query);

    try {
      if (mode === 'search') {
        const response = await searchOfficials(query);
        setSearchResults(response.data || { took: 0, results: [] });
        setAiResponse(null);
      } else {
        const response = await askAI(query);
        setAiResponse(response);
        setSearchResults({ took: 0, results: [] });
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModeChange = (newMode: 'search' | 'ask') => {
    setMode(newMode);
    setHasSearched(false);
    setSearchResults({
      took: 0,
      results: [],
    });
    setAiResponse(null);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header
        className={`transition-all duration-500 ${
          hasSearched ? 'py-8' : 'py-20 md:py-32'
        }`}
      >
        <div className="container mx-auto px-4">
          <div
            className={`text-center transition-all duration-500 ${
              hasSearched ? 'mb-8' : 'mb-12'
            }`}
          >
            {/* Logo/Brand */}
            <div
              className={`flex items-center justify-center gap-3 mb-4 transition-all duration-500 ${
                hasSearched ? 'scale-75' : ''
              }`}
            >
              <div className="relative">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-green">
                  <Landmark className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 rounded-full bg-green-500 border-2 border-background pulse-subtle" />
              </div>
            </div>

            <h1
              className={`font-bold text-foreground transition-all duration-500 ${
                hasSearched ? 'text-2xl md:text-3xl' : 'text-4xl md:text-6xl'
              }`}
            >
              <span className="text-gradient">GovSearch</span>
            </h1>

            {!hasSearched && (
              <p className="text-muted-foreground text-lg md:text-xl mt-4 max-w-2xl mx-auto fade-in">
                Discover and connect with Nigeria's elected government
                officials. Search by name, state, position, or ask AI for
                insights.
              </p>
            )}
          </div>

          {/* Search Bar */}
          <SearchBar
            onSearch={handleSearch}
            mode={mode}
            onModeChange={handleModeChange}
            isLoading={isLoading}
            query={query}
            setQuery={setQuery}
          />

          {/* Stats - Only show when not searched */}
          {!hasSearched && (
            <div
              className="flex flex-wrap justify-center gap-8 mt-12 fade-in"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm">2000+ Officials</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm">36 States + FCT</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Landmark className="w-5 h-5 text-primary" />
                <span className="text-sm">All Government Levels</span>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Results Section */}
      <main className="container mx-auto px-4 pb-16">
        {isLoading && <LoadingState mode={mode} />}

        {!isLoading && hasSearched && mode === 'search' && (
          <SearchResults
            results={searchResults}
            onOfficialClick={setSelectedOfficial}
            query={lastQuery}
          />
        )}

        {!isLoading && hasSearched && mode === 'ask' && aiResponse && (
          <AIResponse
            response={aiResponse}
            onOfficialClick={setSelectedOfficial}
            onSuggestionClick={handleSuggestionClick}
          />
        )}
      </main>

      {/* Official Detail Modal */}
      <OfficialModal
        official={selectedOfficial}
        open={!!selectedOfficial}
        onClose={() => setSelectedOfficial(null)}
      />

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground max-w-[500px] mx-auto">
            GovSearch is a sample project designed to demonstrate the power and
            efficiency of Elasticsearch for high-volume, real-time data indexing
            and retrieval.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
