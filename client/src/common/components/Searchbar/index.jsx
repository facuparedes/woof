import { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { searchBreedsByName } from "../../redux/actions";
import s from "./Searchbar.module.css";

export default function Searchbar() {
  const [searchInputData, setSearchInputData] = useState("");
  const dispatch = useDispatch();
  let history = useHistory();

  const handleChange = (e) => {
    const textToSearch = e.target.value.normalize();
    setSearchInputData(textToSearch);
    dispatch(searchBreedsByName(textToSearch));
    if (!textToSearch || history.location.pathname === "/breeds") return;
    history.push("/breeds");
  };

  return (
    <input
      className={s.container}
      type="search"
      name="SearchBreed"
      placeholder="Search breed"
      value={searchInputData}
      onChange={handleChange}
      onKeyPress={(e) => e.key === "Enter" && handleChange(e)}
    />
  );
}
