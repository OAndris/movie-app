import { useEffect } from 'react';

// Handle the events of clicking inside and/or outside an element.
export const useInAndOutClickHandlers = (
    ref: React.MutableRefObject<any>,
    insideClickHandler: () => void,
    outSideClickHandler: () => void
): void => {
    const handleClick = (event: any) => {
        if (ref.current?.contains(event.target)) {
            insideClickHandler();
        } else {
            outSideClickHandler();
        }
    };
    const handleKeydownEvent = (event: any) => {
        if (event.key === 'Escape') {
            outSideClickHandler();
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleClick);
        document.addEventListener('keydown', handleKeydownEvent);
        return () => {
            document.removeEventListener('click', handleClick);
            document.removeEventListener('keydown', handleKeydownEvent);
        };
    });
};
