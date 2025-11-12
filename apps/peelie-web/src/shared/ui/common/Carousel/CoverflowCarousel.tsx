import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import type React from 'react';

interface CoverflowCarouselProps {
  children: React.ReactNode;
}

// Swiper 기반 커버플로우 레이아웃 컴포넌트 (공통 캐러셀 UI)
export const CoverflowCarousel = ({ children }: CoverflowCarouselProps) => {
  const childArray = Array.isArray(children) ? children : [children];

  return (
    <div className="w-full">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={2}
        initialSlide={Math.floor(childArray.length / 2)}
        coverflowEffect={{
          rotate: 50, // 양 옆 카드 회전 각도
          stretch: 60, // 카드 간 간격
          depth: 100, // 원근감
          modifier: 1, // 강도
          slideShadows: true, // 그림자 여부
        }}
        modules={[EffectCoverflow]}
        className="mySwiper"
      >
        {childArray.map((child, idx) => (
          <SwiperSlide key={idx} className="w-full h-full bg-black overflow-hidden">
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
