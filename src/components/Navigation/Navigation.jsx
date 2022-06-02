import './Navigation.css';
import React from 'react';
import { Link } from 'react-router-dom';

function Navigation({ authorized, isBurgerOpened, onClickBurger }) {

  const handleOnClickBurger = () => {
    onClickBurger(isBurgerOpened);
  }

  return (
    <>
      {!authorized ? (
        <nav className="navigation">
          <ul className="navigation__list">
            <li className="navigation__item">
              <Link to="signup" className="navigation__link">
                Регистрация
              </Link>
            </li>
            <li className="navigation__item">
              <Link to="signin" className="navigation__link navigation__link_type_signin">
                Войти
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className={`navigation navigation_state_${isBurgerOpened ? 'opened' : 'closed'}`}>
          <button className="navigation__menu-toggle button" type="button" onClick={handleOnClickBurger}>
            <span className="visually-hidden">Открыть меню</span>
          </button>
          <ul className={`navigation__list navigation__list_state_${isBurgerOpened ? 'opened' : 'closed'}`}>
              <li className="navigation__item">
                <Link to="/" className="link navigation__link navigation__link_type_menu" tabIndex={`${isBurgerOpened ? '' : '-1'}`}>
                  Главная
                </Link>
              </li>
              <li className="navigation__item">
                <Link to="movies" className="link navigation__link navigation__link_type_menu navigation__link_state_active" tabIndex={`${isBurgerOpened ? '' : '-1'}`}>
                  Фильмы
                </Link>
              </li>
              <li className="navigation__item">
                <Link to="saved-movies" className="link navigation__link navigation__link_type_menu" tabIndex={`${isBurgerOpened ? '' : '-1'}`}>
                  Сохранённые фильмы
                </Link>
              </li>
              <li className="navigation__item">
                <Link to="profile" className="link navigation__link navigation__link_type_account" tabIndex={`${isBurgerOpened ? '' : '-1'}`}>
                  Аккаунт
                </Link>
              </li>
            </ul>
        </nav>
      )}
    </>
  );
}

export default Navigation;
