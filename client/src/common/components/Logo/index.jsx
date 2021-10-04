import s from "./Logo.module.css";
import logo from "../../../assets/logo.svg";

export default function Logo() {
  return (
    <div className={s.container}>
      <img className={s.container__img} src={logo} alt="" />
      <span className={s.container__title}>WOOF</span>
    </div>
  );
}
