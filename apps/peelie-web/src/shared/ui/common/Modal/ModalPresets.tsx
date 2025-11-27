import { useState, useEffect } from 'react';

import { cn } from '@/shared/lib/utils';

import { Button } from '../button';

import { ModalWrapper } from './ModalWrapper';
import MockImg from '@/assets/mockImg.svg?react';

export const QrModal = ({
  url,
  children,
  className,
}: {
  url: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <ModalWrapper open={open} onOpenChange={setOpen}>
      <ModalWrapper.Trigger className={className}>
        <Button>{children}</Button>
      </ModalWrapper.Trigger>

      <ModalWrapper.Content className="bg-peelie-primary-100 px-4 pt-4 w-66">
        <ModalWrapper.Header>
          <ModalWrapper.Title className="text-peelie-white">
            <span className="heading-1-medium text-peelie-gray-900">나의 QR 공유</span>
          </ModalWrapper.Title>
          <ModalWrapper.Description className="text-peelie-gray-150">
            <span className="body-1-regular text-peelie-gray-600">
              QR을 스캔하면 나의 프로필이
              <br /> 상대방에게 제공됩니다.
            </span>
          </ModalWrapper.Description>
        </ModalWrapper.Header>

        <ModalWrapper.QRImage value={url ?? 'https://naver.com'} />
        <Button variant="secondary" buttonType="fill" size="large" className='w-full' onClick={() => setOpen(false)}>닫기</Button>
      </ModalWrapper.Content>
    </ModalWrapper>
  );
};

export const QuizModal = ({
  answer, // true = 정답, false = 오답
  open,
  onClose,
  onClick,
  className,
}: {
  answer: boolean;
  open: boolean;
  onClose: () => void;
  onClick: () => void;
  className?: string;
}) => {
  // 정답/오답 텍스트 자동 매핑
  const title = answer ? '정답이에요' : '아쉽지만 오답이에요';
  const description = answer ? '다음 문제도 이어서 풀어봐요!' : '다시 한 번 생각해볼까요?';

  return (
    <ModalWrapper open={open} onOpenChange={onClose}>
      <ModalWrapper.Content
        className={cn(
          'bg-linear-to-t from-peelie-primary-600 to-peelie-secondary-200 p-4 gap-4 rounded-400',
          className,
        )}
      >
        <ModalWrapper.Header>
          <ModalWrapper.Title className="text-peelie-white">
            <span className="heading-1-medium">{title}</span>
          </ModalWrapper.Title>

          <ModalWrapper.Description className="text-peelie-gray-150 body-1-regular text-center">
            {description}
          </ModalWrapper.Description>
        </ModalWrapper.Header>

        <div className="flex w-full aspect-square items-center justify-center rounded-400 bg-white overflow-hidden">
          <MockImg />
        </div>

        <Button
          variant={'secondary'}
          size={'extraLarge'}
          buttonType={'fill'}
          state="default"
          onClick={onClick}
          className={cn('w-full')}
        >
          {answer ? '다음' : '다시 풀기'}
        </Button>
      </ModalWrapper.Content>
    </ModalWrapper>
  );
};

type UnlockConfig = {
  title: (name: string) => string;
  description: string;
  button: string | null;
  autoClose: boolean;
  showIcon: boolean;
};

const UNLOCK_MODAL_MAP: Record<1 | 2 | 3, UnlockConfig> = {
  1: {
    title: (name: string) => `${name}님과 한 겹 더\n가까워진 것을 축하해요!`,
    description: '',
    button: '확인하기',
    autoClose: false,
    showIcon: false,
  },
  2: {
    title: (name: string) => `${name}님의 프로필 사진이\n오픈되었어요!`,
    description: '5초 뒤에 자동으로 사라져요',
    button: null, // 자동 닫힘
    autoClose: true,
    showIcon: true,
  },
  3: {
    title: (name: string) => `${name}님의 인스타 ID가\n오픈되었어요!`,
    description: '5초 뒤에 자동으로 사라져요',
    button: '팔로우 하기',
    autoClose: true,
    showIcon: true,
  },
};

export const UnlockModal = ({
  stage,
  name,
  open,
  onClose,
  onAction,
}: {
  stage: 1 | 2 | 3;
  name: string;
  open: boolean;
  onClose: () => void;
  onAction?: () => void;
}) => {
  const config = UNLOCK_MODAL_MAP[stage];

  const [counter, setCounter] = useState(5);

  useEffect(() => {
    if (!open) return;

    // 자동 닫힘 모달(stage 2, 3)
    if (config.autoClose) {
      setCounter(5); // 모달 열릴 때 카운터 리셋

      const interval = setInterval(() => {
        setCounter((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [open, config.autoClose]);

  useEffect(() => {
    if (config.autoClose && counter <= 0) {
      onClose();
    }
  }, [counter, config.autoClose, onClose]);

  const handleButtonClick = () => {
    if (onAction) onAction();
    else onClose();
  };

  return (
    <ModalWrapper open={open} onOpenChange={(v) => !v && onClose()}>
      <ModalWrapper.Content
        className={cn(
          'bg-linear-to-t from-peelie-primary-600 to-peelie-secondary-200 p-4 gap-4 rounded-400',
        )}
      >
        {config.showIcon && (
          <div aria-hidden className="confetti-placeholder heading-1-medium">
            🎉
          </div>
        )}

        {stage === 1 && <ModalWrapper.CloseButton onClose={onClose} />}

        <div className="heading-1-medium text-peelie-white whitespace-pre-line">
          {config.title(name)}
        </div>

        {stage !== 3 && (
          <div className="flex w-full aspect-square items-center justify-center rounded-400 bg-white overflow-hidden">
            <MockImg />
          </div>
        )}

        {config.button && (
          <Button
            variant={'secondary'}
            size={'extraLarge'}
            buttonType={'fill'}
            state="default"
            className={cn('w-full')}
            onClick={handleButtonClick}
          >
            {config.button}
          </Button>
        )}

        {config.autoClose && (
          <p className="text-peelie-gray-150 body-2-regular text-center mt-2">
            {counter}초 뒤 자동으로 사라져요
          </p>
        )}
      </ModalWrapper.Content>
    </ModalWrapper>
  );
};

interface ConfirmModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  title: string;
  description?: string;
  firstButton?: {
    text?: string;
    variant?: 'primary' | 'inactive' | 'secondary' | 'error';
    onClick?: () => void;
  };
  secondButton?: {
    text?: string;
    variant?: 'primary' | 'inactive' | 'secondary' | 'error';
    onClick?: () => void;
  };
}

export const ConfirmModal = ({
  open: controlledOpen,
  onOpenChange,
  trigger,
  title,
  description,
  firstButton,
  secondButton,
}: ConfirmModalProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  const handleFirstButtonClick = () => {
    firstButton?.onClick?.();
    setOpen(false);
  };

  const handleSecondButtonClick = () => {
    secondButton?.onClick?.();
    setOpen(false);
  };

  return (
    <ModalWrapper open={open} onOpenChange={setOpen}>
      {trigger && <ModalWrapper.Trigger>{trigger}</ModalWrapper.Trigger>}

      <ModalWrapper.Content>
        <ModalWrapper.Header>
          <ModalWrapper.Title>{title}</ModalWrapper.Title>
          <ModalWrapper.Description>{description}</ModalWrapper.Description>
        </ModalWrapper.Header>

        <ModalWrapper.Footer>
          <Button variant={firstButton?.variant ?? 'inactive'} onClick={handleFirstButtonClick}>
            {firstButton?.text ?? '취소'}
          </Button>
          <Button variant={secondButton?.variant ?? 'primary'} onClick={handleSecondButtonClick}>
            {secondButton?.text ?? '확인'}
          </Button>
        </ModalWrapper.Footer>
      </ModalWrapper.Content>
    </ModalWrapper>
  );
};
