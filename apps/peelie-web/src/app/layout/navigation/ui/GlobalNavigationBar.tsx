import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import FriendListIcon from '@/assets/GNBicon/friendListIcon.svg?react';
import HomeIcon from '@/assets/GNBicon/homeIcon.svg?react';
import MyPageIcon from '@/assets/GNBicon/myPageIcon.svg?react';
import ColoredFriendListIcon from '@/assets/GNBicon/coloredFriendListIcon.svg?react';
import ColoredHomeIcon from '@/assets/GNBicon/coloredHomeIcon.svg?react';
import ColoredMyPageIcon from '@/assets/GNBicon/coloredMyPageIcon.svg?react';

const GNB_ITEMS = [
  {
    to: '/friendslist',
    label: '친구목록',
    icon: <FriendListIcon />,
    activeIcon: <ColoredFriendListIcon />,
  },
  {
    to: '/',
    label: '홈',
    icon: <HomeIcon />,
    activeIcon: <ColoredHomeIcon />,
  },
  {
    to: '/mypage',
    label: '마이페이지',
    icon: <MyPageIcon />,
    activeIcon: <ColoredMyPageIcon />,
  },
];

export const GlobalNavigationBar = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-999">
      <ul className="flex justify-around items-center py-2">
        {GNB_ITEMS.map((item) => {
          const isActive = location.pathname === item.to;

          return (
            <li key={item.to}>
              <Link to={item.to} className="flex flex-col items-center text-sm">
                <div className="w-6 h-6 mb-1 flex items-center justify-center">
                  {isActive ? item.activeIcon : item.icon}
                </div>
                <span
                  className={`${isActive ? 'text-peelie-primary-600 body-2-regular' : 'text-peelie-gray-500 body-2-regular'}`}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
