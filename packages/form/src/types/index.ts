export type FormValues = Record<string, string>;
export type FormErrors = Record<string, string | undefined>;
export type UpdateFormState = () => void;

/** watch 콜백 */
export type Watcher = (values: FormValues) => void;
export type FieldWatchers = Record<string, Set<(value: any) => void>>;

/** watchers Set */
export type Watchers = Set<Watcher>;

/** register 옵션 (추가 가능) */
export type RegisterOptions = {
    required?: boolean | string;
    validate?: (value: unknown) => string | true;
};

/** register가 반환하는 구조 */
export type RegisterReturn = {
    name: string;
    ref: (element: HTMLElement | null) => void;
    // defaultValue: string;
    onChange: (value: unknown) => void;
};

export interface FormState {
    errors: FormErrors;
    isValid: boolean;
}
