import { toggleElementInNumericArray } from '../utils';

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
