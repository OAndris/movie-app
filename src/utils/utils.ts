// For documentation, see the corresponding unit tests.

export const convertMinutesToHoursAndMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    return hours ? `${hours} h ${minutes % 60} min` : `${minutes % 60} min`;
};

export const mergeObjValuesToKeys = (
    obj: { [key: string]: unknown },
    usefulKeys: string[]
): { [key: string]: unknown } => {
    return usefulKeys.reduce((subsetObj, key) => {
        subsetObj[key] = obj[key];
        return subsetObj;
    }, {});
};

export const toggleElementInNumericArray = (
    array: number[],
    id: number
): number[] => {
    return array.includes(id)
        ? array.filter((currentId) => currentId !== id)
        : array.concat(id);
};
