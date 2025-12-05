export type FormValues = Record<string, any>;

export type UpdateFormState = () => void;

export type FormErrors<TValues extends FormValues> = {
    [K in keyof TValues]?: string;
};

/** watch 콜백 */
export type Watcher = (values: FormValues) => void;

export type FieldWatchers<TValues extends FormValues> = {
    [K in keyof TValues]?: Set<(value: TValues[K]) => void>;
};

/** register 옵션 (추가 가능) */
export type RegisterOptions<TValue> = {
    required?: boolean | string;
    validate?: (value: TValue) => string | true;
};

/** register가 반환하는 구조 */
export type RegisterReturn<T> = {
    name: string;
    ref: (el: HTMLElement | null) => void;
    onChange: (event: any) => void;
};

export type FieldOptions<TValues extends FormValues> = {
    [K in keyof TValues]?: RegisterOptions<TValues[K]>;
};

export interface FormState<TValues extends FormValues> {
    errors: FormErrors<TValues>;
    isValid: boolean;
}
