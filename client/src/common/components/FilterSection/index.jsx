import Checkbox from "../Checkbox";
import s from "./FilterSection.module.css";

export default function FilterSection({ title, dataToMap, checked, onChange }) {
  return (
    <>
      <h3>{title}</h3>
      <ol className={s.list}>
        {dataToMap.map((data, i) => (
          <li key={data.id}>
            <Checkbox label={data.name} checked={checked(i)} onChange={() => onChange(data.id, data.name)} />
          </li>
        ))}
      </ol>
    </>
  );
}
