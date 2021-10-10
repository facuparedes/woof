import { cloneElement } from "react";
import s from "./Characteristic.module.css";

export default function Characteristic({ icon, text }) {
  return (
    <span className={s.container}>
      {cloneElement(icon, { className: s.container__img })}
      {text}
    </span>
  );
}
