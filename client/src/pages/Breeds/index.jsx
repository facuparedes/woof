import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetBreedDetails } from "../../common/redux/actions";
import Sidebar from "../../common/components/Sidebar";
import Cards from "../../common/components/Cards";
import s from "./Breeds.module.css";

export default function Breeds() {
  const dispatch = useDispatch();

  useEffect(() => dispatch(resetBreedDetails()), [dispatch]);

  return (
    <section className={s.container}>
      <Sidebar />
      <Cards />
    </section>
  );
}
