import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import { transformDuration } from '../../utils/utils.js';

export default function MoviesCard({ movie, saved, onLikeClick, onDeleteClick }) {
  const location = useLocation();

  // сохранение фильма
  function handleLikeClick() {
    onLikeClick(movie)
  }

  // удаление фильма
  function handleDeleteClick() {
    onDeleteClick(movie)
  }

  return (
    <li className="movies-card">
      <article className="movies-card__item">
        <a
          className="movies__card-link"
          target="_blank"
          rel="noreferrer"
          href={movie.trailerLink}
        >
          <img
            src={movie.image}
            alt={movie.nameRU}
            title={movie.description}
            className="movies-card__poster"
          />
        </a>
        <div className="movies-card__description">
          <h2 className="movies-card__title">{movie.nameRU}</h2>
          {location.pathname === '/movies' && (
            <button
              type="button"
              className={`movies-card__button movies-card__button_type_${
                saved ? 'saved' : 'save'
              }`}
              onClick={handleLikeClick}
            ></button>
          )}
          {location.pathname === "/saved-movies" && (
            <button
              type="button"
              className="movies-card__button movies-card__button_type_unsave"
              onClick={handleDeleteClick}
            ></button>
          )}
        </div>
        <span className="movies-card__duration">{transformDuration(movie.duration)}</span>
      </article>
    </li>
  )
}
