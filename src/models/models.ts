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
    release_date: string;
    vote_average: number;
    homepage: string;
    imdb_id: number;
    poster_path: string;
}

export interface Route {
    path: string;
    title: string;
}
