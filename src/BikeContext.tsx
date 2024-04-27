// import axios from "axios";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const BikeContext = createContext({});

// eslint-disable-next-line react/prop-types
export function BikeContextProvider({ children }: any) {
  const [bikes, setBikes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [spinner, setSpinner] = useState(Boolean);
  const [error, setError] = useState('');
  const [noResult,setNoResult] = useState(false)
  const [dateRange, setDateRange] = useState("");
  const [AllRecords, setAllReacords] = useState([]);
  const [totalPage, setTotalPage] = useState(Number);
  const [recordsPerPage] = useState(10);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = bikes.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(totalPage / recordsPerPage);

  useEffect(() => {
    setSpinner(true);
    axios
      .get(
        `https://bikeindex.org:443/api/v3/search?page=${currentPage}&per_page=10&query=${searchQuery}&location=Munich&distance=10&stolenness=stolen`
      )
      .then((res) => {
        setBikes(res.data.bikes);

        setSpinner(false);
      }).catch(error=>{
        setError(error.response)
      })
      if(bikes.length === 0){
        setNoResult(true)
      }

      
  }, [searchQuery, currentPage]);

  useEffect(() => {
    axios
      .get("https://bikeindex.org:443/api/v3/search?stolenness=stolen")
      .then((res) => {
        setAllReacords(res.data.bikes);
        setTotalPage(res.data.bikes.length);
      });
  }, []);

  return (
    <BikeContext.Provider
      value={{
        bikes,
        setBikes,
        searchQuery,
        dateRange,
        setDateRange,
        setSearchQuery,
        currentPage,
        setCurrentPage,
        AllRecords,
        totalPage,
        spinner,
        nPages,
        error,
        setSpinner,
        setNoResult,
        noResult
      }}
    >
      {children}
    </BikeContext.Provider>
  );
}
