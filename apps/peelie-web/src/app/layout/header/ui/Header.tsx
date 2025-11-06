import { type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/shared/lib/utils';

import PeelieLogo from '@/assets/peelieLogo.svg?react';
import BackButton from '@/assets/backButton.svg?react';

interface HeaderProps {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
  className?: string;
}

interface BackHeaderProps {
  onClick?: () => void;
  transparent?: boolean;
}

export const Header = ({ left, center, right, className }: HeaderProps) => {
  return (
    <header
      className={cn('flex items-center justify-between h-12 px-4 border-none', className)}
      style={{ transform: 'translateZ(0)' }}
    >
      <div className="flex-1">{left}</div>
      <div className="flex-1 flex justify-center">{center}</div>
      <div className="flex-1 flex justify-end">{right}</div>
    </header>
  );
};

// 로고 헤더
export const LogoHeader = () => <Header left={<PeelieLogo />} />;

// 백버튼 헤더
export const BackHeader = ({ onClick, transparent }: BackHeaderProps) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (onClick) return onClick();
    navigate(-1);
  };

  return (
    <Header
      className={cn(
        'w-full flex items-center justify-between px-4 py-3 z-[9999] border-none',
        transparent ? 'bg-transparent text-white' : 'bg-white text-gray-900',
      )}
      left={
        <button onClick={handleBackClick} className="flex items-center justify-center w-8 h-8">
          <BackButton className="w-6 h-6" />
        </button>
      }
    />
  );
};
