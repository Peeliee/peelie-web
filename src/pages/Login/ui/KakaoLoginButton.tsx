const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

export const KakaoLoginButton = () => {
  const handleLogin = () => {
    if (!window.Kakao) {
      alert('kakao sdk 로드 안됨');
      return;
    }

    window.Kakao.Auth.authorize({
      redirectUri: REDIRECT_URI,
    });
  };
  return <button onClick={handleLogin}>카카오로그인</button>;
};
