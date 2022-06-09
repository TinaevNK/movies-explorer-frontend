import './Movies.css';
import SearchForm from '../SearchForm/SearchForm.jsx';
// import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';

export default function Movies() {
  return (
    <main className="movies">
      <SearchForm />
      {/* <MoviesCardList /> */}
    </main>
  );
}
