import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const cleanPageCount = Math.floor(Number(pageCount) || 0);
  const cleanCurrentPage = Math.floor(Number(currentPage) || 1);

  if (cleanPageCount <= 1) {
    return null;
  }

  const handlePageClick = (selectedItem: { selected: number }) => {
    onPageChange(selectedItem.selected + 1);
  };

  return (
    <nav>
      <ReactPaginate
        pageCount={cleanPageCount}
        onPageChange={handlePageClick}
        forcePage={cleanCurrentPage - 1}
        previousLabel="< previous"
        nextLabel="next >"
        breakLabel="..."
        containerClassName={css.pagination}
        activeClassName={css.active}
        pageClassName=""
        pageLinkClassName=""
        previousClassName=""
        previousLinkClassName=""
        nextClassName=""
        nextLinkClassName=""
        breakClassName=""
        breakLinkClassName=""
      />
    </nav>
  );
}
