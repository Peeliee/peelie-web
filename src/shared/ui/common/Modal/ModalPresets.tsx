import { useState } from 'react';

import { Button } from '../button';

import { ModalWrapper } from './ModalWrapper';

/**
 * @file ModalPresets.tsx
 *
 * @description
 * ModalWrapper를 기반으로 구현된 공용 모달 컴포넌트 모음.
 *
 *   ModalWrapper를 중심으로
 *   다양한 목적의 모달을 프리셋 형태로 재사용 하기 위해 존재함.
 *   개별 도메인과 직접적인 비즈니스 로직을 갖지 않음.
 *
 * @components
 * - QrModal: 프로필 공유용 QR 코드 노출 모달
 * - ConfirmModal: 팔로우 / 확인 등의 액션을 확인받는 일반 확인 모달
 */

export const QrModal = ({
  url,
  label,
  nickName,
}: {
  url: string;
  label: string;
  nickName: string;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <ModalWrapper open={open} onOpenChange={setOpen}>
      <ModalWrapper.Trigger>
        <Button>QR 테스트</Button>
      </ModalWrapper.Trigger>

      <ModalWrapper.Content className="bg-[#FF8C00] text-white">
        <ModalWrapper.CloseButton onClose={() => setOpen(false)} />
        <ModalWrapper.Header>
          <ModalWrapper.Title>QR을 스캔해주세요</ModalWrapper.Title>
          <ModalWrapper.Description>
            교류하고자 하는 친구에게 나의 QR을 보여주세요.
          </ModalWrapper.Description>
        </ModalWrapper.Header>

        <ModalWrapper.QRImage value={url ?? 'https://naver.com'} />

        <ModalWrapper.UserInfo label={label} nickName={nickName} />
      </ModalWrapper.Content>
    </ModalWrapper>
  );
};

/**
 * ConfirmModal
 *
 * @example
 * ```tsx
 * <ConfirmModal
 *   trigger={<Button>회원 탈퇴</Button>}
 *   title="정말 탈퇴하시겠어요?"
 *   description="탈퇴 시 모든 데이터가 삭제됩니다."
 *   cancel={{
 *     text: '취소',
 *     variant: 'inactive',
 *     onClick: () => console.log('취소 누름'),
 *   }}
 *   confirm={{
 *     text: '탈퇴하기',
 *     variant: 'primary',
 *     onClick: () => console.log('탈퇴 처리 로직 실행'),
 *   }}
 * />
 */
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
