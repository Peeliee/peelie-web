import { useRef, useState, useEffect } from 'react';

import { useUser } from '@/app/provider/userContext';
import { Button } from '@/shared/ui/common/button';
import { cn } from '@/shared/lib/utils';
import { TextInput } from '@/shared/ui/common/TextInput/TextInput';
import { useEditProfile } from '@/entities/user/hooks/useEditProfile';
import { useOnboardingProgress } from '../context/OnboardingProgressContext';

interface MakeProfilePageProps {
  onNext: () => void;
}

const MakeProfilePage = ({ onNext }: MakeProfilePageProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { setShowProgress } = useOnboardingProgress();

  useEffect(() => {
    setShowProgress(false);
    return () => setShowProgress(true);
  }, [setShowProgress]);

  const { user } = useUser();
  const { isPending } = useEditProfile();

  const [form, setForm] = useState({
    userName: '',
    instagramId: '',
  });

  // 프로필 이미지 preview
  const [preview, setPreview] = useState<string | null>(null);

  /** 유저 정보 초기화 */
  useEffect(() => {
    if (user) {
      setForm({
        userName: '',
        instagramId: '',
      });
      setPreview(null);
    }
  }, [user]);

  /** 이미지 업로드 */
  const handleFileSelect = () => fileInputRef.current?.click();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  const handleChange = (key: 'userName' | 'instagramId', value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  /** 제출 */
  const handleSubmit = () => {
    onNext();
  };

  return (
    <div className="h-full px-5">
      {/* 상단 타이틀 */}
      <div className="text-center">
        <h2 className="heading-1-medium mb-2">나를 소개해볼까요?</h2>
        <p className="body-1-regular text-peelie-gray-500 mt-2">
          인스타그램을 연결하고,
          <br />
          이름과 사진으로 프로필을 완성하세요.
        </p>
      </div>

      {/* 프로필 영역 */}
      <div className="flex flex-row justify-between mt-16">
        <div className={cn('w-25 h-25 overflow-hidden rounded-200 bg-peelie-gray-100')}>
          {preview && <img src={preview} alt="프로필" className="w-full h-full object-cover" />}
        </div>

        <div className="flex flex-col gap-3 w-57">
          <Button variant="primary" buttonType="outline" size="medium" onClick={handleFileSelect}>
            프로필 사진 업로드
          </Button>
          <p className="body-2-regular text-peelie-gray-400">
            10MB 이내의 이미지 파일을 업로드해주세요.
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {/* 입력 필드 */}
      <div className="flex flex-col gap-8">
        <TextInput
          label="닉네임"
          value={form.userName}
          placeholder="닉네임을 입력해주세요."
          onChange={(e) => handleChange('userName', e.target.value)}
        />
        <TextInput
          label="instagram 아이디"
          value={form.instagramId}
          placeholder="아이디를 입력해주세요."
          onChange={(e) => handleChange('instagramId', e.target.value)}
        />
      </div>

      {/* 시작하기 버튼 */}
      <Button
        variant="primary"
        size="extraLarge"
        onClick={handleSubmit}
        disabled={isPending || !form.userName.length || !form.instagramId.length}
        className={cn(
          'fixed bottom-6 inset-x-4 shadow-elevation-3',
          isPending && 'cursor-not-allowed',
        )}
      >
        시작하기
      </Button>
    </div>
  );
};

export default MakeProfilePage;
