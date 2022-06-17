import './App.css';
import moviesData from '../../utils/movies.js';
import { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from '../Header/Header.jsx';
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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx';

export default function App() {
  const history = useHistory();
  const [isLoader, setIsLoader] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState({ isOpen: false, successful: true, text: ''});
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  const headerEndpoints = ['/movies', '/saved-movies', '/profile', '/'];
  const footerEndpoints = ['/movies', '/saved-movies', '/'];

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
      <Route exact path={headerEndpoints}>
        <Header loggedIn={loggedIn} onClickBurger={onClickBurger} isBurgerOpened={isBurgerOpened} />
      </Route>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/signup">
          <Register />
        </Route>
        <Route exact path="/signin">
          <Login />
        </Route>
        <ProtectedRoute path="/movies"
          component={Movies}
          movies={movies} />
        <ProtectedRoute path=""
          component={SavedMovies}
          movies={savedMovies} />
        <ProtectedRoute path="/profile"
          component={Profile} />
        <ProtectedRoute path="*"
          component={NotFound}
          goBack={goBack} />
      </Switch>
      <Route exact path={footerEndpoints}>
        <Footer />
      </Route>
      <Preloader isOpen={isLoader} />
      <InfoTooltip status={isInfoTooltip} onClose={closeInfoTooltip} />
    </div>
  )
}
