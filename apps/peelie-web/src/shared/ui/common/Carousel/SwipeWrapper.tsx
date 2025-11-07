import { type ReactNode, Children, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';

interface SwipeWrapperProps {
  children: ReactNode;
  onChange?: (index: number) => void;
  showIndicator?: boolean;
}

export const SwipeWrapper = ({ children, onChange, showIndicator = true }: SwipeWrapperProps) => {
  const slides = Children.toArray(children);
  const swiperRef = useRef<SwiperType | null>(null);

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
    <Swiper
      modules={[Pagination]}
      speed={400}
      spaceBetween={10} // 카드 간격
      slidesPerView={1.5} // 한 화면에 카드 1.5개 (양 옆 살짝 보이게)
      centeredSlides={true}
      watchSlidesProgress={true}
      pagination={
        showIndicator
          ? {
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !bg-gray-300',
              bulletActiveClass: 'swiper-pagination-bullet-active !bg-peelie-primary-500',
            }
          : false
      }
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
        updateSlideStyles(swiper);
      }}
      onSlideChange={(swiper) => {
        onChange?.(swiper.activeIndex);
        updateSlideStyles(swiper);
      }}
      onSetTransition={(swiper) => {
        swiper.slides.forEach((slide) => {
          (slide as HTMLElement).style.transitionDuration = `${400}ms`;
        });
      }}
      className="w-full px-4 pb-6"
    >
      {slides.map((child, index) => (
        <SwiperSlide key={index} className="justify-center">
          {child}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
