import { FormValues, FieldWatchers } from "../types";

export const createWatch = <TValues extends FormValues>(
    values: TValues,
    fieldWatchers: FieldWatchers<TValues>
) => {
    return <K extends keyof TValues>(field: K, callback: (value: TValues[K]) => void) => {
        if (!fieldWatchers[field]) {
            fieldWatchers[field] = new Set();
        }

        const watchers = fieldWatchers[field]!;
        watchers.add(callback);

        // 초기값 즉시 전달
        callback(values[field]);

        return () => watchers.delete(callback);
    };
};
