import { useState } from 'react';

import { Button } from '../button';

import { ModalWrapper } from './ModalWrapper';

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
