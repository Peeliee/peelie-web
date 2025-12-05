import { FormValues, FormErrors, Watchers, UpdateFormState, FieldWatchers } from "../types";

export const createSetValue = (
    values: FormValues,
    errors: FormErrors,
    watchers: Watchers,
    updateFormState: UpdateFormState,
    fieldWatchers: FieldWatchers
) => {
    return (name: string, value: string) => {
        values[name] = value;
        errors[name] = undefined; // 직접 값 넣으면 error는 개발자 판단에 따라 초기화
        // watchers.forEach((fn) => fn(values));
        if (fieldWatchers[name]) {
            fieldWatchers[name].forEach((cb) => cb(value));
        }
        updateFormState();
    };
};
