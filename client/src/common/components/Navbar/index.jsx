import { Link } from "react-router-dom";
import s from "./Navbar.module.css";
import Logo from "../Logo";

export default function Navbar() {
  return (
    <nav className={s.container}>
      <Link className={s.container__logo} to="/" children={<Logo />} />
      <input className={s.container__searchBar} type="search" name="SearchBreed" placeholder="Search breed" />
    </nav>
  );
}
