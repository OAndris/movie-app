import React, { useState } from 'react';
import { AiOutlineSearch, AiFillCaretRight } from 'react-icons/ai';
import './Searchbox.scss';
import {
    MIN_CHAR_NUM_TO_AUTO_TRIGGER_FETCH,
    DEBOUNCE_TIME_IN_MS,
} from '../../constants/constants';

interface Props {
    searchString: string;
    setSearchString: React.Dispatch<React.SetStateAction<string>>;
    fetchMovies: (newSearchString: string) => void;
}

const Searchbox: React.FC<Props> = ({
    searchString,
    setSearchString,
    fetchMovies,
}) => {
    const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout>();

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchString = e.target.value;
        setSearchString(newSearchString);
        if (newSearchString.length >= MIN_CHAR_NUM_TO_AUTO_TRIGGER_FETCH) {
            clearTimeout(debounceTimer);
            setDebounceTimer(
                setTimeout(
                    () => fetchMovies(newSearchString),
                    DEBOUNCE_TIME_IN_MS
                )
            );
        }
    };

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchMovies(searchString);
    };

    return (
        <form className="search-form" onSubmit={(e) => onFormSubmit(e)}>
            <AiOutlineSearch className="search-icon" />
            <input
                type="search"
                className="search-input"
                required={true}
                value={searchString}
                onChange={(e) => onInputChange(e)}
                placeholder="Search movies..."
            />
            <button
                type="submit"
                className="search-button"
                aria-label="Query movie database for your search phrase."
            >
                <AiFillCaretRight />
            </button>
        </form>
    );
};

export default Searchbox;
