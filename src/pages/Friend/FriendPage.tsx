import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import {
  HorizontalUserCard,
  UserCardImage,
  UserCardName,
  UserCardDescription,
  UserCardPersonality,
} from '@/entities/user/ui/HorizontalUserCard';
import { friendQuery } from '@/entities/friend/api/friend.queries';
import { InteractionStyle } from '@/shared/constants/interactionStyle';
import { StepTabs, StepTab } from '@/features/user/ui/StepTabs';
import MockImg from '@/assets/mockImg.svg';

const FriendPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: user, isLoading, isError } = useQuery(friendQuery.friendProfile(Number(id)));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">친구 프로필을 불러오는 중...</p>
      </div>
    );
  }

  if (isError || !user?.data) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">친구 프로필을 불러오지 못했습니다.</p>
      </div>
    );
  }

  return (
    <>
      <div className="p-3">
        <div className="flex w-full justify-center p-12 bg-amber-300">헤더 자리</div>
        <div>
          <div className="flex w-full justify-center p-12 bg-green-300">
            교류 단계에 맞는 단계별 캐릭터 테마 이미지 삽입
          </div>
        </div>
        <HorizontalUserCard
          onClick={() => console.log('카드 클릭')}
          className="mt-4 border-0 shadow-none"
        >
          <UserCardImage src={MockImg} />
          <div className="flex flex-col flex-1">
            <div className="flex items-center justify-between">
              <UserCardName>{user.data.userName}</UserCardName>
              <UserCardPersonality>
                {InteractionStyle[user.data.interactionStyle]}
              </UserCardPersonality>
            </div>
            <UserCardDescription>{user.data.bio}</UserCardDescription>
          </div>
        </HorizontalUserCard>

        <StepTabs>
          <StepTab title="STEP 1">
            <div>첫 번째 내용</div>
          </StepTab>
          <StepTab title="STEP 2">
            <div className="pb-14">
              매우 긴 두 번째 내용매우 긴 두 번째 내용 엄청 긴 두 번째 내용매우 긴 두 번째 내용매우
              긴 두 번째 내용 엄청 긴 두 번째 내용 <br />
              매우 긴 두 번째 내용매우 긴 두 번째 내용엄청 긴 두 번째 내용엄청 긴 두 번째 내용 매우
              긴 두 번째 내용매우 긴 두 번째 내용매우 긴 두 번째 내용엄청 긴 두 번째 내용매우 긴 두
              번째 내용매우 긴 두 번째 내용 <br />
              매우 긴 두 번째 내용매우 긴 두 번째 내용엄청 긴 두 번째 내용매우 긴 두 번째 내용 매우
              긴 두 번째 내용매우 긴 두 번째 내용엄청 긴 두 번째 내용매우 긴 두 번째 내용매우 긴 두
              번째 내용매우 긴 두 번째 내용 <br />
              매우 긴 두 번째 내용엄청 긴 두 번째 내용매우 긴 두 번째 내용매우 긴 두 번째 내용
            </div>
          </StepTab>
          <StepTab title="STEP 3" locked>
            <div>세 번째 내용</div>
          </StepTab>
        </StepTabs>

        <button
          className="fixed bottom-5 right-3 left-3 p-4 rounded-3xl bg-orange-400"
          onClick={() => alert('준비중')}
        >
          교류 퀴즈 풀기
        </button>
      </div>
    </>
  );
};

export default FriendPage;
