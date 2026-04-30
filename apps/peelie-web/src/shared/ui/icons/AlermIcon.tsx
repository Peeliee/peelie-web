import type { ComponentProps } from 'react';
import alermIconSrc from './AlermIcon.svg';

export function AlermIcon({ className, ...props }: ComponentProps<'img'>) {
  return <img src={alermIconSrc} alt="" className={className} {...props} />;
}
