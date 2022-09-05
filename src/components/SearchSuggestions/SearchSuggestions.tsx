import React from 'react';
import { AxiosError } from 'axios';
import './SearchSuggestions.scss';
import { MIN_CHAR_NUM_TO_AUTO_TRIGGER_FETCH } from '../../constants/constants';
import { MovieInterface, MoviesByQueryInterface } from '../../models/models';
import MovieCard from '../MovieCard/MovieCard';
import Spinner from '../Spinner/Spinner';

interface Props {
    isTooShortQuery: boolean;
    isFetching: boolean;
    isError: boolean;
    error: AxiosError | {};
    data: { pages: MoviesByQueryInterface[]; pageParams: unknown[] };
    favorites: number[];
    toggleIsFavorite: (id: number) => void;
    hasNextPage: boolean;
    fetchNextPage: () => void;
    isFetchingNextPage: boolean;
}

const SearchSuggestions: React.FC<Props> = ({
    isTooShortQuery,
    isFetching,
    isError,
    error,
    data,
    favorites,
    toggleIsFavorite,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
}) => {
    const showLoading = !isTooShortQuery && isFetching;
    const showWarning = isTooShortQuery;
    const showError =
        isError && typeof error === 'object' && 'message' in error;
    const showTotalResults = !isTooShortQuery && !isFetching && !showError; // && Array.isArray(data);
    const showLoadMoreButton =
        !isTooShortQuery && data?.pages.length > 0 && hasNextPage;

    const totalResults = data?.pages[0].totalResults;

    return (
        <div className={'search-suggestions' + (isFetching ? ' loading' : '')}>
            {showLoading && <Spinner className="spinner" />}
            <ul className="list">
                {!isTooShortQuery &&
                    data?.pages.map((page, i) => (
                        <React.Fragment key={i}>
                            {page.movies.map((movie: MovieInterface) => (
                                <MovieCard
                                    key={movie.id}
                                    movie={movie}
                                    isFavorite={favorites.includes(movie.id)}
                                    toggleIsFavorite={() =>
                                        toggleIsFavorite(movie.id)
                                    }
                                />
                            ))}
                        </React.Fragment>
                    ))}
                {showLoadMoreButton && (
                    <button
                        className="load-more-button"
                        onClick={fetchNextPage}
                        disabled={isFetchingNextPage}
                    >
                        Load More
                    </button>
                )}
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
                        : totalResults === undefined
                        ? 'Loading...'
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
