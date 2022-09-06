import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineSearch, AiFillCaretRight } from 'react-icons/ai';
import './Searchbox.scss';
import {
    DEBOUNCE_TIME_IN_MS,
    MIN_CHAR_NUM_TO_AUTO_TRIGGER_FETCH,
} from '../../constants/constants';
import { useInAndOutClickHandlers } from '../../hooks/useInAndOutClickHandlers';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useMoviesByQuery } from '../../api/requests/moviesByQuery';
import SearchSuggestions from '../SearchSuggestions/SearchSuggestions';

const Searchbox = () => {
    const [searchString, setSearchString] = useState('');
    const isTooShortQuery =
        searchString.length < MIN_CHAR_NUM_TO_AUTO_TRIGGER_FETCH;

    const {
        refetch: fetchMovies,
        isFetching,
        isError,
        error,
        data,
        isStale,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useMoviesByQuery(searchString);

    useEffect(() => {
        let debounceTimer: NodeJS.Timeout;
        if (!isTooShortQuery && isStale) {
            debounceTimer = setTimeout(fetchMovies, DEBOUNCE_TIME_IN_MS);
        }
        return () => clearTimeout(debounceTimer);
    }, [searchString, isTooShortQuery, isStale, fetchMovies]);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchString(e.target.value);
        setCanShowSuggestions(true); // to restore after click-out & refocus by tab
    };

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isTooShortQuery) {
            fetchMovies();
        }
    };

    const [canShowSuggestions, setCanShowSuggestions] = useState(false);
    const searchBoxRef = useRef(null);
    useInAndOutClickHandlers(
        searchBoxRef,
        () => setCanShowSuggestions(true),
        () => setCanShowSuggestions(false)
    );

    const { favorites, toggleIsFavorite } = useFavorites();

    return (
        <div className="searchbox" ref={searchBoxRef}>
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
            {searchString.length > 0 && canShowSuggestions && (
                <SearchSuggestions
                    isTooShortQuery={isTooShortQuery}
                    isFetching={isFetching}
                    isError={isError}
                    error={error}
                    data={data}
                    favorites={favorites}
                    toggleIsFavorite={toggleIsFavorite}
                    hasNextPage={hasNextPage}
                    fetchNextPage={fetchNextPage}
                    isFetchingNextPage={isFetchingNextPage}
                />
            )}
        </div>
    );
};

export default Searchbox;
