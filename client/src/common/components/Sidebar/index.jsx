import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./Sidebar.module.css";
import FilterSection from "../FilterSection";
import { filterBreedsByTemperamentAndBreeds } from "../../redux/actions";

export default function Sidebar() {
  const [checkedValues, setCheckedValues] = useState({ temperaments: {}, breeds: {} });
  const {
    breeds: { data },
    temperaments,
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleChecked = (id, name, toUpdate) => {
    setCheckedValues((prevCheckedValues) => {
      const newCheckedValues = { temperaments: { ...prevCheckedValues.temperaments }, breeds: { ...prevCheckedValues.breeds } };
      if (!newCheckedValues[toUpdate][id]) newCheckedValues[toUpdate][id] = name;
      else delete newCheckedValues[toUpdate][id];

      return newCheckedValues;
    });
  };

  useEffect(() => dispatch(filterBreedsByTemperamentAndBreeds(Object.values(checkedValues.temperaments), Object.values(checkedValues.breeds))), [checkedValues]);

  return (
    <aside className={s.container}>
      <h2>All breeds</h2>
      <FilterSection title="Temperament" dataToMap={temperaments} checked={(i) => !!checkedValues["temperaments"][i]} onChange={(id, name) => handleChecked(id, name, "temperaments")} />
      <FilterSection title="Breed" dataToMap={data} checked={(i) => !!checkedValues["breeds"][i]} onChange={(id, name) => handleChecked(id, name, "breeds")} />
    </aside>
  );
}
