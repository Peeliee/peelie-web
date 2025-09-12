import { useState, useEffect, type ReactNode, Children } from 'react';

import { Carousel, CarouselContent, CarouselItem } from '@/shared/ui/carousel';
import type { CarouselApi } from '@/shared/ui/carousel';
import { cn } from '@/shared/lib/utils';

type CarouselVariant = 'full' | 'peek' | 'peekSmall';

interface FullScreenCarouselProps {
  children: ReactNode;
  variant: CarouselVariant;
}

/**
 * 한 페이지에 하나의 children 만 보여주는 컴포넌트입니다.
 * @useage
 * <FullScreenCarousel variant="full">
 *  <Component1 />
 *  <Component2 />
 *  ...
 * </FullScreenCarousel>
 */
export function FullScreenCarousel({ children, variant }: FullScreenCarouselProps) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);

  const slides = Children.toArray(children);
  const isPeekMode = variant === 'peek' || variant === 'peekSmall';

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on('select', onSelect);
    onSelect(); // 초기화

    return () => {
      api.off('select', onSelect);
    };
  }, [api, slides.length]);

  return (
    <div className="w-full">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: isPeekMode ? 'center' : 'start',
          loop: false,
        }}
      >
        <CarouselContent>
          {isPeekMode && <div className="basis-[15%] shrink-0 pointer-events-none" aria-hidden />}

          {slides.map((child, i) => {
            const isActive = i === current;

            return (
              <CarouselItem
                key={i}
                className={cn(
                  'flex items-center justify-center transition-transform duration-300',
                  variant === 'full' && 'basis-full',
                  variant === 'peek' && 'basis-[80%] pl-4',
                  variant === 'peekSmall' && 'basis-[70%] pl-4',
                  variant === 'peekSmall' && !isActive && 'scale-80',
                )}
              >
                {child}
              </CarouselItem>
            );
          })}
          {isPeekMode && <div className="basis-[15%] shrink-0 pointer-events-none" aria-hidden />}
        </CarouselContent>
      </Carousel>

      <div className="flex justify-center">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-200 mr-3 ${
              index === current ? 'bg-orange-500' : 'bg-orange-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
