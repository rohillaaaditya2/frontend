
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
