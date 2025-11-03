import { FriendListStack } from '@/widgets/Carousel/FriendListStack';

const FriendListPage = () => {
  return (
    <div className="flex flex-col w-full h-full friend-list-page">
      {/* 친구 목록 */}
      <div className="flex-1 overflow-hidden px-4">
        <FriendListStack />
      </div>
    </div>
  );
};

export default FriendListPage;
