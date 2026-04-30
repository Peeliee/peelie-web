import type { ComponentProps } from 'react';
import chatRoomProfileIconSrc from './ChatRoomProfileIcon.svg';

export function ChatRoomProfileIcon({ className, ...props }: ComponentProps<'img'>) {
  return <img src={chatRoomProfileIconSrc} alt="" className={className} {...props} />;
}
