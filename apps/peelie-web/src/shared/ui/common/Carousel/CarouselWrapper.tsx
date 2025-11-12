import { useState, useEffect, type ReactNode, Children } from 'react';

import { Carousel, CarouselContent, CarouselItem } from '@/shared/ui/common/carousel';
import type { CarouselApi } from '@/shared/ui/common/carousel';
import { cn } from '@/shared/lib/utils';

type CarouselVariant = 'full' | 'peek' | 'peekSmall';

interface CarouselWrapperProps {
  children: ReactNode;
  variant: CarouselVariant;
  onChange?: (index: number) => void;
  showIndicator?: boolean;
  className?: string;
}

/**
 * 한 페이지에 하나의 children 만 보여주는 컴포넌트입니다.
 * @useage
 * <CarouselWrapper variant="full | peek | peekSmall">
 *  <Component1 />
 *  <Component2 />
 *  ...
 * </CarouselWrapper>
 */
export function CarouselWrapper({
  children,
  variant,
  onChange,
  showIndicator = true,
  className,
}: CarouselWrapperProps) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);

  const slides = Children.toArray(children);
  const isPeekMode = variant === 'peek' || variant === 'peekSmall';

  const spacerBasis =
    variant === 'peek' ? 'basis-[10%]' : variant === 'peekSmall' ? 'basis-[15%]' : '';

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      const index = api.selectedScrollSnap();
      setCurrent(index);
      onChange?.(index);
    };

    api.on('select', onSelect);
    onSelect(); // 초기화

    return () => {
      api.off('select', onSelect);
    };
  }, [api, slides.length, onChange]);

  return (
    <div className="w-full">
      <Carousel
        setApi={setApi}
        className={cn('w-full')}
        opts={{
          align: isPeekMode ? 'center' : 'start',
          loop: false,
        }}
      >
        <CarouselContent className={className}>
          {isPeekMode && (
            <div className={cn(`${spacerBasis} shrink-0 pointer-events-none`)} aria-hidden />
          )}

          {slides.map((child, i) => {
            const isActive = i === current;

            return (
              <CarouselItem
                key={i}
                className={cn(
                  'flex items-center justify-center transition-transform duration-300',
                  variant === 'full' && 'basis-full',
                  variant === 'peek' && 'basis-[80%] -ml-2 -mr-2',
                  variant === 'peekSmall' && 'basis-[70%]',
                  variant === 'peekSmall' && !isActive && 'scale-80',
                )}
              >
                {child}
              </CarouselItem>
            );
          })}
          {isPeekMode && (
            <div className={cn(`${spacerBasis} shrink-0 pointer-events-none`)} aria-hidden />
          )}
        </CarouselContent>
      </Carousel>

      {showIndicator && (
        <div className="flex justify-center mt-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors duration-200 mr-3 ${
                index === current ? 'w-4 bg-peelie-primary-600' : 'bg-orange-200'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
