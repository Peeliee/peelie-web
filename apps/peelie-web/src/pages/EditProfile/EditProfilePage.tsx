import { useRef, useState } from 'react';

import { useUser } from '@/app/provider/userContext';
import { Button } from '@/shared/ui/common/button';
import { cn } from '@/shared/lib/utils';
import { TextInput } from '@/shared/ui/common/TextInput/TextInput';

const EditProfilePage = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { user } = useUser();

  const [preview, setPreview] = useState<string | null>(user?.profileImageUrl ?? null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 미리보기용 URL 생성
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);

    // TODO: 이 파일을 서버로 업로드하거나 상태에 저장하는 로직 추가
  };

  console.log(user);
  return (
    <div className="mt-12 p-4">
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
          placeholder="닉네임을 입력해주세요"
          defaultValue={user?.userName ?? ''}
        />
        <TextInput
          label="0단계 한 줄 소개"
          placeholder="띄어쓰기 포함 20자 이내로 입력해주세요"
          defaultValue={user?.bio.find((b) => b.stage === 0)?.bio ?? ''}
        />
        <TextInput
          label="1단계 한 줄 소개"
          placeholder="띄어쓰기 포함 20자 이내로 입력해주세요"
          defaultValue={user?.bio.find((b) => b.stage === 1)?.bio ?? ''}
        />
        <TextInput
          label="2단계 한 줄 소개"
          placeholder="띄어쓰기 포함 20자 이내로 입력해주세요"
          defaultValue={user?.bio.find((b) => b.stage === 2)?.bio ?? ''}
        />
        <TextInput
          label="3단계 한 줄 소개"
          placeholder="띄어쓰기 포함 20자 이내로 입력해주세요"
          defaultValue={user?.bio.find((b) => b.stage === 3)?.bio ?? ''}
        />

         <TextInput
          label="인스타그램 ID"
          placeholder="아이디를 입력해주세요"
          defaultValue={user?.instagramId ?? ''}
        />
      </div>
      <Button variant={'primary'} buttonType={'outline'} size={'medium'} className="w-full">
        카드 재생성하기
      </Button>

      <Button
        variant={'primary'}
        size={'large'}
        className="fixed bottom-2 left-4 right-4 shadow-elevation-3"
      >
        수정 완료
      </Button>
    </div>
  );
};

export default EditProfilePage;
