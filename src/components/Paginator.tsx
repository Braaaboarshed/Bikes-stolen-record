import React from "react";

const Paginator = ({
  goToPrevPage,
  nPages,
  setCurrentPage,
  currentPage,
  goToNextPage,
}: any) => {
  return (
    <div className="pagination">
      <p onClick={goToPrevPage}>prev</p>
      {[...Array(nPages)].map((e, i) => {
        return (
          <p
            onClick={() => setCurrentPage(i + 1)}
            className={i + 1 === currentPage ? "active" : ""}
            key={i}
          >
            {i + 1}
          </p>
        );
      })}
      <p onClick={goToNextPage}>next</p>
    </div>
  );
};

export default Paginator;
