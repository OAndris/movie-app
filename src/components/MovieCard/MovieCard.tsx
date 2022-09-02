import React from 'react';
import './MovieCard.scss';
import { Movie } from '../../models/models';
import FavoriteIcon from '../FavoriteIcon/FavoriteIcon';

interface Props {
    movie: Movie;
    isFavorite: boolean;
    toggleIsFavorite: () => void;
}

const MovieCard: React.FC<Props> = ({
    movie,
    isFavorite,
    toggleIsFavorite,
}) => {
    const { title, vote_average, overview, release_date } = movie;
    return (
        <li className="search-suggestion" onClick={toggleIsFavorite}>
            <div className="row">
                <span className="title">{title}</span>
                <FavoriteIcon
                    isFavorite={isFavorite}
                    toggleIsFavorite={toggleIsFavorite}
                    className="icon"
                />
                <span className="score">{`${vote_average.toFixed(1)}`}</span>
                <div className="hover-container">
                    <div className="hover-content">
                        <h3>{title}</h3>
                        <p>{release_date}</p>
                        <p>{overview}</p>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default MovieCard;
