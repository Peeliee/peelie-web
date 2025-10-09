import api from '@/shared/api/ky';
import type {
  CategoryMainQuestionResponseDTO,
  CategorySubQuestionResponseDTO,
} from '@/entities/category/model/category.type';

export const getCategoryQuestion = {
  mainQuestion: async (categoryId: number) => {
    const response = await api
      .get(`questionnaire/categories/${categoryId}`)
      .json<CategoryMainQuestionResponseDTO>();

    return response;
  },

  subQuestion: async (categoryId: number, subCategoryId: number) => {
    const response = await api
      .get(`questionnaire/categories/${categoryId}/subcategories/${subCategoryId}/questions`)
      .json<CategorySubQuestionResponseDTO>();

    return response;
  },
};
