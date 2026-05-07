import { formatDateLabel } from '../utils';

interface DateSeparatorProps {
  date: string;
}

export function DateSeparator({ date }: DateSeparatorProps) {
  return (
    <div className="flex justify-center py-2">
      <span className="px-4 py-1 text-caption-m-400 text-gray-01">{formatDateLabel(date)}</span>
    </div>
  );
}
