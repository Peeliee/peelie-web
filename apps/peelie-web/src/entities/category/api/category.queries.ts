import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useQueryClient, useQuery, useQueries } from '@tanstack/react-query';
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

// 단일 카테고리의 subQuestion 들을 한번에 페칭하는 훅
export const useGetAllSubQuestions = (categoryId: number) => {
  const { data: mainData, isLoading: isMainLoading } = useQuery(
    categoryKeys.mainQuestion(categoryId),
  );

  const subCategoryIds = mainData?.data.subCategoryNames.map((s) => s.id) ?? [];

  // subCategoryIds 기반 subQuestion 병렬 페칭
  const subQuestionQueries = useQueries({
    queries:
      subCategoryIds.length > 0
        ? subCategoryIds.map((subId) => ({
            ...categoryKeys.subQuestion(categoryId, subId),
            enabled: !!mainData,
          }))
        : [],
  });

  const isSubLoading = subQuestionQueries.some((q) => q.isLoading);
  const subQuestions = subQuestionQueries.flatMap((q) => q.data?.data ?? []);

  return {
    isLoading: isMainLoading || isSubLoading,
    mainQuestion: mainData?.data,
    subQuestions,
  };
};
