import s from "./Pill.module.css";

export default function Pill({ label }) {
  return <span className={s.container}>{label}</span>;
}
