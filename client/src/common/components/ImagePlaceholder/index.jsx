import { Image } from "../Icons";
import s from "./ImagePlaceholder.module.css";

export default function ImagePlaceholder() {
  return (
    <div className={s.container}>
      <Image className={s.container__img} />
      Not found
    </div>
  );
}
