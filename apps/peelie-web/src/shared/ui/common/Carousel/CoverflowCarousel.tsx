import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import type React from 'react';
import { cn } from '@/shared/lib/utils';

interface CoverflowCarouselProps {
  children: React.ReactNode;
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
            index === activeIndex ? 'w-6 h-2 bg-orange-500' : 'w-2 h-2 bg-orange-200',
          )}
        />
      ))}
    </div>
  );
};

// Swiper 기반 커버플로우 레이아웃 컴포넌트 (공통 캐러셀 UI)
export const CoverflowCarousel = ({ children, className }: CoverflowCarouselProps) => {
  const childArray = Array.isArray(children) ? children : [children];

  return (
    <div className={cn('w-full', className)}>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1.7}
        initialSlide={Math.floor(childArray.length / 2)}
        // pagination={{ clickable: true }}
        coverflowEffect={{
          rotate: 55, // 양 옆 카드 회전 각도
          stretch: 110, // 카드 간 간격
          depth: 100, // 원근감
          modifier: 1, // 강도
          slideShadows: true, // 그림자 여부
        }}
        modules={[EffectCoverflow]}
        className="mySwiper"
      >
        {childArray.map((child, idx) => (
          <SwiperSlide key={idx} className="w-full h-full">
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
