import type { CategoryMainQuestion } from '@/entities/category/model/category.type';

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
