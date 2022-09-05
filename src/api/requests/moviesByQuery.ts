import { useQuery } from '@tanstack/react-query';
import { tmdbAPI, endpoints } from '../api';
import { Movie } from '../../models/models';
import { mergeObjValuesToKeys } from '../../utils/utils';

const fetchMoviesByQuery = async (urlPath: string, params: {}) => {
    // Example: https://api.themoviedb.org/3/search/movie?query=game%20of%20thrones&page=1&api_key=SECRET
    const { data } = await tmdbAPI.get(urlPath, { params });
    const keys = ['id', 'title', 'overview', 'vote_average', 'release_date'];
    const result: {
        movies: Movie[];
        totalPages: number;
        totalResults: number;
    } = {
        movies: data.results.map((movie: Movie) => {
            return mergeObjValuesToKeys(movie, keys);
        }),
        totalPages: data.total_pages,
        totalResults: data.total_results,
    };
    return result;
};

export const useMoviesByQuery = (query: string, page: number) => {
    const { queryId, urlPath } = endpoints.moviesByQuery;
    const params = { query, page };
    return useQuery(
        [queryId, ...Object.values(params)],
        () => fetchMoviesByQuery(urlPath, params),
        {
            enabled: false, // this hook is used by event handlers only (so prevent being called automatically on mount and on parameter change - instead, destructure and use "refetch")
            keepPreviousData: true, // keep old data visible while the new data is loading (swap data, avoid layout shift)
        }
    );
};
