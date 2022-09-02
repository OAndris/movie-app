import { useEffect, useState } from 'react';
import './FavoritesPage.scss';
import { useFavorites } from '../../contexts/FavoritesContext';
import MovieCard from '../../components/MovieCard/MovieCard';
import routes from '../../pages/routes';
import RouteLink from '../../components/RouteLink/RouteLink';
import Spinner from '../../components/Spinner/Spinner';
import { Movie } from '../../models/models';
import { getMovieById } from '../../libs/requests';

const INITIAL_MOVIES: Movie[] = [];

const FavoritesPage = () => {
    const { favorites, toggleIsFavorite } = useFavorites();
    const [isFetching, setIsFetching] = useState(true);
    const [favoriteMovies, setFavoriteMovies] = useState(INITIAL_MOVIES);

    useEffect(() => {
        const fetchFavoriteMovies = async () => {
            setIsFetching(true);
            const promises = favorites.map((id: number) => getMovieById(id));
            const favMoviesArray = await Promise.all(promises);
            setFavoriteMovies(favMoviesArray);
            setIsFetching(false);
        };
        fetchFavoriteMovies();
    }, [favorites]);

    return (
        <article className="favorites-page">
            <h2>Your favorite movies</h2>
            {isFetching && <Spinner />}
            {favoriteMovies.length > 0 && (
                <ul className="list">
                    {favoriteMovies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            isFavorite={favorites.includes(movie.id)}
                            toggleIsFavorite={() => toggleIsFavorite(movie.id)}
                        />
                    ))}
                </ul>
            )}
            {!isFetching && favoriteMovies.length === 0 && (
                <p>It seems like you don't have any favorites yet!</p>
            )}
            <p>
                <RouteLink to={routes.IndexPage.path} className="link">
                    Search for movies
                </RouteLink>{' '}
                and discover something new!
            </p>
        </article>
    );
};

export default FavoritesPage;
