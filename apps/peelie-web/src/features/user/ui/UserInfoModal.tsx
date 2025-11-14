import { useState } from 'react';

import { ModalWrapper } from '@/shared/ui/common/Modal/ModalWrapper';
import { ViewMode, EditMode } from '@/entities/user/ui/UserInfoModalPresets';

interface UserInfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  subTitle: string;
  content: string;
  onEdit?: (data: { title: string; subTitle: string; content: string }) => void;
}

export const UserInfoModal = ({
  open,
  onOpenChange,
  title,
  subTitle,
  content,
  onEdit,
}: UserInfoModalProps) => {
  const [isEditMode, setIsEditMode] = useState(false);

  // 수정 모드용 state
  const [form, setForm] = useState({ title, subTitle, content });

  // 보기 → 수정 모드로 들어갈 때 기존 내용 세팅
  const handleStartEdit = () => {
    setForm({ title, subTitle, content });
    setIsEditMode(true);
  };

  const handleApply = () => {
    onEdit?.(form);
    setIsEditMode(false);
  };

  return (
    <ModalWrapper open={open} onOpenChange={onOpenChange}>
      <ModalWrapper.Content className="w-87.5 bg-peelie-primary-300 rounded-300">
        <ModalWrapper.CloseButton onClose={() => onOpenChange(false)} />

        {!isEditMode ? (
          <ViewMode title={title} subTitle={subTitle} content={content} onEdit={handleStartEdit} />
        ) : (
          <EditMode form={form} setForm={setForm} onApply={handleApply} />
        )}
      </ModalWrapper.Content>
    </ModalWrapper>
  );
};
