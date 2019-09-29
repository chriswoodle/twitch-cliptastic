/**
 * Replace elements of an array. Causes Vue to update bindings correctly.
 * @param array
 * @param newValues
 */
export function replaceArray<T>(array: T[], newValues: T[]) {
    array.splice(0, array.length, ...newValues);
}