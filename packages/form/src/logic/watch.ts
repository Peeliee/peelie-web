import { FormValues, Watchers, Watcher, FieldWatchers } from "../types";

// 리액트 없이 구현하기 위해 옵저버 패턴 사용
export const createWatch = (
    values: FormValues,
    watchers: Watchers,
    fieldWatchers: FieldWatchers
) => {
    return (field, callback) => {
        if (!fieldWatchers[field]) {
            fieldWatchers[field] = new Set();
        }

        const watchers = fieldWatchers[field];
        watchers.add(callback);

        // 초기값 즉시 호출
        callback(values[field]);

        return () => watchers.delete(callback);
    };
};
