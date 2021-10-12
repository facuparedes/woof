import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPaginationIndex } from "../../redux/actions";
import BackNextButton from "./BackNextButton";
import s from "./Pagination.module.css";

export default function Pagination({ pagesQuantity, currentPage }) {
  const [paginationOffset, setPaginationOffset] = useState(0);
  const dispatch = useDispatch();
  const maxButtonsPerPage = 9;
  const buttons = [...new Array(Math.min(pagesQuantity, maxButtonsPerPage))].map((_, i) => i + 1 + paginationOffset);

  const __handlePaginationChange = (toPage) => {
    if (toPage === currentPage || toPage < 1 || toPage > pagesQuantity) return;
    if (toPage === 1) setPaginationOffset(0);
    if (toPage === pagesQuantity && pagesQuantity > maxButtonsPerPage) setPaginationOffset(pagesQuantity - maxButtonsPerPage);
    if (toPage === buttons.at(-1)) setPaginationOffset(paginationOffset + Math.min(pagesQuantity - toPage, Math.floor(buttons.length / 2)));
    if (toPage === buttons.at(0)) setPaginationOffset(paginationOffset - Math.min(toPage - 1, Math.floor(buttons.length / 2)));

    dispatch(setPaginationIndex(toPage));
  };

  useEffect(() => setPaginationOffset(0), [pagesQuantity]);

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
