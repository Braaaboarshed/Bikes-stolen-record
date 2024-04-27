import React, { useContext } from "react";
import { BikeContext } from "../BikeContext";

const Paginator = () => {
    const {currentPage,nPages,setCurrentPage}:any = useContext(BikeContext) 
    function goToNextPage() {
        if (currentPage !== nPages) setCurrentPage(currentPage + 1);
        console.log(currentPage);
      }
    
      function goToPrevPage() {
        if (currentPage !== 1) setCurrentPage(currentPage - 1);
        console.log(currentPage);
      }
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
