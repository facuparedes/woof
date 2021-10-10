import { useEffect } from "react";
import { useRouteMatch } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { requestAll } from "../../redux/actions";
import CardsHeader from "../CardsHeader";
import Card from "../Card";
import Pagination from "../Pagination";
import s from "./Cards.module.css";

export default function Cards() {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const { data, pagination } = useSelector((state) => state["breeds"]);
  const maxCardsPerPage = 12;
  const paginatedBreeds = data.slice((pagination - 1) * maxCardsPerPage, pagination * maxCardsPerPage);

  useEffect(() => dispatch(requestAll()), [dispatch]);

  return (
    <div className={s.container}>
      <CardsHeader />
      {paginatedBreeds.map((breed) => (
        <Card {...{ breed, path }} key={breed.id} />
      ))}
      <Pagination pagesQuantity={Math.ceil(data.length / maxCardsPerPage)} currentPage={pagination} />
    </div>
  );
}
