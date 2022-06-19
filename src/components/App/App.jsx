import './App.css';
import moviesData from '../../utils/movies.js';
import mainApi from '../../utils/MainApi.js';
import CurrentUserContext from '../../contexts/CurrentUserContext.jsx';
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
  const [currentUser, setCurrentUser] = useState({});
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

  // кнопка назад на 404 странице
  function goBack() {
    history.goBack();
  };

  function handleRegister({ name, email, password }) {
    setIsLoader(true);
    mainApi.createUser(name, email, password)
      .then(data => {
        if (data._id) {
          handleLogin({ email, password });
        }
      })
      .catch(err => setIsInfoTooltip({
        isOpen: true,
        successful: false,
        text: err
      }))
      .finally(() => setIsLoader(false))
  }

  function handleLogin({ email, password }) {
    setIsLoader(true);
    mainApi.login(email, password)
      .then(jwt => {
        if (jwt.token) {
          setLoggedIn(true);
          localStorage.setItem('jwt', jwt.token);
          history.push('/movies');
          setIsInfoTooltip({
            isOpen: true,
            successful: true,
            text: `Добро пожаловать!`
          });
        }
      })
      .catch(err => setIsInfoTooltip({
        isOpen: true,
        successful: false,
        text: err
      }))
      .finally(() => setIsLoader(false))
  }

   // выход из аккаунта
    function handleSignOut() {
    setCurrentUser({});
    setLoggedIn(false);
    localStorage.clear();
    history.push('/');
  }

  function handleProfile({ name, email }) {
    setIsLoader(true);
    mainApi.updateUser(name, email)
      .then(newUserData => {
        setCurrentUser(newUserData);
        setIsInfoTooltip({
          isOpen: true,
          successful: true,
          text: `Ваши данные обновлены!`
        });
      })
      .catch(err => setIsInfoTooltip({
        isOpen: true,
        successful: false,
        text: err
      }))
      .finally(() => setIsLoader(false))
  }

 // проверка токена и авторизация пользователя
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi.getUserInfo()
        .then(data => {
          if (data) {
            setLoggedIn(true);
          }
        })
        .catch((err) => setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: err
        }))
    }
  }, [history]);

  // Получение информации о пользователе
  useEffect(() => {
    if (loggedIn) {
      setIsLoader(true);
      mainApi.getUserInfo()
        .then(res => setCurrentUser(res))
        .catch(err => console.log(err))
        .finally(() => setIsLoader(false))
    }
  }, [loggedIn]);

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
      <CurrentUserContext.Provider value={currentUser}>
        <Route exact path={headerEndpoints}>
          <Header loggedIn={loggedIn} onClickBurger={onClickBurger} isBurgerOpened={isBurgerOpened} />
        </Route>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/signup">
            <Register handleRegister={handleRegister}/>
          </Route>
          <Route exact path="/signin">
            <Login handleLogin={handleLogin} />
          </Route>
          <ProtectedRoute path="/movies"
            component={Movies}
            movies={movies}
            loggedIn={loggedIn} />
          <ProtectedRoute path="/saved-movies"
            component={SavedMovies}
            movies={savedMovies}
            loggedIn={loggedIn} />
          <ProtectedRoute path="/profile"
            component={Profile}
            loggedIn={loggedIn}
            handleProfile={handleProfile}
            handleSignOut={handleSignOut} />
          <Route path="*">
            <NotFound goBack={goBack} />
          </Route>
        </Switch>
        <Route exact path={footerEndpoints}>
          <Footer />
        </Route>
        <Preloader isOpen={isLoader} />
        <InfoTooltip status={isInfoTooltip} onClose={closeInfoTooltip} />
      </CurrentUserContext.Provider>
    </div>
  )
}
