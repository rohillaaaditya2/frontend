
 import React from "react";
// import { DefaultContext } from "react-icons/lib";
 import { Link , Outlet } from "react-router-dom";
 import "./CustomerMain.css";


 function CustomerMain()
 {
    return(
        <div className="CustonerMain">
            <nav>
                <ul>
                    <li><Link to="/customermain/customerlogin">Login</Link></li>
                    <li><Link to="/customermain/customerreg">Registration</Link></li>
                </ul>
            </nav>
            <div className="customermAIN-OUTLET">
                <Outlet/>
            </div>

        </div>
    )
 }
 export  default CustomerMain;