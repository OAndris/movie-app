import axios from 'axios';
import { Movie } from '../models/models';
import { mergeObjValuesToKeys } from '../utils/utils';

//==================================================================
const api_key = process.env.REACT_APP_TMDB_API_KEY; // CAUTION: this is not safe, the API key should be stored in server-side code (in case of a more serious application)
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: { api_key },
});

const ENDPOINTS = {
    MOVIES_BY_QUERY: '/search/movie',
    MOVIE_BY_ID: (id: number) => `/movie/${id}`,
};
//==================================================================

export const getMoviesByQuery = async (query: string, page: number) => {
    // Example: https://api.themoviedb.org/3/search/movie?query=game%20of%20thrones&page=1&api_key=SECRET
    let movies: Movie[] = []; // initialize output as a kind of "null object" to let other parts of the app reference it even if the request fails
    const params = { query, page };
    try {
        const { data } = await api.get(ENDPOINTS.MOVIES_BY_QUERY, { params });
        movies = data.results.map((movie) =>
            mergeObjValuesToKeys(movie, [
                'id',
                'title',
                'overview',
                'vote_average',
                'release_date',
            ])
        );
    } catch (error) {
        handleError(error);
    }
    return movies;
};

export const getMovieById = async (id: number) => {
    // Example: https://api.themoviedb.org/3/movie/181808?api_key=SECRET
    let movie = {};
    try {
        const { data } = await api.get(ENDPOINTS.MOVIE_BY_ID(id));
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

//==================================================================
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
//==================================================================
