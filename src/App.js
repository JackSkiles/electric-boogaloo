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

  saveMovie = (e) => {
    console.log(e.target.name)
    let savedMovie = this.state.movies.find((movie) => {
      return movie.Title === e.target.name
    })
    const newSavedMovies = [...this.state.savedMovies, savedMovie];
    this.setState({ savedMovies: newSavedMovies })
    localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies))
    console.log(localStorage)
  }

  render() {
    

    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h2>Scene it 2: Electric Boogaloo</h2>
          </header>
            <Switch>
              <Route path="/" exact>
                <div>
                  <Link to="/movieList"><h2>Watch List</h2></Link>
                  <MovieForm handleOnSubmit={this.handleOnSubmit} handleChange={this.handleChange} />
                  <div className="container">
                    {this.state.movies.map(movie => {
                      return (
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
