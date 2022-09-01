import { Link } from 'react-router-dom';
import './FavoritesPage.scss';
import { useFavorites } from '../../contexts/FavoritesContext';
import MovieCard from '../../components/MovieCard/MovieCard';
import routes from '../../pages/routes';

//====================================
const movies = [
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
]; // TODO
//====================================

const FavoritesPage = () => {
    const { favorites, toggleIsFavorite } = useFavorites();

    const favoriteMovies = movies.filter((movie) =>
        favorites.includes(movie.id)
    );

    return (
        <article className="favorites-page">
            <h2>Your favorite movies</h2>
            {favoriteMovies.length ? (
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
            ) : (
                <p>It seems like you don't have any favorites yet!</p>
            )}
            <p>
                <Link to={routes.IndexPage.path}>Search for movies</Link> and
                discover something new!
            </p>
        </article>
    );
};

export default FavoritesPage;
