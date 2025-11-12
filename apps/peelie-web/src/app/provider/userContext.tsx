import React, { createContext, useContext, useEffect, useState } from 'react';
import { userGet } from '@/entities/user/api/user-get';
import type { UserResponseDTO } from '@/entities/user/model/user.type';

interface UserContextValue {
  user: UserResponseDTO | null;
  isLoading: boolean;
  refetchUser: () => Promise<void>;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserResponseDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const response = await userGet.getUserInfo();
      setUser(response);
    } catch (error) {
      console.error('유저 정보를 가져오는 중 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading, refetchUser: fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser는 UserProvider 내부에서만 사용할 수 있습니다.');
  }
  return context;
};
