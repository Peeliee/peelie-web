export function isInWebView() {
  if (typeof window === 'undefined') return false;
  return Boolean(
    (window as unknown as { ReactNativeWebView?: { postMessage: (s: string) => void } })
      .ReactNativeWebView,
  );
}
