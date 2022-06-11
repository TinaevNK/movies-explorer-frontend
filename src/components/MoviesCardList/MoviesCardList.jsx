import './MoviesCardList.css';
import { useState, useEffect, useCallback } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard.jsx';

export default function MoviesCardList({ movies }) {
  const [screenWidth, setScreenWidth] = useState(
    document.documentElement.clientWidth
  );

  const handleResizeWidth = useCallback(() => {
    setScreenWidth(document.documentElement.clientWidth);
  }, [setScreenWidth]);

  useEffect(() => {
    window.addEventListener('resize', handleResizeWidth);
  }, [handleResizeWidth]);

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
        {screenWidth >= 1280 &&
          movies
            .slice(0, 12)
            .map((card) => <MoviesCard key={card._id} card={card} />)}
        {screenWidth >= 768 &&
          screenWidth < 1280 &&
          movies
            .slice(0, 8)
            .map((card) => <MoviesCard key={card._id} card={card} />)}
        {screenWidth < 768 &&
          movies
            .slice(0, 5)
            .map((card) => <MoviesCard key={card._id} card={card} />)}
      </ul>
      <button className="movies-card-list__show-more">Ещё</button>
    </section>
  )
}
