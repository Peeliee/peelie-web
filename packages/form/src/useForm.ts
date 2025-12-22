import { useState, useMemo, useEffect } from "react";

import type { FormValues } from "./types";
import { createFormControl } from "./logic/createFormControl";

type UseFormProps<TValues extends FormValues> = {
    defaultValues?: TValues;
};

export const useForm = <TValues extends FormValues>(props: UseFormProps<TValues>) => {
    const defaultValues = props.defaultValues ?? ({} as TValues);

    const form = useMemo(() => createFormControl(defaultValues), []);
    const [state, setState] = useState(form.getValues());
    const [formState, setFormState] = useState(form.formState);

    // watch → values 변화 렌더링
    // useEffect(() => {
    //     const unsubscribe = form.watch((values) => {
    //         setState({ ...values });
    //     });
    //     return unsubscribe;
    // }, []);

    // formState 변화 렌더링
    useEffect(() => {
        const unsubscribe = form.subscribeFormState((nextState) => {
            setFormState({ ...nextState });
        });
        return unsubscribe;
    }, []);

    return {
        ...form,
        values: state,
        formState,
    };
};
