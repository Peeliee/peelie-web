import { useFunnel } from '@use-funnel/react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { userPost } from '@/entities/user/api/user-post';
import CategoryQuestionStep from '@/widgets/onboarding/CategoryQuestionStep';
import CategoryQuestionCharacter from '@/assets/character/categoryQuestionCharacter.svg?react';
import { FriendBioBubble } from '@/features/friend/ui/FriendBioBubble';

interface CategoryQuestionPageProps {
  selected: number[];
  onNext: () => void;
}

const CategoryQuestionPage = ({ selected, onNext }: CategoryQuestionPageProps) => {
  const funnel = useFunnel<{
    category1: { categoryId: number; answers: Record<string, string> };
    category2: { categoryId: number; answers: Record<string, string> };
    category3: { categoryId: number; answers: Record<string, string> };
  }>({
    id: 'category-funnel',
    initial: { step: 'category1', context: { categoryId: selected[0], answers: {} } },
  });

  const { mutate: generateUserStepInfo, isPending } = useMutation({
    mutationFn: userPost.generateUserStepInfo,
    onSuccess: async () => {
      console.log('단계별 정보 생성 요청 완료');
      onNext();
    },
    onError: (err) => {
      console.error('단계별 정보 생성 요청 실패', err);
    },
  });

  const handleLastStep = () => {
    if (isPending) return;
    generateUserStepInfo({ categoryIds: selected });
  };

  return (
    <div className="w-full flex flex-col px-4 pt-1 pb-24">
      <div className="relative">
        <CategoryQuestionCharacter />
        <FriendBioBubble
          tailPosition="left"
          className="absolute left-30 top-8 w-59 h-20"
          repeat={false}
          bio={[{ text: '선택한 주제에 대한 세부 질문에 답해주세요!', bold: false }]}
        />
      </div>

      <funnel.Render
        category1={({ context, history }) => (
          <CategoryQuestionStep
            categoryId={context.categoryId}
            onNext={() =>
              history.push('category2', {
                categoryId: selected[1],
              })
            }
          />
        )}
        category2={({ context, history }) => (
          <CategoryQuestionStep
            categoryId={context.categoryId}
            onNext={() =>
              history.push('category3', {
                categoryId: selected[2],
              })
            }
          />
        )}
        category3={({ context }) => (
          <CategoryQuestionStep categoryId={context.categoryId} onNext={handleLastStep} />
        )}
      />
    </div>
  );
};

export default CategoryQuestionPage;
