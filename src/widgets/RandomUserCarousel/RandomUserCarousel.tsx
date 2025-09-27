import { CarouselWrapper } from '@/shared/ui/common/Carousel/CarouselWrapper';
import { UserCardVertical } from '@/entities/user/ui/UserCardVertical';
import MockImg from '@/assets/mockImg.svg';

const mockUsers = [
  {
    name: '김나은',
    imageSrc: MockImg,
    personality: '신중형',
    description: '대화를 통해 배우고, 나누며 성장하고 싶습니다.',
  },
  {
    name: '유지원',
    imageSrc: MockImg,
    personality: '신중형',
    description: '대화를 통해 배우고, 나누며 성장하고 싶습니다.',
  },
  {
    name: '김용희',
    imageSrc: MockImg,
    personality: '신중형',
    description: '대화를 통해 배우고, 나누며 성장하고 싶습니다.',
  },
  {
    name: '신재현',
    imageSrc: MockImg,
    personality: '신중형',
    description: '대화를 통해 배우고, 나누며 성장하고 싶습니다.',
  },
  {
    name: '강희구',
    imageSrc: MockImg,
    personality: '신중형',
    description: '대화를 통해 배우고, 나누며 성장하고 싶습니다.',
  },
  {
    name: '권두환',
    imageSrc: MockImg,
    personality: '신중형',
    description: '대화를 통해 배우고, 나누며 성장하고 싶습니다.',
  },
  {
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

  return (
    <CarouselWrapper variant="peekSmall">
      {randomFive.map((user) => (
        <UserCardVertical
          key={user.name}
          imageSrc={user.imageSrc}
          name={user.name}
          personality={user.personality}
          description={user.description}
        />
      ))}
    </CarouselWrapper>
  );
};
