
//  import React,{useState} from "react";
//  import { useNavigate } from "react-router-dom";
//  import StateMgt from "./StateMgt";
//  import CityMgt from "./CityMgt";
//  import ProductCatMgt from "./ProductCatgMgt";
//  import VenderMgt from "./VenderMgt";
//  import "../index.css";
//  import ShowBills from "./ShowBills";
//  import ProductList from "./ProductList";
//  import CustomerMgt from "./CustomerMgt";
//  import UpdateOrderStatus from "./UpdateOrderStatus";
//  import AdminVenderSales from "./AdminVendorSales";

//  import "./AdminHome.css";
 

//  function AdminHome()
//  {
//     const [isstateshow,setIsStateShow] = useState(false);
//     const [iscityshow,setIsCityShow] = useState(false);
//     const [ispcatgshow,setIsPCatgShow] = useState(false);
//     const [isvendershow,setIsVenderShow] = useState(false);
//     const [isbillshow,setIsBillShow] = useState(false);
//     const [isproductlistshow,setIsProductListShow] = useState(false);
//     const [iscustomershow,setIsCustomerShow] = useState(false);
//     const [isupdateordershow,setIsUpdateOrderShow] = useState(false);
//     const [isvendersalesshow,setIsVenderSalesShow] = useState(false);
//     // const navigate = useNavigate();

//     function LogOutButtonClick()
//     {
//         localStorage.removeItem("admintoken");
//         // navigate("/adminmain/adminlogin");
//     }

//     return(
//         <div className="AdimHome">
//             <center>
//                 <h4>Admin DashBoard</h4>
//                 <div style={{backgroundColor:"gray"}}>
//                     <button onClick={() => setIsStateShow(!isstateshow)} className="BUTTONstate">State</button>

//      <button onClick={() => setIsCityShow(!iscityshow)} className="BUTTONcity" style={{marginLeft:10}}>City</button> 

//       <button onClick={() => setIsPCatgShow(!ispcatgshow)} className="BUTTONpcatg" style={{marginLeft:10}}>Category</button> 

//       <button onClick={() => setIsVenderShow(!isvendershow)} className="BUTTONvender" style={{marginLeft:10}}>Vender</button> 

//      <button onClick={() => setIsBillShow(!isbillshow)} className="BUTTONbill" style={{marginLeft:10}}>Bills</button> 

//      <button onClick={() => setIsUpdateOrderShow(!isupdateordershow)} className="BUTTONupdate" style={{marginLeft:10}}>Order Status</button> 

//      <button onClick={() => setIsProductListShow(!isproductlistshow)} className="BUTTONproduct" style={{marginLeft:10}}>Product</button> 

//      <button onClick={() => setIsCustomerShow(!iscustomershow)} className="BUTTONcustomer" style={{marginLeft:10}}>Customer</button> 

//      <button onClick={() => setIsVenderSalesShow(!isvendersalesshow)} className="BUTTONvensale" style={{marginLeft:10}}>Vender Sales</button> 
      
//      <button onClick={LogOutButtonClick} className="BUTTONlogout" style={{marginLeft:10}}>Logout</button>
//                 </div>

//                 {isstateshow && <StateMgt/>}
//                 {iscityshow && <CityMgt/>}
//                 {ispcatgshow && <ProductCatMgt/>}
//                 {isvendershow && <VenderMgt/>}
//                 {isbillshow && <ShowBills/>}
//                 {isproductlistshow && <ProductList/>}
//                 {iscustomershow && <CustomerMgt/>}
//                 {isupdateordershow && <UpdateOrderStatus updateByName={"Admin"}/>}
//                 {isvendersalesshow && <AdminVenderSales/>}
//             </center>
//         </div>
//     )
//  }
//   export default AdminHome;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import StateMgt from "./StateMgt";
// import CityMgt from "./CityMgt";
// import ProductCatMgt from "./ProductCatgMgt";
// import VenderMgt from "./VenderMgt";
// import ShowBills from "./ShowBills";
// import ProductList from "./ProductList";
// import CustomerMgt from "./CustomerMgt";
// import UpdateOrderStatus from "./UpdateOrderStatus";
// import AdminVenderSales from "./AdminVendorSales";

// import "./AdminHome.css";

// function AdminHome() {
//   const navigate = useNavigate();

//   const [isstateshow, setIsStateShow] = useState(false);
//   const [iscityshow, setIsCityShow] = useState(false);
//   const [ispcatgshow, setIsPCatgShow] = useState(false);
//   const [isvendershow, setIsVenderShow] = useState(false);
//   const [isbillshow, setIsBillShow] = useState(false);
//   const [isproductlistshow, setIsProductListShow] = useState(false);
//   const [iscustomershow, setIsCustomerShow] = useState(false);
//   const [isupdateordershow, setIsUpdateOrderShow] = useState(false);
//   const [isvendersalesshow, setIsVenderSalesShow] = useState(false);

//   /* ================= CLOSE ALL ================= */
//   const closeAll = () => {
//     setIsStateShow(false);
//     setIsCityShow(false);
//     setIsPCatgShow(false);
//     setIsVenderShow(false);
//     setIsBillShow(false);
//     setIsProductListShow(false);
//     setIsCustomerShow(false);
//     setIsUpdateOrderShow(false);
//     setIsVenderSalesShow(false);
//   };

//   /* ================= LOGOUT (FIXED) ================= */
//   const LogOutButtonClick = () => {
//     localStorage.removeItem("admintoken");
//     navigate("/adminmain/adminlogin", { replace: true });
//   };

//   return (
//     <div className="AdimHome">
//       <center>
//         <h4>Admin Dashboard</h4>

//         {/* ===== MENU BAR ===== */}
//         <div className="admin-menu-bar">
//           <button onClick={() => { closeAll(); setIsStateShow(true); }}>
//             State
//           </button>

//           <button onClick={() => { closeAll(); setIsCityShow(true); }}>
//             City
//           </button>

//           <button onClick={() => { closeAll(); setIsPCatgShow(true); }}>
//             Category
//           </button>

//           <button onClick={() => { closeAll(); setIsVenderShow(true); }}>
//             Vender
//           </button>

//           <button onClick={() => { closeAll(); setIsBillShow(true); }}>
//             Bills
//           </button>

//           <button onClick={() => { closeAll(); setIsUpdateOrderShow(true); }}>
//             Order Status
//           </button>

//           <button onClick={() => { closeAll(); setIsProductListShow(true); }}>
//             Product
//           </button>

//           <button onClick={() => { closeAll(); setIsCustomerShow(true); }}>
//             Customer
//           </button>

//           <button onClick={() => { closeAll(); setIsVenderSalesShow(true); }}>
//             Vender Sales
//           </button>

//           <button className="BUTTONlogout" onClick={LogOutButtonClick}>
//             Logout
//           </button>
//         </div>

//         {/* ===== CONTENT ===== */}
//         <div className="admin-content">
//           {isstateshow && <StateMgt />}
//           {iscityshow && <CityMgt />}
//           {ispcatgshow && <ProductCatMgt />}
//           {isvendershow && <VenderMgt />}
//           {isbillshow && <ShowBills />}
//           {isproductlistshow && <ProductList />}
//           {iscustomershow && <CustomerMgt />}
//           {isupdateordershow && (
//             <UpdateOrderStatus updateByName="Admin" />
//           )}
//           {isvendersalesshow && <AdminVenderSales />}
//         </div>
//       </center>
//     </div>
//   );
// }

// export default AdminHome;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import StateMgt from "./StateMgt";
import CityMgt from "./CityMgt";
import ProductCatMgt from "./ProductCatgMgt";
import VenderMgt from "./VenderMgt";
import ShowBills from "./ShowBills";
import ProductList from "./ProductList";
import CustomerMgt from "./CustomerMgt";
import UpdateOrderStatus from "./UpdateOrderStatus";
import AdminVenderSales from "./AdminVendorSales";

import "./AdminHome.css";

function AdminHome() {
  const navigate = useNavigate();

  const [active, setActive] = useState("dashboard");

  const closeAll = () => setActive("");

  const logout = () => {
    localStorage.removeItem("admintoken");
    navigate("/adminmain/adminlogin", { replace: true });
  };

  return (
    <div className="admin-layout">

      {/* ===== SIDEBAR ===== */}
      <aside className="admin-sidebar">
        <h3 className="sidebar-title">Seller Central</h3>

        <button className={active === "state" ? "active" : ""}
          onClick={() => setActive("state")}>State</button>

        <button className={active === "city" ? "active" : ""}
          onClick={() => setActive("city")}>City</button>

        <button className={active === "category" ? "active" : ""}
          onClick={() => setActive("category")}>Category</button>

        <button
  className={active === "bill" ? "active" : ""}
  onClick={() => setActive("bill")}
>
  Bills
</button>

        <button className={active === "vendor" ? "active" : ""}
          onClick={() => setActive("vendor")}>Vendor</button>

        <button className={active === "product" ? "active" : ""}
          onClick={() => setActive("product")}>Product</button>

        <button className={active === "customer" ? "active" : ""}
          onClick={() => setActive("customer")}>Customer</button>

        <button className={active === "order" ? "active" : ""}
          onClick={() => setActive("order")}>Order Status</button>

        <button className={active === "sales" ? "active" : ""}
          onClick={() => setActive("sales")}>Vendor Sales</button>

        <button className="logout-btn" onClick={logout}>Logout</button>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className="admin-main">

        {/* ===== DASHBOARD CARDS ===== */}
        {active === "dashboard" && (
          <div className="dashboard-cards">
            <div className="card">Total Orders<br /><b>1,240</b></div>
            <div className="card">Total Vendors<br /><b>78</b></div>
            <div className="card">Total Customers<br /><b>2,510</b></div>
            <div className="card">Revenue<br /><b>₹4.8L</b></div>
          </div>
        )}

        {/* ===== MODULES ===== */}
        {active === "state" && <StateMgt />}
        {active === "city" && <CityMgt />}
        {active === "category" && <ProductCatMgt />}
        {active === "vendor" && <VenderMgt />}
        {active === "product" && <ProductList />}
        {active === "customer" && <CustomerMgt />}
        {active === "order" && <UpdateOrderStatus updateByName="Admin" />}
        {active === "sales" && <AdminVenderSales />}
        {active === "bill" && <ShowBills />}

      </main>
    </div>
  );
}

export default AdminHome;
