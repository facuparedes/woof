import s from "./Input.module.css";

export default function Input({ className, type, name, placeholder, ...args }) {
  return <input className={`${s.container} ${className}`} type={type} name={name} placeholder={placeholder} {...{ ...args }} />;
}
