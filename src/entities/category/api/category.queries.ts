import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useQueryClient } from '@tanstack/react-query';
import { getCategoryQuestion } from './category-get';

export const categoryKeys = createQueryKeys('category', {
  mainQuestion: (categoryId: number) => ({
    queryKey: ['mainQuestion', categoryId],
    queryFn: () => getCategoryQuestion.mainQuestion(categoryId),
  }),
  subQuestion: (categoryId: number, subCategoryId: number) => ({
    queryKey: ['subQuestion', categoryId, subCategoryId],
    queryFn: () => getCategoryQuestion.subQuestion(categoryId, subCategoryId),
  }),
});

// main 질문 (L0 질문) 프리페칭 훅
export const usePrefetchCategoryMainQuestion = () => {
  const queryClient = useQueryClient();

  return (categoryId: number) => {
    queryClient.prefetchQuery({
      queryKey: categoryKeys.mainQuestion(categoryId).queryKey,
      queryFn: categoryKeys.mainQuestion(categoryId).queryFn,
    });
  };
};
