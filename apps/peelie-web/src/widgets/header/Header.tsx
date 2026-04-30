import { cn } from '@/shared/lib/utils';
import { PokiLogoIcon } from '@/shared/ui/icons/PokiLogoIcon';
import { PokiLogoText } from '@/shared/ui/icons/PokiLogoText';
import { ShareIcon } from '@/shared/ui/icons/ShareIcon';

interface HeaderProps {
  className?: string;
  onShareClick?: () => void;
}

export function Header({ className, onShareClick }: HeaderProps) {
  return (
    <header className={cn('flex items-center justify-between pt-4 pb-5 px-5', className)}>
      <div className="flex items-center gap-3">
        <PokiLogoIcon />
        <PokiLogoText />
      </div>
      <button type="button" onClick={onShareClick} aria-label="공유">
        <ShareIcon className="size-6 text-gray-70" />
      </button>
    </header>
  );
}
