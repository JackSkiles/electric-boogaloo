import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { title, MOVIE_TITLE } from './components/redux/actions/sceneItActions'
import MovieCard from './components/movieCard'
import MovieForm from './components/MovieForm'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {movies: [],
    saveMovie: ''}
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

saveMovie = (e) =>{
  console.log(e.target.name)
  let savedMovie = this.state.movies.find((movie) => {
    return movie.Title === e.target.name})
  this.setState({saveMovie: savedMovie})
  // localStorage.setItem()
}

render() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Scene it 2: Electric Boogaloo</h2>
      </header>
      <div>
          <MovieForm handleOnSubmit={this.handleOnSubmit} handleChange={ this.handleChange }/>
        <div>
    { this.state.movies.map(movie => {
      return (
      <MovieCard  SaveMovie={ this.saveMovie } key={ movie.id } movie={ movie }/>
      )
    })}
        </div>
      </div>
    </div>
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
