import type { Quiz } from '@/entities/quiz/model/quiz.type';

export const quizMock: { data: Quiz[]; delay: number } = {
  data: [
    {
      quizId: 1,
      quiz: '테스트 퀴즈1 입니다.',
      answerId: 1,
      answer: [
        {
          optionId: 1,
          text: '1번 선지입니다',
        },
        {
          optionId: 2,
          text: '2번 선지입니다',
        },
      ],
    },
    {
      quizId: 2,
      quiz: '테스트 퀴즈2 입니다.',
      answerId: 1,
      answer: [
        {
          optionId: 1,
          text: '1번 선지입니다',
        },
        {
          optionId: 2,
          text: '2번 선지입니다',
        },
      ],
    },
    {
      quizId: 3,
      quiz: '테스트 퀴즈3 입니다.',
      answerId: 1,
      answer: [
        {
          optionId: 1,
          text: '1번 선지입니다',
        },
        {
          optionId: 2,
          text: '2번 선지입니다',
        },
      ],
    },
  ],
  delay: 1000,
};
