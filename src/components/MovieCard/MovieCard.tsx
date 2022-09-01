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
    const { title } = movie;
    const iconSize = '1.25em';
    return (
        <li className="search-suggestion">
            <span className="title">{title}</span>
            <span className="icon" onClick={toggleIsFavorite}>
                {isFavorite ? (
                    <AiFillStar size={iconSize} color="#EAC54F" />
                ) : (
                    <AiOutlineStar size={iconSize} />
                )}
            </span>
        </li>
    );
};

export default MovieCard;
