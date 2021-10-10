import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { requestBreedByID, requestRandomBreeds } from "../../common/redux/actions";
import { ChevronLeft, ChevronRight, Height, Hourglass, Weight } from "../../common/components/Icons";
import ImagePlaceholder from "../../common/components/ImagePlaceholder";
import Characteristic from "../../common/components/Characteristic";
import Pill from "../../common/components/Pill";
import Card from "../../common/components/Card";
import s from "./BreedDetails.module.css";

export default function BreedDetails() {
  const [sliderPosition, setSliderPosition] = useState(0);
  const sliderRef = useRef();
  const breed = useSelector((state) => state["selectedBreedDetails"]);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => dispatch(requestBreedByID(id)), [id]);
  useEffect(() => breed && !breed.randomBreeds && dispatch(requestRandomBreeds()), [breed]);
  useEffect(() => breed && breed.randomBreeds && setSliderPosition(0), [breed?.randomBreeds]);

  const handleNextBackButtonClick = (goTo) => {
    const element = sliderRef.current;
    const cardGap = parseInt(getComputedStyle(element).gridColumnGap.replace(/[^\d.]/g, "")) / breed.randomBreeds.length || 0;
    const cardSize = element.scrollWidth / breed.randomBreeds.length + cardGap;
    const currentTranslation = -parseInt(element.style.transform.replace(/[^\d.]/g, "")) || 0;
    const newTranslation = goTo === "next" ? currentTranslation - cardSize : currentTranslation + cardSize;
    element.style.transform = `translateX(${newTranslation}px)`;

    setSliderPosition((prevSliderPosition) => (goTo === "next" ? ++prevSliderPosition : --prevSliderPosition));
  };

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
            {breed.randomBreeds && (
              <div className={s.container__card__details__randomBreeds}>
                <span className={s.container__card__details__randomBreeds__title}>See also:</span>
                {sliderPosition > 0 && (
                  <button
                    className={`${s.container__card__details__randomBreeds__nextBackButton} ${s.container__card__details__randomBreeds__backButton}`}
                    onClick={() => handleNextBackButtonClick("back")}
                  >
                    <ChevronLeft />
                  </button>
                )}
                <div ref={sliderRef} className={s.container__card__details__randomBreeds__slider}>
                  {breed.randomBreeds.map((breed, i) => (
                    <Card className={s.container__card__details__randomBreeds__slider__card} {...{ breed }} path={"../breeds"} showTemperaments={false} key={`similarBreed-${i}`} />
                  ))}
                </div>
                {sliderPosition < breed.randomBreeds.length - 1 && (
                  <button
                    className={`${s.container__card__details__randomBreeds__nextBackButton} ${s.container__card__details__randomBreeds__nextButton}`}
                    onClick={() => handleNextBackButtonClick("next")}
                  >
                    <ChevronRight />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
