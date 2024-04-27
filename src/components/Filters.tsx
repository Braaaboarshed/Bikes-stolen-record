import React from "react";

const Filters = ({ setFilter, setDateRange, getSearchResult }: any) => {
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
