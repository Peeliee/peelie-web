---
description: React 컴포넌트 선언 및 코드 스타일 컨벤션
paths:
  - "**/*.tsx"
  - "**/*.jsx"
---

# React 코드 컨벤션

## 컴포넌트 선언

- React 컴포넌트는 **`function` 선언문(Function Declaration)**으로 작성한다.
- 컴포넌트 내부의 이벤트 핸들러, 콜백, 짧은 헬퍼 함수는 **Arrow Function**으로 작성한다.
- `React.FC`는 사용하지 않는다.
- 특별한 이유 없는 한 컴포넌트 선언에 Arrow Function을 사용하지 않는다.

```tsx
// ✅ Good
function HomePage() {
  const handleClick = () => { ... };
  return <div onClick={handleClick}>Home</div>;
}

// ❌ Bad
const HomePage = () => {
  return <div>Home</div>;
};

// ❌ Bad
const HomePage: React.FC = () => {
  return <div>Home</div>;
};
```

### 근거
- 파일 상단에 메인 컴포넌트를 두고, 하단에 보조 로직을 배치하기 쉬워 top-down 가독성이 좋다.
- hoisting 덕분에 선언 순서 제약이 줄어든다.
- TypeScript 제네릭 컴포넌트를 더 자연스럽게 작성할 수 있다.
- `React.FC`의 예전 장점은 현재 기준으로 대부분 의미가 약해졌다.
