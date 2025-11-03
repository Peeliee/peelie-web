import { FriendListStack } from '@/widgets/Carousel/FriendListStack';

const FriendListPage = () => {
  return (
    <div className="flex flex-col w-full h-full pb-[64px] max-h-screen">
      <div className="flex-1 overflow-hidden px-4 bg-fuchsia-200">
        <FriendListStack />
      </div>
    </div>
  );
};

export default FriendListPage;
