import api from '@/shared/api/ky';

import type {
  CategorySelectRequestDTO,
  CategorySelectResponseDTO,
  CategoryAnswerRequestDTO,
  CategoryAnswerResponseDTO,
  InteractionStyleRequestDTO,
  InteractionStyleResponseDTO,
} from '../model/onboarding.type';

export const onboardingPut = {
  selectCategory: async ({
    categoryIds,
  }: CategorySelectRequestDTO): Promise<CategorySelectResponseDTO> => {
    const response = await api
      .put('onboarding/categories', { json: categoryIds })
      .json<CategorySelectResponseDTO>();

    return response;
  },

  answerCategoryQuestion: async ({
    subCategoryId,
    answers,
  }: CategoryAnswerRequestDTO): Promise<CategoryAnswerResponseDTO> => {
    const response = await api
      .put('onboarding/answers', { json: { subCategoryId, answers } })
      .json<CategoryAnswerResponseDTO>();

    return response;
  },

  submitInteractionInfo: async ({
    interactionStyle,
    bio,
  }: InteractionStyleRequestDTO): Promise<InteractionStyleResponseDTO> => {
    const response = await api
      .put('onboarding/interaction', { json: { interactionStyle, bio } })
      .json<InteractionStyleResponseDTO>();

    return response;
  },
};
