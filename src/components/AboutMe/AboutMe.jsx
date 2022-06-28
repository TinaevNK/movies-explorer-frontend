import './AboutMe.css';
import avatar from '../../images/avatar.jpg';

export default function AboutMe() {
  return (
    <section className="about-me">
      <div className="about-me__container">
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__bio-container">
          <div className="about-me__bio">
            <h3 className="about-me__name">Никита</h3>
            <p className="about-me__age">Фронтенд-разработчик, 25 лет</p>
            <p className="about-me__text">
              Я родился в Первомайске, сейчас живу в Москве, с отличием закончил
              электроэнергетический факультет ИГЭУ им. В.И. Ленина. Занимаюсь
              пауэрлифтингом, люблю слушать музыку, rock ’n’ roll – наше всё!
              Недавно начал кодить. С 2020 года работаю в компании
              «Центратомтехэнерго», налаживаю работу атомных станций. Прошёл
              курс по веб-разработке и хочу связать дальнейшую карьеру с кодом.
            </p>
            <ul className="about-me__socials">
              <li>
                <a
                  href="https://vk.com/nikkach"
                  target="_blank"
                  rel="noreferrer"
                  className="about-me__social-link"
                >
                  ВКонтакте
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/TinaevNK"
                  target="_blank"
                  rel="noreferrer"
                  className="about-me__social-link"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
          <img
            className="about-me__avatar"
            src={avatar}
            alt="фотография разработчика приложения"
          />
        </div>
      </div>
    </section>
  );
}
