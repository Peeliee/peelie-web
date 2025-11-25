import api from '@/shared/api/ky';

import type { GetQuizResponseDTO, GetQuizRequestDTO } from '../model/quiz.type';

export const quizGet = {
  getQuiz: async ({ userId, stage }: GetQuizRequestDTO): Promise<GetQuizResponseDTO> => {
    const response = api.get('quiz/unlock', { json: { userId, stage } }).json<GetQuizResponseDTO>();
    return response;
  },
};
