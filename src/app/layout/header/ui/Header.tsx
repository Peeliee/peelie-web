import { type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import PeelieLogo from '@/assets/peelieLogo.svg?react';
import BackButton from '@/assets/backButton.svg?react';

interface HeaderProps {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
}

interface BackHeaderProps {
  onClick?: () => void;
}

export const Header = ({ left, center, right }: HeaderProps) => {
  return (
    <header className="fixed top-0 flex items-center justify-between h-12 px-4 border-b border-gray-100">
      <div className="flex-1">{left}</div>
      <div className="flex-1 flex justify-center">{center}</div>
      <div className="flex-1 flex justify-end">{right}</div>
    </header>
  );
};

// 로고 헤더
export const LogoHeader = () => <Header left={<PeelieLogo />} />;

// 백버튼 헤더
export const BackHeader = ({ onClick }: BackHeaderProps) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (onClick) return onClick();
    navigate(-1);
  };

  return (
    <Header
      left={
        <button onClick={handleBackClick} className="flex items-center justify-center w-8 h-8">
          <BackButton className="w-6 h-6" />
        </button>
      }
    />
  );
};
