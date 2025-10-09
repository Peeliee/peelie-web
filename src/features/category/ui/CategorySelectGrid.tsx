import { useState } from 'react';
import { CategoryCard } from '@/entities/category/ui/CategoryCard';
import { CATEGORY_LIST } from '@/shared/constants/category';
import { cn } from '@/shared/lib/utils';

interface CategorySelectGridProps {
  onChange: (selected: number[]) => void;
  className?: string;
}

export const CategorySelectGrid = ({ onChange, className }: CategorySelectGridProps) => {
  const maxSelect = 3;
  const [selected, setSelected] = useState<number[]>([]);
  console.log(selected);
  const handleSelect = (id: number) => {
    setSelected((prev) => {
      let next: number[];

      if (prev.includes(id)) {
        next = prev.filter((s) => s !== id);
      } else if (prev.length < maxSelect) {
        next = [...prev, id];
      } else {
        next = prev;
      }
      const sorted = [...next].sort((a, b) => a - b);
      onChange(sorted);
      return sorted;
    });
  };

  return (
    <div className={cn('grid grid-cols-3 gap-4 mt-8', className)}>
      {CATEGORY_LIST.map(({ id, label, icon: Icon }) => (
        <CategoryCard
          key={id}
          icon={Icon}
          label={label}
          selected={selected.includes(id)}
          onClick={() => handleSelect(id)}
        />
      ))}
    </div>
  );
};
