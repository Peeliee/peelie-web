import type {
  OnboardingCommonResponse,
  GenerateInfoDone,
} from '@/entities/onboarding/model/onboarding.type';

export const onboardingStartMock: { data: OnboardingCommonResponse; delay: number } = {
  data: {
    selectedCategoryIds: [],
    answers: [],
  },
  delay: 1000,
};

export const categorySelectMock: { data: OnboardingCommonResponse; delay: number } = {
  data: {
    selectedCategoryIds: [1, 2, 3],
    answers: [],
  },
  delay: 1000,
};

export const categoryAnswerMock: { data: OnboardingCommonResponse; delay: number } = {
  data: {
    selectedCategoryIds: [1, 2, 3],
    answers: [
      {
        subCategoryId: 1,
        answers: [
          { level: 'L1', L1AnswerId: 1 },
          { level: 'L2', L2AnswerId: 2 },
          { level: 'L3', L3AnswerId: 3 },
          { level: 'L4', L4Answer: '주관식 문항입니다 어쩌구' },
        ],
      },
      {
        subCategoryId: 14,
        answers: [
          { level: 'L1', L1AnswerId: 2 },
          { level: 'L2', L2AnswerId: 2 },
          { level: 'L3', L3AnswerId: 4 },
          { level: 'L4', L4Answer: '이러쿵저러쿵어쩌구' },
        ],
      },
      {
        subCategoryId: 28,
        answers: [
          { level: 'L1', L1AnswerId: 4 },
          { level: 'L2', L2AnswerId: 1 },
          { level: 'L3', L3AnswerId: 3 },
          { level: 'L4', L4Answer: '궁시렁궁시렁어쩌구' },
        ],
      },
    ],
  },
  delay: 1000,
};

export const interactionStyleMock: { data: OnboardingCommonResponse; delay: number } = {
  data: {
    selectedCategoryIds: [1, 2, 3],
    answers: [
      {
        subCategoryId: 1,
        answers: [
          { level: 'L1', L1AnswerId: 1 },
          { level: 'L2', L2AnswerId: 2 },
          { level: 'L3', L3AnswerId: 3 },
          { level: 'L4', L4Answer: '주관식 문항입니다 어쩌구' },
        ],
      },
      {
        subCategoryId: 14,
        answers: [
          { level: 'L1', L1AnswerId: 2 },
          { level: 'L2', L2AnswerId: 2 },
          { level: 'L3', L3AnswerId: 4 },
          { level: 'L4', L4Answer: '이러쿵저러쿵어쩌구' },
        ],
      },
      {
        subCategoryId: 28,
        answers: [
          { level: 'L1', L1AnswerId: 4 },
          { level: 'L2', L2AnswerId: 1 },
          { level: 'L3', L3AnswerId: 3 },
          { level: 'L4', L4Answer: '궁시렁궁시렁어쩌구' },
        ],
      },
    ],
  },
  delay: 1000,
};

export const userSetpInfoMock: { data: GenerateInfoDone; delay: number } = {
  data: {
    generationStatus: 'DONE',
    card: {
      stage1: {
        title: '📽️🎶🐶 액션 영화, 감성적인 음악, 그리고 뽀송한 친구',
        subtitle: '주말엔 영화관, 이동 중엔 음악, 집에선 강아지와 함께',
        content:
          '🎬 평소 콘텐츠 중에서는 영화를 가장 즐겨 보는데, 특히 액션/스릴러 장르의 긴장감을 좋아해서 주말이면 꼭 한 편은 챙겨봅니다. 🎶 이동할 때나 하루를 마무리할 때는 늘 음악을 듣는데, 요즘은 감성적인 곡에 꽂혀 이어폰만 꽂으면 일상이 뮤직비디오처럼 바뀌곤 해요. 🐾 집에 돌아오면 애교 많은 말티즈가 꼬리를 흔들며 맞아주는데, 그 순간 하루 피로가 싹 풀려버리죠',
      },
      stage2: {
        title: '✨ 취향에서 경험으로, 나를 드러내는 순간들',
        subtitle: '무엇을 보며, 언제 듣고, 어떻게 함께하는지',
        content:
          '🎬 영화를 볼 때는 단순히 스토리보다 연출과 영상미에 눈길이 가는 편이에요. 특히 아이맥스에서 영화를 봤을 때 화면과 사운드가 압도적이어서 그 순간이 아직도 생생하게 남아 있습니다. 🎶 음악은 주로 이동할 때 감성적인 곡을 즐겨 듣는데, 어느 콘서트에서는 수많은 관객과 함께 노래를 따라 부르며 전율을 느꼈던 경험도 있어요. 🐾 반려견과는 산책을 가장 자주 나가는데, 단순한 산책이 아니라 제 마음을 단단히 지탱해주는 시간이 되고, 늘 곁에 있어주는 안정감 덕분에 가족 같은 존재로 느껴집니다.',
      },
      stage3: {
        title: '다콜쿠🎶🐾',
        subtitle: '가장 깊은 기억을 꺼내놓다',
        content:
          '다크나이트 아이맥스를 보며 느꼈던 압도적인 순간은 아직도 제 인생 영화 경험으로 남아 있어요. 🎶 콜드플레이 공연에서 눈물이 났던 장면은 그 어떤 말로도 설명하기 힘든 전율이었고요. 🐾 마지막으로 우리 집 말티즈 쿠리는 세상에서 제일 애교 많은 가족이라, 하루하루를 특별하게 만들어줍니다.',
      },
    },
  },
  delay: 5000,
};
