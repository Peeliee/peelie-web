import InteractionStyleGroup from '@/assets/interactionStyleGroup.svg?react';
import { Button } from '@/shared/ui/common/button';

interface IntroduceInteractionStylePageProps {
  onNext: () => void;
}

const IntroduceInteractionStylePage = ({ onNext }: IntroduceInteractionStylePageProps) => {
  return (
    <div className="w-full flex flex-col justify-center items-center px-6 py-10">
      <div className="text-center">
        <h1 className="text-xl font-bold mb-2">교류 성향을 선택해요</h1>
        <p className="text-gray-500 text-sm">
          당신의 교류 성향을 알려주세요.
          <br />
          이후 더 잘 맞는 사람과 연결될 수 있어요.
        </p>
      </div>

      <InteractionStyleGroup className="mt-30" />

      <Button
        variant={'primary'}
        size={'extraLarge'}
        onClick={onNext}
        className="fixed bottom-4 inset-x-4"
      >
        계속하기
      </Button>
    </div>
  );
};

export default IntroduceInteractionStylePage;
