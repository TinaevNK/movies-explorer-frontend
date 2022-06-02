import './App.css';
import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main.jsx'

export default function App() {

  const [isBurgerOpened, setIsBurgerOpened] = useState(false);


  const onClickBurger = (isBurgerOpened) => {
    setIsBurgerOpened(!isBurgerOpened);
  }

  return (
    <div className="app">
      <Switch>
        <Route path="/" exact>
          <Header themeDark={false} authorized={true} onClickBurger={onClickBurger} isBurgerOpened={isBurgerOpened} />
          <Main authorized={false} />
        </Route>
        <Route path="/movies">
          <Header themeDark={true} authorized={true} onClickBurger={onClickBurger} isBurgerOpened={isBurgerOpened} />
          {/* <Movies />
          <Footer /> */}
        </Route>
        {/*<Route exact path="/saved-movies">
          <Header isLoggedIn={true} />
          <SavedMovies />
          <Footer />
        </Route>
        <Route exact path="/signup">
          <Register />
        </Route>
        <Route exact path="/signin">
          <Login />
        </Route>
        <Route exact path="/profile">
          <Header isLoggedIn={true} />
          <Profile />
        </Route>
        <Route path="*">
          <NotFound />
        </Route> */}
      </Switch>
    </div>
  );
}
