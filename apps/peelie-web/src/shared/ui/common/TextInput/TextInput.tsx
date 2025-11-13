import * as React from 'react';
import { cn } from '@/shared/lib/utils';

interface TextInputProps extends React.ComponentProps<'input'> {
  label?: string;
  error?: boolean;
  errorText?: string;
  placeholder?: string;
}

export function TextInput({
  className,
  type = 'text',
  label,
  error,
  errorText,
  placeholder,
  ...props
}: TextInputProps) {
  return (
    <div className={cn('flex flex-col w-full gap-1', className)}>
      {label && <label className="body-1-regular text-peelie-gray-600">{label}</label>}

      <input
        type={type}
        placeholder={placeholder}
        data-slot="input"
        className={cn(
          'w-full h-10 px-3 rounded-300 outline-none transition-all body-1-regular',
          // 기본
          'bg-peelie-neutral-5 border border-peelie-neutral-30 text-peelie-black placeholder:text-peelie-gray-400',
          // focus
          'focus:placeholder:text-peelie-gray-400 focus:border-peelie-primary-600',
          // disabled
          'disabled:placeholder:text-peelie-gray-400 disabled:cursor-not-allowed',
          // error
          error && 'border border-peelie-error-200',
        )}
        {...props}
      />

      {errorText && (
        <p className="text-peelie-error-200 body-1-regular flex justify-center">{errorText}</p>
      )}
    </div>
  );
}
