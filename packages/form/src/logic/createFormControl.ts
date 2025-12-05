import {
    FormValues,
    FormErrors,
    FieldWatchers,
    FieldOptions,
    RegisterOptions,
    FormState,
} from "../types";

import { createRegister } from "./register";
import { createSetValue } from "./setValue";
import { createWatch } from "./watch";
import { createGetValues } from "./getValues";
import { createFormState } from "./formState";

export const createFormControl = <TValues extends FormValues>(defaultValues: TValues) => {
    const values: TValues = { ...defaultValues };
    const errors: FormErrors<TValues> = {};

    const {
        formState,
        update: updateFormState,
        subscribe: subscribeFormState,
    } = createFormState<TValues>(errors);

    const fieldOptions: FieldOptions<TValues> = {};
    const fieldWatchers: FieldWatchers<TValues> = {};

    const register = createRegister<TValues>(
        values,
        errors,
        fieldOptions,
        fieldWatchers
    );

    const setValue = createSetValue<TValues>(values, errors, updateFormState, fieldWatchers);

    const watch = createWatch<TValues>(values, fieldWatchers);

    const getValues = createGetValues<TValues>(values);

    const handleSubmit = (onValid: (values: TValues) => void) => {
        return () => {
            // 1. errors 초기화
            for (const key in errors) delete errors[key];

            // 2. validation
            for (const key in values) {
                const opts = fieldOptions[key];

                if (!opts) continue;

                // required
                if (opts.required && !values[key]) {
                    errors[key] =
                        typeof opts.required === "string"
                            ? opts.required
                            : "This field is required";
                }

                // validate
                if (opts.validate) {
                    const result = opts.validate(values[key]);
                    if (result !== true) errors[key] = result;
                }
            }

            // 3. formState 업데이트
            updateFormState();

            // 4. 성공 시 validation
            if (formState.isValid) {
                onValid(values);
            }
        };
    };

    return {
        register,
        setValue,
        watch,
        getValues,
        handleSubmit,
        formState,
        subscribeFormState,
    };
};
