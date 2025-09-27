import { useState } from 'react';
import { CategoryCard } from '@/entities/category/ui/CategoryCard';
import { CATEGORY_LIST } from '@/shared/constants/category';
import { cn } from '@/shared/lib/utils';

interface CategorySelectGridProps {
  onChange?: (selected: string[]) => void;
  className?: string;
}

export const CategorySelectGrid = ({ onChange, className }: CategorySelectGridProps) => {
  const maxSelect = 3;
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelect = (id: string) => {
    let next: string[];

    if (selected.includes(id)) {
      next = selected.filter((s) => s !== id);
    } else if (selected.length < maxSelect) {
      next = [...selected, id];
    } else {
      next = selected;
    }

    setSelected(next);
    onChange?.(next);
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
