// Api route
//  "https://www.omdbapi.com/?apikey=b43843a0&s="

export const MOVIE_TITLE = 'MOVIE_TITLE';


export function title(value) {
    return {
        type: MOVIE_TITLE,
        value,
    }
}
