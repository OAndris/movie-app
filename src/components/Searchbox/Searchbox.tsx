import React, { useState, useEffect } from 'react';
import { AiOutlineSearch, AiFillCaretRight } from 'react-icons/ai';
import './Searchbox.scss';
import {
    DEBOUNCE_TIME_IN_MS,
    MIN_CHAR_NUM_TO_AUTO_TRIGGER_FETCH,
} from '../../constants/constants';
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
    } = useMoviesByQuery(searchString, 1);

    const { movies, totalResults } = data ?? {};

    useEffect(() => {
        let debounceTimer: NodeJS.Timeout;
        if (!isTooShortQuery) {
            debounceTimer = setTimeout(fetchMovies, DEBOUNCE_TIME_IN_MS);
        }
        return () => clearTimeout(debounceTimer);
    }, [searchString, isTooShortQuery, fetchMovies]);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchString(e.target.value);
    };

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isTooShortQuery) {
            fetchMovies();
        }
    };

    const { favorites, toggleIsFavorite } = useFavorites();

    return (
        <div className="searchbox">
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
            {searchString.length > 0 && (
                <SearchSuggestions
                    isTooShortQuery={isTooShortQuery}
                    isFetching={isFetching}
                    isError={isError}
                    error={error}
                    data={movies}
                    totalResults={totalResults}
                    favorites={favorites}
                    toggleIsFavorite={toggleIsFavorite}
                />
            )}
        </div>
    );
};

export default Searchbox;
