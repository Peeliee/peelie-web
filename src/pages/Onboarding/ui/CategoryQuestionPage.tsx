import { useFunnel } from '@use-funnel/react-router-dom';
import CategoryQuestionStep from '@/widgets/onboarding/CategoryQuestionStep';

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

  return (
    <div className="min-h-screen w-full flex flex-col px-6 py-10 pb-24">
      <div className="text-center mb-8">
        <h1 className="text-xl font-bold mb-2">선택한 카테고리에 대해 이야기해볼까요?</h1>
        <p className="text-gray-500 text-sm">
          작성한 내용은 바로 전체 공개되지 않고,
          <br />
          단계별 정보 공개에 사용돼요.
        </p>
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
          <CategoryQuestionStep categoryId={context.categoryId} onNext={() => onNext()} />
        )}
      />
    </div>
  );
};

export default CategoryQuestionPage;
