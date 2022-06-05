import './Main.css';
import Promo from '../Promo/Promo.jsx'
import AboutProject from '../AboutProject/AboutProject.jsx';

export default function Main() {
  return (
    <main className="main">
      <Promo />
      <AboutProject />
      {/* <Techs />
      <AboutMe />
      <Portfolio /> */}
    </main>
  );
}
