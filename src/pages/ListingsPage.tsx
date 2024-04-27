import axios from "axios";
import "../index.css";
import bikeImage from "../../public/bike-image.jpeg";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import { error } from "console";
import Filters from "../components/Filters";
import Bike from "../components/Bike";
import Paginator from "../components/Paginator";
const ListingsPage = () => {
  const [spinner, setSpanner] = useState(false);
  const [bikes, setBikes] = useState([]);
  const [AllRecords, setAllReacords] = useState([]);
  const [totalPage, setTotalPage] = useState(Number);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState(filter);
  const [dateRange, setDateRange] = useState("");
  const [error, setError] = useState("");
  const [noResult, setNoResult] = useState(false);
  useEffect(() => {
    setSpanner(true);

    axios
      .get(
        `https://bikeindex.org:443/api/v3/search?page=${currentPage}&per_page=10&query=${searchQuery}&location=Munich&distance=10&stolenness=stolen`
      )
      .then((res) => {
        setBikes(res.data.bikes);
        setSpanner(false);
      })
      .catch((error) => {
        setError(error);
      });

    setNoResult(false);
  }, [currentPage, searchQuery]);

  useEffect(() => {
    axios
      .get("https://bikeindex.org:443/api/v3/search?stolenness=stolen")
      .then((res) => {
        setAllReacords(res.data.bikes);
        setTotalPage(res.data.bikes.length);
      });
  }, []);

  function goToNextPage() {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
    console.log(currentPage);
  }

  function goToPrevPage() {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
    console.log(currentPage);
  }
  function getSearchResult() {
    console.log(searchQuery);
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
  }

  const [recordsPerPage] = useState(10);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = bikes.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(totalPage / recordsPerPage);

  return (
    <div className="App">
      <div className="bikes-container">
        <Filters
          setFilter={setFilter}
          setDateRange={setDateRange}
          getSearchResult={getSearchResult}
        />
        {bikes.length > 0 && (
          <p className="record-number">there are {AllRecords.length} result</p>
        )}

        {bikes.map((item: any) => (
          <Bike item={item} />
        ))}

        {bikes.length > 0 && (
          
          <Paginator
            goToPrevPage={goToPrevPage}
            nPages={nPages}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            goToNextPage={goToNextPage}
          />
        )}
      </div>

      {spinner && <ScaleLoader color="#000000" />}
      {noResult && <h1>No Result</h1>}
      {error &&  <h1>there are an error</h1>}
    </div>
  );
};

export default ListingsPage;
