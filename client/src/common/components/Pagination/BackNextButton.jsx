import s from "./BackNextButton.module.css";

export default function BackNextButton({ label, className, onClick }) {
  return (
    <button className={`${className} ${s.backNextButton}`} {...{ onClick }}>
      {label}
    </button>
  );
}
