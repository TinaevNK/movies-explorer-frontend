import './App.css';
import moviesData from '../../utils/movies';
import { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main.jsx';
import Footer from '../Footer/Footer.jsx';
import Movies from '../Movies/Movies.jsx';
import SavedMovies from '../Movies/Movies.jsx';
import Register from '../Register/Register.jsx';
import Login from '../Login/Login.jsx';
import Profile from '../Profile/Profile.jsx';
import NotFound from '../NotFound/NotFound.jsx';
import Preloader from '../Preloader/Preloader.jsx';
import InfoTooltip from '../InfoTooltip/InfoTooltip.jsx';

export default function App() {
  const history = useHistory();
  const [isLoader, setIsLoader] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState({ isOpen: false, successful: true, text: ''});
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  // нажатие по бургерному меню
  function onClickBurger(isBurgerOpened) {
    setIsBurgerOpened(!isBurgerOpened);
  };

  //закрытие попапа с информацией
  function closeInfoTooltip() {
    setIsInfoTooltip({ ...isInfoTooltip, isOpen: false })
  }

  function goBack() {
    history.goBack();
  };

  useEffect(() => {
    setMovies(moviesData);
  }, []);

  useEffect(() => {
    setSavedMovies(moviesData.filter((movie) => {
      return movie.saved
    }))
  }, []);

  return (
    <div className="app">
      <Switch>
        <Route path="/" exact>
          <Header themeDark={false} authorized={false} onClickBurger={onClickBurger} isBurgerOpened={isBurgerOpened} />
          <Main />
          <Footer />
        </Route>
        <Route path="/movies">
          <Header themeDark={true} authorized={true} onClickBurger={onClickBurger} isBurgerOpened={isBurgerOpened} />
          <Movies movies={movies} />
          <Footer />
        </Route>
        <Route exact path="/saved-movies">
          <Header themeDark={true} authorized={true} onClickBurger={onClickBurger} isBurgerOpened={isBurgerOpened} />
          <SavedMovies movies={savedMovies}/>
          <Footer />
        </Route>
        <Route exact path="/signup">
          <Register />
        </Route>
        <Route exact path="/signin">
          <Login />
        </Route>
        <Route exact path="/profile">
          <Header themeDark={true} authorized={true} onClickBurger={onClickBurger} isBurgerOpened={isBurgerOpened} />
          <Profile />
        </Route>
        <Route path="*">
          <NotFound goBack={goBack} />
        </Route>
      </Switch>
      <Preloader isOpen={isLoader} />
      <InfoTooltip status={isInfoTooltip} onClose={closeInfoTooltip} />
    </div>
  )
}
