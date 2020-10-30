type Predicate<T> = (item: T, index: number, array: T[]) => unknown;
export class ArrayHelper {
    /**
     * Finds exactly one item in array. If more than one item has been found, an error will be thrown
     * @param array
     * @param predicate
     */
    findOne<T>(array: T[], predicate: Predicate<T>): T | undefined {
        const matches = array.filter(predicate);
        if (matches.length > 1) {
            throw new Error(
                "More than one result have been returned by filtering array."
            );
        } else if (matches.length === 0) {
            throw new Error("No result has been returned by filtering array.");
        }
        return matches[0];
    }

    /**
     * Finds one item in array. If more than one item has been found, first matching item will be returned.
     * @param array
     * @param predicate
     */
    findFirst<T>(array: T[], predicate: Predicate<T>): T | undefined {
        const matches = array.filter(predicate);
        return matches.length > 0 ? matches[0] : undefined;
    }

    /**
     * True if at least one item is in array matching the predicate. If more than one item has been found method returns true.
     * @param array
     * @param predicate
     */
    contains<T>(array: T[], predicate: Predicate<T>): boolean {
        const matches = array.filter(predicate);
        return matches.length > 0;
    }

    /**
     * True if exactly one item is in array matching the predicate. If more than one item has been found method returns false.
     * @param array
     * @param predicate
     */
    containsOne<T>(array: T[], predicate: Predicate<T>): boolean {
        const matches = array.filter(predicate);
        return matches.length === 1;
    }
}

export default ArrayHelper;
