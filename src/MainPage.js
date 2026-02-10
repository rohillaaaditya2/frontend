

// export default MainPage;
import React, { useEffect, useState } from "react";
import "./MainPage.css";

import {
  Routes,
  Route,
  Link,
  Navigate,
  BrowserRouter,
} from "react-router-dom";

import ProductListforMainPage from "./productviews/ProductlistforMainpage";
import AdminLogin from "./adminviews/AdminLogin";
import AdminHome from "./adminviews/AdminHome";
import CustomerMain from "./customerviews/CustomerMain";
import CustomerLogin from "./customerviews/CustomerLogin";
import CustomerReg from "./customerviews/CustomerReg";
import CustomerHome from "./customerviews/CustomerHome";
import VenderLogin from "./venderviews/VenderLogin";
import VenderReg from "./venderviews/VenderReg";
import VenderHome from "./venderviews/VenderHome";
import Bill from "./customerviews/Bill";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AdminMain from "./adminviews/AdminMain";
import VenderMain from "./venderviews/Vendermain";

import Footer from "./components/Footer";
import HeroSlider from "./components/HeroSlider";

import {
  FaSun,
  FaMoon,
  FaShoppingCart,
  FaMapMarkerAlt,
  FaGlobe,
} from "react-icons/fa";

function MainPage() {
  /* ================= THEME ================= */
  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    if (mode === "light") setMode("dark");
    else if (mode === "dark") setMode("accent");
    else setMode("light");
  };

  /* ================= LANGUAGE ================= */
  const [lang, setLang] = useState("en");
  const toggleLang = () => setLang(lang === "en" ? "hi" : "en");

  const labels = {
    en: {
      home: "Home",
      admin: "Admin",
      customer: "Customer",
      vendor: "Vendor",
      location: "Location",
      search: "Search products...",
      theme: "Theme",
    },
    hi: {
      home: "होम",
      admin: "एडमिन",
      customer: "ग्राहक",
      vendor: "विक्रेता",
      location: "लोकेशन",
      search: "प्रोडक्ट खोजें...",
      theme: "थीम",
    },
  };

  /* ================= LOCATION ================= */
  const [location, setLocation] = useState("Detecting...");

  useEffect(() => {
    if (!navigator.geolocation) return setLocation("Unavailable");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          setLocation(
            data.address.city ||
              data.address.town ||
              data.address.village ||
              "Unknown"
          );
        } catch {
          setLocation("Unknown");
        }
      },
      () => setLocation("Permission denied")
    );
  }, []);

  /* ================= SEARCH ================= */
  const [searchText, setSearchText] = useState("");

  return (
    <BrowserRouter>
      <div className={`mainpage ${mode}`}>
        {/* ================= HEADER ================= */}
        <header className="main-header">
          <div className="header-left">
            <div className="logo">MyShop</div>

            <div className="cart-icon">
              <FaShoppingCart />
            </div>

            <div className="location-box">
              <FaMapMarkerAlt />
              <div>
                <small>{labels[lang].location}</small>
                <div className="location-text">{location}</div>
              </div>
            </div>
          </div>

          <div className="header-center">
            <input
              className="search-input"
              placeholder={labels[lang].search}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <div className="header-right">
            <nav className="main-nav">
              <Link to="/">{labels[lang].home}</Link>
              <Link to="/adminmain">{labels[lang].admin}</Link>
              <Link to="/customermain">{labels[lang].customer}</Link>
              <Link to="/vendermain">{labels[lang].vendor}</Link>
            </nav>

            <button onClick={toggleLang} className="icon-btn">
              <FaGlobe /> {lang === "en" ? "HI" : "EN"}
            </button>

            <button onClick={toggleMode} className="icon-btn">
              {mode === "light" ? <FaMoon /> : <FaSun />}
              <span className="theme-text">
                {labels[lang].theme}: {mode}
              </span>
            </button>
          </div>
        </header>

        <HeroSlider />

        {/* ================= ROUTES ================= */}
        <Routes>
          <Route
            path="/"
            element={<ProductListforMainPage searchText={searchText} />}
          />

          <Route path="/adminmain" element={<AdminMain />}>
            <Route index element={<Navigate to="adminlogin" replace />} />
            <Route path="adminlogin" element={<AdminLogin />} />
            <Route
              path="adminhome"
              element={
                <AdminProtectedRoute role="admin">
                  <AdminHome />
                </AdminProtectedRoute>
              }
            />
          </Route>

          <Route path="/customermain" element={<CustomerMain />}>
            <Route index element={<Navigate to="customerlogin" replace />} />
            <Route path="customerlogin" element={<CustomerLogin />} />
            <Route path="customerreg" element={<CustomerReg />} />
            <Route
              path="customerhome"
              element={
                <AdminProtectedRoute role="customer">
                  <CustomerHome />
                </AdminProtectedRoute>
              }
            />
          </Route>

          <Route path="/vendermain" element={<VenderMain />}>
            <Route index element={<Navigate to="venderlogin" replace />} />
            <Route path="venderlogin" element={<VenderLogin />} />
            <Route path="venderreg" element={<VenderReg />} />
            <Route
              path="venderhome"
              element={
                <AdminProtectedRoute role="vender">
                  <VenderHome />
                </AdminProtectedRoute>
              }
            />
          </Route>

          <Route path="/bill" element={<Bill />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* ================= FOOTER ================= */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default MainPage;
