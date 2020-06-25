import React from 'react'
import SavedMovies from './SavedMovies';

export default function MovieCard(props) {
    const { movie, SaveMovie} = props;
    return (
            <div>
                <h1>{ movie.Title }</h1>
                <h2>{ movie.Year }</h2>
                <img src={ movie.Poster }></img>
                <button type="submit" name={movie.Title} onClick={SaveMovie}>Save</button>
            </div>
    )
}
