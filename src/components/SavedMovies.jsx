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
        const container = {
            display: 'flex',
            justifyContent: 'center'
        }
    
        const card = {
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 'px',
            width: '20%',
            backgroundColor: 'rgb(201, 214, 208)',
            margin: '10px',
            padding: '10px'
        }
        return (
            <div>
                <Link to="/"><h2>Main Page</h2></Link>
               { this.state.movieList.map(movie => {
                   return (
                    <div className="movieCard" style={container}>
                        <div style={card}>
                        <h1>{ movie.Title }</h1>
                        <h2>{ movie.Year }</h2>
                        <img src={ movie.Poster }></img>
                        <button type="submit" name={movie.name} onClick={() => this.deleteMovie(movie)}>Remove</button>
                        </div>
                    </div>
                   )
               })} 
            </div>
        )
    }
}
