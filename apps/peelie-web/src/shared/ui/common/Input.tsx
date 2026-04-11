import { useState, type ComponentProps } from 'react';
import { cn } from '@/shared/lib/utils';

/**
 * 헤드리스 Input 컴포넌트
 *
 * 상태를 data-* attribute로 노출하여 외부에서 Tailwind data-[] 변형으로 스타일링.
 * - data-focused="true"  — 포커스 상태
 * - data-filled="true"   — 값이 있는 상태
 * - data-error="true"    — 에러 상태
 * - data-disabled="true" — 비활성화
 * - data-readonly="true" — 읽기 전용
 *
 * @see Figma node-id=4233-21665
 */

type InputBaseProps = {
  multiline?: boolean;
  error?: boolean;
};

type SingleLineProps = InputBaseProps & { multiline?: false } & ComponentProps<'input'>;
type MultiLineProps = InputBaseProps & { multiline: true } & ComponentProps<'textarea'>;

type InputProps = SingleLineProps | MultiLineProps;

function stripCustomProps(props: InputProps) {
  const copy = { ...props } as Record<string, unknown>;
  delete copy.multiline;
  delete copy.error;
  return copy;
}

export function Input(props: InputProps) {
  const [focused, setFocused] = useState(false);

  const { multiline, error, className } = props;
  const filled =
    String(
      (props as Record<string, unknown>).value ??
        (props as Record<string, unknown>).defaultValue ??
        '',
    ).length > 0;

  const dataAttrs = {
    'data-focused': focused || undefined,
    'data-filled': filled || undefined,
    'data-error': error || undefined,
    'data-disabled': props.disabled || undefined,
    'data-readonly': props.readOnly || undefined,
  };

  const nativeProps = stripCustomProps(props);

  if (multiline) {
    return (
      <textarea
        {...(nativeProps as ComponentProps<'textarea'>)}
        {...dataAttrs}
        className={cn(className)}
        onFocus={(e) => {
          setFocused(true);
          (props as MultiLineProps).onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          (props as MultiLineProps).onBlur?.(e);
        }}
      />
    );
  }

  return (
    <input
      {...(nativeProps as ComponentProps<'input'>)}
      {...dataAttrs}
      className={cn(className)}
      onFocus={(e) => {
        setFocused(true);
        (props as SingleLineProps).onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        (props as SingleLineProps).onBlur?.(e);
      }}
    />
  );
}
