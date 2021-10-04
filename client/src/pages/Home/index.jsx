import { Link } from "react-router-dom";
import s from "./Home.module.css";
import dogImage from "../../assets/homeDog.jpg";

export default function Home() {
  return (
    <section className={s.container}>
      <div className={s.container__textSide}>
        <h1 className={s.container__textSide__text}>
          See which dog breed is <span className={s.container__textSide__text__underlined}>perfect</span> <span className={s.container__textSide__text__underlined__after}>for you</span>
        </h1>
        <Link className={s.container__textSide__button} to="/breeds">
          Get started
        </Link>
      </div>
      <div className={s.container__imageSide}>
        <div className={s.container__imageSide__container}>
          <img className={s.container__imageSide__container__img} src={dogImage} alt="dog" />
        </div>
      </div>
    </section>
  );
}
