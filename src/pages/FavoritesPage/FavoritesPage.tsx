import './FavoritesPage.scss';
import { useFavorites } from '../../contexts/FavoritesContext';
import routes from '../../pages/routes';
import RouteLink from '../../components/RouteLink/RouteLink';
import Spinner from '../../components/Spinner/Spinner';
import { useMoviesByIds } from '../../api/requests/moviesByIds';
import FavoriteMovie from '../../components/FavoriteMovie/FavoriteMovie';

const FavoritesPage = () => {
    const { favorites, toggleIsFavorite } = useFavorites();

    const queryResults = useMoviesByIds(favorites);
    const isAnyLoading = queryResults.some((result) => result.isLoading);
    const favoriteMovies = queryResults.map((result) => result.data);

    const favoritesReadyForDisplay = favoriteMovies.map(
        (movie) =>
            movie && (
                <li key={movie.id} className="list-item">
                    <FavoriteMovie
                        movie={movie}
                        isFavorite={favorites.includes(movie.id)}
                        toggleIsFavorite={() => toggleIsFavorite(movie.id)}
                    />
                </li>
            )
    );

    return (
        <article className="favorites-page">
            <h2>Your favorite movies</h2>
            {isAnyLoading && <Spinner />}
            {favoriteMovies.length > 0 && (
                <ul className="list">{favoritesReadyForDisplay}</ul>
            )}
            {!isAnyLoading && favoriteMovies.length === 0 && (
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
