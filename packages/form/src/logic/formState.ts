import { FormState, FormErrors } from "../types";

export const createFormState = (errors: FormErrors) => {
    const stateWatchers = new Set<(state: FormState) => void>();

    const formState: FormState = {
        errors,
        isValid: true,
    };

    const notify = () => {
        for (const cb of stateWatchers) cb({ ...formState });
    };

    const update = () => {
        formState.isValid = Object.keys(formState.errors).length === 0;
        notify();
    };

    const subscribe = (cb: (state: FormState) => void) => {
        stateWatchers.add(cb);
        return () => {
            stateWatchers.delete(cb);
        };
    };

    return {
        formState,
        update,
        subscribe,
    };
};
