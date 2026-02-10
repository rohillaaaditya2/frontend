
import React, { useState, useEffect } from "react";
import {
  FaShoppingCart,
  FaUserEdit,
  FaBoxOpen,
  FaTruck,
  FaKey,
  FaSignOutAlt,
  FaBell,
} from "react-icons/fa";

import ProductList from "../productviews/ProductList";
import BillByID from "./BillbyID";
import OrderTracking from "./OrderTracking";
import EditCustomerProfile from "./EditCustomerProfile";
import Customer_Change_Pass from "./Customer_Change_Pass";

import "./customerHome.css";

function CustomerHome() {
  const [user, setUser] = useState(null);
  const [activeView, setActiveView] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(false);

  /* ===== LOAD USER SESSION ===== */
  useEffect(() => {
    const localData = localStorage.getItem("userSession");
    const sessionData = sessionStorage.getItem("userSession");
    const userData = localData || sessionData;

    if (!userData) {
      alert("Session expired. Please login again.");
      return;
    }
    setUser(JSON.parse(userData));
  }, []);

  /* ===== VIEW SWITCH ===== */
  const switchView = (view) => {
    setIsLoading(true);
    setTimeout(() => {
      setActiveView(view);
      setIsLoading(false);
    }, 400);
  };

  /* ===== LOGOUT ===== */
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("userSession");
      sessionStorage.removeItem("userSession");
      localStorage.removeItem("customertoken");
      window.location.reload();
    }
  };

  if (!user) return null;

  return (
    <div className="ch-container">
      {/* ================= SIDEBAR ================= */}
      <aside className="ch-sidebar">
        <div className="ch-user-box">
          <img
            src={`https://server-app-xite.onrender.com/customer/getimage/${user.Cpicname}`}
            alt="Customer"
          />
          <h4>{user.cfname}</h4>
        </div>

        <div className="ch-menu">
          <button
            className={activeView === "profile" ? "active" : ""}
            onClick={() => switchView("profile")}
          >
            <FaUserEdit /> Edit Profile
          </button>

          <button
            className={activeView === "shopping" ? "active" : ""}
            onClick={() => switchView("shopping")}
          >
            <FaShoppingCart /> Shopping
          </button>

          <button
            className={activeView === "orders" ? "active" : ""}
            onClick={() => switchView("orders")}
          >
            <FaBoxOpen /> My Orders
          </button>

          <button
            className={activeView === "tracking" ? "active" : ""}
            onClick={() => switchView("tracking")}
          >
            <FaTruck /> Track Orders
          </button>

          <button
            className={activeView === "password" ? "active" : ""}
            onClick={() => switchView("password")}
          >
            <FaKey /> Change Password
          </button>

          <button className="logout" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="ch-main">
        {/* ===== TOP BAR ===== */}
        <div className="ch-topbar">
          <h2>Customer Dashboard</h2>
          <div className="ch-top-icons">
            <FaBell size={20} />
          </div>
        </div>

        {/* ===== LOADER ===== */}
        {isLoading && (
          <div className="ch-loader-wrapper">
            <div className="ch-spinner"></div>
            <p>Loading...</p>
          </div>
        )}

        {/* ===== CONTENT ===== */}
        {!isLoading && (
          <div className="ch-card">
            {activeView === "dashboard" && (
              <>
                <h3>Welcome back, {user.cfname} 👋</h3>
                <p>Select an option from the left menu.</p>
              </>
            )}

            {activeView === "shopping" && (
              <ProductList data={user.Cid} />
            )}

            {activeView === "orders" && (
              <BillByID data={user.Cid} />
            )}

            {activeView === "tracking" && (
              <OrderTracking
                CUserId={user.Cid || user.CUserId}
                onClose={() => setActiveView("dashboard")}
              />
            )}

            {activeView === "profile" && (
              <EditCustomerProfile
                user={user}
                onClose={() => setActiveView("dashboard")}
                onUpdate={(updatedUser) => {
                  const updatedSession = {
                    cfname: updatedUser.CustomerName,
                    cpicname: updatedUser.CPicName,
                    Cid: updatedUser.Cid,
                  };
                  setUser(updatedSession);
                  localStorage.setItem(
                    "userSession",
                    JSON.stringify(updatedSession)
                  );
                }}
              />
            )}

            {activeView === "password" && (
              <Customer_Change_Pass
                Customer={user}
                onClose={() => setActiveView("dashboard")}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default CustomerHome;
