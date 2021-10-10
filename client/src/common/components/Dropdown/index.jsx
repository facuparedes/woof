import { useState } from "react";
import { useDispatch } from "react-redux";
import { sortBreeds } from "../../redux/actions";
import { ChevronUp, ChevronDown } from "../Icons";
import s from "./Dropdown.module.css";

export default function Dropdown({ options }) {
  const [dropdownLabel, setDropdownLabel] = useState(options.find((option) => option.selected));
  const [openedDropdown, setOpenedDropdown] = useState(false);
  const dispatch = useDispatch();

  const handleNewSelect = (optionSelected) => {
    setOpenedDropdown(false);
    if (optionSelected.id === dropdownLabel.id) return;
    setDropdownLabel(optionSelected);
    dispatch(sortBreeds(optionSelected.sortBy));
  };

  const handleOutsideClick = (e) => {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    setOpenedDropdown(false);
  };

  return (
    <div className={s.container} onBlur={handleOutsideClick}>
      <button className={s.container__mainButton} onClick={() => setOpenedDropdown((prevIsOpen) => !prevIsOpen)}>
        <div className={s.container__mainButton__label}>
          {dropdownLabel?.label || "None"} {!openedDropdown ? <ChevronDown /> : <ChevronUp />}
        </div>
      </button>
      {openedDropdown && (
        <div className={s.container__dropdown}>
          {options.map((option) => (
            <button className={option.label === dropdownLabel.label ? s.container__dropdown_active : ""} key={option.id} onClick={() => handleNewSelect(option)}>
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
