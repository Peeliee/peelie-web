import { FormValues, FormErrors, UpdateFormState, FieldWatchers } from "../types";

export const createSetValue = <TValues extends FormValues>(
    values: TValues,
    errors: FormErrors<TValues>,
    updateFormState: UpdateFormState,
    fieldWatchers: FieldWatchers<TValues>
) => {
    return <K extends keyof TValues>(name: K, value: TValues[K]) => {
        values[name] = value;
        errors[name] = undefined;

        // 필드 watch callback 실행
        if (fieldWatchers[name]) {
            fieldWatchers[name]!.forEach((cb) => cb(value));
        }

        updateFormState();
    };
};
