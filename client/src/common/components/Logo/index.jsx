import Icon from "./Icon";
import s from "./Logo.module.css";

export default function Logo() {
  return (
    <div className={s.container}>
      <Icon className={s.container__img} />
      <span className={s.container__title}>WOOF</span>
    </div>
  );
}
