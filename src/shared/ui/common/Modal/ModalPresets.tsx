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

export const ConfirmModal = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <ModalWrapper open={open} onOpenChange={setOpen}>
      <ModalWrapper.Trigger>
        <Button>팔로우 테스트</Button>
      </ModalWrapper.Trigger>

      <ModalWrapper.Content>
        <ModalWrapper.Header>
          <ModalWrapper.Title>“김용희님을 팔로우하시겠어요?”</ModalWrapper.Title>
          <ModalWrapper.Description>
            님의 관심사와 기본 프로필을 볼 수 있어요.
          </ModalWrapper.Description>
        </ModalWrapper.Header>

        <ModalWrapper.Footer>
          <Button variant="inactive" onClick={() => setOpen(false)}>
            취소
          </Button>
          <Button variant="primary">팔로우</Button>
        </ModalWrapper.Footer>
      </ModalWrapper.Content>
    </ModalWrapper>
  );
};
