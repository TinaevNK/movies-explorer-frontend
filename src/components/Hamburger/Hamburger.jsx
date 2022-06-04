import './Hamburger.css';
import { useMediaQuery } from 'react-responsive';
import { useEffect } from 'react';

export default function Hamburger({isBurgerOpened, onClickBurger}) {

  const isMobile = useMediaQuery({ query: `(max-width: 800px)` });

  const handleOnClickBurger = () => {
    onClickBurger(isBurgerOpened);
  }

  useEffect(() => {
    if (isMobile) {
      onClickBurger(true);
    } else {
      onClickBurger(false);
    }
  }, [isMobile]);

  // НАДО ПОПРАВИТЬ ЛОГИКУ

  return (
    <div className={`hamburger-button hamburger-button_${isBurgerOpened ? 'on': 'off'}`} onClick={handleOnClickBurger}>
      <span></span>
    </div>
  )
}
