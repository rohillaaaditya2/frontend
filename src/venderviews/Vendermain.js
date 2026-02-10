
import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./VenderMain.css";

function VenderMain() {
  return (
    <div className="vendermain">
      <nav className="vender-nav">
        <h2 className="logo">Vendor Panel</h2>

        <ul>
          <li>
            <Link to="/vendermain/venderlogin">Login</Link>
          </li>
          <li>
            <Link to="/vendermain/venderreg">Register</Link>
          </li>
        </ul>
      </nav>

      <div className="vendermainout">
        <Outlet />
      </div>
    </div>
  );
}

export default VenderMain;

