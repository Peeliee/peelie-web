import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUser } from '@/app/provider/userContext';
import { Button } from '@/shared/ui/common/button';
import { cn } from '@/shared/lib/utils';
import { TextInput } from '@/shared/ui/common/TextInput/TextInput';
import { useEditProfile } from '@/entities/user/hooks/useEditProfile';

interface EditProfileForm {
  userName: string;
  instagramId: string;
  stage0Bio: string;
  stage1Bio: string;
  stage2Bio: string;
  stage3Bio: string;
}

const EditProfilePage = () => {
  const navigate = useNavigate();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { user } = useUser();
  const { mutate, isPending } = useEditProfile();

  const [form, setForm] = useState<EditProfileForm>({
    userName: '',
    instagramId: '',
    stage0Bio: '',
    stage1Bio: '',
    stage2Bio: '',
    stage3Bio: '',
  });

  useEffect(() => {
    if (user) {
      setForm({
        userName: user.userName ?? '',
        instagramId: user.instagramId ?? '',
        stage0Bio: user.bio.find((b) => b.stage === 0)?.bio ?? '',
        stage1Bio: user.bio.find((b) => b.stage === 1)?.bio ?? '',
        stage2Bio: user.bio.find((b) => b.stage === 2)?.bio ?? '',
        stage3Bio: user.bio.find((b) => b.stage === 3)?.bio ?? '',
      });
    }
  }, [user]);

  const [preview, setPreview] = useState<string | null>(user?.profileImageUrl ?? null);

  const handleFileSelect = () => fileInputRef.current?.click();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  const handleChange = (key: keyof EditProfileForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    // 전송 형식 맞게 변환
    const payload = {
      userName: form.userName,
      instagramId: form.instagramId,
      interactionStyle: user?.interactionStyle ?? 'BALANCED', // 일단 변경 금지
      profileImageUrl: user?.profileImageUrl ?? '', // TODO :이미지 업로드 api 나오면 작업
      stage0Bio: form.stage0Bio,
      stage1Bio: form.stage1Bio,
      stage2Bio: form.stage2Bio,
      stage3Bio: form.stage3Bio,
    };

    mutate(payload);
  };

  console.log(user);
  return (
    <div className="h-full mt-12 mb-16 p-4">
      {/* 프로필 */}
      <div className="flex flex-row justify-between">
        <div className={cn('w-25 h-25 overflow-hidden')}>
          {preview ? (
            <img src={preview} alt="프로필" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
              <img
                src={user?.profileImageUrl ?? ''}
                alt="프로필"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4 w-57">
          <Button variant="primary" buttonType="outline" size="medium" onClick={handleFileSelect}>
            프로필 사진 변경
          </Button>
          <p className="body-2-regular">20MB 이내의 이미지 파일을 업로드 해주세요.</p>
          {/* 실제 파일 input은 숨김 */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      <div className="flex flex-col gap-8 mt-8 mb-8">
        <TextInput
          label="닉네임"
          value={form.userName}
          placeholder="닉네임을 입력해주세요"
          onChange={(e) => handleChange('userName', e.target.value)}
        />
        <TextInput
          label="0단계 한 줄 소개"
          value={form.stage0Bio}
          placeholder="띄어쓰기 포함 30자 이내로 입력해주세요"
          onChange={(e) => handleChange('stage0Bio', e.target.value)}
        />
        <TextInput
          label="1단계 한 줄 소개"
          value={form.stage1Bio}
          placeholder="띄어쓰기 포함 30자 이내로 입력해주세요"
          onChange={(e) => handleChange('stage1Bio', e.target.value)}
        />
        <TextInput
          label="2단계 한 줄 소개"
          value={form.stage2Bio}
          placeholder="띄어쓰기 포함 30자 이내로 입력해주세요"
          onChange={(e) => handleChange('stage2Bio', e.target.value)}
        />
        <TextInput
          label="3단계 한 줄 소개"
          value={form.stage3Bio}
          placeholder="띄어쓰기 포함 30자 이내로 입력해주세요"
          onChange={(e) => handleChange('stage3Bio', e.target.value)}
        />
        <TextInput
          label="인스타그램 ID"
          value={form.instagramId}
          placeholder="인스타그램 ID 를 입력해주세요"
          onChange={(e) => handleChange('instagramId', e.target.value)}
        />
      </div>
      <Button
        variant={'primary'}
        buttonType={'outline'}
        size={'medium'}
        className="w-full"
        onClick={() => navigate('card-regenerate')}
      >
        카드 재생성하기
      </Button>

      <Button
        variant={'primary'}
        size={'large'}
        state={isPending ? 'disabled' : 'default'}
        onClick={handleSubmit}
        disabled={isPending}
        className={cn(
          'fixed bottom-2 left-4 right-4 shadow-elevation-3',
          isPending && 'cursor-not-allowed',
        )}
      >
        수정 완료
      </Button>
    </div>
  );
};

export default EditProfilePage;
