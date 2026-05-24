import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useBridge } from '@/app/provider/BridgeProvider';
import {
  useAppleAppLoginMutation,
  useKakaoAppLoginMutation,
  useKakaoWebLoginMutation,
} from '@/entities/auth';
import PATH from '@/shared/constants/path';
import { isInWebView } from '@/shared/lib/isInWebView';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/common/button';

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=${encodeURIComponent(import.meta.env.VITE_KAKAO_REDIRECT_URI)}&response_type=code`;

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get('code');
  const exchangedCodeRef = useRef<string | null>(null);
  const bridge = useBridge();
  const { mutateAsync: kakaoWebLogin } = useKakaoWebLoginMutation();
  const { mutateAsync: appleLogin } = useAppleAppLoginMutation();
  const { mutateAsync: kakaoAppLogin } = useKakaoAppLoginMutation();
  const inWebView = isInWebView();

  useEffect(() => {
    if (!code || exchangedCodeRef.current === code) return;
    exchangedCodeRef.current = code;

    const exchangeCode = async () => {
      try {
        const data = await kakaoWebLogin({ code });

        if (data.type === 'login') {
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          navigate(PATH.HOME, { replace: true });
          return;
        }

        localStorage.setItem('signupToken', data.signupToken);
        navigate(PATH.ONBOARDING, { replace: true });
      } catch (err) {
        console.error('카카오 로그인 실패:', err);
        navigate(PATH.LOGIN, { replace: true });
      }
    };

    void exchangeCode();
  }, [code, kakaoWebLogin, navigate]);

  const handleKakaoNativeLogin = async () => {
    try {
      const { accessToken } = await bridge.request('KAKAO_LOGIN', undefined, {
        timeout: 'none',
      });
      const data = await kakaoAppLogin({ accessToken });

      if (data.type === 'login') {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        navigate(PATH.HOME, { replace: true });
        return;
      }

      localStorage.setItem('signupToken', data.signupToken);
      navigate(PATH.ONBOARDING, { replace: true });
    } catch (err) {
      console.error('카카오 네이티브 로그인 실패:', err);
    }
  };

  const handleAppleLogin = async () => {
    try {
      const { authorizationCode } = await bridge.request('APPLE_LOGIN', undefined, {
        timeout: 'none',
      });
      const data = await appleLogin({ authorizationCode });

      if (data.type === 'login') {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        navigate(PATH.HOME, { replace: true });
        return;
      }

      localStorage.setItem('signupToken', data.signupToken);
      navigate(PATH.ONBOARDING, { replace: true });
    } catch (err) {
      console.error('애플 로그인 실패:', err);
    }
  };

  if (code) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-body-s-400 text-text-sub">로그인 중...</p>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col items-center justify-center', 'min-h-screen gap-3')}>
      <h1 className="text-title-headline-2 text-text-main mb-3">Peelie</h1>
      <Button
        size="lg"
        radius="small"
        className="w-64 bg-[#FEE500] text-[#191919] hover:bg-[#FDD835]"
        onClick={
          inWebView
            ? handleKakaoNativeLogin
            : () => {
                window.location.href = KAKAO_AUTH_URL;
              }
        }
      >
        카카오 로그인
      </Button>
      {inWebView && (
        <Button
          size="lg"
          radius="small"
          className="w-64 bg-black text-white hover:bg-neutral-800"
          onClick={handleAppleLogin}
        >
          Apple로 로그인
        </Button>
      )}
    </div>
  );
}
