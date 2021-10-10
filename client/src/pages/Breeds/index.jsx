import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetBreedDetails } from "../../common/redux/actions";
import Sidebar from "../../common/components/Sidebar";
import Cards from "../../common/components/Cards";
import s from "./Breeds.module.css";

/**
 * ? TODO: Los breeds traidos de la DB no están ordenados?
 * TODO: Hacer página de agregado
 * TODO: Hacer una página de error
 * TODO: Hacer una página de carga
 * TODO: Hacer placeholders cuando no hay datos
 * TODO: Separar en componentes el componente `Card`.
 * TODO: Quitar la URL de los iconos, y utilizar una libreria (?) en el componente `Card`
 * TODO: Separar en componentes el componente `Pagination`.
 * TODO: Hacer refactor de Home
 * TODO: Hacer subida de imagenes
 * //-TODO: Hacer página de detalle
 * //-TODO: Hacer un md5 de los id en el backend
 * //-TODO: Cambiar el pasaje de los nombres de las propiedades de los objetos para acceder a los mismos. Ex: "temperaments" ---> checkedValues[keyName]
 * //-TODO: Hacer filtrado
 * //-TODO: Hacer busqueda
 * //-TODO: Hacer paginacion
 * //-TODO: Hacer ordenamiento
 * //-TODO: Los temperaments no se muestran en orden
 */

export default function Breeds() {
  const dispatch = useDispatch();

  useEffect(() => dispatch(resetBreedDetails()), []);

  return (
    <section className={s.container}>
      <Sidebar />
      <Cards />
    </section>
  );
}
