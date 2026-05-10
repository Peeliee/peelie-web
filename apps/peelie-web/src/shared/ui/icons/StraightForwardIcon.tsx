import type { ComponentProps } from 'react';
import straightForwardIconSrc from './StraightForwardIcon.svg';

export function StraightForwardIcon({ className, ...props }: ComponentProps<'img'>) {
  return <img src={straightForwardIconSrc} alt="" className={className} {...props} />;
}
