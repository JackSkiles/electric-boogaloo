import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { title, MOVIE_TITLE } from './components/redux/actions/sceneItActions'
import MovieCard from './components/movieCard'
import MovieForm from './components/MovieForm'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom'
import SavedMovies from './components/SavedMovies';


class App extends React.Component {
  constructor(props) {
    super(props);
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
    this.state = {
      movies: [],
      savedMovies: savedMovies
    }
  }

  handleChange = (e) => {
    this.props.title(e.target.value);
  }

  // Takes form data entered and searches api for movies
  handleOnSubmit = (e) => {
    e.preventDefault();
    fetch(this.props.titleValue)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({
          movies: data.Search
        })
      })
  }

    // Takes movie you clicked to save, 
  saveMovie = (e) => {
    console.log(e.target.name)
    //compares it to other movies in array 
    let savedMovie = this.state.movies.find((movie) => {
      return movie.Title === e.target.name
    })
    // creates new array,
    // sets new array value to savedMovies plus new saved movie, 
    const newSavedMovies = [...this.state.savedMovies, savedMovie];
    //sets state to new saveMovies array.
    this.setState({ savedMovies: newSavedMovies })
    localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies))
    console.log(localStorage)
  }

  render() {
    

    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h2>Movie Catalogue</h2>
          </header>
            <Switch>
              <Route path="/" exact>
                <div className='mainDiv'>
                  <MovieForm handleOnSubmit={this.handleOnSubmit} handleChange={this.handleChange} />
                  <Link to="/movieList" className="watchLink"><h2 className="watchLinkHeader">Watch List</h2></Link>
                  <div className="container">
                    {this.state.movies.map(movie => {
                      return (
                        // Maps through movies returned and renders them passing through props.
                        <MovieCard SaveMovie={this.saveMovie} key={movie.id} movie={movie} />
                      )
                    })}
                  </div>
                </div>
              </Route>
            </Switch>
              <Switch>
                <Route path="/movieList" component={SavedMovies} /> 
              </Switch>
        </div>
      </Router>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    titleValue: state.url
  }
}

const mapDispatchToProps = {
  title,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
