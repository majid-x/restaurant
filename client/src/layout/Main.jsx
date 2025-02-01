import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../App.css";
import "../index.css";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthProvider";
import LoadingSpinner from "../components/LoadingSpinner";
const Main = () => {
  const { loading } = useContext(AuthContext);
  return (
    <div className="bg-prigmayBG">
      {loading ? (
        <LoadingSpinner></LoadingSpinner>
      ) : (
        <div>
          <Navbar></Navbar>
          <div className="min-h-screen">
            <Outlet></Outlet>
          </div>
          <Footer></Footer>
        </div>
      )}
    </div>
  );
};

export default Main;
