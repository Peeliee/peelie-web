# Peelie 레포 가이드

## 범위

- 이 레포는 `pnpm` 워크스페이스 모노레포입니다. 가능하면 루트 명령보다 워크스페이스 필터 명령을 우선 사용하세요.
- 주요 워크스페이스:
  - `apps/peelie-web`: 주요 제품 로직과 UI
  - `apps/peelie-app`: 웹 앱을 감싸는 Expo 기반 네이티브 셸
  - `packages/form`: 공용 폼 유틸리티

## 기본 작업 대상

- 작업이 명확하게 네이티브 모바일 이슈가 아니라면 `apps/peelie-web`부터 확인하세요.
- 대부분의 기능, 라우팅, API 사용, 상태 관리, UI는 웹 앱에 있습니다.

## 아키텍처 규칙

- 웹은 `app / pages / widgets / features / entities / shared` 레이어 규칙을 따릅니다.
- `apps/peelie-web/src/app`은 얇게 유지하세요. wiring, provider, layout, routing만 두는 것이 원칙입니다.
- app 레이어를 수정한다면 `apps/peelie-web/src/app/AGENTS.md`도 함께 읽으세요.
- `packages/form`에는 여러 워크스페이스에서 재사용되는 로직만 두세요.

## 모바일 규칙

- `apps/peelie-app`은 주로 `WebView` 래퍼입니다. 정말 필요한 경우가 아니면 `ios/`, `android/`는 수정하지 마세요.
- 웹과 앱 사이 브리지 계약을 유지하세요. 웹은 `OPEN_CAMERA`, `OPEN_INSTAGRAM` 같은 메시지를 보내고 모바일이 이를 처리합니다.
- `apps/peelie-app/app/index.tsx`의 개발 URL은 로컬 개발 흐름에 영향이 있으니 함부로 바꾸지 마세요.

## 자주 쓰는 명령

- 루트 단축 명령:
  - `pnpm dev:web`
  - `pnpm dev:app`
  - `pnpm build:web`
- 워크스페이스 명령:
  - `pnpm --filter peelie-web lint`
  - `pnpm --filter peelie-web build`
  - `pnpm --filter peelie-app lint`
  - `pnpm --filter peelie-app start`

## 검증

- 변경한 워크스페이스 기준으로만 lint/build를 실행하세요.
- 웹은 Husky 훅과 pre-push build가 있어 lint/build가 깨지면 git 작업이 막힐 수 있습니다.
- 테스트 범위를 과장하지 마세요. 웹에 Storybook/Vitest/Playwright 설정은 있지만, 루트 기준의 일반적인 테스트 플로우는 없습니다.

## 환경 변수와 안전

- `.env` 값은 출력, 하드코딩, 커밋하지 마세요.
- 웹 주요 설정은 API base URL, socket URL, Kakao 키, Mixpanel 토큰, MSW 토글 같은 env 값에 의존합니다.
- MSW가 켜져 있을 때의 동작을 실제 백엔드 동작으로 단정하지 마세요.
