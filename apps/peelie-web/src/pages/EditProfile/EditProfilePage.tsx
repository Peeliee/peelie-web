import { useForm } from '@peelie/form';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUser } from '@/app/provider/userContext';
import { Button } from '@/shared/ui/common/button';
import { cn } from '@/shared/lib/utils';
import { TextInput } from '@/shared/ui/common/TextInput/TextInput';
import { useEditProfile } from '@/entities/user/hooks/useEditProfile';

const EditProfilePage = () => {
  const navigate = useNavigate();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { user } = useUser();

  const { mutate, isPending } = useEditProfile();

  // 2) user 로딩된 이후 → defaultValues 한번에 넣기
  const {
    register,
    setValue,
    getValues,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      userName: '',
      instagramId: '',
      stage0Bio: '',
      stage1Bio: '',
      stage2Bio: '',
      stage3Bio: '',
    },
  });

  // defaultValue 초기화.. 이렇게 하기 싫은데 어려움..
  useEffect(() => {
    if (!user) return;
    setValue('userName', user.userName);
    setValue('instagramId', user.instagramId ?? '');
    setValue('stage0Bio', user?.bio.find((b) => b.stage === 0)?.bio ?? '');
    setValue('stage1Bio', user?.bio.find((b) => b.stage === 1)?.bio ?? '');
    setValue('stage2Bio', user?.bio.find((b) => b.stage === 2)?.bio ?? '');
    setValue('stage3Bio', user?.bio.find((b) => b.stage === 3)?.bio ?? '');
  }, [user]);

  // console.log('stage0Bio : ', getValues('stage0Bio'));

  // watch('userName', (values) => {
  //   console.log('userName 변경됨 : ', values);
  // });

  const onSubmit = (data) => {
    console.log('폼 제출 데이터:', data);
    alert('제출 완료! 콘솔을 확인하세요.');
  };

  const [preview, setPreview] = useState<string | null>(user?.profileImageUrl ?? null);

  const handleFileSelect = () => fileInputRef.current?.click();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  console.log('EditProfilePage render');

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
          placeholder="닉네임을 입력해주세요"
          {...register('userName', { required: '이름은 필수입니다' })}
          error={!!errors.userName}
          errorText={errors.userName}
        />
        <TextInput
          label="0단계 한 줄 소개"
          {...register('stage0Bio', { required: '0단계 한 줄 소개는 필수입니다' })}
          error={!!errors.stage0Bio}
          errorText={errors.stage0Bio}
        />
        <TextInput
          label="1단계 한 줄 소개"
          {...register('stage1Bio', { required: '1단계 한 줄 소개는 필수입니다' })}
          error={!!errors.stage1Bio}
          errorText={errors.stage1Bio}
        />

        <TextInput
          label="2단계 한 줄 소개"
          {...register('stage2Bio', { required: '2단계 한 줄 소개는 필수입니다' })}
          error={!!errors.stage2Bio}
          errorText={errors.stage2Bio}
        />

        <TextInput
          label="3단계 한 줄 소개"
          {...register('stage3Bio', { required: '3단계 한 줄 소개는 필수입니다' })}
          error={!!errors.stage3Bio}
          errorText={errors.stage3Bio}
        />

        <TextInput label="인스타그램 ID" {...register('instagramId', { required: true })} />
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
        onClick={handleSubmit(onSubmit)}
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
