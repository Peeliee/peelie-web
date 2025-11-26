import api from '@/shared/api/ky';

import type {
  GradeQuizRequestDTO,
  GradeQuizResponseDTO,
  UnlockStageRequestDTO,
  UnlockStageResponseDTO,
} from '../model/quiz.type';

export const quizPost = {
  gradeQuiz: async ({ quizId, optionId }: GradeQuizRequestDTO): Promise<GradeQuizResponseDTO> => {
    const response = api
      .post('quiz/grading', { json: { quizId, optionId } })
      .json<GradeQuizResponseDTO>();
    return response;
  },

  unlockStage: async ({
    userId,
    stage,
  }: UnlockStageRequestDTO): Promise<UnlockStageResponseDTO> => {
    const response = api
      .post('quiz/unlock', { json: { userId, stage } })
      .json<UnlockStageResponseDTO>();
    return response;
  },
};
