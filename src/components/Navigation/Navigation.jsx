import './Navigation.css';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navigation({ authorized, isBurgerOpened, onClickBurger }) {

  // const handleOnClickBurger = () => {
  //   onClickBurger(isBurgerOpened);
  // }

  const activeLink = `navigation__link_active_${isBurgerOpened ? 'mobile' : 'desktop'}`

  return (
    <>
      {!authorized ? (
        <nav className="navigation">
          <ul className="navigation__list">
            <li className="navigation__item">
              <Link to="/signup" className="navigation__link navigation__link_landing">
                Регистрация
              </Link>
            </li>
            <li className="navigation__item">
              <Link to="/signin" className="navigation__link navigation__link_landing navigation__link_signin">
                Войти
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className={`navigation navigation_state_${isBurgerOpened ? 'opened' : 'closed'}`}>
          {/* <button className="navigation__menu-toggle button" type="button" onClick={handleOnClickBurger}>
          </button> */}
          <ul className={`navigation__list navigation__list_logged navigation__list_state_${isBurgerOpened ? 'opened' : 'closed'}`}>
            <li className="navigation__item">
              <NavLink exact to="/" className="navigation__link" activeClassName={activeLink}>
                Главная
              </NavLink>
            </li>
            <li className="navigation__item">
              <NavLink to="/movies" className="navigation__link" activeClassName={activeLink}>
                Фильмы
              </NavLink>
            </li>
            <li className="navigation__item">
              <NavLink to="/saved-movies" className="navigation__link" activeClassName={activeLink}>
                Сохранённые фильмы
              </NavLink>
            </li>
            <li className="navigation__item">
              <NavLink to="/profile" className="navigation__link navigation__link_type_account">
                Аккаунт
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}

export default Navigation;
