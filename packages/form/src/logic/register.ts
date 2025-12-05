import {
    FormValues,
    FormErrors,
    FieldWatchers,
    RegisterOptions,
    RegisterReturn,
    FieldOptions,
} from "../types";

export const createRegister = <TValues extends FormValues>(
    values: TValues,
    errors: FormErrors<TValues>,
    fieldOptions: FieldOptions<TValues>,
    fieldWatchers: FieldWatchers<TValues>
) => {
    return <K extends keyof TValues>(
        name: K,
        options: RegisterOptions<TValues[K]> = {}
    ): RegisterReturn<TValues[K]> => {
        fieldOptions[name] = options;

        const fieldRef = { current: null as HTMLInputElement | null };

        return {
            name: name as string,

            ref: (el: HTMLElement | null) => {
                if (!el) return;
                if (!(el instanceof HTMLInputElement)) return;
                fieldRef.current = el;
                el.value = values[name] ?? "";
            },

            onChange: (e: any) => {
                const value = e.target.value as TValues[K];

                values[name] = value;

                if (fieldWatchers[name]) {
                    fieldWatchers[name]!.forEach((cb) => cb(value));
                }
            },
        };
    };
};
