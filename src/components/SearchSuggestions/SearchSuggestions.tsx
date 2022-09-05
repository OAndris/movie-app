import React from 'react';
import { AxiosError } from 'axios';
import './SearchSuggestions.scss';
import { MIN_CHAR_NUM_TO_AUTO_TRIGGER_FETCH } from '../../constants/constants';
import { Movie } from '../../models/models';
import MovieCard from '../MovieCard/MovieCard';
import Spinner from '../Spinner/Spinner';

interface Props {
    isTooShortQuery: boolean;
    isFetching: boolean;
    isError: boolean;
    error: AxiosError | {};
    data: Movie[];
    totalResults: number;
    favorites: number[];
    toggleIsFavorite: (id: number) => void;
}

const SearchSuggestions: React.FC<Props> = ({
    isTooShortQuery,
    isFetching,
    isError,
    error,
    data,
    totalResults,
    favorites,
    toggleIsFavorite,
}) => {
    const showLoading = !isTooShortQuery && isFetching;
    const showWarning = isTooShortQuery;
    const showError =
        isError && typeof error === 'object' && 'message' in error;
    const showTotalResults =
        !isTooShortQuery && !isFetching && !showError && Array.isArray(data);

    return (
        <div className={'search-suggestions' + (isFetching ? ' loading' : '')}>
            {showLoading && <Spinner className="spinner" />}
            <ul className="list">
                {!isTooShortQuery &&
                    data?.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            isFavorite={favorites.includes(movie.id)}
                            toggleIsFavorite={() => toggleIsFavorite(movie.id)}
                        />
                    ))}
            </ul>
            {showWarning && (
                <BottomMessage>
                    {`Please provide at least ${MIN_CHAR_NUM_TO_AUTO_TRIGGER_FETCH} characters!`}
                </BottomMessage>
            )}
            {showError && <BottomMessage>{error.message}</BottomMessage>}
            {showTotalResults && (
                <BottomMessage>
                    {totalResults === 0
                        ? 'There are no results!'
                        : `A total of ${totalResults} result(s) available.`}
                </BottomMessage>
            )}
            {isFetching && <BottomMessage>Loading...</BottomMessage>}
        </div>
    );
};

function BottomMessage({ children }) {
    return <p className="bottom-message">{children}</p>;
}

export default SearchSuggestions;
