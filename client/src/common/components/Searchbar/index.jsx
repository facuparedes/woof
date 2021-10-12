import { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { searchBreedsByName } from "../../redux/actions";
import Input from "../Input";
import s from "./Searchbar.module.css";

export default function Searchbar() {
  const [searchInputData, setSearchInputData] = useState("");
  const dispatch = useDispatch();
  let history = useHistory();

  const handleChange = (e) => {
    const textToSearch = e.target.value.replace(/[^a-zA-ZÀ-ú\s]+/g, "");
    setSearchInputData(textToSearch);
    dispatch(searchBreedsByName(textToSearch.trim()));
    if (!textToSearch || history.location.pathname === "/breeds") return;
    history.push("/breeds");
  };

  return (
    <Input className={s.input} type="search" name="SearchBreed" placeholder="Search breed" value={searchInputData} onChange={handleChange} onKeyPress={(e) => e.key === "Enter" && handleChange(e)} />
  );
}
