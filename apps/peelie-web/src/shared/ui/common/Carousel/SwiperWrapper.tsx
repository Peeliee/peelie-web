import 'swiper/css';
import 'swiper/css/pagination';

import { type ReactNode, Children, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCards } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { cn } from '@/shared/lib/utils';

// peekSmall 캐러셀
interface PeekSmallSwiperWrapperProps {
  children: ReactNode;
  onChange?: (index: number) => void;
  showIndicator?: boolean;
}

// full 캐러셀
interface FullSwiperProps {
  children: ReactNode;
  onChange?: (index: number) => void;
  showIndicator?: boolean;
}

// peek 캐러셀
interface PeekSwiperWrapperProps {
  children: ReactNode;
  onChange?: (index: number) => void;
  showIndicator?: boolean;
}

interface EffectCardWrapperProps {
  children: ReactNode;
  onChange?: (index: number) => void;
  showIndicator?: boolean;
}

// 인디케이터
interface SwiperIndicatorProps {
  total: number;
  onChange?: (index: number) => void;
  activeIndex: number;
  className?: string;
}

export const SwiperIndicator = ({ total, activeIndex, className }: SwiperIndicatorProps) => {
  return (
    <div className={cn('flex justify-center mt-3 space-x-3', className)}>
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'transition-all duration-300 rounded-full',
            index === activeIndex
              ? 'w-4 h-2 bg-peelie-primary-600'
              : 'w-1.5 h-1.5 bg-peelie-gray-150',
          )}
        />
      ))}
    </div>
  );
};

export const PeekSmallSwiperWrapper = ({
  children,
  onChange,
  showIndicator = true,
}: PeekSmallSwiperWrapperProps) => {
  const slides = Children.toArray(children);
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateSlideStyles = (swiper: SwiperType) => {
    swiper.slides.forEach((slide, index) => {
      const progress = index - swiper.activeIndex;
      const isActive = index === swiper.activeIndex;
      const scale = isActive ? 1 : 0.8;
      (slide as HTMLElement).style.transform = `scale(${scale})`;
      (slide as HTMLElement).style.zIndex = `${100 - Math.abs(progress * 10)}`;
    });
  };

  return (
    <>
      <Swiper
        modules={[Pagination]}
        speed={400}
        effect="card"
        spaceBetween={10} // 카드 간격
        slidesPerView={1.5} // 한 화면에 카드 1.5개 (양 옆 살짝 보이게)
        centeredSlides={true}
        watchSlidesProgress={true}
        pagination={false}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          updateSlideStyles(swiper);
        }}
        onSlideChange={(swiper) => {
          onChange?.(swiper.activeIndex);
          updateSlideStyles(swiper);
          setActiveIndex(swiper.activeIndex);
        }}
        onSetTransition={(swiper) => {
          swiper.slides.forEach((slide) => {
            (slide as HTMLElement).style.transitionDuration = `${400}ms`;
          });
        }}
        className="w-full"
      >
        {slides.map((child, index) => (
          <SwiperSlide key={index} className="justify-center">
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
      {showIndicator && <SwiperIndicator total={slides.length} activeIndex={activeIndex} />}
    </>
  );
};

export const FullSwiperWrapper = ({
  children,
  onChange,
  showIndicator = true,
}: FullSwiperProps) => {
  const slides = Children.toArray(children);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <Swiper
        modules={[Pagination]}
        spaceBetween={24}
        speed={500}
        slidesPerView={1}
        pagination={false}
        onSlideChange={(swiper: SwiperType) => {
          onChange?.(swiper.activeIndex);
          setActiveIndex(swiper.activeIndex);
        }}
        className="w-full"
      >
        {slides.map((child, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <div className="flex items-center justify-center w-full h-full">{child}</div>
          </SwiperSlide>
        ))}
      </Swiper>
      {showIndicator && <SwiperIndicator total={slides.length} activeIndex={activeIndex} />}
    </>
  );
};

export const PeekSwiperWrapper = ({
  children,
  onChange,
  showIndicator = true,
}: PeekSwiperWrapperProps) => {
  const slides = Children.toArray(children);
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <Swiper
        modules={[Pagination]}
        slidesPerView={1.4} // 한 화면에 1.2개 정도 보이게
        centeredSlides={true} // 현재 슬라이드 중앙 정렬
        spaceBetween={35} // 슬라이드 간격
        pagination={false}
        onSlideChange={(swiper: SwiperType) => {
          onChange?.(swiper.activeIndex);
          setActiveIndex(swiper.activeIndex);
        }}
        className="w-full"
      >
        {slides.map((child, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
      {showIndicator && <SwiperIndicator total={slides.length} activeIndex={activeIndex} />}
    </>
  );
};

export const EffectCardWrapper = ({
  children,
  onChange,
  showIndicator = true,
}: EffectCardWrapperProps) => {
  const slides = Children.toArray(children);
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div>
      <div className="w-full px-17 h-full">
        <Swiper
          effect={'cards'}
          autoHeight={true}
          grabCursor={true}
          modules={[EffectCards]}
          onSlideChange={(swiper: SwiperType) => {
            onChange?.(swiper.activeIndex);
            setActiveIndex(swiper.activeIndex);
          }}
          className="mySwiper !overflow-visible rounded-400"
        >
          {slides.map((child, i) => {
            return (
              <SwiperSlide key={i} className={cn('overflow-hidden rounded-400')}>
                {child}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      {showIndicator && (
        <SwiperIndicator
          total={slides.length}
          activeIndex={activeIndex}
          className="fixed bottom-35 inset-x-0"
        />
      )}
    </div>
  );
};
