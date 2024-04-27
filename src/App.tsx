import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import ListingsPage from "./pages/ListingsPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ListingsPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
