import React, { useState } from "react";
import EditVenderProfile from "./EditVenderProfile";
import Product from "../productviews/Product";
import Vender_Change_Pass from "./Vender_change_Pass";
import VenderSales from "./VenderSales";
import InventoryDashboard from "./InventoryDashboard";
import "./VenderHome.css";

function VenderHome({ vender, onLogout }) {
  // 🔥 single active section
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "edit":
        return (
          <EditVenderProfile
            vender={vender}
            onClose={() => setActiveSection("dashboard")}
            onUpdate={() => {}}
          />
        );

      case "password":
        return <Vender_Change_Pass />;

      case "product":
        return <Product data={vender.Vid} />;

      case "sales":
        return <VenderSales vender={vender} />;

      case "inventory":
        return <InventoryDashboard vid={vender.Vid} />;

      default:
        return (
          <div className="vh-dashboard">
            <div className="vh-card">Total Products</div>
            <div className="vh-card">Total Orders</div>
            <div className="vh-card">Pending Orders</div>
            <div className="vh-card">Revenue</div>
          </div>
        );
    }
  };

  return (
    <div className="vh-layout">
      {/* ===== SIDEBAR ===== */}
      <aside className="vh-sidebar">
        <h2 className="vh-logo">Seller Central</h2>

        <button
          onClick={() => setActiveSection("dashboard")}
          className={activeSection === "dashboard" ? "active" : ""}
        >
          Dashboard
        </button>

        <button
          onClick={() => setActiveSection("edit")}
          className={activeSection === "edit" ? "active" : ""}
        >
          Edit Profile
        </button>

        <button
          onClick={() => setActiveSection("password")}
          className={activeSection === "password" ? "active" : ""}
        >
          Change Password
        </button>

        <button
          onClick={() => setActiveSection("product")}
          className={activeSection === "product" ? "active" : ""}
        >
          Manage Product
        </button>

        <button
          onClick={() => setActiveSection("sales")}
          className={activeSection === "sales" ? "active" : ""}
        >
          View Sales
        </button>

        <button
          onClick={() => setActiveSection("inventory")}
          className={activeSection === "inventory" ? "active" : ""}
        >
          Inventory
        </button>

        <button
          className="logout"
          onClick={() => {
            localStorage.removeItem("venderSession");
            onLogout();
          }}
        >
          Logout
        </button>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className="vh-main">
        <div className="vh-topbar">
          <img
            src={vender.imageUrl}
            alt="vendor"
          />
          <div>
            <h3>{vender.VenderName}</h3>
            <p>{vender.VEmail}</p>
          </div>
        </div>

        <div className="vh-content">{renderContent()}</div>
      </main>
    </div>
  );
}

export default VenderHome;
