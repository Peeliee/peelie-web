import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SsgoiTransition } from '@ssgoi/react';
import { Button } from '@/shared/ui/common/button';
import { postKakaoLogin } from './api';

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=${encodeURIComponent(import.meta.env.VITE_KAKAO_REDIRECT_URI)}&response_type=code`;

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get('code');

  useEffect(() => {
    if (!code) return;

    postKakaoLogin(code)
      .then((res) => {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.error('카카오 로그인 실패:', err);
        navigate('/login', { replace: true });
      });
  }, [code, navigate]);

  if (code) {
    return (
      <SsgoiTransition id="/login">
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-body-2 text-text-sub">로그인 중...</p>
        </div>
      </SsgoiTransition>
    );
  }

  return (
    <SsgoiTransition id="/login">
      <div className="flex flex-col items-center justify-center min-h-screen
gap-6">
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
    </SsgoiTransition>
  );
}
