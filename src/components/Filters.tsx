import React, { useContext, useState } from "react";
import { BikeContext } from "../BikeContext";

const Filters = () => {
  const [filter, setFilter] = useState("");
  const {searchQuery,setSearchQuery,noResult,setNoResult,setSpinner,setDateRange,setBikes,bikes,AllRecords,dateRange}:any = useContext(BikeContext) 

    function getSearchResult() {
        setSpinner(true)
        setSearchQuery(filter);
        if (searchQuery !== "")
          setBikes(
            bikes.filter((item: any) =>
              new Date(item?.date_stolen * 1000)
                .toISOString()
                .split("T")[0]
                .replace(/-/g, "/")
                .includes(dateRange)
            )
          );
        else {
          setBikes(
            AllRecords.filter((item: any) =>
              new Date(item?.date_stolen * 1000)
                .toISOString()
                .split("T")[0]
                .replace(/-/g, "/")
                .includes(dateRange)
            )
          );
        }
        noResult && bikes.length !== 0 ? setNoResult(false) : setNoResult(true);
        setSpinner(false)
      }
    
    
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="search by title"
        onChange={(e) => setFilter(e.target.value)}
      />
      <input
        type="text"
        placeholder="search by date"
        onChange={(e) => setDateRange(e.target.value)}
      />
      <button className="btn" onClick={getSearchResult}>
        Search
      </button>
    </div>
  );
};

export default Filters;
