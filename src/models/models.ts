export interface MovieInterface {
    id: number;
    title: string;
    overview: string;
    vote_average: number;
    release_date: string;
}

export interface MoviesByQueryInterface {
    movies: MovieInterface[];
    page: number;
    totalPages: number;
    totalResults: number;
}

export interface DetailedMovieInterface {
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

export interface RouteLinkInterface {
    path: string;
    title: string;
}

export interface RouteInterface extends RouteLinkInterface {
    element: JSX.Element;
}
