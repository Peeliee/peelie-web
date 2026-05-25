interface KakaoShareLink {
  mobileWebUrl?: string;
  webUrl?: string;
  iosExecutionParams?: string;
  androidExecutionParams?: string;
}

interface KakaoFeedSettings {
  objectType: 'feed';
  content: {
    title: string;
    description: string;
    imageUrl: string;
    link: KakaoShareLink;
  };
  buttons?: Array<{
    title: string;
    link: KakaoShareLink;
  }>;
}

interface KakaoSDK {
  init: (key: string) => void;
  isInitialized: () => boolean;
  Share: {
    sendDefault: (settings: KakaoFeedSettings) => void;
  };
}

declare global {
  interface Window {
    Kakao?: KakaoSDK;
  }
}

const APP_WEB_URL = 'https://peelie.vercel.app';

export function initKakao() {
  if (!window.Kakao) return;
  if (window.Kakao.isInitialized()) return;
  window.Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY);
}

export function shareFriendCode({ name, code }: { name: string; code: string }) {
  if (!window.Kakao?.isInitialized()) return;

  const inviteParams = `code=${encodeURIComponent(code)}`;
  const inviteWebUrl = `${APP_WEB_URL}/?invite=${encodeURIComponent(code)}`;

  window.Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: `${name}님이 친구 코드를 공유했어요!`,
      description: `친구 코드: ${code}\n${name}님과 친구가 되어보세요!`,
      imageUrl: `${APP_WEB_URL}/DDayModalCharacter.png`,
      link: {
        mobileWebUrl: APP_WEB_URL,
        webUrl: APP_WEB_URL,
      },
    },
    buttons: [
      {
        title: '친구 추가하기',
        link: {
          mobileWebUrl: inviteWebUrl,
          webUrl: inviteWebUrl,
          iosExecutionParams: inviteParams,
          androidExecutionParams: inviteParams,
        },
      },
    ],
  });
}
