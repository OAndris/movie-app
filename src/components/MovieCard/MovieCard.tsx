import React from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import './MovieCard.scss';
import { Movie } from '../../models/models';

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
    const iconSize = '1.25em';
    return (
        <li className="search-suggestion" onClick={toggleIsFavorite}>
            <div className="row">
                <span className="title">{title}</span>
                <span className="icon" onClick={toggleIsFavorite}>
                    {isFavorite ? (
                        <AiFillStar size={iconSize} color="#EAC54F" />
                    ) : (
                        <AiOutlineStar size={iconSize} />
                    )}
                </span>
                <span className="score">
                    {title === 'Game Of Thrones: Greatest Moments'
                        ? 10
                        : `${vote_average.toFixed(1)}`}
                </span>
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
