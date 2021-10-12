import { useEffect } from "react";
import s from "./Notification.module.css";

let timeout;
export default function Notification({ text, type, onTimeout, onButtonClick }) {
  useEffect(() => {
    clearTimeout(timeout);
    timeout = setTimeout(() => onTimeout({}), 5000);
  }, [text, type, onTimeout, onButtonClick]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`${s.container} ${s[`container__${type}`]}`}>
      <span>
        {`${type.charAt(0).toUpperCase()}${type.slice(1)}`} <button onClick={() => onButtonClick({})} />
      </span>
      <span>{text}</span>
    </div>
  );
}
