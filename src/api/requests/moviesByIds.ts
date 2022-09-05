import { useQueries } from '@tanstack/react-query';
import { tmdbAPI, endpoints } from '../api';
import { DetailedMovieInterface } from '../../models/models';

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

export const useMoviesByIds = (ids: number[]) => {
    const { queryId, urlPath } = endpoints.movieById;
    return useQueries({
        queries: ids.map((id) => ({
            queryKey: [queryId, id],
            queryFn: () => fetchMovieById(urlPath(id)),
        })),
    });
};
