import "../index.css";

import React, { useContext, useState } from "react";
import { ScaleLoader } from "react-spinners";
import Filters from "../components/Filters";
import Bike from "../components/Bike";
import Paginator from "../components/Paginator";
import { BikeContext } from "../BikeContext";
const ListingsPage = () => {
  const {spinner}:any = useContext(BikeContext)
  const {bikes,error,noResult}:any = useContext(BikeContext)
  const {AllRecords}:any = useContext(BikeContext)
  return (
    <div className="App">
      <div className="bikes-container">

        <Filters />

        {bikes.length > 0 && (
          <p className="record-number">there are {AllRecords.length} result</p>
        )}

        {bikes.map((item: any) => (
          <Bike item={item} />
        ))}

        {bikes.length > 0 && (
 
          <Paginator/>
        )}
      </div>

      {spinner  ? <ScaleLoader color="#000000" /> : null}
      {(bikes.length ===0 && !spinner)  && <h1>No Result</h1>}
      {error &&  <h1>{error}</h1>}
    </div>
  );
};

export default ListingsPage;
