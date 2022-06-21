import "./Movies.css";
import { useState, useContext, useEffect } from "react";
import {
  transformMovies,
  filterMovies,
  filterShortMovies,
} from "../../utils/utils.js";
import moviesApi from "../../utils/MoviesApi.js";
import SearchForm from "../SearchForm/SearchForm.jsx";
import MoviesCardList from "../MoviesCardList/MoviesCardList.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

export default function Movies({
  setIsLoader,
  setIsInfoTooltip,
  savedMoviesList,
  onLikeClick,
  onDeleteClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  const [shortMovies, setShortMovies] = useState(false);
  const [initialMovies, setInitialMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [NotFound, setNotFound] = useState(false);

  // поиск по массиву у установка в состояния
  function handleSetFilteredMovies(movies, userQuery, shortMoviesCheckbox) {
    const moviesList = filterMovies(movies, userQuery, shortMoviesCheckbox);
    if (moviesList.length === 0) {
      setIsInfoTooltip({
        isOpen: true,
        successful: false,
        text: "Ничего не найдено.",
      });
      setNotFound(true);
    } else {
      setNotFound(false);
    }
    setInitialMovies(moviesList);
    setFilteredMovies(
      shortMoviesCheckbox ? filterShortMovies(moviesList) : moviesList
    );
    localStorage.setItem(
      `${currentUser.email} - movies`,
      JSON.stringify(moviesList)
    );
  }

  // поиск по запросу
  function handleSearchSubmit(inputValue) {
    setIsLoader(true);
    localStorage.setItem(`${currentUser.email} - movieSearch`, inputValue);
    localStorage.setItem(`${currentUser.email} - shortMovies`, shortMovies);

    moviesApi
      .getMovies()
      .then((movies) => {
        handleSetFilteredMovies(
          transformMovies(movies),
          inputValue,
          shortMovies
        );
      })
      .catch(() =>
        setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.",
        })
      )
      .finally(() => setIsLoader(false));
  }

  // состояние чекбокса
  function handleShortFilms() {
    setShortMovies(!shortMovies);
    if (!shortMovies) {
      setFilteredMovies(filterShortMovies(initialMovies));
    } else {
      setFilteredMovies(initialMovies);
    }
    localStorage.setItem(`${currentUser.email} - shortMovies`, !shortMovies);
  }

  // проверка чекбокса в локальном хранилище
  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email} - shortMovies`) === "true") {
      setShortMovies(true);
    } else {
      setShortMovies(false);
    }
  }, [currentUser]);

  // рендер фильмов из локального хранилища
  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email} - movies`)) {
      const movies = JSON.parse(localStorage.getItem(`${currentUser.email} - movies`));
      setInitialMovies(movies);
      if (localStorage.getItem(`${currentUser.email} - shortMovies`) === "true") {
        setFilteredMovies(filterShortMovies(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, [currentUser]);

  return (
    <main className="movies">
      <SearchForm
        handleSearchSubmit={handleSearchSubmit}
        handleShortFilms={handleShortFilms}
        shortMovies={shortMovies}
      />
      {!NotFound &&
        <MoviesCardList
          moviesList={filteredMovies}
          savedMoviesList={savedMoviesList}
          onLikeClick={onLikeClick}
          onDeleteClick={onDeleteClick}
        />
      }
    </main>
  );
}
