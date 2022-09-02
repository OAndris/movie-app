import React from 'react';
import './SearchSuggestions.scss';
import { MIN_CHAR_NUM_TO_AUTO_TRIGGER_FETCH } from '../../constants/constants';
import { Movie } from '../../models/models';
import MovieCard from '../MovieCard/MovieCard';
import Spinner from '../Spinner/Spinner';

interface Props {
    movies: Movie[];
    isLoading: boolean;
    isTooShortQuery: boolean;
    favorites: number[];
    toggleIsFavorite: (id: number) => void;
    totalResults: number;
}

const SearchSuggestions: React.FC<Props> = ({
    movies,
    isLoading,
    isTooShortQuery,
    favorites,
    toggleIsFavorite,
    totalResults,
}) => {
    return (
        <div className={'search-suggestions' + (isLoading ? ' loading' : '')}>
            {isLoading && <Spinner className="spinner" />}
            <ul className="list">
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        isFavorite={favorites.includes(movie.id)}
                        toggleIsFavorite={() => toggleIsFavorite(movie.id)}
                    />
                ))}
            </ul>
            {isTooShortQuery && (
                <p className="bottom-message">
                    {`Please provide at least ${MIN_CHAR_NUM_TO_AUTO_TRIGGER_FETCH} characters!`}
                </p>
            )}
            {!isLoading && !isTooShortQuery && (
                <p className="bottom-message">
                    {totalResults === 0
                        ? 'There are no results!'
                        : `A total of ${totalResults} result(s) available.`}
                </p>
            )}
        </div>
    );
};

export default SearchSuggestions;
