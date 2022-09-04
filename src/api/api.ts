import axios from 'axios';

const api_key = process.env.REACT_APP_TMDB_API_KEY; // CAUTION: this is not safe, the API key should be stored in server-side code (in case of a more serious application)

export const tmdbAPI = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: { api_key },
});

// API Docs: https://developers.themoviedb.org/3/search/search-movies
export const endpoints = {
    moviesByQuery: {
        queryId: 'movies-by-query',
        urlPath: '/search/movie',
    },
    movieById: {
        queryId: 'movie-by-id',
        urlPath: (id: number) => `/movie/${id}`,
    },
};
