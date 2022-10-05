import React from "react";

import { Routes, Route, Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import logo from "../images/logo.png";

export default function Header() {
  const location = useLocation();
  return (
    <div className="header">
      <div className="header-left">
        {location.pathname !== "/" && (
          <Link to="/">
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
        )}
        <Link className="logo" to="/">
          <img src={logo} className="logo" alt="" />
        </Link>
      </div>
      <div className="header-right">
        <p>Create and Share Samples, Listen in Mobile App!</p>
      </div>
    </div>
  );
}
