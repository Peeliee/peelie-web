import { FormValues, FormErrors, Watchers, FormState } from "../types";

import { createRegister } from "./register";
import { createSetValue } from "./setValue";
import { createWatch } from "./watch";
import { createGetValues } from "./getValues";
import { createFormState } from "./formState";

export const createFormControl = (defaultValues: FormValues = {}) => {
    const values: FormValues = { ...defaultValues };
    const errors: FormErrors = {};
    const watchers: Watchers = new Set();

    const {
        formState,
        update: updateFormState,
        subscribe: subscribeFormState,
    } = createFormState(errors);

    const fieldOptions = {};

    const register = createRegister(values, errors, watchers, updateFormState);
    const setValue = createSetValue(values, errors, watchers, updateFormState);
    const watch = createWatch(values, watchers);
    const getValues = createGetValues(values);

    const handleSubmit = (onValid: (values: FormValues) => void) => {
        return () => {
            // 1 .errors 초기화
            for (const key in errors) delete errors[key];

            // 2. 각 필드에 대해 validation 수행
            for (const key in values) {
                const value = values[key];
                const opts = fieldOptions[key];

                if (!opts) continue;

                // required
                if (opts.required && !value) {
                    errors[key] = "This field is required";
                    continue;
                }

                // validate
                if (opts.validate) {
                    const result = opts.validate(value);
                    if (result !== true) {
                        errors[key] = result;
                        continue;
                    }
                }
            }

            // 3. formState 업데이트
            updateFormState();

            // 4. 성공일 때만 onValid 실행
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
