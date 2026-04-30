import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';
import { PokiLogoIcon } from '@/shared/ui/icons/PokiLogoIcon';
import { PokiLogoText } from '@/shared/ui/icons/PokiLogoText';

interface HeaderProps {
  className?: string;
  children?: ReactNode;
}

export function Header({ className, children }: HeaderProps) {
  return (
    <header className={cn('flex items-center justify-between pt-4 pb-5 px-5', className)}>
      <div className="flex items-center gap-3">
        <PokiLogoIcon />
        <PokiLogoText />
      </div>
      {children}
    </header>
  );
}
