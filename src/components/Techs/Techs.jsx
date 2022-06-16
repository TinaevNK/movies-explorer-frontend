import "./Techs.css";

export default function Techs() {
  return (
    <section className="techs">
      <div className="techs__container">
        <h2 className="techs__title">Технологии</h2>
        <h3 className="techs__quantity">7 технологий</h3>
        <p className="techs__about">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="techs__stack">
          <li className="techs__stack-item">
            <p className="techs__stack-name">HTML</p>
          </li>
          <li className="techs__stack-item">
            <p className="techs__stack-name">CSS</p>
          </li>
          <li className="techs__stack-item">
            <p className="techs__stack-name">JS</p>
          </li>
          <li className="techs__stack-item">
            <p className="techs__stack-name">React</p>
          </li>
          <li className="techs__stack-item">
            <p className="techs__stack-name">Git</p>
          </li>
          <li className="techs__stack-item">
            <p className="techs__stack-name">Express.js</p>
          </li>
          <li className="techs__stack-item">
            <p className="techs__stack-name">mongoDB</p>
          </li>
        </ul>
      </div>
    </section>
  );
}
