import './FavoriteMovie.scss';
import { FavoriteMovieInterface } from '../../models/models';
import FavoriteIcon from '../FavoriteIcon/FavoriteIcon';
import Image from '../Image/Image';
import { convertMinutesToHoursAndMinutes } from '../../utils/utils';

interface Props {
    movie: FavoriteMovieInterface;
    isFavorite: boolean;
    toggleIsFavorite: () => void;
}

const FavoriteMovie: React.FC<Props> = ({
    movie,
    isFavorite,
    toggleIsFavorite,
}) => {
    const {
        title,
        overview,
        runtime,
        genres,
        releaseDate,
        voteAverage,
        homepage,
        imdbId,
        posterPath,
    } = movie;

    const readableGenres = genres.map((genre) => genre.name).join(', ');
    const year = releaseDate.slice(0, 4);
    const readableTime = convertMinutesToHoursAndMinutes(runtime);
    const imdbLink = `https://www.imdb.com/title/${imdbId}`;
    const imgBaseUrl = 'https://image.tmdb.org/t/p/w342'; // NOTE: for configuration (e.g. image sizes), see: https://api.themoviedb.org/3/configuration?api_key=SECRET

    return (
        <div className="favorite-movie">
            <h3 className="title">{title}</h3>
            <FavoriteIcon
                isFavorite={isFavorite}
                toggleIsFavorite={toggleIsFavorite}
                className="icon"
                size="1.75em"
            />
            <p>{readableGenres}</p>
            <p>{`${year} — ${readableTime} — ${voteAverage.toFixed(1)}/10`}</p>
            <p>
                {homepage ? (
                    <>
                        <a href={homepage}>Website</a>
                        {' — '}
                        <a href={imdbLink}>IMDB</a>
                    </>
                ) : (
                    <a href={imdbLink}>IMDB</a>
                )}
            </p>
            <Image
                src={`${imgBaseUrl}${posterPath}`}
                alt={`Poster of the movie "${title}"`}
                className="poster"
            />
            <p className="overview">{overview}</p>
        </div>
    );
};

export default FavoriteMovie;
