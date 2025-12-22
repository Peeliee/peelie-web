import { FormState, FormErrors, FormValues } from "../types";

export const createFormState = <TValues extends FormValues>(errors: FormErrors<TValues>) => {
    const stateWatchers = new Set<(state: FormState<TValues>) => void>();

    const formState: FormState<TValues> = {
        errors,
        isValid: true,
    };

    const notify = () => {
        for (const cb of stateWatchers) cb({ ...formState });
    };

    const update = () => {
        // 에러 객체 키가 0개인지 검사
        formState.isValid = Object.keys(formState.errors).length === 0;
        notify();
    };

    const subscribe = (cb: (state: FormState<TValues>) => void) => {
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
