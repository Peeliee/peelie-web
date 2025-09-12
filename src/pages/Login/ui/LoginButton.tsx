export const LoginButton = () => {
  const handleLogin = () => {
    if (!window.Kakao) {
      alert('kakao sdk 로드 안됨');
      return;
    }

    window.Kakao.Auth.authorize({
      redirectUri: 'http://localhost:5173',
    });
  };
  return <button onClick={handleLogin}>카카오로그인</button>;
};
