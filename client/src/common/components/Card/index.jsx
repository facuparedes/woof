import { Link } from "react-router-dom";
import ImagePlaceholder from "../ImagePlaceholder";
import Characteristic from "../Characteristic";
import Pill from "../Pill";
import { Weight } from "../Icons";
import s from "./Card.module.css";

export default function Card({ className, breed, path, showTemperaments = true }) {
  return (
    <Link className={`${s.container} ${className}`} to={`${path}/${breed.id}`}>
      <div className={s.container__imgContainer}>{breed?.image ? <img className={s.container__imgContainer__img} src={breed.image.url} alt={breed.name} /> : <ImagePlaceholder />}</div>
      <div className={s.container__textContainer}>
        <div>
          <span className={s.container__textContainer__title}>{breed.name}</span>
        </div>
        <Characteristic icon={<Weight />} text={`~${breed.weight || ""}kg`} />
        {showTemperaments && (
          <div className={s.container__textContainer__temperaments}>
            {breed.temperaments.map((temperament, i) => (
              <Pill key={`${temperament}-${i}`} label={temperament} />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
