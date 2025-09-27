import { KakaoLoginButton } from './ui/KakaoLoginButton';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between px-6 pt-30 pb-15">
      {/* 상단 제목 */}
      <div>
        <h1 className="text-2xl font-bold">
          필리에
          <br />
          오신것을 환영합니다
        </h1>
      </div>

      <div className="fixed left-0 w-full px-6 bottom-20">
        <div className="flex flex-col space-y-3">
          <span className="text-sm font-medium">소셜 로그인</span>

          {/* 임시 애플 로그인 버튼 */}
          <button
            className="w-full py-3 border rounded-lg flex items-center justify-center space-x-2"
            onClick={() => {
              alert('준비 중 입니다.');
            }}
          >
            <span>애플로 시작하기</span>
          </button>
          <KakaoLoginButton />
        </div>

        {/* TODO: 하단 분리 예정 */}
        <div className="flex justify-center space-x-4 text-sm text-gray-400 mt-6">
          <button>계정 찾기</button>
          <span>|</span>
          <button>비밀번호 찾기</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;