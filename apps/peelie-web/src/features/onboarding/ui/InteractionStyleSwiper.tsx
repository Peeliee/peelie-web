import { CarouselWrapper } from '@/shared/ui/common/Carousel/CarouselWrapper';
import { InteractionStyleCard } from '@/entities/onboarding/ui/InteractionStyleCard';

interface InteractionStyleSwiperProps {
  current: number;
  onChange: (index: number) => void;
}

export const InteractionStyleSwiper = ({ current, onChange }: InteractionStyleSwiperProps) => {
  return (
    <div>
      <CarouselWrapper variant="peek" onChange={onChange} className="pb-2">
        <InteractionStyleCard type="balanced" isActive={current === 0} />
        <InteractionStyleCard type="fast" isActive={current === 1} />
        <InteractionStyleCard type="cautious" isActive={current === 2} />
      </CarouselWrapper>
    </div>
  );
};
