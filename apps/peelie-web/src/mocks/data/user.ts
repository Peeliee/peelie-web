import type { UserResponse } from '@/entities/user/model/user.type';
import mockImg from '@/assets/mockImg.svg';

export const UserMock: { data: UserResponse; delay: number } = {
  data: {
    userId: 1,
    userName: '테스트',
    profileImageUrl: mockImg,
    instagramId: 'test_test',
    interactionStyle: 'FAST',
    bio: [
      { stage: 0, bio: '자기소개가 없어요! 퀴즈를 풀어주세요!' },
      { stage: 1, bio: '1단계를 깼을 때 보이는 자기소개' },
      { stage: 2, bio: '2단계를 깼을 때 보이는 자기소개' },
      { stage: 3, bio: '3단계를 깼을 때 보이는 자기소개' },
    ],
    card: {
      stage1: {
        title: '1단계 정보카드 제목',
        subtitle: '1단계 정보카드 부제목',
        content:
          '1단계 정보카드 내용1단계 정보카드 내용1단계 정보카드 내용1단계 정보카드 내용단계 정보카드 내용1단계 정보카드 내용1단계 정보카드 내용1단계 정보카드 내용1단계 정보카드 내용1단계 정보카드 내용11단계 정보카드 내용1단계 정보카드 내용1단계 정보카드 내용1단계 정보카드 내용1단계 정보카드 내용1단계 정보카드 내용1단계 정보카드 내용1단계 정보카드 내용1단계 정보카드 내용1단계 정보카드 내용1단계 정보카드 내용1단계 정보카드 내용',
      },
      stage2: {
        title: '2단계 정보카드 제목',
        subtitle: '2단계 정보카드 부제목',
        content:
          '2단계 정보카드 부제목2단계 정보카드 부제목2단계 정보카드 부제목2단계 정보카드 부제목2단계 정보카드 부제목2단계 정보카드 부제목2단계 정보카드 부제목',
      },
      stage3: {
        title: '3단계 정보카드 제목',
        subtitle: '3단계 정보카드 부제목',
        content:
          '3단계 정보카드 부제목3단계 정보카드 부제목3단계 정보카드 부제목3단계 정보카드 부제목3단계 정보카드 부제목3단계 정보카드 부제목3단계 정보카드 부제목3단계 정보카드 부제목',
      },
    },
  },
  delay: 1000,
};
