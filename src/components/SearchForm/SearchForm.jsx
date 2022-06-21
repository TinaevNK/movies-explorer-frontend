import './SearchForm.css';
import { useState, useEffect, useContext } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox.jsx';
import useFormWithValidation from '../../hooks/useFormWithValidation.jsx';
import CurrentUserContext from '../../contexts/CurrentUserContext.jsx';

export default function SearchForm({ handleSearchSubmit, handleShortFilms, shortMovies }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, isValid, setIsValid } = useFormWithValidation();
  const [errorQuery, setErrorQuery] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    isValid ? handleSearchSubmit(values.search) : setErrorQuery('Нужно ввести ключевое слово.');
  };

  useEffect(() => {
    setErrorQuery('')
  }, [isValid]);

  //состояние инпута из локального хранилища
  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email} - movieSearch`)) {
      const searchValue = localStorage.getItem(`${currentUser.email} - movieSearch`);
      values.search = searchValue;
      setIsValid(true);
    }
  }, [currentUser]);

  return (
    <section className="search">
      <form className="search__form" name="search" noValidate onSubmit={handleSubmit}>
        <input
          className="search__input"
          name="search"
          type="text"
          placeholder="Фильм"
          autoComplete='off'
          value={values.search || ''}
          onChange={handleChange}
          required
        />
        <span className="search__error">{errorQuery}</span>
        <button className="search__button" type="submit"></button>
      </form>
      <FilterCheckbox
        shortMovies={shortMovies}
        handleShortFilms={handleShortFilms} />
    </section>
  )
}
