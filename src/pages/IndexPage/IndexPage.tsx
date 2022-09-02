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
    const [isFetching, setIsFetching] = useState(false);
    const [movies, setMovies] = useState(INITIAL_MOVIES);

    useEffect(() => {
        if (searchString.length < MIN_CHAR_NUM_TO_AUTO_TRIGGER_FETCH) {
            setMovies(INITIAL_MOVIES);
        }
        if (searchString.length === 0) {
            // If user deletes string while the HTTP response is still pending --> cancel request (i.e. stop fetching) to prevent showing outdated suggestions:
            // TODO - actually prevent (and/or cancel) the request!
            setIsFetching(false);
        }
    }, [searchString]);

    const fetchMovies = async (searchString: string) => {
        setIsFetching(true);
        const movies = await getMoviesByQuery(searchString, 1);
        setMovies(movies);
        setIsFetching(false);
    };

    const shouldShowSuggestions = movies.length > 0;
    const shouldShowSpinner = isFetching && !shouldShowSuggestions;

    const { favorites, toggleIsFavorite } = useFavorites();

    return (
        <article className="index-page">
            <h2>Find the movies you love!</h2>
            <Searchbox
                searchString={searchString}
                setSearchString={setSearchString}
                fetchMovies={fetchMovies}
            />
            {shouldShowSpinner && <Spinner />}
            {shouldShowSuggestions && (
                <SearchSuggestions
                    movies={movies}
                    isLoading={isFetching}
                    favorites={favorites}
                    toggleIsFavorite={toggleIsFavorite}
                />
            )}
        </article>
    );
};

export default IndexPage;
