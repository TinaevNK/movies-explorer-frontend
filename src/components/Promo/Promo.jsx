import './Promo.css';
import logo from '../../images/landing-logo.svg';

export default function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <div className="promo__about-project">
          <h1 className="promo__title">
            Учебный проект студента факультета Веб&#8209;разработки.
          </h1>
          <p className="promo__description">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <a href="https://goo.su/P65u" target="_blank" rel="noopener noreferrer" className="promo__learn-more-link" >
          Узнать больше
          </a>
        </div>
        <img src={logo} alt="логотип - Земной шар" className="promo__logo" />
      </div>
    </section>
  );
}
