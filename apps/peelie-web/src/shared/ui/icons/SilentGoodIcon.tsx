import type { ComponentProps } from 'react';
import silentGoodIconSrc from './SilentGoodIcon.svg';

export function SilentGoodIcon({ className, ...props }: ComponentProps<'img'>) {
  return <img src={silentGoodIconSrc} alt="" className={className} {...props} />;
}
