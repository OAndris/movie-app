export interface Movie {
    id: number;
    title: string;
    overview: string;
    vote_average: number;
    release_date: string;
}

export interface FavoriteMovieInterface {
    id: number;
    title: string;
    overview: string;
    runtime: number;
    genres: Array<{
        id: number;
        name: string;
    }>;
    releaseDate: string;
    voteAverage: number;
    homepage: string;
    imdbId: number;
    posterPath: string;
}

export interface Route {
    path: string;
    title: string;
}
