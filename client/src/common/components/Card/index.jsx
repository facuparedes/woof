import { Link } from "react-router-dom";
import s from "./Card.module.css";

export default function Card({ breed, path }) {
  return (
    <Link className={s.container} to={`${path}/${breed.id}`}>
      <div className={s.container__imgContainer}>
        {breed?.image ? (
          <img className={s.container__imgContainer__img} src={breed.image.url} alt={breed.name} />
        ) : (
          <div className={s.container__imgContainer__placeholder}>
            <img className={s.container__imgContainer__placeholder__img} src="https://api.iconify.design/fluent/image-24-regular.svg" alt="" />
            Not found
          </div>
        )}
      </div>
      <div className={s.container__textContainer}>
        <span className={s.container__textContainer__title}>{breed.name}</span>
        <span className={s.container__textContainer__weight}>
          <img className={s.container__textContainer__weight__img} src="https://api.iconify.design/fa-solid/weight-hanging.svg" alt="" /> ~{breed.weight}kg
        </span>
        <div className={s.container__textContainer__temperaments}>
          {breed.temperaments.map((temperament, i) => (
            <span className={s.container__textContainer__temperaments__temperament} key={`${temperament}-${i}`}>
              {temperament}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
