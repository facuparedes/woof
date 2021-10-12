import { Link } from "react-router-dom";
import Logo from "../Logo";
import Searchbar from "../Searchbar";
import s from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={s.container}>
      <Link className={s.container__logo} to="/" children={<Logo />} />
      <div className={s.container__rightSide}>
        <div className={s.container__rightSide__links}>
          <Link to="/breeds" children="LIST" />
          <Link to="/create/breed" children="CREATE" />
        </div>
        <Searchbar />
      </div>
    </nav>
  );
}
