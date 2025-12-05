import { useState, useMemo, useEffect } from "react";

import { createFormControl } from "./logic/createFormControl";

export const useForm = (defaultValues: any) => {
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
