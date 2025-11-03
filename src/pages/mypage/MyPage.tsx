import {
  HorizontalUserCard,
  UserCardImage,
  UserCardName,
  UserCardDescription,
  UserCardEditProfile,
} from '@/entities/user/ui/HorizontalUserCard';
import { StepTabs, StepTab } from '@/features/user/ui/StepTabs';
import MockImg from '@/assets/mockImg.svg';

const MyPage = () => {
  return (
    <div className="p-3">
      <div className="flex w-full justify-center p-12 bg-amber-300">헤더 자리</div>
      <div>
        <div className="flex w-full justify-center p-12 bg-green-300">
          교류 단계에 맞는 단계별 캐릭터 테마 이미지 삽입
        </div>
      </div>
      <HorizontalUserCard className="mt-4 border-0 shadow-none">
        <UserCardImage src={MockImg} />

        {/* 가운데 영역 */}
        <div className="flex flex-col flex-1">
          <UserCardName>김용희</UserCardName>
          <UserCardDescription>대화를 통해 배우고, 나누며 성장하고 싶습니다.</UserCardDescription>
        </div>

        {/* 오른쪽 버튼 - 가운데 정렬 */}
        <UserCardEditProfile onClick={() => alert('수정 클릭')} className="self-center">
          프로필 수정하기
        </UserCardEditProfile>
      </HorizontalUserCard>

      <StepTabs>
        <StepTab title="STEP 1">
          <div>첫 번째 내용</div>
        </StepTab>
        <StepTab title="STEP 2">
          <div className="pb-14">
            매우 긴 두 번째 내용매우 긴 두 번째 내용 엄청 긴 두 번째 내용매우 긴 두 번째 내용매우 긴
            두 번째 내용 엄청 긴 두 번째 내용 <br />
            매우 긴 두 번째 내용매우 긴 두 번째 내용엄청 긴 두 번째 내용엄청 긴 두 번째 내용 매우 긴
            두 번째 내용매우 긴 두 번째 내용매우 긴 두 번째 내용엄청 긴 두 번째 내용매우 긴 두 번째
            내용매우 긴 두 번째 내용 <br />
            매우 긴 두 번째 내용매우 긴 두 번째 내용엄청 긴 두 번째 내용매우 긴 두 번째 내용 매우 긴
            두 번째 내용매우 긴 두 번째 내용엄청 긴 두 번째 내용매우 긴 두 번째 내용매우 긴 두 번째
            내용매우 긴 두 번째 내용 <br />
            매우 긴 두 번째 내용엄청 긴 두 번째 내용매우 긴 두 번째 내용매우 긴 두 번째 내용
          </div>
        </StepTab>
        <StepTab title="STEP 3" locked>
          <div>세 번째 내용</div>
        </StepTab>
      </StepTabs>
    </div>
  );
};

export default MyPage;
