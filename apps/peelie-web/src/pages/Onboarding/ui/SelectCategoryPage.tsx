import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { CategorySelectGrid } from '@/features/onboarding/ui/CategorySelectGrid';
import { usePrefetchCategoryMainQuestion } from '@/entities/category/api/category.queries';
import { onboardingPut } from '@/entities/onboarding/api/onboarding-put';
import { userStepInfoQuery } from '@/entities/user/api/user.queries';
import { Button } from '@/shared/ui/common/button';

interface SelectCategoryPageProps {
  onNext: (selectedIds: number[]) => void;
}

export const useClearFunnelSession = (id: string) => {
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams.has(`${id}.step`)) {
      searchParams.delete(`${id}.step`);
      setSearchParams(searchParams);
      console.log(`[Funnel Reset] Cleared session for ${id}`);
    }
  }, []);
};

const SelectCategoryPage = ({ onNext }: SelectCategoryPageProps) => {
  const [selected, setSelected] = useState<number[]>([]);
  const prefetchMainQuestion = usePrefetchCategoryMainQuestion();

  const queryClient = useQueryClient();

  const { mutate: selectCategory, isPending } = useMutation({
    mutationFn: onboardingPut.selectCategory,
    onSuccess: (res) => {
      console.log('카테고리 선택 성공', res);
      queryClient.removeQueries({
        queryKey: userStepInfoQuery.userStepInfo().queryKey,
      });
      onNext(selected);
    },
    onError: (err) => {
      console.error('카테고리 선택 실패', err);
    },
  });

  const handleSelect = (newSelected: number[]) => {
    setSelected(newSelected);
    newSelected.forEach((id) => prefetchMainQuestion(id));
  };

  const handleNext = () => {
    if (selected.length >= 3) {
      selectCategory({ categoryIds: selected });
    }
  };

  return (
    <div className="flex flex-col px-6 py-20 justify-between">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">
          관심있는 주제를
          <br />
          선택해주세요.
        </h2>
        <p className="text-sm text-gray-500">
          관심있는 주제를 <span className="text-orange-500 font-semibold">3가지만</span>{' '}
          선택해주세요.
          <br />
          선택한 주제는 이후 나의 여정에 사용돼요!
        </p>
      </div>

      <CategorySelectGrid onChange={handleSelect} className="mb-15" />

      <Button
        variant={'primary'}
        size={'extraLarge'}
        onClick={handleNext}
        disabled={isPending || selected.length < 3}
        className={`fixed bottom-10 inset-x-4`}
      >
        {isPending ? '로딩 중...' : '계속하기'}
      </Button>
    </div>
  );
};

export default SelectCategoryPage;
