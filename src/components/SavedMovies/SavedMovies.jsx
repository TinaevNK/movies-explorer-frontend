import './Movies.css';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';

export default function Movies({ movies }) {
  return (
    <main className="saved-movies">
      <SearchForm />
      <MoviesCardList movies={movies} />
    </main>
  )
}
