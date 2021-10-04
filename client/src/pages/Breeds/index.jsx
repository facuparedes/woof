import Card from "../../common/components/Card";
import s from "./Breeds.module.css";
import data from "./mockData";

export default function Breeds() {
  return (
    <section className={s.container}>
      <aside className={s.container__sidebar}>
        <span className={s.container__sidebar__title}>All breeds</span>
      </aside>
      <div className={s.container__list}>
        {data.map((breed) => (
          <Card {...{ breed }} key={breed.id} />
        ))}
      </div>
    </section>
  );
}
