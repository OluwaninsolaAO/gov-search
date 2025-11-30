import { AISearchResponse, Official } from '@/types/official';
import { Sparkles, ArrowRight, User } from 'lucide-react';

interface AIResponseProps {
  response: AISearchResponse;
  onOfficialClick: (official: Official) => void;
  onSuggestionClick: (suggestion: string) => void;
}

export function AIResponse({
  response,
  onOfficialClick,
  onSuggestionClick,
}: AIResponseProps) {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 fade-in">
      {/* AI Answer */}
      <div className="bg-gradient-to-br from-primary/10 via-card to-card border border-primary/20 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-primary font-medium uppercase tracking-wider mb-2">
              AI Response
            </p>
            <p className="text-foreground leading-relaxed">
              {response.data.answer}
            </p>
          </div>
        </div>
      </div>

      {/* Sources */}
      {response.data.sources && response.data.sources.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Related Officials
          </h3>
          <div className="grid gap-2">
            {response.data.sources.map((source, idx) => (
              <button
                key={source.id}
                onClick={() => {
                  const official = response.data.officials?.find(
                    (o) => o.id === source.id
                  );
                  if (official) onOfficialClick(official);
                }}
                className="flex items-center gap-3 p-3 bg-card border border-border rounded-xl hover:border-primary/50 hover:bg-secondary/50 transition-all group text-left w-full"
              >
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                    {source.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {source.position}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-primary font-medium">
                    {Math.round(source.relevance * 100)}% match
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions */}
      {response.data.suggestions && response.data.suggestions.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Related Questions
          </h3>
          <div className="flex flex-wrap gap-2">
            {response.data.suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => onSuggestionClick(suggestion)}
                className="px-4 py-2 bg-secondary border border-border rounded-full text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-secondary/80 transition-all"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
