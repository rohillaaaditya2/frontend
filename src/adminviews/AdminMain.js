
  import React from "react";
   import { Link,Outlet } from "react-router-dom";
   import { FaUserShield } from "react-icons/fa";
   import "./AdminMain.css";


   function AdminMain()
   {
    
    return(
        <div className="Adminmain">
           <header className="adminheader">

    <div className="admindivv"><FaUserShield size={40} color="green"/>Admin DashBoard </div>

     <div></div>
     <nav className="adminnav">
        <Link to="/adminmain/adminlogin">Login</Link>
        <Link to="/adminmain/adminreg">Registration</Link>
     </nav>
     </header>

                     {/* PAGE CONTENT */}

                     <main className="adminmainn">
                        <Outlet/>
                     </main>
        </div>
    )
   }
   export default AdminMain;
