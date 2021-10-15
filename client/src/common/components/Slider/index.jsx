import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestRandomBreeds } from "../../redux/actions";
import { ChevronLeft, ChevronRight } from "../Icons";
import Card from "../Card";
import s from "./Slider.module.css";

export default function Slider() {
  const sliderRef = useRef();
  const [sliderPosition, setSliderPosition] = useState(0);
  const randomBreeds = useSelector((state) => state["selectedBreedDetails"]["randomBreeds"]);
  const dispatch = useDispatch();

  const handleNextBackButtonClick = (goTo) => {
    const element = sliderRef.current;
    const cardGap = parseInt(getComputedStyle(element).gridColumnGap.replace(/[^\d.]/g, "")) / randomBreeds.length || 0;
    const cardSize = element.scrollWidth / randomBreeds.length + cardGap;
    const currentTranslation = -parseInt(element.style.transform.replace(/[^\d.]/g, "")) || 0;
    const newTranslation = goTo === "next" ? currentTranslation - cardSize : currentTranslation + cardSize;
    element.style.transform = `translateX(${newTranslation}px)`;

    setSliderPosition((prevSliderPosition) => (goTo === "next" ? ++prevSliderPosition : --prevSliderPosition));
  };

  useEffect(() => !randomBreeds && dispatch(requestRandomBreeds()), [dispatch, randomBreeds]);
  useEffect(() => randomBreeds && setSliderPosition(0), [randomBreeds]);

  if (!randomBreeds) return null;
  return (
    <div className={s.container}>
      <span className={s.container__title}>See also:</span>
      {sliderPosition > 0 && (
        <button className={`${s.container__nextBackButton} ${s.container__backButton}`} onClick={() => handleNextBackButtonClick("back")}>
          <ChevronLeft />
        </button>
      )}
      <div ref={sliderRef} className={s.container__slider}>
        {randomBreeds.map((breed, i) => (
          <Card className={s.container__slider__card} {...{ breed }} path={"../breeds"} showTemperaments={false} key={`similarBreed-${i}`} />
        ))}
      </div>
      {sliderPosition < randomBreeds.length - 1 && (
        <button className={`${s.container__nextBackButton} ${s.container__nextButton}`} onClick={() => handleNextBackButtonClick("next")}>
          <ChevronRight />
        </button>
      )}
    </div>
  );
}
