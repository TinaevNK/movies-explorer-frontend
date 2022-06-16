import './Portfolio.css';

export default function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__projects-list">
          <li className="portfolio__projects-item">
            <a
              href="https://github.com/TinaevNK/how-to-learn"
              target="_blank"
              rel="noreferrer"
              className="portfolio__link"
            >
              Статичный сайт
            </a>
          </li>
          <li className="portfolio__projects-item">
            <a
              href="https://github.com/TinaevNK/russian-travel"
              target="_blank"
              rel="noreferrer"
              className="portfolio__link"
            >
              Адаптивный сайт
            </a>
          </li>
          <li className="portfolio__projects-item">
            <a
              href="https://github.com/TinaevNK/react-mesto-api-full"
              target="_blank"
              rel="noreferrer"
              className="portfolio__link"
            >
              Одностраничное приложение
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
