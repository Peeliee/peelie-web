import { Link } from 'react-router-dom';
import { useState } from 'react';

import { CategorySelectGrid } from '@/features/category/ui/CategorySelectGrid';
import { usePrefetchCategoryMainQuestion } from '@/entities/category/api/category.queries';

const SelectCategoryPage = () => {
  const [selected, setSelected] = useState<number[]>([]);
  const prefetchMainQuestion = usePrefetchCategoryMainQuestion();

  const handleSelect = (newSelected: number[]) => {
    setSelected(newSelected);
    newSelected.forEach((id) => prefetchMainQuestion(id));
  };
  console.log(selected);

  return (
    <div className="min-h-screen flex flex-col px-6 py-10 justify-between">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">
          관심있는 주제를
          <br />
          선택해주세요.
        </h2>
        <p className="text-sm text-gray-500">
          관심있는 주제를 <span className="text-orange-500 font-semibold">3가지만</span>{' '}
          선택해주세요.
          <br />
          선택한 주제는 이후 나의 여정에 사용돼요!
        </p>
      </div>

      <CategorySelectGrid onChange={handleSelect} className="mb-15" />

      <Link
        to="/category-question"
        className={`block w-full py-4 rounded-full text-center font-medium
          ${
            selected.length < 3
              ? 'bg-gray-200 text-gray-400 pointer-events-none'
              : 'bg-orange-400 text-white  active:bg-orange-500'
          }`}
      >
        계속하기
      </Link>
    </div>
  );
};

export default SelectCategoryPage;
