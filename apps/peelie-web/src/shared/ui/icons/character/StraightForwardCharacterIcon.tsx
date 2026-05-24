import type { ComponentProps } from 'react';
import straightForwardSrc from './StraightForward.svg';

export function StraightForwardCharacterIcon({ className, ...props }: ComponentProps<'img'>) {
  return <img src={straightForwardSrc} alt="" className={className} {...props} />;
}
