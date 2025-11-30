import { Official } from '@/types/official';
import { MapPin, Users, Calendar, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OfficialCardProps {
  official: Official;
  onClick: () => void;
  index?: number;
}

export function OfficialCard({
  official,
  onClick,
  index = 0,
}: OfficialCardProps) {
  const getPartyColor = (party: string) => {
    const partyLower = party.toLowerCase();
    if (partyLower.includes('peoples democratic'))
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    if (partyLower.includes('all progressives'))
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    if (partyLower.includes('labour'))
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    return 'bg-muted text-muted-foreground border-border';
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-NG', {
        year: 'numeric',
        month: 'short',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div
      onClick={onClick}
      className="group bg-card border border-border rounded-xl overflow-hidden cursor-pointer card-hover slide-up"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="p-5">
        <div className="flex gap-4">
          {/* Avatar */}
          <div className="relative flex-shrink-0 h-fit">
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-secondary border-2 border-border group-hover:border-primary/50 transition-colors duration-300">
              <img
                src={
                  official.images?.medium?.url ||
                  official.images?.thumbnail?.url
                }
                alt={official.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder.png';
                }}
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
              <span className="text-[10px] font-bold text-primary-foreground">
                {official.position?.charAt(0) || 'O'}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200 truncate">
              {official.name}
            </h3>
            <p className="text-sm text-primary font-medium mt-0.5">
              {official.position}
            </p>

            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span
                className={cn(
                  'text-xs px-2 py-0.5 rounded-full border',
                  getPartyColor(official.party)
                )}
              >
                {official.party
                  ?.split(' ')
                  .map((w) => w[0])
                  .join('') || 'N/A'}
              </span>

              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span className="truncate max-w-[100px]">{official.state}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <p className="line-clamp-1">
                  {formatDate(official.start_date)}
                </p>
              </div>
              {official.legislative_period && (
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span className="truncate max-w-[120px]">
                    {official.legislative_period}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center">
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
