import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterBreedsByTemperament, filterBreedsByBreed } from "../../redux/actions";
import FilterSection from "../FilterSection";
import s from "./Sidebar.module.css";

export default function Sidebar() {
  const [checkedValues, setCheckedValues] = useState({ temperaments: {}, breeds: {} });
  const _isMounted = useRef(false);
  const dispatch = useDispatch();
  const { breeds: breedsData, temperaments } = useSelector((state) => state);
  const { data: breeds, __activeFilters } = breedsData;
  const { breeds: activeBreedsFilter } = __activeFilters;

  const handleChecked = (id, name, toUpdateKey) => {
    setCheckedValues((prevCheckedValues) => {
      const { temperaments, breeds } = prevCheckedValues;
      const newCheckedValues = toUpdateKey === "temperaments" ? { temperaments: { ...temperaments }, breeds } : { temperaments, breeds: { ...breeds } };
      if (!newCheckedValues[toUpdateKey][id]) newCheckedValues[toUpdateKey][id] = name;
      else delete newCheckedValues[toUpdateKey][id];

      return newCheckedValues;
    });
  };

  useEffect(() => _isMounted.current && dispatch(filterBreedsByTemperament(Object.values(checkedValues.temperaments))), [checkedValues.temperaments, dispatch]);
  useEffect(() => _isMounted.current && dispatch(filterBreedsByBreed(Object.values(checkedValues.breeds))), [checkedValues.breeds, dispatch]);
  useEffect(() => {
    _isMounted.current = true;
    return () => (_isMounted.current = false);
  }, []);

  return (
    <aside className={s.container}>
      <FilterSection title="Temperament" dataToMap={temperaments} checked={(i) => !!checkedValues.temperaments[i]} onChange={(id, name) => handleChecked(id, name, "temperaments")} />
      <FilterSection title="Breed" dataToMap={breeds} checked={(i) => activeBreedsFilter[i] || !!checkedValues.breeds[i]} onChange={(id, name) => handleChecked(id, name, "breeds")} />
    </aside>
  );
}
