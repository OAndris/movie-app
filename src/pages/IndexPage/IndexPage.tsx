import { useEffect, useState } from 'react';
import './IndexPage.scss';
import { MIN_CHAR_NUM_TO_AUTO_TRIGGER_FETCH } from '../../constants/constants';
import { Movie } from '../../models/models';
import { useFavorites } from '../../contexts/FavoritesContext';
import Searchbox from '../../components/Searchbox/Searchbox';
import Spinner from '../../components/Spinner/Spinner';
import SearchSuggestions from '../../components/SearchSuggestions/SearchSuggestions';
import { getMoviesByQuery } from '../../libs/requests';

const INITIAL_MOVIES: Movie[] = [];

const IndexPage = () => {
    const [searchString, setSearchString] = useState(''); // implicit type definition based on the init value's type
    const [pageNumToFetch, setPageNumToFetch] = useState(1);
    const [isFetching, setIsFetching] = useState(false);

    const [movies, setMovies] = useState(INITIAL_MOVIES);
    const [totalPages, setTotalPages] = useState(0);
    const [totalResults, setTotalResults] = useState(0);

    useEffect(() => {
        if (searchString.length < MIN_CHAR_NUM_TO_AUTO_TRIGGER_FETCH) {
            setMovies(INITIAL_MOVIES);
            setTotalResults(0);
        }
        // if (searchString.length === 0) {
        //     // If user deletes string while the HTTP response is still pending --> cancel request (i.e. stop fetching) to prevent showing outdated suggestions:
        //     // TODO - actually prevent (and/or cancel) the request!
        //     setIsFetching(false);
        // }
    }, [searchString]);

    const fetchMovies = async (searchString: string) => {
        if (searchString.length < MIN_CHAR_NUM_TO_AUTO_TRIGGER_FETCH) {
            return;
        }
        setIsFetching(true);
        const { movies, total_pages, total_results } = await getMoviesByQuery(
            searchString,
            pageNumToFetch
        );
        setMovies(movies);
        setTotalPages(total_pages);
        setTotalResults(total_results);
        setIsFetching(false);
    };

    const shouldShowSuggestions = searchString.length > 0;
    const shouldShowSpinner = isFetching && !shouldShowSuggestions;

    const { favorites, toggleIsFavorite } = useFavorites();

    return (
        <article className="index-page">
            <h2>Find the movies you love!</h2>
            <Searchbox
                searchString={searchString}
                setSearchString={setSearchString}
                fetchMovies={fetchMovies}
                setIsFetching={setIsFetching}
            />
            {shouldShowSpinner && <Spinner />}
            {shouldShowSuggestions && (
                <SearchSuggestions
                    movies={movies}
                    isLoading={isFetching}
                    isTooShortQuery={
                        searchString.length < MIN_CHAR_NUM_TO_AUTO_TRIGGER_FETCH
                    }
                    favorites={favorites}
                    toggleIsFavorite={toggleIsFavorite}
                    totalResults={totalResults}
                />
            )}
        </article>
    );
};

export default IndexPage;
