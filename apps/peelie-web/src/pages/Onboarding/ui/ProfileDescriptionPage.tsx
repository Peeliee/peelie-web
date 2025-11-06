import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { onboardingPut } from '@/entities/onboarding/api/onboarding-put';
import { TextInput } from '@/shared/ui/common/TextInput/TextInput';
import type { InteractionStyleKey } from '@/shared/constants/interactionStyle';
import { cn } from '@/shared/lib/utils';

interface ProfileDescriptionPageProps {
  interactionStyle: InteractionStyleKey;
  onNext: () => void;
}

const ProfileDescriptionPage = ({ interactionStyle, onNext }: ProfileDescriptionPageProps) => {
  const [description, setDescription] = useState('');
  const isValid = description.trim().length > 0;

  const { mutate: submitInteractionInfo, isPending } = useMutation({
    mutationFn: onboardingPut.submitInteractionInfo,
    onSuccess: () => {
      console.log('자기소개 등록 성공');
      onNext();
    },
    onError: (err) => {
      console.error('자기소개 등록 실패:', err);
    },
  });

  console.log(interactionStyle);

  const handleSubmit = () => {
    if (!isValid || isPending) return;
    submitInteractionInfo({ interactionStyle, bio: description });
  };
  return (
    <div className="flex flex-col px-6 py-10">
      <TextInput
        label="자기소개 한마디"
        placeholder="입력하세요"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mt-40"
      />
      <button
        className={cn(
          'fixed bottom-10 left-6 right-6 py-4 rounded-full text-center font-medium',
          'bg-orange-400 text-white active:bg-orange-500',
        )}
        onClick={handleSubmit}
      >
        {isPending ? '...로딩 중' : '계속하기'}
      </button>
    </div>
  );
};

export default ProfileDescriptionPage;
