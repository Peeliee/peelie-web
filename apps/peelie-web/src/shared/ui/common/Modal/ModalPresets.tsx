import { useState } from 'react';

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

      <ModalWrapper.Content className="bg-[#FF8C00] px-4 pt-4 pb-12">
        <ModalWrapper.CloseButton onClose={() => setOpen(false)} />
        <ModalWrapper.Header>
          <ModalWrapper.Title className="text-peelie-white">
            <span className="heading-1-medium">나의 QR 공유</span>
          </ModalWrapper.Title>
          <ModalWrapper.Description className="text-peelie-gray-150">
            <span className="body-1-regular">
              QR을 스캔하면 나의 프로필이
              <br /> 상대방에게 제공됩니다.
            </span>
          </ModalWrapper.Description>
        </ModalWrapper.Header>

        <ModalWrapper.QRImage value={url ?? 'https://naver.com'} />
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
      {/* <ModalWrapper.Trigger className={className}>{children}</ModalWrapper.Trigger> */}

      <ModalWrapper.Content
        className={cn(
          'bg-linear-to-t from-peelie-primary-600 to-peelie-secondary-200 p-4 gap-4 rounded-400',
          className,
        )}
      >
        <ModalWrapper.CloseButton onClose={onClose} />

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
