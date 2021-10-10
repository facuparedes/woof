import { useSelector } from "react-redux";
import Dropdown from "../Dropdown";
import s from "./CardsHeader.module.css";

export default function CardsHeader() {
  const dropdownOptions = [
    { id: 0, label: "Name ascendent", sortBy: { keyName: "name", asc: true }, selected: true },
    { id: 1, label: "Name descendent", sortBy: { keyName: "name", asc: false }, selected: false },
    { id: 2, label: "Weight ascendent", sortBy: { keyName: "weight", asc: true }, selected: false },
    { id: 3, label: "Weight descendent", sortBy: { keyName: "weight", asc: false }, selected: false },
  ];

  const breedsLength = useSelector((state) => state["breeds"].data.length);

  return (
    <div className={s.container}>
      <h2>
        All breeds{" "}
        <span>
          ({breedsLength} {breedsLength === 1 ? "result" : "results"})
        </span>
      </h2>
      <div className={s.container__sort}>
        Sort by
        <Dropdown options={dropdownOptions} />
      </div>
    </div>
  );
}
