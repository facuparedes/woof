import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchBreedsByName } from "../../redux/actions";
import s from "./Searchbar.module.css";

export default function Searchbar() {
  const [searchInputData, setSearchInputData] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const textToSearch = e.target.value.normalize();
    setSearchInputData(textToSearch);
    dispatch(searchBreedsByName(textToSearch));
  };

  return <input className={s.container} type="search" name="SearchBreed" placeholder="Search breed" value={searchInputData} onChange={handleChange} />;
}
