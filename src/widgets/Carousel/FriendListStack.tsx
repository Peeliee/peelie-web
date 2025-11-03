import { useState, useRef, useEffect } from 'react';
import { cn } from '@/shared/lib/utils';
import { FlipUserCard } from '@/features/user/FlipUserCard';
import { useNavigate } from 'react-router-dom';

const defaultFriends = [
  {
    userId: 1,
    userName: '유지원',
    profileUrl: 'nature.jpeg',
    stage: 1,
    bio: '대화를 통해 배우고,\n나누며 성장하고 싶습니다.',
    interactionStyle: '신중형',
  },
  {
    userId: 2,
    userName: '김나은',
    profileUrl: 'nature.jpeg',
    stage: 1,
    bio: '대화를 통해 배우고,\n나누며 성장하고 싶습니다.',
    interactionStyle: '신중형',
  },
  {
    userId: 3,
    userName: '김용희',
    profileUrl: 'nature.jpeg',
    stage: 1,
    bio: '대화를 통해 배우고,\n나누며 성장하고 싶습니다.',
    interactionStyle: '신중형',
  },
  {
    userId: 4,
    userName: '강희구',
    profileUrl: 'nature.jpeg',
    stage: 1,
    bio: '대화를 통해 배우고,\n나누며 성장하고 싶습니다.',
    interactionStyle: '신중형',
  },
  {
    userId: 5,
    userName: '권두환',
    profileUrl: 'nature.jpeg',
    stage: 1,
    bio: '대화를 통해 배우고,\n나누며 성장하고 싶습니다.',
    interactionStyle: '신중형',
  },
];

export const FriendListStack = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const handleNavigate = (id: number | string) => {
    navigate(`/friend/${id}`);
  };

  const scrollToCard = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const card = container.querySelectorAll('.stack-card')[index] as HTMLElement | undefined;
    if (!card) return;

    const containerRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    // 스크롤 목표 = 현재 스크롤 + 카드 중앙 - 컨테이너 중앙
    const scrollTarget =
      container.scrollTop +
      (cardRect.top + cardRect.height / 2 - (containerRect.top + containerRect.height / 2));

    container.scrollTo({
      top: scrollTarget,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const cards = container.querySelectorAll('.stack-card');
      const centerY = window.innerHeight / 2;

      // 모든 카드의 중심과 화면 중앙 거리 측정
      const distances = Array.from(cards).map((card) => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        return Math.abs(centerY - cardCenter);
      });

      // 중앙에 가장 가까운 카드 인덱스 찾기
      const closestIndex = distances.indexOf(Math.min(...distances));

      // 각 카드에 transform 적용
      cards.forEach((card, index) => {
        const element = card as HTMLElement;
        const baseOffset = index * 20;
        const isClosest = index === closestIndex;

        // 중앙 카드만 extraSpace 적용
        const extraSpace = isClosest ? 120 : 0;

        element.style.transform = `translateY(${baseOffset - extraSpace}px)`;
        element.style.zIndex = String(index);
      });
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const CARD_GAP = 120;
  const topSpacer = window.innerHeight * 0.25;
  const bottomSpacer = window.innerHeight * 0.05;
  const wrapperHeight = defaultFriends.length * CARD_GAP + topSpacer + bottomSpacer;

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-auto no-scrollbar px-4 pt-12"
    >
      <div className="h-[25vh]" />
      <div className="relative" style={{ height: `${wrapperHeight}px` }}>
        {defaultFriends.map((friend, index) => (
          <div
            key={friend.userId}
            className={cn(
              'stack-card absolute left-0 right-0 transition-transform duration-300',
              activeIndex === index ? 'z-[9999]' : '',
            )}
            style={{
              top: `${index * 120}px`,
            }}
            onClick={() => {
              setActiveIndex(index);
              scrollToCard(index);
            }}
          >
            <FlipUserCard friend={friend} onClick={() => handleNavigate(friend.userId)} />
          </div>
        ))}
        <div className="h-[95vh]" />
      </div>
    </div>
  );
};
