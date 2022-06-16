import './Hamburger.css';
import { useMediaQuery } from 'react-responsive';
import { useEffect } from 'react';

export default function Hamburger({isBurgerOpened, onClickBurger}) {

  // контроль ширины экрана, для правильной логики работы классов и отображения меню
  const isMobile = useMediaQuery({ query: `(max-width: 800px)` });

  const handleOnClickBurger = () => {
    onClickBurger(isBurgerOpened);
  }

  useEffect(() => {
    if (!isMobile) {
      onClickBurger(true);
    }
  }, [isMobile, onClickBurger]);

  return (
    <button type="button" className={`hamburger-button hamburger-button_${isBurgerOpened ? 'on': 'off'}`} onClick={handleOnClickBurger}>
      <span></span>
    </button>
  )
}
