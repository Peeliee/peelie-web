import type {
  CategoryMainQuestion,
  CategorySubQuestion,
} from '@/entities/category/model/category.type';

export const categoryMainQuestionMock: {
  data: Record<number, CategoryMainQuestion>;
  delay: number;
} = {
  data: {
    1: {
      categoryId: 1,
      categoryName: '콘텐츠/미디어',
      categoryQuestion: '콘텐츠 중에 어떤 것을 가장 즐겨보세요?',
      subCategoryNames: [
        { id: 1, name: '영화' },
        { id: 2, name: '드라마/시리즈' },
        { id: 3, name: '예능/리얼리티' },
        { id: 4, name: '애니메이션' },
      ],
    },
    2: {
      categoryId: 2,
      categoryName: '음악/예술',
      categoryQuestion: '음악/예술 중에서 어떤 분야에 가장 관심이 있으신가요?',
      subCategoryNames: [
        { id: 1, name: '음악 감상' },
        { id: 2, name: '미술/전시 감상' },
        { id: 3, name: '공연예술 관람' },
        { id: 4, name: '직접 참여/창작' },
      ],
    },
    3: {
      categoryId: 3,
      categoryName: '스포츠',
      categoryQuestion: '스포츠를 볼 때 어떤 종목을 가장 즐겨 보시나요?',
      subCategoryNames: [
        { id: 1, name: '야구' },
        { id: 2, name: '축구' },
        { id: 3, name: '농구' },
        { id: 4, name: 'e스포츠' },
      ],
    },

    4: {
      categoryId: 4,
      categoryName: '여행/라이프스타일',
      categoryQuestion: '여행을 갈 때 주로 어떤 환경에 끌리세요?',
      subCategoryNames: [
        { id: 1, name: '도시' },
        { id: 2, name: '자연' },
        { id: 3, name: '휴양지' },
      ],
    },
    5: {
      categoryId: 5,
      categoryName: '반려동물',
      categoryQuestion: '어떤 반려동물을 키우고 계신가요?',
      subCategoryNames: [
        { id: 1, name: '강아지' },
        { id: 2, name: '고양이' },
        { id: 3, name: '기타 반려동물' },
        { id: 4, name: '아직 없지만 좋아해요' },
      ],
    },
    6: {
      categoryId: 6,
      categoryName: '음식',
      categoryQuestion: '먹는 걸로 행복할 때는 언제예요?',
      subCategoryNames: [
        { id: 1, name: '맛집 탐방할 때' },
        { id: 2, name: '요리를 뚝딱 해냈을 때' },
        { id: 3, name: '따뜻한 집밥 먹을 때' },
        { id: 4, name: '사람들과 같이 먹을 때' },
      ],
    },
    7: {
      categoryId: 7,
      categoryName: '성격',
      categoryQuestion: '평소 나는 어떤 성격에 제일 가깝나요?',
      subCategoryNames: [
        { id: 1, name: '활발하고 외향적' },
        { id: 2, name: '차분하고 내향적' },
        { id: 3, name: '계획적이고 꼼꼼함' },
        { id: 4, name: '자유롭고 즉흥적' },
      ],
    },
  },
  delay: 500,
};

export const CategorySubQuestionMock: {
  data: Record<number, CategorySubQuestion[]>;
  delay: number;
} = {
  data: {
    1: [
      {
        questionId: 1,
        level: 'L1',
        type: 'CHOICE',
        content: '주로 어떤 장르의 영화를 즐기시나요?',
        options: [
          {
            optionId: 1,
            content: '액션/스릴러',
          },
          {
            optionId: 2,
            content: '로맨스/멜로',
          },
          {
            optionId: 3,
            content: '코미디/가족',
          },
          {
            optionId: 4,
            content: 'SF/판타지',
          },
        ],
      },
      {
        questionId: 2,
        level: 'L2',
        type: 'CHOICE',
        content: '영화를 볼 때, 특히 어떤 요소를 보시나요?',
        options: [
          {
            optionId: 5,
            content: '스토리/각본',
          },
          {
            optionId: 6,
            content: '연출/영상미',
          },
          {
            optionId: 7,
            content: '배우/캐릭터',
          },
          {
            optionId: 8,
            content: '음악',
          },
        ],
      },
      {
        questionId: 3,
        level: 'L3',
        type: 'CHOICE',
        content: '영화에서 기억에 남은 경험은 어떤 유형인가요?',
        options: [
          {
            optionId: 9,
            content: '극장에서 느낀 압도적인 스케일 (IMAX, 사운드 등)',
          },
          {
            optionId: 10,
            content: '감정을 크게 흔든 스토리/메시지',
          },
          {
            optionId: 11,
            content: '인생의 가치관에 영향을 준 영화',
          },
          {
            optionId: 12,
            content: '사람들과 함께 보며 공유한 추억 (친구/연인/가족)',
          },
        ],
      },
      {
        questionId: 4,
        level: 'L4',
        type: 'TEXT',
        content: '즐겨 본 영화에 대한 한마디를 적어주세요!',
        options: [],
      },
    ],
    2: [
      // (드라마/시리즈)
      {
        questionId: 5,
        level: 'L1',
        type: 'CHOICE',
        content: '주로 어떤 장르의 드라마/시리즈를 즐기시나요?',
        options: [
          { optionId: 17, content: '로맨스/멜로' },
          { optionId: 18, content: '코미디/일상' },
          { optionId: 19, content: '스릴러/범죄' },
          { optionId: 20, content: 'SF/판타지' },
          { optionId: 21, content: '시대극/사극' },
          { optionId: 22, content: '다큐/논픽션 시리즈' },
        ],
      },
      {
        questionId: 6,
        level: 'L2',
        type: 'CHOICE',
        content: '드라마/시리즈를 볼 때 특히 보는 요소가 있나요?',
        options: [
          { optionId: 23, content: '흡입력 있는 스토리 전개' },
          { optionId: 24, content: '캐릭터 성장과 관계성' },
          { optionId: 25, content: '배우의 연기력' },
          { optionId: 26, content: '대사/대본의 힘' },
          { optionId: 27, content: '연출/영상미' },
          { optionId: 28, content: 'OST/배경음악 분위기' },
        ],
      },
      {
        questionId: 7,
        level: 'L3',
        type: 'CHOICE',
        content: '드라마/시리즈를 볼 때 가장 기억에 남았던 경험은 어떤 유형이었나요?',
        options: [
          { optionId: 29, content: '한 회 한 회 기다리며 설레던 경험' },
          { optionId: 30, content: '몰아서 정주행하며 밤새 본 경험' },
          { optionId: 31, content: '주변 사람들과 함께 이야기하며 즐긴 경험' },
          { optionId: 32, content: '마음을 크게 울린 명장면/명대사' },
          { optionId: 33, content: '드라마 속 캐릭터에 깊이 이입했던 경험' },
        ],
      },
      {
        questionId: 8,
        level: 'L4',
        type: 'TEXT',
        content: '그 때 본 드라마/시리즈가 궁금해요! 작품에 대해 알려주실 수 있나요? (제목 등)',
        options: [],
      },
    ],

    3: [
      // (예능/리얼리티)
      {
        questionId: 9,
        level: 'L1',
        type: 'CHOICE',
        content: '주로 어떤 장르의 예능/리얼리티를 즐기시나요?',
        options: [
          { optionId: 34, content: '토크쇼/버라이어티' },
          { optionId: 35, content: '리얼리티/관찰 예능' },
          { optionId: 36, content: '서바이벌/경연 프로그램' },
          { optionId: 37, content: '여행/먹방 예능' },
          { optionId: 38, content: '음악/공연 예능' },
        ],
      },
      {
        questionId: 10,
        level: 'L2',
        type: 'CHOICE',
        content: '예능/리얼리티를 볼 때 특히 어떤 요소를 즐기시나요?',
        options: [
          { optionId: 39, content: '출연자들의 케미와 분위기' },
          { optionId: 40, content: '웃음 포인트와 재미 요소' },
          { optionId: 41, content: '프로그램의 기획/콘셉트 신선함' },
          { optionId: 42, content: '진솔하거나 공감되는 순간' },
          { optionId: 43, content: '함께 볼 때 더 즐거운 분위기' },
        ],
      },
      {
        questionId: 11,
        level: 'L3',
        type: 'CHOICE',
        content: '예능/리얼리티와 관련된 추억을 떠올려본다면 무엇이 있나요?',
        options: [
          { optionId: 44, content: '가족이나 친구와 함께 보며 크게 웃었던 순간' },
          { optionId: 45, content: '매주 방영일을 기다리며 챙겨봤던 기억' },
          { optionId: 46, content: '일상에서 밈·유행어를 따라했던 경험' },
          { optionId: 47, content: '새로운 문화·장소를 간접 체험한 경험' },
          { optionId: 48, content: '힘든 시기에 위로와 즐거움을 준 경험' },
        ],
      },
      {
        questionId: 12,
        level: 'L4',
        type: 'TEXT',
        content: '재밌게 본 프로그램이 궁금해요. 가장 재밌게 본 예능/리얼리티가 있다면 알려주세요!',
        options: [],
      },
    ],

    4: [
      // (애니메이션)
      {
        questionId: 13,
        level: 'L1',
        type: 'CHOICE',
        content: '주로 어떤 장르의 애니메이션을 즐기시나요?',
        options: [
          { optionId: 49, content: '액션/배틀' },
          { optionId: 50, content: '로맨스/학원' },
          { optionId: 51, content: '코미디/일상' },
          { optionId: 52, content: '판타지/이세계' },
          { optionId: 53, content: '드라마/휴먼' },
          { optionId: 54, content: 'SF/미스터리' },
        ],
      },
      {
        questionId: 14,
        level: 'L2',
        type: 'CHOICE',
        content: '애니메이션을 보면서 가장 눈길이 가는 요소는 무엇인가요?',
        options: [
          { optionId: 55, content: '흥미진진한 스토리 전개' },
          { optionId: 56, content: '매력적인 캐릭터와 관계성' },
          { optionId: 57, content: '작화와 연출 퀄리티' },
          { optionId: 58, content: '캐릭터의 목소리와 대사 표현' },
          { optionId: 59, content: '독창적인 세계관과 설정' },
        ],
      },
      {
        questionId: 15,
        level: 'L3',
        type: 'CHOICE',
        content: '애니메이션을 보면서 가장 기억에 남았던 경험은 어떤 순간이었나요?',
        options: [
          { optionId: 60, content: '방영일마다 기다리며 챙겨본 경험' },
          { optionId: 61, content: '정주행하며 밤새 몰입했던 경험' },
          { optionId: 62, content: '캐릭터나 장면 때문에 눈물·소름 돋았던 순간' },
          { optionId: 63, content: '오프닝/엔딩이나 OST가 오래 기억에 남은 경험' },
          { optionId: 64, content: '친구나 애니메이션 이야기를 나누며 즐거웠던 경험' },
        ],
      },
      {
        questionId: 16,
        level: 'L4',
        type: 'TEXT',
        content: '최근에 가장 재미있게 본 작품 하나만 알려주세요! 이유도 궁금해요.',
        options: [],
      },
    ],
  },
  delay: 500,
};
