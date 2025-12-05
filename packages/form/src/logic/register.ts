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
    updateFormState: UpdateFormState
) => {
    return (name: string, options?: RegisterOptions): RegisterReturn => {
        const fieldRef = { current: null };

        return {
            name,
            ref: (el: any) => {
                if (!el) return;
                fieldRef.current = el;

                // mount 시에만 초기값 넣기
                el.value = values[name] ?? "";
            },
            // defaultValue: values[name],
            onChange: (e: any) => {
                const value = e.target.value;

                values[name] = value;

                // // validation
                // if (options?.required && !value) {
                //     errors[name] = "This field is required";
                // } else if (options?.validate) {
                //     const result = options.validate(value);
                //     errors[name] = result === true ? undefined : result;
                // } else {
                //     errors[name] = undefined;
                // }

                // updateFormState();
                watchers.forEach((fn) => fn(values));
            },
        };
    };
};
