import { cn } from '@/shared/lib/utils';
import { ChevronDownIcon } from '@/shared/ui/icons/ChevronDownIcon';
import { ChevronUpIcon } from '@/shared/ui/icons/ChevronUpIcon';

interface DatePickerProps {
  value: number;
  onChange: (next: number) => void;
  min: number;
  max: number;
  suffix: string;
  pad?: boolean;
  className?: string;
}

export function DatePicker({
  value,
  onChange,
  min,
  max,
  suffix,
  pad = false,
  className,
}: DatePickerProps) {
  const canIncrement = value < max;
  const canDecrement = value > min;
  const display = pad ? value.toString().padStart(2, '0') : value.toString();

  return (
    <div className="flex items-center gap-2">
      <div className={cn('flex flex-col items-center rounded-small bg-bg-sub', className)}>
        <button
          type="button"
          aria-label={`${suffix} 감소`}
          onClick={() => onChange(value - 1)}
          disabled={!canDecrement}
          className={cn(
            'flex h-6 items-center justify-center px-3',
            canDecrement ? 'text-text-main' : 'text-text-disabled',
          )}
        >
          <ChevronUpIcon className="size-6" />
        </button>
        <span className="text-body-m-400 font-medium text-text-main">{display}</span>
        <button
          type="button"
          aria-label={`${suffix} 증가`}
          onClick={() => onChange(value + 1)}
          disabled={!canIncrement}
          className={cn(
            'flex h-6 items-center justify-center px-3',
            canIncrement ? 'text-text-main' : 'text-text-disabled',
          )}
        >
          <ChevronDownIcon className="size-6" />
        </button>
      </div>
      <span className="text-body-1 text-text-sub">{suffix}</span>
    </div>
  );
}
