import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useKakaoWebLoginMutation } from '@/entities/auth';
import PATH from '@/shared/constants/path';
import { Button } from '@/shared/ui/common/button';

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=${encodeURIComponent(import.meta.env.VITE_KAKAO_REDIRECT_URI)}&response_type=code`;

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get('code');
  const exchangedCodeRef = useRef<string | null>(null);
  const kakaoLogin = useKakaoWebLoginMutation();

  useEffect(() => {
    if (!code || exchangedCodeRef.current === code) return;
    exchangedCodeRef.current = code;

    kakaoLogin.mutate(
      { code },
      {
        onSuccess: (data) => {
          if (data.type === 'login') {
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            navigate(PATH.HOME, { replace: true });
          } else {
            localStorage.setItem('signupToken', data.signupToken);
            navigate(PATH.ONBOARDING, { replace: true });
          }
        },
        onError: (err) => {
          console.error('카카오 로그인 실패:', err);
          navigate(PATH.LOGIN, { replace: true });
        },
      },
    );
  }, [code, kakaoLogin, navigate]);

  if (code) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-body-s-400 text-text-sub">로그인 중...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-title-headline-2 text-text-main">Peelie</h1>
      <Button
        size="lg"
        radius="small"
        className="w-64 bg-[#FEE500] text-[#191919] hover:bg-[#FDD835]"
        onClick={() => {
          window.location.href = KAKAO_AUTH_URL;
        }}
      >
        카카오 로그인
      </Button>
    </div>
  );
}
