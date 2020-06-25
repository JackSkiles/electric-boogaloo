import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class SavedMovies extends Component {
    constructor(props) {
        super(props);
        const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || []
        this.state = {movieList: savedMovies,
        saveMovie: ''}
      }

    deleteMovie = (movieToRemove) => {
        const removed = this.state.movieList.filter((movie, index) => {
            return movie != movieToRemove;
        });
        this.setState({movieList: removed});
        localStorage.setItem('savedMovies', JSON.stringify(removed))
    }
    render() {
        return (
            <div>
                <Link to="/">Main Page</Link>
               { this.state.movieList.map(movie => {
                   return (
                    <div>
                        <h1>{ movie.Title }</h1>
                        <h2>{ movie.Year }</h2>
                        <img src={ movie.Poster }></img>
                        <button type="submit" name={movie.name} onClick={() => this.deleteMovie(movie)}>Remove</button>
                    </div>
                   )
               })} 
            </div>
        )
    }
}
