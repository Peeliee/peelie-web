import type { ComponentProps } from 'react';
import tokenIconSrc from './Token.svg';

export function TokenIcon({ className, ...props }: ComponentProps<'img'>) {
  return <img src={tokenIconSrc} alt="" className={className} {...props} />;
}
