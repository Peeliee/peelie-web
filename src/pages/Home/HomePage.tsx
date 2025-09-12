import { FullScreenCarousel } from '@/widgets/FullScreenCarousel/FullScreenCarousel';
import MockImg from '@/assets/mockImg.svg?react';

const HomePage = () => {
  return (
    <div style={{ color: 'black' }}>
      홈페이지
      <div className="w-full max-w-4xl mx-auto">
        {/* 임시 캐러셀 */}
        <FullScreenCarousel variant="peekSmall">
          <MockImg />
          <MockImg />
          <MockImg />
          <MockImg />
        </FullScreenCarousel>
      </div>
    </div>
  );
};

export default HomePage;
