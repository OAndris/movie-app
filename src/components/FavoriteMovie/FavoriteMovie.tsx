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
        release_date,
        vote_average,
        homepage,
        imdb_id,
        poster_path,
    } = movie;
    const year = release_date.slice(0, 4);
    const readableTime = convertMinutesToHoursAndMinutes(runtime);
    const imdbLink = `https://www.imdb.com/title/${imdb_id}`;
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
            <p>{genres.map((genre) => genre.name).join(', ')}</p>
            <p>{`${year} — ${readableTime} — ${vote_average.toFixed(1)}/10`}</p>
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
                src={`${imgBaseUrl}${poster_path}`}
                alt={`Poster of the movie "${title}"`}
                className="poster"
            />
            <p className="overview">{overview}</p>
        </div>
    );
};

export default FavoriteMovie;
