import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import useWindowResize from "../../hooks/useWindowResize";

const Pagination = ({
  total,
  marginPagesDisplayed,
  pageRangeDisplayed,
  handleChangePage = () => {},
  perPage,
  pageCurrent,
  prevLabel,
  nextLabel,
}) => {
  const totalPage = perPage ? Math.ceil(total / perPage) : 0;

  const [pageRange, setPageRange] = useState(0);

  const handlePageClick = (currentPage) => {
    const { selected } = currentPage;
    handleChangePage(selected + 1);
  };

  useWindowResize(() => {
    if (pageRangeDisplayed <= 0) return 0;
    const WIDTH = window.innerWidth;
    if (WIDTH > 767) setPageRange(pageRangeDisplayed);
    if (WIDTH < 767) setPageRange(0);
  });

  return (
    <ReactPaginate
      previousLabel={prevLabel}
      nextLabel={nextLabel}
      pageCount={totalPage}
      forcePage={pageCurrent ? pageCurrent - 1 : 0}
      onPageChange={handlePageClick}
      marginPagesDisplayed={marginPagesDisplayed}
      pageRangeDisplayed={pageRange}
      containerClassName="o-pagination"
      breakClassName="o-pagination_break"
      previousClassName="o-pagination_previous"
      nextClassName="o-pagination_next"
      pageClassName="o-pagination_page"
      activeClassName="o-pagination_activePage"
      pageLinkClassName="o-pagination_linkPage"
      breakLinkClassName="o-pagination_breakLink"
    />
  );
};

export default Pagination;
