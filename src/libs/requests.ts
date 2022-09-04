import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Movie } from '../models/models';
import { mergeObjValuesToKeys } from '../utils/utils';

//==================================================================
const api_key = process.env.REACT_APP_TMDB_API_KEY; // CAUTION: this is not safe, the API key should be stored in server-side code (in case of a more serious application)

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: { api_key },
});

const ENDPOINTS = {
    MOVIES_BY_QUERY: {
        queryId: 'movies-by-query',
        urlPath: '/search/movie',
    },
    MOVIE_BY_ID: {
        queryId: 'movie-by-id',
        urlPath: (id: number) => `/movie/${id}`,
    },
};
//==================================================================

const fetchMoviesByQuery = async (urlPath: string, params: {}) => {
    // Example: https://api.themoviedb.org/3/search/movie?query=game%20of%20thrones&page=1&api_key=SECRET
    const { data } = await api.get(urlPath, { params });
    const keys = ['id', 'title', 'overview', 'vote_average', 'release_date'];
    const movies: Movie[] = data.results.map((movie: Movie) => {
        return mergeObjValuesToKeys(movie, keys);
    });
    const result: {
        movies: Movie[];
        totalPages: number;
        totalResults: number;
    } = {
        movies,
        totalPages: data.total_pages,
        totalResults: data.total_results,
    };
    return result;
};
export const useMoviesByQuery = (query: string, page: number) => {
    const { queryId, urlPath } = ENDPOINTS.MOVIES_BY_QUERY;
    const params = { query, page };
    return useQuery(
        [queryId, ...Object.values(params)],
        () => fetchMoviesByQuery(urlPath, params),
        {
            enabled: false, // this hook is used by event handlers only (so prevent being called automatically on mount and on parameter change - instead, destructure and use "refetch")
            keepPreviousData: true,
        }
    );
};

export const getMovieById = async (id: number) => {
    // Example: https://api.themoviedb.org/3/movie/181808?api_key=SECRET
    let movie = {};
    try {
        const { data } = await api.get(ENDPOINTS.MOVIE_BY_ID.urlPath(id));
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
