import { FormValues, FormErrors, Watchers, UpdateFormState } from "../types";

export const createSetValue = (
    values: FormValues,
    errors: FormErrors,
    watchers: Watchers,
    updateFormState: UpdateFormState
) => {
    return (name: string, value: string) => {
        values[name] = value;
        errors[name] = undefined; // 직접 값 넣으면 error는 개발자 판단에 따라 초기화
        updateFormState();
        watchers.forEach((fn) => fn(values));
    };
};
