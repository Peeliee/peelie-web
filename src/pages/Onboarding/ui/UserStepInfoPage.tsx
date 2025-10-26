import { cn } from '@/shared/lib/utils';

interface UserStepInfoPageProps {
  onNext: () => void;
}

const UserStepInfoPage = ({ onNext }: UserStepInfoPageProps) => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-6 py-10">
      단계별 정보 보여주는 페이지
      <button
        onClick={onNext}
        className={cn(
          'fixed bottom-10 left-6 right-6 py-4 rounded-full text-center font-medium z-9999',
          'bg-orange-400 text-white active:bg-orange-500',
        )}
      >
        계속하기
      </button>
    </div>
  );
};

export default UserStepInfoPage;
