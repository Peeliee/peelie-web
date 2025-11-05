import { useState, useRef } from 'react';
import { cn } from '@/shared/lib/utils';
import { FlipFriendCard } from '@/entities/friend/ui/FlipFriendCard';
import { useNavigate } from 'react-router-dom';
import type { FriendResponse } from '@/entities/friend/model/friend.type';

interface FriendListStackProps {
  friendList: FriendResponse[];
}

export const FriendListStack = ({ friendList }: FriendListStackProps) => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const handleNavigate = (id: number | string) => {
    navigate(`/friend/${id}`);
  };

  const handleCardClick = (index: number) => {
    // 아무 카드도 안 뽑힌 상태 → 뽑기
    if (activeIndex === null) {
      setActiveIndex(index);
      setFlippedIndex(null);
      scrollToCard(index);
      return;
    }

    // 같은 카드 두 번째 클릭 → 뒤집기
    if (activeIndex === index && flippedIndex === null) {
      setFlippedIndex(index);
      return;
    }

    // 같은 카드 세 번째 클릭 → 닫기
    if (activeIndex === index && flippedIndex === index) {
      setFlippedIndex(null);
      setActiveIndex(null);
      return;
    }

    // 다른 카드 클릭 → 기존 상태 초기화 후 새 카드로 교체
    setFlippedIndex(null);
    setActiveIndex(index);
    scrollToCard(index);
  };

  const handleFlip = (index: number) => {
    // FlipUserCard에서 onFlip 호출 시 처리
    if (flippedIndex === index) {
      // 이미 뒤집혀 있으면 다시 닫기
      setFlippedIndex(null);
      setActiveIndex(null);
    } else {
      setFlippedIndex(index);
    }
  };

  // 클릭 시 해당 카드로 부드럽게 스크롤
  const scrollToCard = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const card = container.querySelectorAll('.stack-card')[index] as HTMLElement | undefined;
    if (!card) return;

    const containerRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    const scrollTarget =
      container.scrollTop +
      (cardRect.top + cardRect.height / 2 - (containerRect.top + containerRect.height / 2));

    container.scrollTo({
      top: scrollTarget,
      behavior: 'smooth',
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-auto no-scrollbar px-4 pt-12"
    >
      <div className="relative">
        {friendList.map((friend, index) => {
          const baseOffset = index * 20;
          const isActive = activeIndex === index;
          const isFlipped = flippedIndex === index;
          const zIndex = isActive ? 9999 : index;

          const extraSpace = 120;
          const isBelowActive = activeIndex !== null && index > activeIndex;
          const translateY = isBelowActive ? baseOffset + extraSpace : baseOffset;

          return (
            <div
              key={friend.userId}
              className={cn(
                'stack-card absolute left-0 right-0 transition-transform duration-300 ease-out cursor-pointer no-scrollbar',
                isActive && 'z-[9999]',
              )}
              style={{
                top: `${index * 120}px`,
                transform: `translateY(${translateY}px)`,
                zIndex,
              }}
              onClick={() => handleCardClick(index)}
            >
              <FlipFriendCard
                friend={friend}
                onClick={() => handleNavigate(friend.userId)}
                isFlipped={isFlipped}
                onFlip={() => handleFlip(index)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
