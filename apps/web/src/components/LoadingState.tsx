import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  mode: 'search' | 'ask';
}

export function LoadingState({ mode }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 fade-in">
      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
        <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping" />
      </div>
      <p className="text-muted-foreground mt-4">
        {mode === 'search' ? 'Searching officials...' : 'AI is thinking...'}
      </p>
    </div>
  );
}
