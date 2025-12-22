import { FormValues } from "../types";

export const createGetValues = <TValues extends FormValues>(values: TValues) => {
    return <K extends keyof TValues>(name?: K) => {
        if (name === undefined) {
            // 전체 values 객체 복사
            return { ...values };
        }

        // 특정 필드 값
        return values[name];
    };
};
