import type { ComponentProps } from 'react';
import chatItemIconSrc from './ChatItemIcon.svg';

export function ChatItemIcon({ className, ...props }: ComponentProps<'img'>) {
  return <img src={chatItemIconSrc} alt="" className={className} {...props} />;
}
