import { CarouselWrapper } from '@/shared/ui/common/Carousel/CarouselWrapper';
import MockImg from '@/assets/mockImg.svg?react';
import { INTERACTION_STYLES } from '@/shared/constants/interactionStyle';

interface InteractionStyleCarouselProps {
  current: number;
  onChange: (index: number) => void;
}

export const InteractionStyleCarousel = ({ current, onChange }: InteractionStyleCarouselProps) => {
  const style = INTERACTION_STYLES[current];

  return (
    <div>
      <CarouselWrapper variant="peek" onChange={onChange} showIndicator={false}>
        <MockImg className="w-80 h-60" />
        <MockImg className="w-80 h-60" />
        <MockImg className="w-80 h-60" />
      </CarouselWrapper>

      <div className="text-center mt-8">
        <p className="text-gray-500">{INTERACTION_STYLES[current].desc}</p>
        <h2 className="text-lg font-bold">{INTERACTION_STYLES[current].title}</h2>
      </div>

      <div className="mt-8 space-y-3 w-full px-6">
        {Object.entries(style.scores).map(([label, value]) => (
          <ScoreBar key={label} label={label} value={value} />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        {INTERACTION_STYLES.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full mx-1 transition-colors ${
              index === current ? 'bg-orange-500' : 'bg-orange-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const ScoreBar = ({ label, value }: { label: string; value: number }) => (
  <div className="flex items-center w-full space-x-2">
    <span className="w-16 text-sm">{label}</span>
    <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-orange-500 rounded-full transition-all duration-500 ease-in-out"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);
