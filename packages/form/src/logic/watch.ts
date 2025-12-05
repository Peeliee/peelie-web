import { FormValues, Watchers, Watcher } from "../types";

// 리액트 없이 구현하기 위해 옵저버 패턴 사용
export const createWatch = (values: FormValues, watchers: Watchers) => {
    return (arg1, arg2) => {
        // watch("field", callback)
        if (typeof arg1 === "string" && typeof arg2 === "function") {
            const field = arg1;
            const callback = arg2;

            const fn = (changedValues) => {
                callback(changedValues[field]);
            };

            watchers.add(fn);
            callback(values[field]); // 초기값

            return () => watchers.delete(fn);
        }

        // watch(callback)
        if (typeof arg1 === "function") {
            watchers.add(arg1);
            arg1(values);
            return () => watchers.delete(arg1);
        }

        throw new Error("Invalid watch usage");
    };
};
