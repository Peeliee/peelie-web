import type { UserResponse } from '@/entities/user/model/user.type';
import mockyonghee from '@/assets/mockyonghee.png';

export const UserMock: { data: UserResponse; delay: number } = {
  data: {
    userName: '김용희',
    profileImageUrl: mockyonghee,
    instagramId: 'y_h2._',
    interactionStyle: 'FAST',
    bio: [
      { stage: 0, bio: '자기소개가 없어요! 퀴즈를 풀어주세요!' },
      { stage: 1, bio: '1단계를 깼을 때 보이는 자기소개' },
      { stage: 2, bio: '돈벌고싶다' },
      { stage: 3, bio: '집가고싶다' },
    ],
    card: {
      stage1: {
        title: '⚡🎬 빠르게 연결되는 순간들',
        subtitle: '직감으로 통하는 사람',
        content:
          '새로운 사람을 만나면 금세 대화 주제를 찾아내요. 영화, 기술, 음악 등 관심사가 다양해서 대화가 끊이지 않아요. 상대가 진심이면 바로 마음을 엽니다.',
      },
      stage2: {
        title: '🔥 공감의 속도는 진심으로부터',
        subtitle: '짧은 대화 속에서도 깊은 연결',
        content:
          '친해지는 속도는 빠르지만, 그만큼 진심을 중요하게 생각해요. 어느 날 밤새 이야기하다가 “이 사람은 진짜다”라는 느낌을 받은 적이 있어요.',
      },
      stage3: {
        title: '💫 진심이 닿았을 때',
        subtitle: '속도보다 중요한 건 방향',
        content:
          '누군가와 함께 성장할 수 있다는 건 큰 행운이에요. 나에게 교류란, 단순한 만남이 아니라 서로의 삶을 나누는 과정이에요.',
      },
    },
  },
  delay: 1000,
};
