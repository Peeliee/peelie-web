import { useEffect, useRef } from 'react';
import Typed from 'typed.js';

interface TypedTextProps {
  htmlString: string;
  speed?: number;
  delayBetweenLoops?: number;
  onRestart?: () => void;
  className?: string;
}

export const TypedText = ({
  htmlString,
  speed = 25,
  delayBetweenLoops = 10000,
  onRestart,
  className,
}: TypedTextProps) => {
  const el = useRef<HTMLSpanElement>(null);
  const typedInstance = useRef<Typed | null>(null);

  useEffect(() => {
    if (!el.current) return;

    const typed = new Typed(el.current, {
      strings: [htmlString],
      typeSpeed: speed,
      showCursor: false,
      contentType: 'html',
      loop: false, // 수동 반복
      onComplete: () => {
        setTimeout(() => {
          el.current?.classList.add('fade-out');
          setTimeout(() => {
            el.current?.classList.remove('fade-out');
            typed.reset();
            onRestart?.();
          }, 500); // fadeOut transition 시간 ms
        }, delayBetweenLoops);
      },
    });

    typedInstance.current = typed;

    return () => {
      typed.destroy();
    };
  }, [htmlString, speed, delayBetweenLoops, onRestart]);

  return <span ref={el} className={className} />;
};
