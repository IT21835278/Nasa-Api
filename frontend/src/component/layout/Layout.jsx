import React from "react";
import Header from "../header/Header";
import NavigationBar from "../navigationBar/navigationBar";

const Layout = ({ children }) => {
  return (
    <>
    <Header/>
    <NavigationBar/>
    <div style={{ minHeight: "80vh" }} className="--pad">
        {children}
      </div>
    </>
  );
};

export default Layout;