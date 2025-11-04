import type { FriendResponse, FriendProfileResponse } from '@/entities/friend/model/friend.type';
import mockImg from '@/assets/mockImg.svg';
import mockyonghee from '@/assets/mockyonghee.png';

export const FriendListMock: { data: FriendResponse[]; delay: number } = {
  data: [
    {
      userId: 1,
      userName: '유지원',
      profileUrl: mockImg,
      stage: 1,
      bio: '대화를 통해 배우고, 나누며 성장하고 싶습니다.',
      interactionStyle: 'CAUTIOUS',
    },
    {
      userId: 2,
      userName: '김나은',
      profileUrl: mockImg,
      stage: 2,
      bio: '대화를 통해 세상을 배우고, 진심을 나누며 성장하고 싶어요',
      interactionStyle: 'BALANCED',
    },
    {
      userId: 3,
      userName: '김용희',
      profileUrl: mockyonghee,
      stage: 3,
      bio: '아 집가고싶다',
      interactionStyle: 'FAST',
    },
    {
      userId: 4,
      userName: '강희구',
      profileUrl: mockImg,
      stage: 1,
      bio: '누군가와의 대화 속에서 배움과 영감을 얻는 걸 좋아합니다.',
      interactionStyle: 'CAUTIOUS',
    },
    {
      userId: 5,
      userName: '권두환',
      profileUrl: mockImg,
      stage: 2,
      bio: '진심이 담긴 대화가 사람을 변화시킨다고 믿습니다.',
      interactionStyle: 'BALANCED',
    },
    {
      userId: 6,
      userName: '성하빈',
      profileUrl: null,
      stage: 3,
      bio: '소통 속에서 배우고, 관계 속에서 성장하려 합니다.',
      interactionStyle: 'CAUTIOUS',
    },
    {
      userId: 7,
      userName: '신재현',
      profileUrl: mockImg,
      stage: 1,
      bio: '대화를 통해 서로의 생각을 넓히고 싶은 사람입니다',
      interactionStyle: 'BALANCED',
    },
    {
      userId: 8,
      userName: '프로도',
      profileUrl: null,
      stage: 2,
      bio: '나눔과 공감을 통해 더 나은 나로 성장하고 싶습니다',
      interactionStyle: 'FAST',
    },
  ],
  delay: 1000,
};

export const FriendProfileMock: { data: Record<number, FriendProfileResponse>; delay: number } = {
  data: {
    1: {
      userId: 1,
      userName: '유지원',
      profileImageUrl: mockImg,
      instagramId: 'ujw_insta',
      bio: '대화를 통해 배우고, 나누며 성장하고 싶습니다.',
      interactionStyle: 'CAUTIOUS',
      card: {
        stage1: {
          title: '🍵📖 조용하지만 깊은 일상',
          subtitle: '하루의 여백에서 위로를 찾는 지원',
          content:
            '평소에는 혼자 있는 시간을 좋아하고, 주말엔 따뜻한 차 한 잔과 함께 책을 읽는 걸 즐겨요. 조용하지만 진심이 담긴 대화를 좋아하고, 가까워지면 깊은 이야기도 꺼내놓는 편이에요.',
        },
        stage2: {
          title: '🌿 함께할수록 편안한 사람',
          subtitle: '작은 관심이 이어주는 신뢰',
          content:
            '가벼운 인사로 시작된 대화가 자연스럽게 고민 상담으로 이어지는 경우가 많아요. 상대의 이야기를 잘 들어주다 보니, 어느새 “믿음직한 사람”이라는 말을 자주 듣게 됐어요.',
        },
        stage3: {
          title: '🌙 마음을 열었을 때의 진심',
          subtitle: '내면의 대화를 나누는 순간',
          content:
            '어느 날, 친구의 힘든 이야기를 들으며 아무 말 없이 옆에 있어줬던 순간이 기억에 남아요. 말보다 마음으로 다가갈 때, 진짜 교류가 시작된다는 걸 깨달았어요.',
        },
      },
    },
    2: {
      userId: 2,
      userName: '김나은',
      profileImageUrl: mockImg,
      instagramId: 'naeun_story',
      bio: '대화를 통해 세상을 배우고, 진심을 나누며 성장하고 싶어요.',
      interactionStyle: 'BALANCED',
      card: {
        stage1: {
          title: '☕🎧 소소한 즐거움 속의 나은',
          subtitle: '조화로운 하루 루틴',
          content:
            '아침엔 커피 한 잔으로 하루를 열고, 출퇴근길엔 잔잔한 음악을 듣는 걸 좋아해요. 새로운 사람을 만나도 긴장하지 않고, 자연스럽게 대화를 이어가는 편이에요.',
        },
        stage2: {
          title: '🌈 취향이 맞을 때의 즐거움',
          subtitle: '서로 다른 이야기가 만나는 지점',
          content:
            '최근에는 친구와 전시회를 다녀왔는데, 각자 느낀 점을 이야기하다 보니 서로를 더 잘 이해하게 됐어요. 비슷한 관심사가 새로운 관계의 시작이 되는 걸 자주 느껴요.',
        },
        stage3: {
          title: '🌻 오래 두고 보는 관계',
          subtitle: '균형과 진심 사이에서 자라는 교류',
          content:
            '힘들 때 기대고, 즐거울 땐 함께 웃을 수 있는 관계를 가장 소중하게 생각해요. 나에게 좋은 에너지를 주는 사람들과 꾸준히 함께하고 싶어요.',
        },
      },
    },
    3: {
      userId: 3,
      userName: '김용희',
      profileImageUrl: mockyonghee,
      instagramId: 'yonghee.dev',
      bio: '아 집가고싶다',
      interactionStyle: 'FAST',
      card: {
        stage1: {
          title: '⚡🎬 빠르게 연결되는 순간들',
          subtitle: '직감으로 통하는 사람',
          content:
            '새로운 사람을 만나면 금세 대화 주제를 찾아내요. 영화, 기술, 음악 등 관심사가 다양해서 대화가 끊이지 않아요. 상대가 진심이면 바로 마음을 엽니다.',
        },
        stage2: {
          title: '🔥 공감의 속도는 진심으로부터',
          subtitle: '짧은 대화 속에서도 깊은 연결',
          content:
            '친해지는 속도는 빠르지만, 그만큼 진심을 중요하게 생각해요. 어느 날 밤새 이야기하다가 “이 사람은 진짜다”라는 느낌을 받은 적이 있어요.',
        },
        stage3: {
          title: '💫 진심이 닿았을 때',
          subtitle: '속도보다 중요한 건 방향',
          content:
            '누군가와 함께 성장할 수 있다는 건 큰 행운이에요. 나에게 교류란, 단순한 만남이 아니라 서로의 삶을 나누는 과정이에요.',
        },
      },
    },
    4: {
      userId: 4,
      userName: '강희구',
      profileImageUrl: mockImg,
      instagramId: null,
      bio: '누군가와의 대화 속에서 배움과 영감을 얻는 걸 좋아합니다.',
      interactionStyle: 'CAUTIOUS',
      card: {
        stage1: {
          title: '🌧️ 고요한 시작',
          subtitle: '조심스럽게 마음을 여는 희구',
          content:
            '새로운 관계에서는 한 걸음 뒤에서 살피는 편이에요. 하지만 진심이 느껴지는 순간엔, 누구보다 따뜻하게 다가가요.',
        },
        stage2: {
          title: '🌤️ 신뢰가 만들어내는 변화',
          subtitle: '낯설음이 편안함으로 바뀌는 과정',
          content:
            '시간이 지나면서 대화의 톤이 자연스럽게 변해요. 상대의 이야기에 공감하고, 함께 웃는 순간들이 점점 늘어납니다.',
        },
        stage3: {
          title: '🌕 함께라서 빛나는 관계',
          subtitle: '진심으로 이어진 연결',
          content:
            '서로의 존재를 당연하게 여길 만큼 가까워졌을 때, 진짜 친구라는 생각이 들어요. 그게 내가 원하는 교류의 깊이예요.',
        },
      },
    },
    5: {
      userId: 5,
      userName: '권두환',
      profileImageUrl: mockImg,
      instagramId: null,
      bio: '진심이 담긴 대화가 사람을 변화시킨다고 믿습니다.',
      interactionStyle: 'BALANCED',
      card: {
        stage1: {
          title: '🏞️ 차분한 에너지',
          subtitle: '균형을 아는 두환',
          content:
            '적당한 거리감 속에서 편하게 사람을 대하는 편이에요. 처음엔 조용하지만, 대화를 나누면 의외로 유쾌한 면이 많아요.',
        },
        stage2: {
          title: '🌇 익숙함이 주는 안정감',
          subtitle: '서로의 속도에 맞춰가는 관계',
          content:
            '가벼운 농담과 진지한 대화가 자연스럽게 오가요. 그렇게 조금씩 서로의 리듬을 알아갑니다.',
        },
        stage3: {
          title: '🌌 깊이 있는 교류',
          subtitle: '말보다 마음으로 통하는 순간',
          content:
            '오래 알고 지낸 친구와 산책하며 아무 말 없이 걷는 시간이 좋아요. 그게 진짜 교류의 모습 같아요.',
        },
      },
    },
    6: {
      userId: 6,
      userName: '성하빈',
      profileImageUrl: null,
      instagramId: 'frodo_friends',
      bio: '소통 속에서 배우고, 관계 속에서 성장하려 합니다.',
      interactionStyle: 'CAUTIOUS',
      card: {
        stage1: {
          title: '🐶 따뜻한 낯가림',
          subtitle: '조용하지만 다정한 프로도',
          content:
            '처음엔 낯을 가리지만, 금세 다정함이 드러나요. 상대가 웃을 때 같이 웃는 걸 좋아해요.',
        },
        stage2: {
          title: '🌼 대화로 피어나는 믿음',
          subtitle: '느리지만 확실한 연결',
          content:
            '한 번 친해지면 꾸준히 연락을 이어가요. 말보다 행동으로 마음을 보여주는 타입이에요.',
        },
        stage3: {
          title: '🌙 변하지 않는 따뜻함',
          subtitle: '함께 있어주는 힘',
          content:
            '친구가 힘들 때, 조용히 옆에 있어줬던 순간이 기억에 남아요. 그런 마음이 관계를 오래가게 한다고 믿어요.',
        },
      },
    },
    7: {
      userId: 7,
      userName: '신재현',
      profileImageUrl: mockImg,
      instagramId: 'ryan_official',
      bio: '대화를 통해 서로의 생각을 넓히고 싶은 사람입니다.',
      interactionStyle: 'BALANCED',
      card: {
        stage1: {
          title: '🦁 무심한 듯 다정하게',
          subtitle: '침착한 카리스마의 라이언',
          content:
            '많이 말하지 않아도 분위기를 편하게 만드는 사람이에요. 함께 있을 때 안정감을 주는 타입이에요.',
        },
        stage2: {
          title: '🌤️ 신뢰로 이어지는 관계',
          subtitle: '조용한 배려가 쌓이는 시간',
          content: '서로의 대화를 천천히 이어가며, 말보다는 태도로 진심을 보여줍니다.',
        },
        stage3: {
          title: '🌕 묵직한 진심',
          subtitle: '말보다 행동으로 전하는 마음',
          content:
            '가장 친한 친구에게 “괜찮아, 네가 있어서 다행이야”라는 말을 들었을 때, 내 진심이 전해졌다는 걸 느꼈어요.',
        },
      },
    },
    8: {
      userId: 8,
      userName: '프로도',
      profileImageUrl: null,
      instagramId: 'muzi_world',
      bio: '나눔과 공감을 통해 더 나은 나로 성장하고 싶습니다.',
      interactionStyle: 'FAST',
      card: {
        stage1: {
          title: '🎉 긍정 에너지의 시작',
          subtitle: '어디서든 분위기 메이커',
          content:
            '처음부터 밝은 인사와 웃음으로 사람들을 편하게 만들어요. 낯가림이 거의 없고, 금세 주변을 활기차게 만듭니다.',
        },
        stage2: {
          title: '🌈 웃음 속의 진심',
          subtitle: '즐거움이 신뢰로 바뀌는 순간',
          content:
            '함께 웃다 보면 자연스럽게 진짜 이야기로 넘어가요. 그게 내가 소중하게 여기는 교류의 방식이에요.',
        },
        stage3: {
          title: '☀️ 웃음 뒤의 따뜻함',
          subtitle: '에너지로 이어지는 교감',
          content:
            '친한 친구와 아무 이유 없이 만나서 커피 한잔하며 웃는 그 순간이 좋아요. 별거 아닌 일상이 나를 행복하게 만들어줘요.',
        },
      },
    },
  },
  delay: 1000,
};

export const RandomFriendListMock: { data: FriendResponse[]; delay: number } = {
  data: [
    {
      userId: 1,
      userName: '유지원',
      profileUrl: 'nature.jpeg',
      stage: 1,
      bio: '대화를 통해 배우고,\n나누며 성장하고 싶습니다.',
      interactionStyle: 'CAUTIOUS',
    },
    {
      userId: 2,
      userName: '김나은',
      profileUrl: 'nature.jpeg',
      stage: 2,
      bio: '대화를 통해 배우고,\n나누며 성장하고 싶습니다.',
      interactionStyle: 'BALANCED',
    },
    {
      userId: 3,
      userName: '김용희',
      profileUrl: 'nature.jpeg',
      stage: 3,
      bio: '대화를 통해 배우고,\n나누며 성장하고 싶습니다.',
      interactionStyle: 'FAST',
    },
    {
      userId: 4,
      userName: '강희구',
      profileUrl: 'nature.jpeg',
      stage: 1,
      bio: '대화를 통해 배우고,\n나누며 성장하고 싶습니다.',
      interactionStyle: 'CAUTIOUS',
    },
    {
      userId: 5,
      userName: '권두환',
      profileUrl: 'nature.jpeg',
      stage: 2,
      bio: '대화를 통해 배우고,\n나누며 성장하고 싶습니다.',
      interactionStyle: 'BALANCED',
    },
  ],
  delay: 1000,
};
