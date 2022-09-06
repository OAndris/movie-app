import { useEffect, useState } from 'react';

/**
 * An enhanced version of React.useState that keeps the state and localStorage in sync:
 * - initially, it reads the corresponding value from localStorage (if available)
 * - then it monitors state changes and automatically saves them to localStorage
 *
 * @param key - used for getting the corresponding value from localStorage (if it's already stored, otherwise used for initialization)
 * @param initValue - used for initializing the value (in both the state and localStorage) if it's not yet stored
 * @returns `[value, setValue]` - destructure and use them just like for React.useState
 *
 * Example: `const [favorites, setFavorites] = useLocalStorage('favorites', []);`
 */
export const useLocalStorage = (
    key: string,
    initValue: any
): [any, React.Dispatch<any>] => {
    const getValue = (key: string, initValue: any) => {
        const storedValue = JSON.parse(localStorage.getItem(key) ?? 'null'); // JSON.parse expects a string, while localStorage.getItem() can return either a string or null (so convert null to 'null'. Note that '' is invalid JSON)
        return storedValue ?? initValue;
    };
    const [value, setValue] = useState(() => getValue(key, initValue)); // callback inside useState so that it only gets called on the caller Component's initial mount (and not on its every re-render)
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};
