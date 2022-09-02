import React from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import './FavoriteIcon.scss';

interface Props {
    isFavorite: boolean;
    toggleIsFavorite: () => void;
    className?: string;
    size?: string;
}

const FavoriteIcon: React.FC<Props> = ({
    isFavorite,
    toggleIsFavorite,
    className,
    size = '1.25em',
}) => {
    return (
        <span
            className={'favorite-icon' + (className ? ` ${className}` : '')}
            onClick={toggleIsFavorite}
        >
            {isFavorite ? (
                <AiFillStar size={size} color="#EAC54F" />
            ) : (
                <AiOutlineStar size={size} />
            )}
        </span>
    );
};

export default FavoriteIcon;
