import { useInfiniteQuery } from '@tanstack/react-query';
import { tmdbAPI, endpoints } from '../api';
import { MovieInterface, MoviesByQueryInterface } from '../../models/models';
import { mergeObjValuesToKeys } from '../../utils/utils';

const { queryId, urlPath } = endpoints.moviesByQuery;

const fetchMoviesByQuery = async ({ queryKey, pageParam = 1 }) => {
    // Example: https://api.themoviedb.org/3/search/movie?query=game%20of%20thrones&page=1&api_key=SECRET
    const params = {
        query: queryKey[1], // CAUTION - keep in sync with the array in useInfiniteQuery below
        page: pageParam,
    };
    const { data } = await tmdbAPI.get(urlPath, { params });
    const keys = ['id', 'title', 'overview', 'vote_average', 'release_date'];
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

export const useMoviesByQuery = (query: string) => {
    return useInfiniteQuery(
        [queryId, query], // CAUTION: keep in sync with the HTTP request params above
        fetchMoviesByQuery,
        {
            enabled: false, // this hook is used by event handlers only (so prevent being called automatically on mount and on parameter change - instead, destructure and use "refetch")
            keepPreviousData: true, // keep old data visible while the new data is loading (swap data, avoid layout shift)
            getNextPageParam: (lastPage, pages) =>
                pages.length < lastPage.totalPages
                    ? pages.length + 1
                    : undefined,
        }
    );
};
