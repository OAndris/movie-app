import { useEffect, useState } from 'react';
import './IndexPage.scss';
import { MIN_CHAR_NUM_TO_AUTO_TRIGGER_FETCH } from '../../constants/constants';
import { Movie } from '../../models/models';
import { useFavorites } from '../../contexts/FavoritesContext';
import Searchbox from '../../components/Searchbox/Searchbox';
import Spinner from '../../components/Spinner/Spinner';
import SearchSuggestions from '../../components/SearchSuggestions/SearchSuggestions';

const INITIAL_MOVIES: Movie[] = [];

const IndexPage = () => {
    const [searchString, setSearchString] = useState(''); // implicit type definition based on the init value's type
    const [isFetching, setIsFetching] = useState(false);
    const [movies, setMovies] = useState(INITIAL_MOVIES);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (searchString.length < MIN_CHAR_NUM_TO_AUTO_TRIGGER_FETCH) {
            setMovies(INITIAL_MOVIES);
        }
        if (searchString.length === 0) {
            // Prevent suggestions being stuck if user deletes while the HTTP response is still pending:
            clearTimeout(timer);
            setIsFetching(false);
        }
    }, [searchString, timer]);

    const fetchMovies = (): void => {
        setIsFetching(true);
        setTimer(
            setTimeout(() => {
                setMovies([
                    { id: 1, title: 'Abc' },
                    { id: 2, title: 'Def' },
                    { id: 3, title: 'Ghi' },
                    { id: 4, title: 'Jkl' },
                    { id: 5, title: 'Mno' },
                    { id: 6, title: 'Mno' },
                    { id: 7, title: 'Mno' },
                    { id: 8, title: 'Mno' },
                    { id: 9, title: 'Mno' },
                    { id: 10, title: 'Mno' },
                    { id: 11, title: 'Mno' },
                ]); // TODO
                setIsFetching(false);
            }, 1500)
        );
    };

    const { favorites, toggleIsFavorite } = useFavorites();

    const shouldShowSuggestions = movies.length > 0;
    const shouldShowSpinner = isFetching && !shouldShowSuggestions;

    return (
        <article className="index-page">
            <h2>Find your new favorites!</h2>
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
