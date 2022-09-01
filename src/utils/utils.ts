// For documentation, see the corresponding unit test.
export const toggleElementInNumericArray = (
    array: number[],
    id: number
): number[] => {
    return array.includes(id)
        ? array.filter((currentId) => currentId !== id)
        : array.concat(id);
};
