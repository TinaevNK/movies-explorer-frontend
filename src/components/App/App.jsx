import './App.css';
import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';

export default function App() {

  const [isBurgerOpened, setIsBurgerOpened] = useState(false);


  const onClickBurger = (isBurgerOpened) => {
    setIsBurgerOpened(!isBurgerOpened);
  }

  return (
    <div className="app">
      <Switch>
        <Route path="/" exact>
          <Header themeDark={false} authorized={false} onClickBurger={onClickBurger} isBurgerOpened={isBurgerOpened} />
          {/* <Main authorized={false} /> */}
        </Route>
        {/* <Route path="/movies">
          <Header isLoggedIn={true} />
          <Movies />
          <Footer />
        </Route>
        <Route exact path="/saved-movies">
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
