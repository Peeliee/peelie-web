import { useState, useEffect, type ReactNode, Children } from 'react';

import { Carousel, CarouselContent, CarouselItem } from '@/shared/ui/carousel';
import type { CarouselApi } from '@/shared/ui/carousel';

interface FullScreenCarouselProps {
  children: ReactNode;
}

/**
 * 한 페이지에 하나의 children 만 보여주는 컴포넌트입니다. 
 * @useage
 * <FullScreenCarousel>
 *  <Component1 />
 *  <Component2 />
 *  ...
 * </FullScreenCarousel>
 */
export function FullScreenCarousel({ children }: FullScreenCarouselProps) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);

  const slides = Children.toArray(children);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on('select', onSelect);
    onSelect();

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return (
    <div className="w-full">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: 'start',
          loop: false,
        }}
      >
        <CarouselContent>
          {slides.map((child, i) => (
            <CarouselItem key={i} className="basis-full flex items-center justify-center">
              <div className="flex items-center justify-center">{child}</div>
            </CarouselItem>
          ))}
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
