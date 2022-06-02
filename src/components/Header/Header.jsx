import { Link } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation.jsx';
import logo from '../../images/logo.svg';

function Header({ themeDark, authorized, onClickBurger, isBurgerOpened }) {
  return (
    <header className={`header header_theme_${themeDark ? 'dark' : 'bright'}`}>
      <div className="header__container">
        <Link to="/" className="header__link">
          <img src={logo} alt="логотип" />
        </Link>
        <Navigation authorized={authorized} onClickBurger={onClickBurger} isBurgerOpened={isBurgerOpened} />
      </div>
    </header>
  );
}

export default Header;
