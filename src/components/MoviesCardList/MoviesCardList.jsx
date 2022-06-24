import './MoviesCardList.css';
import { useState, useEffect } from 'react';
import useScreenWidth from '../../hooks/useScreenWidth.jsx';
import { DEVICE_PARAMS } from '../../utils/constants.js';
import { getSavedMovieCard } from '../../utils/utils.js';
import MoviesCard from '../MoviesCard/MoviesCard.jsx';

export default function MoviesCardList({ moviesList, savedMoviesList, onLikeClick, onDeleteClick }) {
  const screenWidth = useScreenWidth();
  const { desktop, tablet, mobile } = DEVICE_PARAMS;
  const [isMount, setIsMount] = useState(true);
  const [showMovieList, setShowMovieList] = useState([]);
  const [cardsShowDetails, setCardsShowDetails] = useState({ total: 12, more: 3 });

  // количество отображаемых карточек при разной ширине экрана
  useEffect(() => {
    if (screenWidth > desktop.width) {
      setCardsShowDetails(desktop.cards);
    } else if (screenWidth <= desktop.width && screenWidth > mobile.width) {
      setCardsShowDetails(tablet.cards);
    } else {
      setCardsShowDetails(mobile.cards);
    }
    return () => setIsMount(false);
  }, [screenWidth, isMount, desktop, tablet, mobile]);

  // изменяем отображаемый массив фильмов в зависимости от ширины экрана
  useEffect(() => {
    if (moviesList.length) {
      const res = moviesList.filter((item, i) => i < cardsShowDetails.total);
      setShowMovieList(res);
    }
  }, [moviesList, cardsShowDetails.total]);

  // добавление карточек при клике по кнопке "Еще"
  function handleClickMoreMovies() {
    const start = showMovieList.length;
    const end = start + cardsShowDetails.more;
    const additional = moviesList.length - start;

    if (additional > 0) {
      const newCards = moviesList.slice(start, end);
      setShowMovieList([...showMovieList, ...newCards]);
    }
  }

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
        {showMovieList.map(movie => (
          <MoviesCard
            key={movie.id || movie._id}
            saved={getSavedMovieCard(savedMoviesList, movie)}
            onLikeClick={onLikeClick}
            onDeleteClick={onDeleteClick}
            movie={movie}
          />
        ))}
      </ul>
      {showMovieList.length >= 5 && showMovieList.length < moviesList.length && (
        <button
          className="movies-card-list__show-more"
          onClick={handleClickMoreMovies}
        >
          Ещё
        </button>
      )}
    </section>
  );
}
