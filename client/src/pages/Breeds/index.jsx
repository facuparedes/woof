import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router";
import Sidebar from "../../common/components/Sidebar";
import Card from "../../common/components/Card";
import Pagination from "../../common/components/Pagination";
import { requestAll } from "../../common/redux/actions";
import s from "./Breeds.module.css";

/**
 * TODO: Separar en componentes en el componente `Card`.
 * TODO: Separar en componentes el componente `Pagination`.
 * TODO: Quitar la URL de los iconos, y utilizar una libreria (?) en el componente `Card`
 * //TODO: Hacer filtrado
 * TODO: Hacer busqueda
 * TODO: Hacer ordenamiento
 * //TODO: Hacer paginacion
 * TODO: Hacer página de detalle
 * TODO: Hacer página de agregado
 * TODO: Hacer una página de error
 * TODO: Hacer una página de carga
 * TODO: Hacer placeholders cuando no hay datos
 * TODO: Hacer un md5 de los id en el backend
 * TODO: Hacer subida de imagenes
 * //TODO: Los temperaments no se muestran en orden
 */

export default function Breeds() {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const { data, pagination } = useSelector((state) => state["breeds"]);
  const maxCardsPerPage = 10;
  const paginatedBreeds = data.slice((pagination - 1) * maxCardsPerPage, pagination * maxCardsPerPage);

  useEffect(() => dispatch(requestAll()), [dispatch]);

  return (
    <section className={s.container}>
      <Sidebar />
      <div className={s.container__list}>
        {paginatedBreeds.map((breed) => (
          <Card {...{ breed, path }} key={breed.id} />
        ))}
        <Pagination pagesQuantity={Math.ceil(data.length / maxCardsPerPage)} />
      </div>
    </section>
  );
}
