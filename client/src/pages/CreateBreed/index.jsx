import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBreed, requestTemperaments } from "../../common/redux/actions";
import Checkbox from "../../common/components/Checkbox";
import Input from "../../common/components/Input";
import Notification from "../../common/components/Notification";
import s from "./CreateBreed.module.css";

function validate(formData) {
  const errors = {};

  if (!formData.__alreadySubmited) return errors;
  if (!formData.name) errors.name = "Name is required.";
  if (!formData.heightMin) errors.heightMin = "Min height is required.";
  if (!formData.heightMax) errors.heightMax = "Max height is required.";
  if (!formData.weightMin) errors.weightMin = "Min weight is required.";
  if (!formData.weightMax) errors.weightMax = "Max weight is required.";
  if (!formData.life_span) errors.life_span = "Life span is required.";
  if (!Object.keys(formData.temperaments).length) errors.temperaments = "You must select at least 1 temperament.";

  return errors;
}

export default function CreateBreed() {
  const [formData, setFormData] = useState({ name: "", heightMin: "", heightMax: "", weightMin: "", weightMax: "", life_span: "", temperaments: {}, __alreadySubmited: false });
  const [formErrors, setFormErrors] = useState({});
  const [notificationMessage, setNotificationMessage] = useState({ message: "", type: "" });
  const leftSectionRef = useRef();
  const rightSectionRef = useRef();
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const blockedKeys = ["E", "e", ".", "+", ","];

  const handleKeyPress = (e) => (blockedKeys.includes(e.key) || blockedKeys.some((key) => e.clipboardData?.getData("text/plain")?.includes(key))) && e.preventDefault();

  const handleInputChange = (e) => {
    let newValue;
    let newValueInsideMinMax;

    if (e.target.name === "name") {
      newValue = e.target.value.replace(/[^a-zA-ZÀ-ú\s]+/g, "");
    } else {
      newValue = parseInt(e.target.value) || e.target.value;
      newValueInsideMinMax = newValue > e.target.max ? parseInt(e.target.max) : newValue < e.target.min ? parseInt(e.target.min) : newValue;
    }

    setFormData((prevState) => {
      const newState = { ...prevState, [e.target.name]: newValueInsideMinMax || newValue };
      setFormErrors(validate(newState));
      return newState;
    });
  };

  const handleChecked = (id, name) => {
    setFormData((prevState) => {
      const newState = { ...prevState, temperaments: { ...prevState.temperaments } };
      if (!newState.temperaments[id]) newState.temperaments[id] = name;
      else delete newState.temperaments[id];
      setFormErrors(validate(newState));
      return newState;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData((prevState) => {
      const newState = { ...prevState, __alreadySubmited: true };
      const errors = validate(newState);
      setFormErrors(errors);

      if (!Object.keys(errors).length) {
        const bodyData = {
          name: newState.name.trim(),
          height: Math.round((newState.heightMin + newState.heightMax) / 2),
          weight: Math.round((newState.weightMin + newState.weightMax) / 2),
          life_span: newState.life_span,
          temperaments: Object.values(newState.temperaments),
        };
        dispatch(createBreed(bodyData))
          .then(() => setNotificationMessage({ message: "Breed successfully created.", type: "success" }))
          .catch(() => setNotificationMessage({ message: "Breed with this name already exists.", type: "error" }));
      } else {
        setNotificationMessage({ message: "You must fill all the required fields.", type: "error" });
      }

      return newState;
    });
  };

  useEffect(() => (rightSectionRef.current.style.height = `${leftSectionRef.current.clientHeight}px`), []);
  useEffect(() => !temperaments.length && dispatch(requestTemperaments()), [dispatch, temperaments]);

  return (
    <section className={s.container}>
      <div className={s.container__card}>
        <h1>Create breed</h1>
        <form className={s.container__card__form} onSubmit={handleSubmit}>
          <div className={s.container__card__form__container}>
            <div ref={leftSectionRef} className={s.container__card__form__container__leftSide}>
              <div>
                <label>Name</label>
                <Input
                  key="name"
                  className={`${formErrors.name ? s.inputError : ""}`}
                  name="name"
                  type="text"
                  maxLength={30}
                  placeholder="An example dog breed"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {formErrors.name && <p className={s.textError}>{formErrors.name}</p>}
              </div>
              <div>
                <label>Height range</label>
                <div>
                  <Input
                    key="heightMin"
                    className={`${formErrors.heightMin ? s.inputError : ""}`}
                    name="heightMin"
                    type="number"
                    min={1}
                    max={100}
                    placeholder={"30cm"}
                    value={formData.heightMin}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    onPaste={handleKeyPress}
                  />
                  -
                  <Input
                    key="heightMax"
                    className={`${formErrors.heightMax ? s.inputError : ""}`}
                    name="heightMax"
                    type="number"
                    min={1}
                    max={100}
                    placeholder={"46cm"}
                    value={formData.heightMax}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    onPaste={handleKeyPress}
                  />
                </div>
                {formErrors.heightMin && <p className={s.textError}>{formErrors.heightMin}</p>}
                {formErrors.heightMax && <p className={s.textError}>{formErrors.heightMax}</p>}
              </div>
              <div>
                <label>Weight range</label>
                <div>
                  <Input
                    key="weightMin"
                    className={`${formErrors.weightMin ? s.inputError : ""}`}
                    name="weightMin"
                    type="number"
                    min={1}
                    max={100}
                    placeholder={"6kg"}
                    value={formData.weightMin}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    onPaste={handleKeyPress}
                  />
                  -
                  <Input
                    key="weightMax"
                    className={`${formErrors.weightMax ? s.inputError : ""}`}
                    name="weightMax"
                    type="number"
                    min={1}
                    max={100}
                    placeholder={"12kg"}
                    value={formData.weightMax}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    onPaste={handleKeyPress}
                  />
                </div>
                {formErrors.weightMin && <p className={s.textError}>{formErrors.weightMin}</p>}
                {formErrors.weightMax && <p className={s.textError}>{formErrors.weightMax}</p>}
              </div>
              <div>
                <label>Life span</label>
                <Input
                  key="life_span"
                  className={`${formErrors.life_span ? s.inputError : ""}`}
                  name="life_span"
                  type="number"
                  min={1}
                  max={100}
                  placeholder={"15 years"}
                  value={formData.life_span}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  onPaste={handleKeyPress}
                />
                {formErrors.life_span && <p className={s.textError}>{formErrors.life_span}</p>}
              </div>
            </div>
            <div ref={rightSectionRef} className={s.container__card__form__container__rightSide}>
              <label>Temperaments</label>
              <div className={s.container__card__form__container__rightSide__temperaments}>
                {temperaments.map((temperament) => (
                  <Checkbox
                    key={temperament.id}
                    label={temperament.name}
                    inputClassName={formErrors.temperaments ? s.inputError : ""}
                    onChange={() => handleChecked(temperament.id, temperament.name)}
                  />
                ))}
              </div>
              {formErrors.temperaments && <p className={s.textError}>{formErrors.temperaments}</p>}
            </div>
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
      {notificationMessage.message && <Notification text={notificationMessage.message} type={notificationMessage.type} onTimeout={setNotificationMessage} onButtonClick={setNotificationMessage} />}
    </section>
  );
}
