import {
    FormValues,
    FormErrors,
    Watchers,
    RegisterOptions,
    RegisterReturn,
    UpdateFormState,
} from "../types";

export const createRegister = (
    values: FormValues,
    errors: FormErrors,
    watchers: Watchers,
    updateFormState: UpdateFormState,
    fieldOptions,
) => {
    return (name: string, options?: RegisterOptions): RegisterReturn => {
        fieldOptions[name] = options;

        const fieldRef = { current: null };

        return {
            name,
            ref: (el: any) => {
                if (!el) return;
                fieldRef.current = el;
                // mount 시에만 초기값 넣기
                el.value = values[name] ?? "";
            },
            onChange: (e: any) => {
                const value = e.target.value;
                values[name] = value;
                watchers.forEach((fn) => fn(values));
            },
        };
    };
};
