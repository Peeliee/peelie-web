import { useQuery } from '@tanstack/react-query';

import { FriendListStack } from '@/widgets/Carousel/FriendListStack';
import { friendQuery } from '@/entities/friend/api/friend.queries';

const FriendListPage = () => {
  const { data, isLoading, isError } = useQuery(friendQuery.friendList());

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">친구 목록을 불러오는 중...</p>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">친구 목록을 불러오지 못했습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full pb-[64px] max-h-screen">
      <div className="flex-1 px-4">
        <FriendListStack friendList={data.data} />
      </div>
    </div>
  );
};

export default FriendListPage;
