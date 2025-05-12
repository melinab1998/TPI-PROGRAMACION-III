import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import Login from "../../components/Login/Login";
import "../Layout/Layout.css";
import NavBarAdmin from "../../components/NavBarAdmin/NavBarAdmin";

const Layout = () => {
  const [showLogin, setShowLogin] = useState(false);
  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  return (
    <>
      <Login showLogin={showLogin} toggleLogin={toggleLogin} />
      {/*<NavBar toggleLogin={toggleLogin}/>*/}
      <NavBarAdmin/>
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;