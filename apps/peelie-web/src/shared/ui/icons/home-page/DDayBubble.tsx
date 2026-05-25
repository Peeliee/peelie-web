import type { ComponentProps } from 'react';

export function DDayBubble(props: ComponentProps<'svg'>) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.97949 1.5C13.1103 1.50001 16.459 4.35419 16.459 7.875C16.459 11.3958 13.1103 14.25 8.97949 14.25C8.62074 14.25 8.26813 14.2262 7.92285 14.1846V15.9971C7.92285 16.3859 7.50915 16.6298 7.18066 16.4219C4.81145 14.9204 1.28923 11.7835 1.51074 8.21777C1.50369 8.10428 1.5 7.99 1.5 7.875C1.5 4.35418 4.8487 1.5 8.97949 1.5Z"
        fill="#AFE8FF"
      />
      <circle
        cx="6.54217"
        cy="6.54148"
        r="1.125"
        transform="rotate(-9.30932 6.54217 6.54148)"
        fill="white"
      />
      <circle
        cx="9.16717"
        cy="6.91648"
        r="1.125"
        transform="rotate(-9.30932 9.16717 6.91648)"
        fill="#E6F8FF"
      />
      <circle
        cx="11.7922"
        cy="8.79148"
        r="1.125"
        transform="rotate(-9.30932 11.7922 8.79148)"
        fill="#9ED1E6"
      />
    </svg>
  );
}
