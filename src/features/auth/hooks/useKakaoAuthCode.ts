import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useKakaoAuthCode = () => {
  const [params] = useSearchParams();

  useEffect(() => {
    const code = params.get('code');
    console.log(code);
    if (!code) return;
  }, [params]);

  // TODO : 처리하는 코드 만들기
};
