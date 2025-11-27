import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import { useState } from 'react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import type React from 'react';
import { cn } from '@/shared/lib/utils';

interface CoverflowSwiperProps {
  children: React.ReactNode;
  onChange?: (index: number) => void;
  className?: string;
}

interface SwiperIndicatorProps {
  total: number;
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

// Swiper 기반 커버플로우 레이아웃 컴포넌트 (공통 캐러셀 UI)
export const CoverflowSwiper = ({ children, onChange, className }: CoverflowSwiperProps) => {
  const childArray = Array.isArray(children) ? children : [children];
  const [activeIndex, setActiveIndex] = useState(0);
  console.log(activeIndex)
  return (
    <div className={cn('w-full', className)}>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1.5}
        initialSlide={Math.floor(childArray.length / 2)}
        // pagination={{ clickable: true }}
        onSlideChange={(swiper) => {
          const idx = swiper.activeIndex;
          setActiveIndex(idx);
          onChange?.(idx);
        }}
        coverflowEffect={{
          rotate: 50, // 양 옆 카드 회전 각도
          stretch: 110, // 카드 간 간격
          depth: 100, // 원근감
          modifier: 1, // 강도
          slideShadows: true, // 그림자 여부
        }}
        modules={[EffectCoverflow]}
        className="mySwiper"
      >
        {childArray.map((child, idx) => (
          <SwiperSlide
            key={idx}
            className={cn(
              'w-full h-full',
              idx === activeIndex ? 'blur-0 scale-100' : 'blur-[3px] brightness-60 scale-90',
            )}
          >
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
      <SwiperIndicator total={childArray.length} activeIndex={activeIndex} />
    </div>
  );
};
