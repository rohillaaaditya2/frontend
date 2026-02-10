
//   import React from "react";
//    import { Link,Outlet,useLocation } from "react-router-dom";
//    import "./VenderMain.css";
// //    import sellerHero from "./SellerHero";
// import { Navigate } from "react-router-dom";

// <Route path="/vendermain" element={<VenderMain />}>
//   <Route index element={<Navigate to="venderlogin" />} />
//   <Route path="venderlogin" element={<VenderLogin />} />
//   <Route path="venderreg" element={<VenderRegistration />} />
// </Route>


//    function VenderMain()
//    {
//     const location = useLocation();
//     const currentPath = location.pathname.replace(/\/$/,"");

//     const  hideHero = currentPath === "/vendermain/venderlogin" || currentPath === "/vendermain/venderreg";

//     return(
//         <div className="vendermain">
//             <center>
//             <nav className="vender-nav">
//       <ul>
//         <li>
//                     <Link to="/vendermain/venderlogin">Login</Link>

//         </li>
//         <li>
//         <Link to="/vendermain/venderreg">Registration</Link>
//                </li>
//       </ul>
//             </nav>

//                 {/* <h2 className="venddermain">Vender panel</h2> */}

//                  {/* SHOW HERO OR LOGIN/Registration,NEVER BOTH */}

//                  {
//                     hideHero ? (
//                         <div className="vendermainout">
//                             <Outlet/>
//                         </div>

//                     ) : (
//                         <sellerHero/>

//                     )} 
//                     </center>
//         </div>
//     )
//    }
//    export default VenderMain;
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

