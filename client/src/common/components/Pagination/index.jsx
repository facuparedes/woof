import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPaginationIndex } from "../../redux/actions";
import BackNextButton from "./BackNextButton";
import s from "./Pagination.module.css";

export default function Pagination({ pagesQuantity }) {
  const [paginationOffset, setPaginationOffset] = useState(0);
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state["breeds"].pagination);
  const maxButtonsPerPage = 9;
  const buttons = [...new Array(Math.min(pagesQuantity, maxButtonsPerPage))].map((_, i) => i + 1 + paginationOffset);

  function __handlePaginationChange(toPage) {
    if (toPage === currentPage) {
      return;
    } else if (toPage === 1) {
      setPaginationOffset(0);
    } else if (pagesQuantity > maxButtonsPerPage && pagesQuantity === toPage) {
      setPaginationOffset(pagesQuantity - maxButtonsPerPage);
    } else if (buttons.at(-1) === toPage) {
      if (pagesQuantity - toPage > 0) setPaginationOffset(paginationOffset + Math.min(pagesQuantity - toPage, Math.floor(buttons.length / 2)));
    } else if (buttons.at(0) === toPage) {
      if (toPage > 1) setPaginationOffset(paginationOffset - Math.min(toPage - 1, Math.floor(buttons.length / 2)));
    }

    dispatch(setPaginationIndex(toPage));
  }

  return (
    <div className={s.container}>
      <>
        {currentPage > 1 && <BackNextButton className={s.container__button} label="Back" onClick={() => __handlePaginationChange(currentPage - 1)} />}
        {buttons.at(0) > 1 && (
          <>
            <button className={s.container__button} onClick={() => __handlePaginationChange(1)}>
              {1}
            </button>
            <span className={s.container__dots}>...</span>
          </>
        )}
      </>
      {buttons.map((page) => (
        <button
          className={`${s.container__button} ${currentPage === page ? s.container__button_active : ""}`}
          key={`paginationCurrentPageToPage-${currentPage}-${page}`}
          onClick={() => __handlePaginationChange(page)}
        >
          {page}
        </button>
      ))}
      <>
        {buttons.at(-1) < pagesQuantity && (
          <>
            <span className={s.container__dots}>...</span>
            <button className={s.container__button} onClick={() => __handlePaginationChange(pagesQuantity)}>
              {pagesQuantity}
            </button>
          </>
        )}
        {currentPage < pagesQuantity && <BackNextButton className={s.container__button} label="Next" onClick={() => __handlePaginationChange(currentPage + 1)} />}
      </>
    </div>
  );
}
