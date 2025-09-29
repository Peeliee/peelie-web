import {
  UserCardHorizontal,
  UserCardImage,
  UserCardName,
  UserCardDescription,
  UserCardEditProfile,
  UserCardPersonality,
} from '@/entities/user/ui/UserCardHorizontal';
import MockImg from '@/assets/mockImg.svg';

const MyPage = () => {
  return (
    <>
      {' '}
      <UserCardHorizontal
        onClick={() => console.log('카드 클릭')}
        className="mt-4 border-0 shadow-none"
      >
        <UserCardImage src={MockImg} />
        <div className="flex flex-col flex-1">
          <div className="flex items-center justify-between">
            <UserCardName>김용희</UserCardName>
            <UserCardEditProfile >프로필 수정하기</UserCardEditProfile>
          </div>
          <UserCardDescription>대화를 통해 배우고, 나누며 성장하고 싶습니다.</UserCardDescription>
        </div>
      </UserCardHorizontal>
    </>
  );
};

export default MyPage;
