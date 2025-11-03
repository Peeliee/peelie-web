import { Link } from 'react-router-dom';

import FriendListIcon from '@/assets/friendListIcon.svg?react';
import HomeIcon from '@/assets/homeIcon.svg?react';

const GNB_ITEMS = [
  { to: '/friendslist', label: '친구목록', icon: <FriendListIcon /> },
  { to: '/', label: '홈', icon: <HomeIcon /> },
  { to: '/mypage', label: '마이페이지', icon: <HomeIcon /> },
];

export const GlobalNavigationBar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <ul className="flex justify-around items-center py-2">
        {GNB_ITEMS.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <li key={item.to}>
              <Link to={item.to} className="flex flex-col items-center text-sm">
                <div className={`w-6 h-6 mb-1 ${isActive ? 'text-black' : 'text-gray-400'}`}>
                  {item.icon}
                </div>
                <span className={`${isActive ? 'text-black font-medium' : 'text-gray-400'}`}>
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
