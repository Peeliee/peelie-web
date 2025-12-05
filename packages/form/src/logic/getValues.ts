import { FormValues } from "../types";

export const createGetValues = (values: FormValues) => {
    return (name?: string) => {
        if (!name) return { ...values };
        return values[name];
    };
};
