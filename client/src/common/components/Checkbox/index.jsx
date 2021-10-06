import s from "./Checkbox.module.css";

export default function Checkbox({ label, checked, onChange }) {
  return (
    <label className={s.label} {...{ onChange }}>
      <input className={s.label__checkbox} defaultChecked={checked} type="checkbox" />
      {label}
    </label>
  );
}
