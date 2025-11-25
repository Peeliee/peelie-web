import { createQueryKeys } from '@lukemorales/query-key-factory';

import { quizGet } from './quiz-get';

export const quizQuery = createQueryKeys('quiz', {
  quizList: ({ userId, stage }: { userId: number; stage: number }) => ({
    queryKey: ['quizList', userId, stage],
    queryFn: () => quizGet.getQuiz({ userId, stage }),
  }),
});
