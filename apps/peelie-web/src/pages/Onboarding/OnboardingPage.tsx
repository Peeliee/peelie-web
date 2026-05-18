import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { useCompleteOnboardingMutation } from '@/entities/auth';
import PATH from '@/shared/constants/path';
import { PERSONALITY_OPTIONS, PersonalityType } from '@/shared/constants/personality';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/common/button';
import { Input } from '@/shared/ui/common/Input';
import { ChevronLeftIcon } from '@/shared/ui/icons/ChevronLeftIcon';

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'personality' | 'nickname'>('personality');
  const [personality, setPersonality] = useState<PersonalityType | null>(null);
  const [nickname, setNickname] = useState('');
  const signupToken = localStorage.getItem('signupToken');
  const completeOnboarding = useCompleteOnboardingMutation();

  if (!signupToken) {
    return <Navigate to={PATH.LOGIN} replace />;
  }

  const handleSubmit = () => {
    if (!personality || nickname.trim().length === 0 || completeOnboarding.isPending) return;
    completeOnboarding.mutate(
      { signupToken, nickname: nickname.trim(), personality },
      {
        onSuccess: (data) => {
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          localStorage.removeItem('signupToken');
          navigate(PATH.HOME, { replace: true });
        },
        onError: (err) => {
          console.error('온보딩 완료 실패:', err);
        },
      },
    );
  };

  const isPersonalityStep = step === 'personality';
  const isNextDisabled = isPersonalityStep
    ? !personality
    : nickname.trim().length === 0 || completeOnboarding.isPending;
  const handleBack = () => {
    if (isPersonalityStep) {
      navigate(-1);
      return;
    }

    setStep('personality');
  };
  const handleNext = () => {
    if (isPersonalityStep) {
      if (!personality) return;
      setStep('nickname');
      return;
    }

    handleSubmit();
  };

  return (
    <div
      className={cn(
        'relative min-h-screen overflow-hidden bg-gradient-to-b',
        'from-brand-30 to-background-main to-[80%]',
      )}
    >
      <img
        src="/onboarding-character.png"
        alt=""
        aria-hidden
        className={cn(
          'pointer-events-none absolute -bottom-4 left-1/2 z-0',
          'w-[423px] max-w-none -translate-x-1/2 select-none',
        )}
      />

      <header className={cn('relative z-10 flex items-center', 'px-5 py-4')}>
        <button type="button" onClick={handleBack} aria-label="뒤로가기">
          <ChevronLeftIcon className="size-6 text-gray-99" />
        </button>
      </header>

      <main className={cn('relative z-10 mt-9 flex flex-col', 'items-center gap-9 px-5')}>
        <div className="flex flex-col items-center gap-3 text-center">
          {isPersonalityStep ? (
            <>
              <h1 className="text-title-headline-2 text-text-main">
                나는 어떤 대화 유형에 가까운가요?
              </h1>
              <p className="text-body-s-400 text-text-sub">먼저 캐릭터 유형을 선택해주세요.</p>
            </>
          ) : (
            <>
              <h1 className="text-title-headline-2 text-text-main">
                친구와의 어색함을 대신 풀어줄 캐릭터!
                <br />
                어떤 닉네임을 붙여줄까요?
              </h1>
              <p className="text-body-s-400 text-text-sub">
                캐릭터와 유저 닉네임은 동일하게 사용됩니다.
              </p>
            </>
          )}
        </div>

        {isPersonalityStep ? (
          <div className={cn('grid w-full max-w-[320px]', 'grid-cols-2 gap-3')}>
            {PERSONALITY_OPTIONS.map((option) => {
              const isSelected = personality === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  className={cn(
                    'rounded-small border px-3 py-3 text-body-s-400',
                    isSelected
                      ? 'border-gray-70 bg-gray-70 text-gray-01'
                      : 'border-border-main bg-gray-01 text-text-main',
                  )}
                  onClick={() => setPersonality(option.value)}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        ) : (
          <div
            className={cn(
              'w-[260px] rounded-small border border-border-main',
              'bg-gray-01 px-3 py-2',
            )}
          >
            <p className="text-caption-m-400 text-text-disable">닉네임</p>
            <Input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className={cn(
                'w-full bg-transparent text-body-s-400 text-text-main',
                'outline-none placeholder:text-text-disable',
              )}
              placeholder="닉네임을 입력하세요."
              maxLength={20}
            />
          </div>
        )}
      </main>

      <div
        className={cn(
          'fixed inset-x-0 bottom-0 z-20 bg-gradient-to-b',
          'from-transparent to-background-main',
        )}
      >
        <div className="px-5 py-4">
          <Button
            size="lg"
            radius="full"
            className="w-full bg-gray-70 text-gray-01"
            disabled={isNextDisabled}
            onClick={handleNext}
          >
            다음으로
          </Button>
        </div>
      </div>
    </div>
  );
}
