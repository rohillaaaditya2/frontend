// // // // // import React, { useState } from "react";
// // // // // import "./MainPage.css";

// // // // // import {
// // // // //   BrowserRouter as Router,
// // // // //   Routes,
// // // // //   Route,
// // // // //   Link,
// // // // //   Navigate,
// // // // //   BrowserRouter,
// // // // // } from "react-router-dom";

// // // // // import ProductListforMainPage from "./productviews/ProductlistforMainpage";
// // // // // import AdminLogin from "./adminviews/AdminLogin";
// // // // // import AdminHome from "./adminviews/AdminHome";
// // // // // import CustomerMain from "./customerviews/CustomerMain";
// // // // // import CustomerLogin from "./customerviews/CustomerLogin";
// // // // // import CustomerReg from "./customerviews/CustomerReg";
// // // // // import CustomerHome from "./customerviews/CustomerHome";
// // // // // import VenderLogin from "./venderviews/VenderLogin";
// // // // // import VenderReg from "./venderviews/VenderReg.js";
// // // // // import VenderHome from "./venderviews/VenderHome";
// // // // // import Bill from "./customerviews/Bill";
// // // // // import AdminProtectedRoute from "./components/AdminProtectedRoute";
// // // // // import AdminMain from "./adminviews/AdminMain";

// // // // // import VenderMain from "./venderviews/Vendermain.js";

// // // // // // ✅ Icons import
// // // // // import { FaSun, FaMoon } from "react-icons/fa";
// // // // // import HeroSlider from "./components/HeroSlider.jsx";

// // // // // function MainPage() {
// // // // //    const productImages = [
// // // // //     "https://m.media-amazon.com/images/I/61BGE6iu4AL._SL1500_.jpg",
// // // // //     "https://m.media-amazon.com/images/I/71xb2xkN5qL._SL1500_.jpg",
// // // // //     "https://m.media-amazon.com/images/I/61n8y0F9lXL._SL1500_.jpg",
// // // // //   ];
// // // // //   // Theme mode state
// // // // //   const [mode, setMode] = useState("light"); // light / dark / accent

// // // // //   const toggleMode = () => {
// // // // //     if (mode === "light") setMode("dark");
// // // // //     else if (mode === "dark") setMode("accent");
// // // // //     else setMode("light");
// // // // //   };

// // // // //   return (
// // // // //     <BrowserRouter>
// // // // //       {/* Add dynamic mode class */}
// // // // //       <div className={`mainpage ${mode}`}>
// // // // //         <header className="main-header">
// // // // //           <nav className="main-nav">
// // // // //             <Link to="/">Home</Link> <span>|</span>
// // // // //             <Link to="/adminmain">Admin</Link> <span>|</span>
// // // // //             <Link to="/customermain">Customer</Link> <span>|</span>
// // // // //             <Link to="/vendermain">Vender</Link>

// // // // //             {/* ✅ Theme toggle icon */}
// // // // //             <button className="theme-toggle-btn" onClick={toggleMode}>
// // // // //               {mode === "light" ? <FaMoon /> : mode === "dark" ? <FaSun /> : <FaMoon />}
// // // // //             </button>
// // // // //           </nav>
// // // // //         </header>
// // // // //         <HeroSlider/>
// // // // //          {/* <div style={{ padding: "40px" }}>
// // // // //       <ProductSlider images={productImages} />
// // // // //     </div> */}

// // // // //         <Routes>
// // // // //           {/* HOME */}  
// // // // //           <Route
// // // // //             path="/"
// // // // //             element={
// // // // //               <>
// // // // //                 <ProductListforMainPage />
// // // // //               </>
// // // // //             }
// // // // //           />

// // // // //           {/* ADMIN */}
// // // // //           <Route path="/adminmain" element={<AdminMain />}>
// // // // //             <Route index element={<Navigate to="adminlogin" replace />} />
// // // // //             <Route path="adminlogin" element={<AdminLogin />} />
// // // // //             <Route
// // // // //               path="adminhome"
// // // // //               element={
// // // // //                 <AdminProtectedRoute role="admin">
// // // // //                   <AdminHome />
// // // // //                 </AdminProtectedRoute>
// // // // //               }
// // // // //             />
// // // // //           </Route>

// // // // //           {/* CUSTOMER */}
// // // // //           <Route path="/customermain" element={<CustomerMain />}>
// // // // //             <Route index element={<Navigate to="customerlogin" replace />} />
// // // // //             <Route path="customerlogin" element={<CustomerLogin />} />
// // // // //             <Route path="customerreg" element={<CustomerReg />} />
// // // // //             <Route
// // // // //               path="customerhome"
// // // // //               element={
// // // // //                 <AdminProtectedRoute role="customer">
// // // // //                   <CustomerHome />
// // // // //                 </AdminProtectedRoute>
// // // // //               }
// // // // //             />
// // // // //           </Route>

// // // // //           {/* VENDER */}
// // // // //           <Route path="/vendermain" element={<VenderMain />}>
// // // // //             <Route index element={<Navigate to="venderlogin" replace />} />
// // // // //             <Route path="venderlogin" element={<VenderLogin />} />
// // // // //             <Route path="venderreg" element={<VenderReg />} />
// // // // //             <Route
// // // // //               path="venderhome"
// // // // //               element={
// // // // //                 <AdminProtectedRoute role="vender">
// // // // //                   <VenderHome />
// // // // //                 </AdminProtectedRoute>
// // // // //               }
// // // // //             />
// // // // //           </Route>

// // // // //           {/* VENDER PROTECTED */}
// // // // //           <Route
// // // // //             path="/manageproducts"
// // // // //             element={
// // // // //               <AdminProtectedRoute role="vender">
// // // // //                 {/* <ManageProduct /> */}
// // // // //               </AdminProtectedRoute>
// // // // //             }
// // // // //           />

// // // // //           {/* BILL */}
// // // // //           <Route path="/bill" element={<Bill />} />

// // // // //           {/* FALLBACK */}
// // // // //           <Route path="*" element={<Navigate to="/" replace />} />
// // // // //         </Routes>
// // // // //       </div>
// // // // //     </BrowserRouter>
// // // // //   );
// // // // // }

// // // // // export default MainPage;

















// // // // // import React from "react";
// // // // // import "./MainPage.css";


// // // // // import {
// // // // //   BrowserRouter as Router,
// // // // //   Routes,
// // // // //   Route,
// // // // //   Link,
// // // // //   Navigate,
// // // // //   BrowserRouter,
// // // // // } from "react-router-dom";

// // // // // import ProductListforMainPage from "./productviews/ProductlistforMainpage";
// // // // // import AdminLogin from "./adminviews/AdminLogin";
// // // // // import AdminHome from "./adminviews/AdminHome";
// // // // // import CustomerMain from "./customerviews/CustomerMain";
// // // // // import CustomerLogin from "./customerviews/CustomerLogin";
// // // // // import CustomerReg from "./customerviews/CustomerReg";
// // // // // import CustomerHome from "./customerviews/CustomerHome";
// // // // // import VenderLogin from "./venderviews/VenderLogin";
// // // // // import VenderReg from "./venderviews/VenderReg.js";
// // // // // import VenderHome from "./venderviews/VenderHome";
// // // // // import Bill from "./customerviews/Bill";
// // // // // import AdminProtectedRoute from "./components/AdminProtectedRoute";
// // // // // import AdminMain from "./adminviews/AdminMain";

// // // // // // import ManageProduct from "./productviews/ManageProduct";
// // // // // //  import ThemeToggle from "./components/ThemeToggle";
// // // // // //  import AdminReg from "./adminviews/AdminReg";
// // // // //  import VenderMain from "./venderviews/Vendermain.js";
// // // // // //  import MySlider from "./MySlider";

// // // // // function MainPage() {
// // // // //   return (
// // // // //     <BrowserRouter>
// // // // //       <div className="mainpage">
// // // // //         <header className="main-header">
// // // // //           <nav className="main-nav">
// // // // //             <Link to="/">Home</Link> <span>|</span>
// // // // //             <Link to="/adminmain">Admin</Link> <span>|</span>
// // // // //             <Link to="/customermain">Customer</Link> <span>|</span>
// // // // //             <Link to="/vendermain">Vender</Link>
// // // // //             {/* <ThemeToggle /> */}
// // // // //           </nav>
// // // // //         </header>

// // // // //         <Routes>
// // // // //           {/* HOME */}
// // // // //           <Route
// // // // //             path="/"
// // // // //             element={
// // // // //               <>
// // // // //                 {/* <MySlider /> */}
// // // // //                 <ProductListforMainPage />
// // // // //               </>
// // // // //             }
// // // // //           />

                        

// // // // //           {/* ADMIN */}
// // // // //           <Route path="/adminmain" element={<AdminMain />}>
// // // // //             <Route index element={<Navigate to="adminlogin" replace />} />
// // // // //             <Route path="adminlogin" element={<AdminLogin />} />
// // // // //             {/* <Route path="adminreg" element={<AdminReg />} /> */}
// // // // //             <Route
// // // // //               path="adminhome"
// // // // //               element={
// // // // //                 <AdminProtectedRoute role="admin">
// // // // //                   <AdminHome />
// // // // //                 </AdminProtectedRoute>
// // // // //               }
// // // // //             />
// // // // //           </Route>

// // // // //           {/* CUSTOMER */}
// // // // //           <Route path="/customermain" element={<CustomerMain />}>
// // // // //             <Route index element={<Navigate to="customerlogin" replace />} />
// // // // //             <Route path="customerlogin" element={<CustomerLogin />} />
// // // // //             <Route path="customerreg" element={<CustomerReg />} />
// // // // //             <Route
// // // // //               path="customerhome"
// // // // //               element={
// // // // //                 <AdminProtectedRoute role="customer">
// // // // //                   <CustomerHome />
// // // // //                 </AdminProtectedRoute>
// // // // //               }
// // // // //             />
// // // // //           </Route>

// // // // //           {/* VENDER */}
// // // // //           <Route path="/vendermain" element={<VenderMain />}>
// // // // //             <Route index element={<Navigate to="venderlogin" replace />} />
// // // // //             <Route path="venderlogin" element={<VenderLogin />} />
// // // // //             <Route path="venderreg" element={<VenderReg />} />
// // // // //             <Route
// // // // //               path="venderhome"
// // // // //               element={
// // // // //                 <AdminProtectedRoute role="vender">
// // // // //                   <VenderHome />
// // // // //                 </AdminProtectedRoute>
// // // // //               }
// // // // //             />
// // // // //           </Route>

// // // // //           {/* VENDER PROTECTED */}
// // // // //           <Route
// // // // //             path="/manageproducts"
// // // // //             element={
// // // // //               <AdminProtectedRoute role="vender">
// // // // //                 {/* <ManageProduct /> */}
// // // // //               </AdminProtectedRoute>
// // // // //             }
// // // // //           />

// // // // //           {/* BILL */}
// // // // //           <Route path="/bill" element={<Bill />} />

// // // // //           {/* FALLBACK */}
// // // // //           <Route path="*" element={<Navigate to="/" replace />} />
// // // // //         </Routes>
// // // // //       </div>
// // // // //     </BrowserRouter>
// // // // //   );
// // // // // }

// // // // // export default MainPage;











// // // // // import React from "react";
// // // // // import {
// // // // //   BrowserRouter as Router,
// // // // //   Routes,
// // // // //   Route,
// // // // //   Link,
// // // // //   Navigate,
// // // // // } from "react-router-dom";

// // // // // import MySlider from "./MySlider";
// // // // // import ProductListforMainPage from "./productviews/ProductListforMainPage";
// // // // // import AdminMain from "./adminviews/AdminMain";
// // // // // import AdminLogin from "./adminviews/AdminLogin";
// // // // // import AdminReg from "./adminviews/AdminReg";
// // // // // import AdminHome from "./adminviews/AdminHome";
// // // // // import CustomerMain from "./customerviews/CustomerMain";
// // // // // import CustomerLogin from "./customerviews/CustomerLogin";
// // // // // import CustomerReg from "./customerviews/CustomerReg";
// // // // // import CustomerHome from "./customerviews/CustomerHome";
// // // // // import VenderMain from "./venderviews/VenderMain";
// // // // // import VenderLogin from "./venderviews/VenderLogin";
// // // // // import VenderReg from "./venderviews/VenderReg";
// // // // // import VenderHome from "./venderviews/VenderHome";
// // // // // import ManageProduct from "./productviews/ManageProduct";
// // // // // import Bill from "./customerviews/Bill";
// // // // // import AdminProtectedRoute from "./components/AdminProtectedRoute";
// // // // // import ThemeToggle from "./components/ThemeToggle";


// // // // // function MainPage() {
// // // // //   return (
// // // // //     <Router>
// // // // //       <div className="mainpage">
// // // // //         <header className="main-header">
// // // // //           <nav className="main-nav">
// // // // //             <Link to="/">Home</Link> <span>|</span>
// // // // //             <Link to="/adminmain">Admin</Link> <span>|</span>
// // // // //             <Link to="/customermain">Customer</Link> <span>|</span>
// // // // //             <Link to="/vendermain">Vender</Link>
// // // // //             <ThemeToggle />
// // // // //           </nav>
// // // // //         </header>

// // // // //         <Routes>
// // // // //           <Route
// // // // //             path="/" element={
// // // // //               <>
// // // // //                 <MySlider />
// // // // //                 <ProductListforMainPage />
// // // // //               </>
// // // // //             }
// // // // //           />

// // // // //           <Route path="/adminmain" element={<AdminMain />} />
// // // // //           <Route index element={<Navigate to="adminlogin" replace />} />
// // // // //           <Route path="adminlogin" element={<AdminLogin />} />
// // // // //           <Route path="adminreg" element={<AdminReg />} />
// // // // //           <Route path="adminhome"element={  <AdminProtectedRoute role="admin">
// // // // //                 <AdminHome />
// // // // //               </AdminProtectedRoute>
// // // // //             }
// // // // //           />
// // // // //           </Route>

// // // // //                <Route path="/customermain" element={<CustomerMain />} />
// // // // //           <Route index element={<Navigate to="customerlogin" replace />} />
// // // // //           <Route path="customerlogin" element={<CustomerLogin />} />
// // // // //           <Route path="customerreg" element={<CustomerReg />} />
// // // // //           <Route path="customerhome"element={  <AdminProtectedRoute role="customer">
// // // // //                 <CustomerHome />
// // // // //               </AdminProtectedRoute>
// // // // //             }
// // // // //           />
// // // // //           </Route>


// // // // //            <Route path="/vendermain" element={<VenderMain />}>
// // // // //             <Route index element={<Navigate to="venderlogin" replace />} />
// // // // //             <Route path="venderlogin" element={<VenderLogin />} />
// // // // //             <Route path="venderreg" element={<VenderReg />} />
// // // // //             <Route
// // // // //               path="venderhome"
// // // // //               element={
// // // // //                 <AdminProtectedRoute role="vender">
// // // // //                   <VenderHome />
// // // // //                 </AdminProtectedRoute>
// // // // //               }
// // // // //             />
        

// // // // //           <Route path="manageproducts" element={
// // // // //               <AdminProtectedRoute role="vender">
// // // // //                 <ManageProduct />
// // // // //               </AdminProtectedRoute>
// // // // //             }
// // // // //           />
// // // // //           </Route>

              

// // // // //            <Route path="/bill" element={<Bill />} />
// // // // //           <Route path="*" element={<Navigate to="/" replace />} />


// // // // //         </Routes>
// // // // //       </div>
// // // // //     </Router>
// // // // //   );
// // // // // }

// // // // // export default MainPage;
// // // // import React, { useEffect, useState } from "react";
// // // // import "./MainPage.css";

// // // // import {
// // // //   Routes,
// // // //   Route,
// // // //   Link,
// // // //   Navigate,
// // // //   BrowserRouter,
// // // // } from "react-router-dom";

// // // // import ProductListforMainPage from "./productviews/ProductlistforMainpage";
// // // // import AdminLogin from "./adminviews/AdminLogin";
// // // // import AdminHome from "./adminviews/AdminHome";
// // // // import CustomerMain from "./customerviews/CustomerMain";
// // // // import CustomerLogin from "./customerviews/CustomerLogin";
// // // // import CustomerReg from "./customerviews/CustomerReg";
// // // // import CustomerHome from "./customerviews/CustomerHome";
// // // // import VenderLogin from "./venderviews/VenderLogin";
// // // // import VenderReg from "./venderviews/VenderReg.js";
// // // // import VenderHome from "./venderviews/VenderHome";
// // // // import Bill from "./customerviews/Bill";
// // // // import AdminProtectedRoute from "./components/AdminProtectedRoute";
// // // // import AdminMain from "./adminviews/AdminMain";
// // // // import VenderMain from "./venderviews/Vendermain.js";

// // // // import { FaSun, FaMoon, FaShoppingCart, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";
// // // // import HeroSlider from "./components/HeroSlider.jsx";

// // // // function MainPage() {
// // // //   /* ================= THEME ================= */
// // // //   const [mode, setMode] = useState("light");
// // // //   const toggleMode = () => {
// // // //     if (mode === "light") setMode("dark");
// // // //     else if (mode === "dark") setMode("accent");
// // // //     else setMode("light");
// // // //   };

// // // //   /* ================= LANGUAGE ================= */
// // // //   const [lang, setLang] = useState("en");
// // // //   const toggleLang = () => setLang(lang === "en" ? "hi" : "en");

// // // //   /* ================= LOCATION ================= */
// // // //   const [location, setLocation] = useState("Detecting...");

// // // //   useEffect(() => {
// // // //     if (!navigator.geolocation) {
// // // //       setLocation("Location unavailable");
// // // //       return;
// // // //     }

// // // //     navigator.geolocation.getCurrentPosition(
// // // //       async (pos) => {
// // // //         try {
// // // //           const { latitude, longitude } = pos.coords;
// // // //           const res = await fetch(
// // // //             `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
// // // //           );
// // // //           const data = await res.json();
// // // //           const city =
// // // //             data.address.city ||
// // // //             data.address.town ||
// // // //             data.address.village ||
// // // //             "Unknown";
// // // //           setLocation(city);
// // // //         } catch {
// // // //           setLocation("Unknown");
// // // //         }
// // // //       },
// // // //       () => setLocation("Permission denied")
// // // //     );
// // // //   }, []);

// // // //   /* ================= CART COUNT ================= */
// // // //   const [cartCount, setCartCount] = useState(0);

// // // //   useEffect(() => {
// // // //     const interval = setInterval(() => {
// // // //       const cart =
// // // //         JSON.parse(sessionStorage.getItem("cart")) ||
// // // //         JSON.parse(localStorage.getItem("cart")) ||
// // // //         [];
// // // //       setCartCount(cart.length || 0);
// // // //     }, 500);

// // // //     return () => clearInterval(interval);
// // // //   }, []);

// // // //   return (
// // // //     <BrowserRouter>
// // // //       <div className={`mainpage ${mode}`}>
// // // //         {/* ================= HEADER ================= */}
// // // //         <header className="main-header">
// // // //           <div className="header-left">
// // // //             <FaMapMarkerAlt /> <span>{location}</span>
// // // //           </div>

// // // //           <nav className="main-nav">
// // // //             <Link to="/">{lang === "en" ? "Home" : "होम"}</Link>
// // // //             <Link to="/adminmain">{lang === "en" ? "Admin" : "एडमिन"}</Link>
// // // //             <Link to="/customermain">{lang === "en" ? "Customer" : "ग्राहक"}</Link>
// // // //             <Link to="/vendermain">{lang === "en" ? "Vendor" : "विक्रेता"}</Link>
// // // //           </nav>

// // // //           <div className="header-right">
// // // //             {/* Language */}
// // // //             <button onClick={toggleLang} className="icon-btn">
// // // //               <FaGlobe /> {lang === "en" ? "HI" : "EN"}
// // // //             </button>

// // // //             {/* Cart */}
// // // //             <div className="cart-icon">
// // // //               <FaShoppingCart />
// // // //               {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
// // // //             </div>

// // // //             {/* Theme */}
// // // //             <button onClick={toggleMode} className="icon-btn">
// // // //               {mode === "light" ? <FaMoon /> : <FaSun />}
// // // //             </button>
// // // //           </div>
// // // //         </header>

// // // //         <HeroSlider />

// // // //         {/* ================= ROUTES ================= */}
// // // //         <Routes>
// // // //           <Route path="/" element={<ProductListforMainPage />} />

// // // //           <Route path="/adminmain" element={<AdminMain />}>
// // // //             <Route index element={<Navigate to="adminlogin" replace />} />
// // // //             <Route path="adminlogin" element={<AdminLogin />} />
// // // //             <Route
// // // //               path="adminhome"
// // // //               element={
// // // //                 <AdminProtectedRoute role="admin">
// // // //                   <AdminHome />
// // // //                 </AdminProtectedRoute>
// // // //               }
// // // //             />
// // // //           </Route>

// // // //           <Route path="/customermain" element={<CustomerMain />}>
// // // //             <Route index element={<Navigate to="customerlogin" replace />} />
// // // //             <Route path="customerlogin" element={<CustomerLogin />} />
// // // //             <Route path="customerreg" element={<CustomerReg />} />
// // // //             <Route
// // // //               path="customerhome"
// // // //               element={
// // // //                 <AdminProtectedRoute role="customer">
// // // //                   <CustomerHome />
// // // //                 </AdminProtectedRoute>
// // // //               }
// // // //             />
// // // //           </Route>

// // // //           <Route path="/vendermain" element={<VenderMain />}>
// // // //             <Route index element={<Navigate to="venderlogin" replace />} />
// // // //             <Route path="venderlogin" element={<VenderLogin />} />
// // // //             <Route path="venderreg" element={<VenderReg />} />
// // // //             <Route
// // // //               path="venderhome"
// // // //               element={
// // // //                 <AdminProtectedRoute role="vender">
// // // //                   <VenderHome />
// // // //                 </AdminProtectedRoute>
// // // //               }
// // // //             />
// // // //           </Route>

// // // //           <Route path="/bill" element={<Bill />} />
// // // //           <Route path="*" element={<Navigate to="/" replace />} />
// // // //         </Routes>
// // // //       </div>
// // // //     </BrowserRouter>
// // // //   );
// // // // }

// // // // export default MainPage;
// // // import React, { useEffect, useState } from "react";
// // // import "./MainPage.css";

// // // import {
// // //   Routes,
// // //   Route,
// // //   Link,
// // //   Navigate,
// // //   BrowserRouter,
// // // } from "react-router-dom";

// // // import ProductListforMainPage from "./productviews/ProductlistforMainpage";
// // // import AdminLogin from "./adminviews/AdminLogin";
// // // import AdminHome from "./adminviews/AdminHome";
// // // import CustomerMain from "./customerviews/CustomerMain";
// // // import CustomerLogin from "./customerviews/CustomerLogin";
// // // import CustomerReg from "./customerviews/CustomerReg";
// // // import CustomerHome from "./customerviews/CustomerHome";
// // // import VenderLogin from "./venderviews/VenderLogin";
// // // import VenderReg from "./venderviews/VenderReg.js";
// // // import VenderHome from "./venderviews/VenderHome";
// // // import Bill from "./customerviews/Bill";
// // // import AdminProtectedRoute from "./components/AdminProtectedRoute";
// // // import AdminMain from "./adminviews/AdminMain";
// // // import VenderMain from "./venderviews/Vendermain.js";

// // // import {
// // //   FaSun,
// // //   FaMoon,
// // //   FaShoppingCart,
// // //   FaMapMarkerAlt,
// // //   FaGlobe,
// // // } from "react-icons/fa";

// // // import HeroSlider from "./components/HeroSlider.jsx";

// // // function MainPage() {
// // //   /* ================= THEME ================= */
// // //   const [mode, setMode] = useState("light");

// // //   const toggleMode = () => {
// // //     if (mode === "light") {
// // //       setMode("dark");
// // //       alert("Theme changed to Dark");
// // //     } else if (mode === "dark") {
// // //       setMode("accent");
// // //       alert("Theme changed to Accent");
// // //     } else {
// // //       setMode("light");
// // //       alert("Theme changed to Light");
// // //     }
// // //   };

// // //   /* ================= LANGUAGE ================= */
// // //   const [lang, setLang] = useState("en");
// // //   const toggleLang = () => setLang(lang === "en" ? "hi" : "en");

// // //   /* ================= LOCATION ================= */
// // //   const [location, setLocation] = useState("Detecting...");

// // //   useEffect(() => {
// // //     if (!navigator.geolocation) {
// // //       setLocation("Unavailable");
// // //       return;
// // //     }

// // //     navigator.geolocation.getCurrentPosition(
// // //       async (pos) => {
// // //         try {
// // //           const { latitude, longitude } = pos.coords;
// // //           const res = await fetch(
// // //             `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
// // //           );
// // //           const data = await res.json();
// // //           const city =
// // //             data.address.city ||
// // //             data.address.town ||
// // //             data.address.village ||
// // //             "Unknown";
// // //           setLocation(city);
// // //         } catch {
// // //           setLocation("Unknown");
// // //         }
// // //       },
// // //       () => setLocation("Permission denied")
// // //     );
// // //   }, []);

// // //   /* ================= CART COUNT ================= */
// // //   const [cartCount, setCartCount] = useState(0);

// // //   useEffect(() => {
// // //     const interval = setInterval(() => {
// // //       const cart =
// // //         JSON.parse(sessionStorage.getItem("cart")) ||
// // //         JSON.parse(localStorage.getItem("cart")) ||
// // //         [];
// // //       setCartCount(cart.length || 0);
// // //     }, 500);

// // //     return () => clearInterval(interval);
// // //   }, []);

// // //   return (
// // //     <BrowserRouter>
// // //       <div className={`mainpage ${mode}`}>
// // //         {/* ================= HEADER ================= */}
// // //         <header className="main-header">
// // //           {/* LEFT : LOGO + LOCATION */}
// // //           <div className="header-left">
// // //             <div className="logo">MyShop</div>
// // //             <div className="location-box">
// // //               <FaMapMarkerAlt />
// // //               <div>
// // //                 <small>Location</small>
// // //                 <div className="location-text">{location}</div>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* CENTER : SEARCH */}
// // //           <div className="header-center">
// // //             <input
// // //               type="text"
// // //               placeholder="Search products..."
// // //               className="search-input"
// // //             />
// // //           </div>

// // //           {/* RIGHT : NAV + ACTIONS */}
// // //           <div className="header-right">
// // //             <nav className="main-nav">
// // //               <Link to="/">Home</Link>
// // //               <Link to="/adminmain">Admin</Link>
// // //               <Link to="/customermain">Customer</Link>
// // //               <Link to="/vendermain">Vendor</Link>
// // //             </nav>

// // //             {/* Language */}
// // //             <button onClick={toggleLang} className="icon-btn">
// // //               <FaGlobe /> {lang === "en" ? "HI" : "EN"}
// // //             </button>

// // //             {/* Cart */}
// // //             <div className="cart-icon">
// // //               <FaShoppingCart />
// // //               {cartCount > 0 && (
// // //                 <span className="cart-badge">{cartCount}</span>
// // //               )}
// // //             </div>

// // //             {/* Theme */}
// // //             <button onClick={toggleMode} className="icon-btn">
// // //               {mode === "light" ? <FaMoon /> : <FaSun />}
// // //               <span className="theme-text">
// // //                 Theme: {mode.charAt(0).toUpperCase() + mode.slice(1)}
// // //               </span>
// // //             </button>
// // //           </div>
// // //         </header>

// // //         <HeroSlider />

// // //         {/* ================= ROUTES ================= */}
// // //         <Routes>
// // //           <Route path="/" element={<ProductListforMainPage />} />

// // //           <Route path="/adminmain" element={<AdminMain />}>
// // //             <Route index element={<Navigate to="adminlogin" replace />} />
// // //             <Route path="adminlogin" element={<AdminLogin />} />
// // //             <Route
// // //               path="adminhome"
// // //               element={
// // //                 <AdminProtectedRoute role="admin">
// // //                   <AdminHome />
// // //                 </AdminProtectedRoute>
// // //               }
// // //             />
// // //           </Route>

// // //           <Route path="/customermain" element={<CustomerMain />}>
// // //             <Route index element={<Navigate to="customerlogin" replace />} />
// // //             <Route path="customerlogin" element={<CustomerLogin />} />
// // //             <Route path="customerreg" element={<CustomerReg />} />
// // //             <Route
// // //               path="customerhome"
// // //               element={
// // //                 <AdminProtectedRoute role="customer">
// // //                   <CustomerHome />
// // //                 </AdminProtectedRoute>
// // //               }
// // //             />
// // //           </Route>

// // //           <Route path="/vendermain" element={<VenderMain />}>
// // //             <Route index element={<Navigate to="venderlogin" replace />} />
// // //             <Route path="venderlogin" element={<VenderLogin />} />
// // //             <Route path="venderreg" element={<VenderReg />} />
// // //             <Route
// // //               path="venderhome"
// // //               element={
// // //                 <AdminProtectedRoute role="vender">
// // //                   <VenderHome />
// // //                 </AdminProtectedRoute>
// // //               }
// // //             />
// // //           </Route>

// // //           <Route path="/bill" element={<Bill />} />
// // //           <Route path="*" element={<Navigate to="/" replace />} />
// // //         </Routes>
// // //       </div>
// // //     </BrowserRouter>
// // //   );
// // // }

// // // export default MainPage;
// // import React, { useEffect, useState } from "react";
// // import "./MainPage.css";

// // import {
// //   Routes,
// //   Route,
// //   Link,
// //   Navigate,
// //   BrowserRouter,
// // } from "react-router-dom";

// // import ProductListforMainPage from "./productviews/ProductlistforMainpage";
// // import AdminLogin from "./adminviews/AdminLogin";
// // import AdminHome from "./adminviews/AdminHome";
// // import CustomerMain from "./customerviews/CustomerMain";
// // import CustomerLogin from "./customerviews/CustomerLogin";
// // import CustomerReg from "./customerviews/CustomerReg";
// // import CustomerHome from "./customerviews/CustomerHome";
// // import VenderLogin from "./venderviews/VenderLogin";
// // import VenderReg from "./venderviews/VenderReg.js";
// // import VenderHome from "./venderviews/VenderHome";
// // import Bill from "./customerviews/Bill";
// // import AdminProtectedRoute from "./components/AdminProtectedRoute";
// // import AdminMain from "./adminviews/AdminMain";
// // import VenderMain from "./venderviews/Vendermain.js";

// // import {
// //   FaSun,
// //   FaMoon,
// //   FaShoppingCart,
// //   FaMapMarkerAlt,
// //   FaGlobe,
// // } from "react-icons/fa";

// // import HeroSlider from "./components/HeroSlider.jsx";

// // function MainPage() {
// //   /* ================= THEME ================= */
// //   const [mode, setMode] = useState("light");

// //   const toggleMode = () => {
// //     if (mode === "light") {
// //       setMode("dark");
// //       alert("Theme changed to Dark");
// //     } else if (mode === "dark") {
// //       setMode("accent");
// //       alert("Theme changed to Accent");
// //     } else {
// //       setMode("light");
// //       alert("Theme changed to Light");
// //     }
// //   };

// //   /* ================= LANGUAGE ================= */
// //   const [lang, setLang] = useState("en");
// //   const toggleLang = () => setLang(lang === "en" ? "hi" : "en");

// //   const labels = {
// //     en: {
// //       home: "Home",
// //       admin: "Admin",
// //       customer: "Customer",
// //       vendor: "Vendor",
// //       location: "Location",
// //       search: "Search products...",
// //       theme: "Theme",
// //     },
// //     hi: {
// //       home: "होम",
// //       admin: "एडमिन",
// //       customer: "ग्राहक",
// //       vendor: "विक्रेता",
// //       location: "लोकेशन",
// //       search: "प्रोडक्ट खोजें...",
// //       theme: "थीम",
// //     },
// //   };

// //   /* ================= LOCATION ================= */
// //   const [location, setLocation] = useState("Detecting...");

// //   useEffect(() => {
// //     if (!navigator.geolocation) {
// //       setLocation("Unavailable");
// //       return;
// //     }

// //     navigator.geolocation.getCurrentPosition(
// //       async (pos) => {
// //         try {
// //           const { latitude, longitude } = pos.coords;
// //           const res = await fetch(
// //             `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
// //           );
// //           const data = await res.json();
// //           const city =
// //             data.address.city ||
// //             data.address.town ||
// //             data.address.village ||
// //             "Unknown";
// //           setLocation(city);
// //         } catch {
// //           setLocation("Unknown");
// //         }
// //       },
// //       () => setLocation("Permission denied")
// //     );
// //   }, []);

// //   /* ================= CART COUNT ================= */
// //   const [cartCount, setCartCount] = useState(0);

// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       const cart =
// //         JSON.parse(sessionStorage.getItem("cart")) ||
// //         JSON.parse(localStorage.getItem("cart")) ||
// //         [];
// //       setCartCount(cart.length || 0);
// //     }, 500);

// //     return () => clearInterval(interval);
// //   }, []);

// //   return (
// //     <BrowserRouter>
// //       <div className={`mainpage ${mode}`}>
// //         {/* ================= HEADER ================= */}
// //         <header className="main-header">
// //           {/* LEFT */}
// //           <div className="header-left">
// //             <div className="logo">MyShop</div>
// //             <div className="location-box">
// //               <FaMapMarkerAlt />
// //               <div>
// //                 <small>{labels[lang].location}</small>
// //                 <div className="location-text">{location}</div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* CENTER */}
// //           <div className="header-center">
// //             <input
// //               type="text"
// //               placeholder={labels[lang].search}
// //               className="search-input"
// //             />
// //           </div>

// //           {/* RIGHT */}
// //           <div className="header-right">
// //             <nav className="main-nav">
// //               <Link to="/">{labels[lang].home}</Link>
// //               <Link to="/adminmain">{labels[lang].admin}</Link>
// //               <Link to="/customermain">{labels[lang].customer}</Link>
// //               <Link to="/vendermain">{labels[lang].vendor}</Link>
// //             </nav>

// //             <button onClick={toggleLang} className="icon-btn">
// //               <FaGlobe /> {lang === "en" ? "HI" : "EN"}
// //             </button>

// //             <div className="cart-icon">
// //               <FaShoppingCart />
// //               {cartCount > 0 && (
// //                 <span className="cart-badge">{cartCount}</span>
// //               )}
// //             </div>

// //             <button onClick={toggleMode} className="icon-btn">
// //               {mode === "light" ? <FaMoon /> : <FaSun />}
// //               <span className="theme-text">
// //                 {labels[lang].theme}: {mode}
// //               </span>
// //             </button>
// //           </div>
// //         </header>

// //         <HeroSlider />

// //         {/* ================= ROUTES ================= */}
// //         <Routes>
// //           <Route path="/" element={<ProductListforMainPage />} />

// //           <Route path="/adminmain" element={<AdminMain />}>
// //             <Route index element={<Navigate to="adminlogin" replace />} />
// //             <Route path="adminlogin" element={<AdminLogin />} />
// //             <Route
// //               path="adminhome"
// //               element={
// //                 <AdminProtectedRoute role="admin">
// //                   <AdminHome />
// //                 </AdminProtectedRoute>
// //               }
// //             />
// //           </Route>

// //           <Route path="/customermain" element={<CustomerMain />}>
// //             <Route index element={<Navigate to="customerlogin" replace />} />
// //             <Route path="customerlogin" element={<CustomerLogin />} />
// //             <Route path="customerreg" element={<CustomerReg />} />
// //             <Route
// //               path="customerhome"
// //               element={
// //                 <AdminProtectedRoute role="customer">
// //                   <CustomerHome />
// //                 </AdminProtectedRoute>
// //               }
// //             />
// //           </Route>

// //           <Route path="/vendermain" element={<VenderMain />}>
// //             <Route index element={<Navigate to="venderlogin" replace />} />
// //             <Route path="venderlogin" element={<VenderLogin />} />
// //             <Route path="venderreg" element={<VenderReg />} />
// //             <Route
// //               path="venderhome"
// //               element={
// //                 <AdminProtectedRoute role="vender">
// //                   <VenderHome />
// //                 </AdminProtectedRoute>
// //               }
// //             />
// //           </Route>

// //           <Route path="/bill" element={<Bill />} />
// //           <Route path="*" element={<Navigate to="/" replace />} />
// //         </Routes>
// //       </div>
// //     </BrowserRouter>
// //   );
// // }

// // export default MainPage;
// import React, { useEffect, useState } from "react";
// import "./MainPage.css";

// import {
//   Routes,
//   Route,
//   Link,
//   Navigate,
//   BrowserRouter,
// } from "react-router-dom";

// import ProductListforMainPage from "./productviews/ProductlistforMainpage";
// import AdminLogin from "./adminviews/AdminLogin";
// import AdminHome from "./adminviews/AdminHome";
// import CustomerMain from "./customerviews/CustomerMain";
// import CustomerLogin from "./customerviews/CustomerLogin";
// import CustomerReg from "./customerviews/CustomerReg";
// import CustomerHome from "./customerviews/CustomerHome";
// import VenderLogin from "./venderviews/VenderLogin";
// import VenderReg from "./venderviews/VenderReg.js";
// import VenderHome from "./venderviews/VenderHome";
// import Bill from "./customerviews/Bill";
// import AdminProtectedRoute from "./components/AdminProtectedRoute";
// import AdminMain from "./adminviews/AdminMain";
// import VenderMain from "./venderviews/Vendermain.js";

// import {
//   FaSun,
//   FaMoon,
//   FaShoppingCart,
//   FaMapMarkerAlt,
//   FaGlobe,
// } from "react-icons/fa";

// import HeroSlider from "./components/HeroSlider.jsx";

// function MainPage() {
//   /* ================= THEME ================= */
//   const [mode, setMode] = useState("light");

//   const toggleMode = () => {
//     if (mode === "light") {
//       setMode("dark");
//       alert("Theme changed to Dark");
//     } else if (mode === "dark") {
//       setMode("accent");
//       alert("Theme changed to Accent");
//     } else {
//       setMode("light");
//       alert("Theme changed to Light");
//     }
//   };

//   /* ================= LANGUAGE ================= */
//   const [lang, setLang] = useState("en");
//   const toggleLang = () => setLang(lang === "en" ? "hi" : "en");

//   const labels = {
//     en: {
//       home: "Home",
//       admin: "Admin",
//       customer: "Customer",
//       vendor: "Vendor",
//       location: "Location",
//       search: "Search products...",
//       theme: "Theme",
//     },
//     hi: {
//       home: "होम",
//       admin: "एडमिन",
//       customer: "ग्राहक",
//       vendor: "विक्रेता",
//       location: "लोकेशन",
//       search: "प्रोडक्ट खोजें...",
//       theme: "थीम",
//     },
//   };

//   /* ================= LOCATION ================= */
//   const [location, setLocation] = useState("Detecting...");

//   useEffect(() => {
//     if (!navigator.geolocation) {
//       setLocation("Unavailable");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       async (pos) => {
//         try {
//           const { latitude, longitude } = pos.coords;
//           const res = await fetch(
//             `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
//           );
//           const data = await res.json();
//           const city =
//             data.address.city ||
//             data.address.town ||
//             data.address.village ||
//             "Unknown";
//           setLocation(city);
//         } catch {
//           setLocation("Unknown");
//         }
//       },
//       () => setLocation("Permission denied")
//     );
//   }, []);

//   /* ================= CART COUNT ================= */
//   const [cartCount, setCartCount] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const cart =
//         JSON.parse(sessionStorage.getItem("cart")) ||
//         JSON.parse(localStorage.getItem("cart")) ||
//         [];
//       setCartCount(cart.length || 0);
//     }, 500);

//     return () => clearInterval(interval);
//   }, []);

//   /* ================= SEARCH ================= */
//   const [searchText, setSearchText] = useState("");

//   return (
//     <BrowserRouter>
//       <div className={`mainpage ${mode}`}>
//         {/* ================= HEADER ================= */}
//         <header className="main-header">
//           {/* LEFT : LOGO + CART + LOCATION */}
//           <div className="header-left">
//             <div className="logo">MyShop</div>

//             <div className="cart-icon">
//               <FaShoppingCart />
//               {cartCount > 0 && (
//                 <span className="cart-badge">{cartCount}</span>
//               )}
//             </div>

//             <div className="location-box">
//               <FaMapMarkerAlt />
//               <div>
//                 <small>{labels[lang].location}</small>
//                 <div className="location-text">{location}</div>
//               </div>
//             </div>
//           </div>

//           {/* CENTER : SEARCH */}
//           <div className="header-center">
//             <input
//               type="text"
//               className="search-input"
//               placeholder={labels[lang].search}
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//             />
//           </div>

//           {/* RIGHT : NAV + ACTIONS */}
//           <div className="header-right">
//             <nav className="main-nav">
//               <Link to="/">{labels[lang].home}</Link>
//               <Link to="/adminmain">{labels[lang].admin}</Link>
//               <Link to="/customermain">{labels[lang].customer}</Link>
//               <Link to="/vendermain">{labels[lang].vendor}</Link>
//             </nav>

//             <button onClick={toggleLang} className="icon-btn">
//               <FaGlobe /> {lang === "en" ? "HI" : "EN"}
//             </button>

//             <button onClick={toggleMode} className="icon-btn">
//               {mode === "light" ? <FaMoon /> : <FaSun />}
//               <span className="theme-text">
//                 {labels[lang].theme}: {mode}
//               </span>
//             </button>
//           </div>
//         </header>

//         <HeroSlider />

//         {/* ================= ROUTES ================= */}
//         <Routes>
//           <Route
//             path="/"
//             element={<ProductListforMainPage searchText={searchText} />}
//           />

//           <Route path="/adminmain" element={<AdminMain />}>
//             <Route index element={<Navigate to="adminlogin" replace />} />
//             <Route path="adminlogin" element={<AdminLogin />} />
//             <Route
//               path="adminhome"
//               element={
//                 <AdminProtectedRoute role="admin">
//                   <AdminHome />
//                 </AdminProtectedRoute>
//               }
//             />
//           </Route>

//           <Route path="/customermain" element={<CustomerMain />}>
//             <Route index element={<Navigate to="customerlogin" replace />} />
//             <Route path="customerlogin" element={<CustomerLogin />} />
//             <Route path="customerreg" element={<CustomerReg />} />
//             <Route
//               path="customerhome"
//               element={
//                 <AdminProtectedRoute role="customer">
//                   <CustomerHome />
//                 </AdminProtectedRoute>
//               }
//             />
//           </Route>

//           <Route path="/vendermain" element={<VenderMain />}>
//             <Route index element={<Navigate to="venderlogin" replace />} />
//             <Route path="venderlogin" element={<VenderLogin />} />
//             <Route path="venderreg" element={<VenderReg />} />
//             <Route
//               path="venderhome"
//               element={
//                 <AdminProtectedRoute role="vender">
//                   <VenderHome />
//                 </AdminProtectedRoute>
//               }
//             />
//           </Route>

//           <Route path="/bill" element={<Bill />} />
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }

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
