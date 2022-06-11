import './MoviesCard.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function MoviesCard({ card }) {
  const location = useLocation();

  const [isCardSaved, setIsCardSaved] = useState(false);

  const handleOnClick = () => {
    setIsCardSaved(!isCardSaved);
  };

  return (
    <li className="movies-card">
      <article className="movies-card__item">
        <img
          src={card.poster}
          alt={card.title}
          className="movies-card__poster"
        />
        <div className="movies-card__description">
          <h2 className="movies-card__title">{card.title}</h2>
          {location.pathname === '/movies' && (
            <button
              type="button"
              className={`movies-card__save movies-card__save${
                !isCardSaved ? '' : '_active'
              }`}
              onClick={handleOnClick}
            ></button>
          )}

          {/* {location.pathname === "/saved-movies" && (
            <button
              type="button"
              className="button movie-card__unsave"
            ></button>
          )} */}
        </div>
        <span className="movies-card__duration">{card.duration}</span>
      </article>
    </li>
  );
}
