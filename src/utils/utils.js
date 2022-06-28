import { SHORTMOVIES_DURATION } from './constants.js';

// проверка изображений полученных от сервера
function transformMovies(movies) {
  movies.forEach(movie => {
    if (!movie.image) {
      movie.image = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1940&q=80';
      movie.thumbnail = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1940&q=80';
    } else {
      movie.thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`
      movie.image = `https://api.nomoreparties.co${movie.image.url}`
    }
    if(!movie.country) {
      movie.country = 'Russia';
    }
    if(!movie.nameEN) {
      movie.nameEN = movie.nameRU;
    }
  });
  return movies
}

// фильтрация по длительности
function filterShortMovies(movies) {
  return movies.filter(movie => movie.duration < SHORTMOVIES_DURATION);
}

// фильтрация по запросу
function filterMovies(movies, userQuery, shortMoviesCheckbox) {
  const moviesByUserQuery = movies.filter((movie) => {
    const movieRu = String(movie.nameRU).toLowerCase().trim();
    const movieEn = String(movie.nameEN).toLowerCase().trim();
    const userMovie = userQuery.toLowerCase().trim();
    return movieRu.indexOf(userMovie) !== -1 || movieEn.indexOf(userMovie) !== -1;
  });

  if (shortMoviesCheckbox) {
    return filterShortMovies(moviesByUserQuery);
  } else {
    return moviesByUserQuery;
  }
}

// преобразование длительности
function transformDuration(duration) {
  const hours = Math.trunc(duration / 60);
  const minutes = duration % 60;
  if(hours === 0) {
    return `${minutes}м`;
  } else {
    return `${hours}ч ${minutes}м`;
  }
}

// cравнение сохраненных фильмов
function getSavedMovieCard(arr, movie) {
  return arr.find((item) => {
    return item.movieId === (movie.id || movie.movieId);
  });
}

export {
  transformMovies,
  filterMovies,
  filterShortMovies,
  transformDuration,
  getSavedMovieCard,
};
