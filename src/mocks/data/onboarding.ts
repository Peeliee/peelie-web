import type { OnboardingCommonResponse } from '@/entities/onboarding/model/onboarding.type';

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
