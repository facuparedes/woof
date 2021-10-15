import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { requestBreedByID } from "../../common/redux/actions";
import { Height, Hourglass, Weight } from "../../common/components/Icons";
import ImagePlaceholder from "../../common/components/ImagePlaceholder";
import Characteristic from "../../common/components/Characteristic";
import Pill from "../../common/components/Pill";
import Slider from "../../common/components/Slider";
import s from "./BreedDetails.module.css";

export default function BreedDetails() {
  const breed = useSelector((state) => state["selectedBreedDetails"]);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => dispatch(requestBreedByID(id)), [dispatch, id]);

  return (
    <section className={s.container}>
      {breed && (
        <div className={s.container__card}>
          <div className={s.container__card__image}>{breed.image ? <img src={breed?.image?.url} alt="" /> : <ImagePlaceholder />}</div>
          <div className={s.container__card__details}>
            <div className={s.container__card__details__name}>
              <h1>{breed.name}</h1>
            </div>
            <div className={s.container__card__details__characteristic}>
              <div className={s.container__card__details__characteristic_list}>
                <div>
                  <h3>Weight:</h3>
                  <Characteristic icon={<Weight />} text={`~${breed.weight || ""}kg`} />
                </div>
                <div>
                  <h3>Height:</h3>
                  <Characteristic icon={<Height />} text={`~${breed.height || ""}cm`} />
                </div>
                <div>
                  <h3>Life span:</h3>
                  <Characteristic icon={<Hourglass />} text={`~${breed.life_span || ""}years`} />
                </div>
              </div>
            </div>
            <div className={s.container__card__details__temperaments}>{breed.temperaments && breed.temperaments.map((temperament, i) => <Pill key={`${temperament}-${i}`} label={temperament} />)}</div>
            <Slider />
          </div>
        </div>
      )}
    </section>
  );
}
