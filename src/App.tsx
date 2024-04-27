import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import ListingsPage from "./pages/ListingsPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BikeContextProvider } from "./BikeContext";

function App() {
  return (
    <>
      <BikeContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<ListingsPage />} />
        </Routes>
        <Footer />
      </BikeContextProvider>

    </>
  );
}

export default App;
