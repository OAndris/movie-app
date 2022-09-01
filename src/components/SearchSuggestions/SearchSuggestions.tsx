import React from 'react';
import './SearchSuggestions.scss';
import MovieCard from '../MovieCard/MovieCard';
import Spinner from '../Spinner/Spinner';
import { Movie } from '../../models/models';

interface Props {
    movies: Movie[];
    isLoading: boolean;
    favorites: number[];
    toggleIsFavorite: (id: number) => void;
}

const SearchSuggestions: React.FC<Props> = ({
    movies,
    isLoading,
    favorites,
    toggleIsFavorite,
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
        </div>
    );
};

export default SearchSuggestions;
