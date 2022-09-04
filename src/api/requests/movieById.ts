import { tmdbAPI, endpoints } from '../api';
import { mergeObjValuesToKeys } from '../../utils/utils';

export const getMovieById = async (id: number) => {
    // Example: https://api.themoviedb.org/3/movie/181808?api_key=SECRET
    let movie = {};
    try {
        const { data } = await tmdbAPI.get(endpoints.movieById.urlPath(id));
        movie = mergeObjValuesToKeys(data, [
            'id',
            'title',
            'overview',
            'runtime',
            'genres',
            'release_date',
            'vote_average',
            'homepage',
            'imdb_id',
            'poster_path',
        ]);
    } catch (error) {
        handleError(error);
    }
    return movie;
};

function handleError(error: Error) {
    // TOOD:
    // - log errors (e.g. send them to an analytics endpoint)
    // - handle different status codes and error types, improve error handling for better UX
    alert(
        error.message === 'Network Error'
            ? 'You appear to be offline!'
            : `Something went wrong! Please contact us and include this error message: "${error.message}"`
    );
}
