import axios from 'axios';
import { useInfiniteQuery, useQueries } from '@tanstack/react-query';
import {
    MovieInterface,
    MoviesByQueryInterface,
    DetailedMovieInterface,
} from '../models/models';
import { mergeObjValuesToKeys } from '../utils/utils';

const api_key = process.env.REACT_APP_TMDB_API_KEY; // CAUTION: this is not safe, the API key should be stored in server-side code (in case of a more serious application)

const tmdbAPI = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: { api_key },
});

interface Endpoints {
    [key: string]: {
        queryId: string;
        urlPath: any; // should be more concrete ideally, but the following doesn't work: string | ((...args: any[]) => string)
    };
}

// API Docs: https://developers.themoviedb.org/3/search/search-movies
const endpoints: Endpoints = {
    moviesByQuery: {
        queryId: 'movies-by-query',
        urlPath: '/search/movie',
    },
    movieById: {
        queryId: 'movie-by-id',
        urlPath: (id: number) => `/movie/${id}`,
    },
};

export const useMoviesByQuery = (query: string) => {
    const { queryId, urlPath } = endpoints.moviesByQuery;
    const queryKey = [queryId, query];

    const fetchMoviesByQuery = async ({ pageParam = 1 }) => {
        // Example: https://api.themoviedb.org/3/search/movie?query=game%20of%20thrones&page=1&api_key=SECRET
        // Note: "pageParam" is injected automatically by the "getNextPageParam" setting of "useInfiniteQuery"
        const params = {
            query: query,
            page: pageParam,
        };
        const { data } = await tmdbAPI.get(urlPath, { params });
        const keys = [
            'id',
            'title',
            'overview',
            'vote_average',
            'release_date',
        ];
        const result: MoviesByQueryInterface = {
            movies: data.results.map((movie: MovieInterface) => {
                return mergeObjValuesToKeys(movie, keys);
            }),
            page: data.page,
            totalPages: data.total_pages,
            totalResults: data.total_results,
        };
        return result;
    };

    return useInfiniteQuery(queryKey, fetchMoviesByQuery, {
        enabled: false, // this hook is used by event handlers only (so prevent being called automatically on mount and on parameter change - instead, destructure and use "refetch")
        keepPreviousData: true, // keep old data visible while the new data is loading (swap data, avoid layout shift)
        getNextPageParam: (lastPage, pages) =>
            pages.length < lastPage.totalPages ? pages.length + 1 : undefined, // this injects "pageParam" to the fetcher function
    });
};

export const useMoviesByIds = (ids: number[]) => {
    const { queryId, urlPath } = endpoints.movieById;

    const fetchMovieById = async (urlPath: string) => {
        // Example: https://api.themoviedb.org/3/movie/181808?api_key=SECRET
        const { data } = await tmdbAPI.get(urlPath);
        const movie: DetailedMovieInterface = {
            id: data.id,
            title: data.title,
            overview: data.overview,
            runtime: data.runtime,
            genres: data.genres,
            releaseDate: data.release_date,
            voteAverage: data.vote_average,
            homepage: data.homepage,
            imdbId: data.imdb_id,
            posterPath: data.poster_path,
        };
        return movie;
    };

    return useQueries({
        queries: ids.map((id) => ({
            queryKey: [queryId, id],
            queryFn: () => fetchMovieById(urlPath(id)),
        })),
    });
};
