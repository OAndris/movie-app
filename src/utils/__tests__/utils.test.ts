import { mergeObjValuesToKeys, toggleElementInNumericArray } from '../utils';

describe('mergeObjValuesToKeys', () => {
    it('returns an object containing the keys from the input array, with corresponding values from the input object (and undefined for any missing key)', () => {
        const obj = { a: 1, b: [2, 4], c: '3', d: 5, e: null };
        const usefulKeys = ['b', 'c'];
        const expectedObj = { b: [2, 4], c: '3' };
        expect(mergeObjValuesToKeys(obj, usefulKeys)).toEqual(expectedObj);
    });
    it('if all keys are defined in the array, it returns an object identical to the input object', () => {
        const obj = { a: 1, b: [2, 4], c: '3', d: 5, e: null };
        const usefulKeys = ['a', 'b', 'c', 'd', 'e'];
        const expectedObj = { ...obj };
        expect(mergeObjValuesToKeys(obj, usefulKeys)).toEqual(expectedObj);
    });
    it('if no keys are defined in the array, it returns an empty object', () => {
        const obj = { a: 1, b: [2, 4], c: '3', d: 5, e: null };
        const usefulKeys = [];
        const expectedObj = {};
        expect(mergeObjValuesToKeys(obj, usefulKeys)).toEqual(expectedObj);
    });
    it('if none of the keys defined the input array are part of the object, it still returns an object with keys from the array, and values being undefined', () => {
        const obj = { a: 1, b: [2, 4], c: '3', d: 5, e: null };
        const usefulKeys = ['f', 'z'];
        const expectedObj = { f: undefined, z: undefined };
        expect(mergeObjValuesToKeys(obj, usefulKeys)).toEqual(expectedObj);
    });
    it("if some keys are in the object and some aren't, it returns an object with the key (and values) that are in the object plus any additional keys with undefined as value", () => {
        const obj = { a: 1, b: [2, 4], c: '3', d: 5, e: null };
        const usefulKeys = ['b', 'd', 'f'];
        const expectedObj = { b: [2, 4], d: 5, f: undefined };
        expect(mergeObjValuesToKeys(obj, usefulKeys)).toEqual(expectedObj);
    });
});

describe('toggleElementInNumericArray', () => {
    it("removes element from array if it's present in the array", () => {
        expect(toggleElementInNumericArray([1, 2, 3], 1)).toEqual([2, 3]);
        expect(toggleElementInNumericArray([1, 2, 3], 2)).toEqual([1, 3]);
        expect(toggleElementInNumericArray([1, 2, 3], 3)).toEqual([1, 2]);
    });
    it("adds element to array if it's not yet present in the array", () => {
        expect(toggleElementInNumericArray([1, 2, 3], 4)).toEqual([1, 2, 3, 4]);
    });
});
