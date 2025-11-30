import { Official } from '@/types/official';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  MapPin,
  Calendar,
  Mail,
  Phone,
  Twitter,
  Instagram,
  Facebook,
  Globe,
  ExternalLink,
  X,
  Building,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface OfficialModalProps {
  official: Official | null;
  open: boolean;
  onClose: () => void;
}

export function OfficialModal({ official, open, onClose }: OfficialModalProps) {
  if (!official) return null;

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
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const socialLinks = [
    {
      icon: Twitter,
      value: official.contact?.twitter?.value,
      note: official.contact?.twitter?.note,
      label: 'Twitter',
    },
    {
      icon: Instagram,
      value: official.contact?.instagram?.value,
      note: official.contact?.instagram?.note,
      label: 'Instagram',
    },
    {
      icon: Facebook,
      value: official.contact?.facebook?.value,
      note: official.contact?.facebook?.note,
      label: 'Facebook',
    },
  ].filter((link) => link.value);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader className="sr-only">
          <DialogTitle>{official.name}</DialogTitle>
        </DialogHeader>

        {/* Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent rounded-t-lg" />
          <div className="relative flex flex-col sm:flex-row gap-6 p-6 pb-4">
            {/* Photo */}
            <div className="flex-shrink-0 mx-auto sm:mx-0">
              <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-primary/20 shadow-xl">
                <img
                  src={
                    official.images?.original?.url ||
                    official.images?.medium?.url
                  }
                  alt={official.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.png';
                  }}
                />
              </div>
            </div>

            {/* Basic Info */}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-foreground">
                {official.name}
              </h2>
              <p className="text-lg text-primary font-semibold mt-1">
                {official.position}
              </p>

              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
                <span
                  className={cn(
                    'text-sm px-3 py-1 rounded-full border font-medium',
                    getPartyColor(official.party)
                  )}
                >
                  {official.party}
                </span>
              </div>

              <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{official.state}</span>
                </div>
                {official.legislative_period && (
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-primary" />
                    <span>{official.legislative_period}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="px-6 pb-6 space-y-6">
          {/* Term Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary/50 rounded-xl p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                Term Start
              </p>
              <p className="text-sm font-medium text-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                {formatDate(official.start_date)}
              </p>
            </div>
            <div className="bg-secondary/50 rounded-xl p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                Term End
              </p>
              <p className="text-sm font-medium text-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                {formatDate(official.end_date)}
              </p>
            </div>
          </div>

          {/* Area Info */}
          {official.area?.place?.name && (
            <div className="bg-secondary/50 rounded-xl p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                Constituency
              </p>
              <div className="flex items-start gap-2">
                <Building className="w-4 h-4 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {official.area.place.name}
                  </p>
                  {official.area.place.type_name && (
                    <p className="text-xs text-muted-foreground">
                      {official.area.place.type_name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Contact Info */}
          {(official.contact?.email?.value ||
            official.contact?.phone?.value) && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Contact
              </h3>
              <div className="grid gap-2">
                {official.contact?.email?.value && (
                  <a
                    href={`mailto:${official.contact.email.value}`}
                    className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors group"
                  >
                    <Mail className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors truncate">
                      {official.contact.email.value}
                    </span>
                    <ExternalLink className="w-4 h-4 text-muted-foreground ml-auto" />
                  </a>
                )}
                {official.contact?.phone?.value && (
                  <a
                    href={`tel:${official.contact.phone.value.split(',')[0]}`}
                    className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors group"
                  >
                    <Phone className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {official.contact.phone.value}
                    </span>
                    <ExternalLink className="w-4 h-4 text-muted-foreground ml-auto" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Social Media
              </h3>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={
                      link.note ||
                      `https://${link.label.toLowerCase()}.com/${link.value}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors group"
                  >
                    <link.icon className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {link.value}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Address */}
          {official.address?.postal_address?.value && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Address
              </h3>
              <div className="p-4 bg-secondary/50 rounded-xl">
                <p className="text-sm text-muted-foreground">
                  {official.address.postal_address.value}
                </p>
              </div>
            </div>
          )}

          {/* Official Position */}
          {official.identifiers?.official_position?.value && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Official Position
              </h3>
              <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl">
                <p className="text-sm text-foreground">
                  {official.identifiers.official_position.value}
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
