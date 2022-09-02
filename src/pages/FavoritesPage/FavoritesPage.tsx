import { useEffect, useState } from 'react';
import './FavoritesPage.scss';
import { useFavorites } from '../../contexts/FavoritesContext';
import routes from '../../pages/routes';
import RouteLink from '../../components/RouteLink/RouteLink';
import Spinner from '../../components/Spinner/Spinner';
import { FavoriteMovieInterface } from '../../models/models';
import { getMovieById } from '../../libs/requests';
import FavoriteMovie from '../../components/FavoriteMovie/FavoriteMovie';

const INITIAL_MOVIES: FavoriteMovieInterface[] = [];

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
                        <li key={movie.id} className="list-item">
                            <FavoriteMovie
                                movie={movie}
                                isFavorite={favorites.includes(movie.id)}
                                toggleIsFavorite={() =>
                                    toggleIsFavorite(movie.id)
                                }
                            />
                        </li>
                    ))}
                </ul>
            )}
            {!isFetching && favoriteMovies.length === 0 && (
                <p>It seems like you don't have any favorites yet!</p>
            )}
            <p className="cta">
                <RouteLink to={routes.IndexPage.path} className="link">
                    Discover the best movies
                </RouteLink>{' '}
                and add them to your favorites!
            </p>
        </article>
    );
};

export default FavoritesPage;
