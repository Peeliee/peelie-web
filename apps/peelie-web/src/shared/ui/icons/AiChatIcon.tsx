import type { ComponentProps } from 'react';

interface AiChatIconProps extends ComponentProps<'svg'> {
  /** true면 활성 색상 (gray-01/brand-30/brand-100), false면 비활성 (white/#C1C1C1/#8B8B8B) */
  active?: boolean;
}

export function AiChatIcon({ active = false, ...props }: AiChatIconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M11.9727 2C17.4804 2.00002 21.9453 5.80559 21.9453 10.5C21.9453 15.1944 17.4804 19 11.9727 19C11.4943 19 11.0239 18.9696 10.5635 18.9141V21.3301C10.5633 21.8485 10.0122 22.1728 9.57422 21.8955C6.41398 19.8927 1.71414 15.7079 2.01367 10.9512C2.00451 10.8018 2 10.6513 2 10.5C2 5.80558 6.46493 2 11.9727 2Z"
        fill="currentColor"
      />
      {active ? (
        <>
          <circle cx="8.72289" cy="8.72197" r="1.5" transform="rotate(-9.30932 8.72289 8.72197)" className="fill-gray-01" />
          <circle cx="12.2229" cy="9.22197" r="1.5" transform="rotate(-9.30932 12.2229 9.22197)" className="fill-brand-30" />
          <circle cx="15.7229" cy="11.722" r="1.5" transform="rotate(-9.30932 15.7229 11.722)" className="fill-brand-100" />
        </>
      ) : (
        <>
          <circle cx="8.72289" cy="8.72197" r="1.5" transform="rotate(-9.30932 8.72289 8.72197)" fill="white" />
          <circle cx="12.2229" cy="9.22197" r="1.5" transform="rotate(-9.30932 12.2229 9.22197)" fill="#C1C1C1" />
          <circle cx="15.7229" cy="11.722" r="1.5" transform="rotate(-9.30932 15.7229 11.722)" fill="#8B8B8B" />
        </>
      )}
    </svg>
  );
}
