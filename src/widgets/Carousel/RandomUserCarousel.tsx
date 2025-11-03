import { useNavigate } from 'react-router-dom';

import { CarouselWrapper } from '@/shared/ui/common/Carousel/CarouselWrapper';
import { VerticalUserCard } from '@/entities/user/ui/VerticalUserCard';
import MockImg from '@/assets/mockImg.svg';

export const mockUsers = [
  {
    id: 1,
    name: '김나은',
    imageSrc: MockImg,
    personality: '신중형',
    description: '대화를 통해 배우고, 나누며 성장하고 싶습니다.',
  },
  {
    id: 2,
    name: '유지원',
    imageSrc: MockImg,
    personality: '균형형',
    description: '나누며 성장하고 싶습니다, 대화를 통해 배우고.',
  },
  {
    id: 3,
    name: '김용희',
    imageSrc: MockImg,
    personality: '빠른 연결형',
    description: '대화를 통해 배우고, 나누며 성장하고 싶습니다.',
  },
  {
    id: 4,
    name: '신재현',
    imageSrc: MockImg,
    personality: '신중형',
    description: '나누며 성장하고 싶습니다, 대화를 통해 배우고.',
  },
  {
    id: 5,
    name: '강희구',
    imageSrc: MockImg,
    personality: '균형형',
    description: '대화를 통해 배우고, 나누며 성장하고 싶습니다.',
  },
  {
    id: 6,
    name: '권두환',
    imageSrc: MockImg,
    personality: '빠른 연결형',
    description: '나누며 성장하고 싶습니다, 대화를 통해 배우고.',
  },
  {
    id: 7,
    name: '성하빈',
    imageSrc: MockImg,
    personality: '신중형',
    description: '대화를 통해 배우고, 나누며 성장하고 싶습니다.',
  },
];

function getRandomUsers(users: typeof mockUsers, count: number) {
  return [...users].sort(() => Math.random() - 0.5).slice(0, count);
}

export const RandomUserCarousel = () => {
  const randomFive = getRandomUsers(mockUsers, 5);
  const navigate = useNavigate();

  return (
    <CarouselWrapper variant="peekSmall">
      {randomFive.map((user) => (
        <div onClick={() => navigate(`/friend/${user.id}`)}>
          <VerticalUserCard
            key={user.name}
            imageSrc={user.imageSrc}
            name={user.name}
            personality={user.personality}
            description={user.description}
          />
        </div>
      ))}
    </CarouselWrapper>
  );
};
