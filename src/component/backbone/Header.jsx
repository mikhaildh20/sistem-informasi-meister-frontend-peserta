import { useState, useEffect } from "react";
import { API_LINK, APPLICATION_ID, ROOT_LINK } from "../util/Constants";
import logo from "../../assets/IMG_Logo.png";

const Header = () => {
  return (
    <nav className="navbar custom-navbar">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src={logo}
            alt="Logo"
            className="d-inline-block align-text-top img-fluid"
            style={{ width: "150px", height: "auto" }}
          />
        </a>
      </div>
    </nav>
  );
};


export default Header;