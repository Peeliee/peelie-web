import { useState } from 'react';
import { CarouselWrapper } from '@/shared/ui/common/Carousel/CarouselWrapper';
import MockImg from '@/assets/mockImg.svg?react';

const descriptions = [
  { title: '신중형', desc: '교류 전 충분한 관찰과 시간이 필요한 나는' },
  { title: '균형형', desc: '균형형에 대한 설명 균형형에 대한 설명' },
  { title: '빠른 연결형', desc: '빠른 연결형에 대한 설명 빠른 연결형에 대한 설명' },
];

export const INTERACTION_STYLES = [
  {
    id: 'cautious',
    title: '신중형',
    desc: '교류 전 충분한 관찰과 시간이 필요한 나는',
    scores: { 모험력: 25, 번개력: 25, OO력: 25 },
  },
  {
    id: 'balanced',
    title: '균형형',
    desc: '상황에 따라 조화롭게 교류하는 나는',
    scores: { 모험력: 50, 번개력: 50, OO력: 50 },
  },
  {
    id: 'fast',
    title: '빠른연결형',
    desc: '먼저 다가가 활발하게 교류하는 나는',
    scores: { 모험력: 75, 번개력: 75, OO력: 75 },
  },
];

export const InteractionStyleCarousel = () => {
  const [current, setCurrent] = useState<number>(0);
  const style = INTERACTION_STYLES[current];

  return (
    <div>
      <CarouselWrapper variant="peek" onChange={setCurrent} showIndicator={false}>
        <MockImg className="w-80 h-60" />
        <MockImg className="w-80 h-60" />
        <MockImg className="w-80 h-60" />
      </CarouselWrapper>

      <div className="text-center mt-8">
        <p className="text-gray-500">{descriptions[current].desc}</p>
        <h2 className="text-lg font-bold">{descriptions[current].title}</h2>
      </div>

      <div className="mt-8 space-y-3 w-full px-6">
        {Object.entries(style.scores).map(([label, value]) => (
          <ScoreBar key={label} label={label} value={value} />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        {descriptions.map((_, index) => (
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
