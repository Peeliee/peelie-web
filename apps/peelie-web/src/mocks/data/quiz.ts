import type { Quiz } from '@/entities/quiz/model/quiz.type';
import type { UnlockStageResponse } from '@/entities/quiz/model/quiz.type';
import mockImg from '@/assets/mockImg.svg';

export const quizMock: { data: Quiz[]; delay: number } = {
  data: [
    {
      quizId: 1,
      quiz: '최근 스트레스 좀 쌓인 김용희... 퇴근 후 딱 한 편만 본다면?',
      answerId: 1,
      answer: [
        {
          optionId: 1,
          text: '감정선 미친 로맨스 영화로 마음 한 번 쓸어내린다',
        },
        {
          optionId: 2,
          text: '아무 감정 없는 미친 액션으로 뇌를 비워버린다',
        },
      ],
    },
    {
      quizId: 2,
      quiz: '김용희가 직관을 간다면, 어느 팀 응원석에 더 자연스럽게 앉을까?',
      answerId: 2,
      answer: [
        {
          optionId: 1,
          text: '두산 베어스 응원가 들으면 자동으로 박수 나오는 편이다',
        },
        {
          optionId: 2,
          text: '엘지 트윈스 경기만 보면 텐션이 더 올라간다',
        },
      ],
    },
    {
      quizId: 3,
      quiz: '김용희는 집에 돌아왔을 때 반갑게 달려오는 동물이 좋을까, 아니면 슬쩍 다가와 옆에 앉는 동물이 좋을까?',
      answerId: 1,
      answer: [
        {
          optionId: 1,
          text: '활발하게 먼저 다가와 주는 개가 더 좋다',
        },
        {
          optionId: 2,
          text: '조용히 옆에 와주는 고양이가 더 좋다',
        },
      ],
    },
  ],
  delay: 1000,
};

export const unlockStageMock: { data: UnlockStageResponse; delay: number } = {
  data: {
    userId: 2,
    userName: '유지원',
    profileImageUrl: mockImg,
    instagramId: 'ujw_insta',
    bio: [
      { text: '“', bold: false },
      { text: '집콕 + OTT + 로맨스', bold: true },
      { text: ' 조합이면 완벽해요. ', bold: false },
      { text: '영상미 좋은 영화', bold: true },
      { text: '만 보면 기분이 좋아져요!”', bold: false },
    ],
    interactionStyle: 'CAUTIOUS',
    card: {
      stage1: {
        title: '🍵📖 조용하지만 깊은 일상',
        subtitle: '하루의 여백에서 위로를 찾는 지원',
        content:
          '평소에는 혼자 있는 시간을 좋아하고, 주말엔 따뜻한 차 한 잔과 함께 책을 읽는 걸 즐겨요. 조용하지만 진심이 담긴 대화를 좋아하고, 가까워지면 깊은 이야기도 꺼내놓는 편이에요.',
      },
      stage2: {
        title: '🌿 함께할수록 편안한 사람',
        subtitle: '작은 관심이 이어주는 신뢰',
        content:
          '가벼운 인사로 시작된 대화가 자연스럽게 고민 상담으로 이어지는 경우가 많아요. 상대의 이야기를 잘 들어주다 보니, 어느새 “믿음직한 사람”이라는 말을 자주 듣게 됐어요.',
      },
      stage3: {
        title: '🌙 마음을 열었을 때의 진심',
        subtitle: '내면의 대화를 나누는 순간',
        content:
          '어느 날, 친구의 힘든 이야기를 들으며 아무 말 없이 옆에 있어줬던 순간이 기억에 남아요. 말보다 마음으로 다가갈 때, 진짜 교류가 시작된다는 걸 깨달았어요.',
      },
    },
  },
  delay: 1000,
};
