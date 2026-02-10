
// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import Bill from "../customerviews/Bill";
// // import "./ProductList.css";
// // import { FaShoppingCart } from "react-icons/fa";


// // function ProductList(props) {
// //     const [itemcount, setItemCount] = useState(0);
// //     const [sellitem, setsellitem] = useState([]);
// //     const [quantities, setQuantites] = useState({});
// //     const [cid, setCId] = useState(null);
// //     const [customerSession, setCustomerSession] = useState(null);
// //     const [plist, setPList] = useState([]);
// //     const [pcatglist, setPCatgList] = useState([]);
// //     const [showLogin, setShowLogin] = useState(false);
// //     const [showBill, setShowBill] = useState(false);

// //     useEffect(() => {
// //         setCId(props.data);

// //         axios
// //             .get("http://localhost:9876/product/showproduct")
// //             .then((res) => setPList(res.data))
// //             .catch((err) => alert(err));

// //         axios
// //             .get("http://localhost:9876/productcatg/showproductcatg")
// //             .then((res) => setPCatgList(res.data))
// //             .catch((err) => alert(err));

// //         const session =
// //             sessionStorage.getItem("useSession") ||
// //             localStorage.getItem("userSession");

// //         if (session) {
// //             const obj = JSON.parse(session);
// //             setCustomerSession(obj);
// //             setCId(obj.cid);
// //         }
// //     }, [props.data]);

// //     const handleBuyButton = (pid) => {
// //         setCId(props.data);

// //         if (!props.data) {
// //             setShowLogin(true);
// //             return;
// //         }

// //         axios
// //             .get(`http://localhost:9876/product/showproductstatus/${pid}`)
// //             .then((res) => {

// //                 // ✅ ONLY FIX: backend returns ARRAY
// //                 if (res.data[0].status === "Active") {

// //                     const selected = plist.find((item) => item.pid === pid);
// //                     if (!selected) return;

// //                     setsellitem((prev) => {
// //                         const already = prev.find((i) => i.pid === pid);
// //                         if (already) return prev;
// //                         return [...prev, selected];
// //                     });

// //                     setQuantites((prev) => ({
// //                         ...prev,
// //                         [pid]: (prev[pid] || 0) + 1,
// //                     }));

// //                     setItemCount((prev) => prev + 1);
// //                 } else {
// //                     alert("Product out of Stock / Inactive");
// //                 }
// //             })
// //             .catch((err) => alert(err));
// //     };

// //     const increaseQty = (pid) => {
// //         setQuantites((prev) => ({
// //             ...prev,
// //             [pid]: (prev[pid] || 1) + 1,
// //         }));
// //         setItemCount((prev) => prev + 1);
// //     };

// //     const decreaseQty = (pid) => {
// //         setQuantites((prev) => {
// //             const newQty = (prev[pid] || 1) - 1;

// //             if (newQty <= 0) {
// //                 setsellitem((old) =>
// //                     old.filter((item) => item.pid !== pid)
// //                 );

// //                 const updated = Object.fromEntries(
// //                     Object.entries(prev).filter(([k]) => k !== String(pid))
// //                 );

// //                 const total = Object.values(updated).reduce(
// //                     (sum, v) => sum + v,
// //                     0
// //                 );

// //                 setItemCount(total);
// //                 return updated;
// //             }

// //             const updated = { ...prev, [pid]: newQty };

// //             const total = Object.values(updated).reduce(
// //                 (sum, v) => sum + v,
// //                 0
// //             );

// //             setItemCount(total);
// //             return updated;
// //         });
// //     };

// //     const handleCheckOutButton = () => {
// //         if (!cid) {
// //             setShowLogin(true);
// //             return;
// //         }

// //         if (sellitem.length <= 0) {
// //             alert("Please buy some product before checkout");
// //             return;
// //         }

// //         setShowBill(true);
// //     };

// //     const handlePaymentSuccess = () => {
// //         setsellitem([]);
// //         setQuantites({});
// //         setItemCount(0);
// //         setShowBill(false);
// //     };

// //     const handleUpdateCart = (pid, newQty) => {
// //         setQuantites((prev) => {
// //             const update = { ...prev, [pid]: newQty };
// //             const total = Object.values(update).reduce(
// //                 (sum, v) => sum + v,
// //                 0
// //             );
// //             setItemCount(total);
// //             return update;
// //         });
// //     };

// //     const handleRemoveItem = (pid) => {
// //         setsellitem((prev) => prev.filter((item) => item.pid !== pid));

// //         setQuantites((prev) => {
// //             const updated = { ...prev };
// //             delete updated[pid];
// //             const total = Object.values(updated).reduce(
// //                 (sum, v) => sum + v,
// //                 0
// //             );
// //             setItemCount(total);
// //             return updated;
// //         });
// //     };

// //          const handleSearch = (evt) => {
// //     const catgId = evt.target.value;

// //     const url =
// //         catgId > 0
// //             ? `http://localhost:9876/product/showproductbycatgid/${catgId}`
// //             : "http://localhost:9876/product/showproduct";

// //     axios
// //         .get(url)
// //         .then((res) => setPList(res.data))
// //         .catch((err) => alert(err));
// // };


// //     // const handleSearch = (evt) => {
// //     //     const catgId = evt.target.value;

// //     //     const url =
// //     //         catgId > 0
// //     //             ? `http://localhost:9876/product/showproductbycatid/${catgId}`
// //     //             : "http://localhost:9876/product/showproduct";

// //     //     axios
// //     //         .get(url)
// //     //         .then((res) => setPList(res.data))
// //     //         .catch((err) => alert(err));
// //     // };

// //     if (showBill) {
// //         return (
// //             <Bill
// //                 data={{ sellitem, cid, quantities }}
// //                 onBack={() => setShowBill(false)}
// //                 onPaymentSuccess={handlePaymentSuccess}
// //                 onUpdateCart={handleUpdateCart}
// //                 onRemoveItem={handleRemoveItem}
// //             />
// //         );
// //     }

// //     return (
// //         <>
// //             <div className="pl-customer-info">
// //                 <span className="pl-item-count">{itemcount}</span>
// // {/* 
// //                 <button
// //                     onClick={handleCheckOutButton}
// //                     className="pl-checkout-btn"
// //                 >
// //                     Checkout
// //                 </button> */}

// //                 <button
// //                    onClick={handleCheckOutButton}
// //                       className="pl-checkout-btn"
// //                >
// //                      <FaShoppingCart className="pl-cart-icon" />
// //                        Checkout
// //                          </button>

// //             </div>

// //             <div className="pl-container-inner">
// //                 <center>
// //                     <label className="pl-search-label">Search By Category</label>

// //                     <select className="pl-select" onChange={handleSearch}>
// //                         <option value="0">All</option>

// //                         {pcatglist.map((pc) => (
// //                             <option key={pc.pcatgid} value={pc.pcatgid}>
// //                                 {pc.pcatgname}
// //                             </option>
// //                         ))}
// //                     </select>

// //                     <div className="pl-product-list">
// //                         {plist.map((item) => {
// //                             const qty = quantities[item.pid] || 0;

// //                             return (
// //                                 <div className="pl-product-card" key={item.pid}>
// //                                     <img
// //                                         height={100}
// //                                         width={100}
// //                                         src={`http://localhost:9876/product/getproductimage/${item.ppicname}`}
// //                                         alt={item.pname}
// //                                     />

// //                                     <h4>{item.pname}</h4>

// //                                     <p>
// //                                         <del>₹{item.pprice}</del><br />
// //                                         <b>₹{item.oprice}</b>
// //                                     </p>

// //                                     {qty > 0 ? (
// //                                         <div>
// //                                             <button onClick={() => decreaseQty(item.pid)}>-</button>
// //                                             <span>{qty}</span>
// //                                             <button onClick={() => increaseQty(item.pid)}>+</button>
// //                                         </div>
// //                                     ) : (
// //                                         <button onClick={() => handleBuyButton(item.pid)}>
// //                                             Buy
// //                                         </button>
// //                                     )}
// //                                 </div>
// //                             );
// //                         })}
// //                     </div>
// //                 </center>
// //             </div>
// //         </>
// //     );
// // }

// // export default ProductList;





















// // // import React, { useState, useEffect } from "react";
// // // import axios from "axios";
// // // import Bill from "../customerviews/Bill";
// // // import "./ProductList.css";
// // // // import CustomerLoginPopup from "../customerviews/CustomerLoginPopup";


// // // function ProductList(props) {
// // //     const [itemcount, setItemCount] = useState(0);
// // //     const [sellitem, setsellitem] = useState([]);
// // //     const [quantities, setQuantites] = useState({});
// // //     const [cid, setCId] = useState(null);
// // //     const [customerSession, setCustomerSession] = useState(null);
// // //     const [plist, setPList] = useState([]);
// // //     const [pcatglist, setPCatgList] = useState([]);
// // //     const [showLogin, setShowLogin] = useState(false);
// // //     const [showBill, setShowBill] = useState(false);            

// // //     useEffect(() => {
// // //         setCId(props.data);

// // //         axios
// // //             .get("http://localhost:9876/product/showproduct")
// // //             .then((res) => setPList(res.data))
// // //             .catch((err) => alert(err));

// // //         axios
// // //             .get("http://localhost:9876/productcatg/showproductcatg")
// // //             .then((res) => setPCatgList(res.data))
// // //             .catch((err) => alert(err));

// // //         const session =
// // //             sessionStorage.getItem("useSession") ||
// // //             localStorage.getItem("userSession");

// // //         if (session) {
// // //             const obj = JSON.parse(session);
// // //             setCustomerSession(obj);
// // //             setCId(obj.cid);
// // //         }
// // //     }, [props.data]);

// // //     const handleLoginSuccess = (sessionData) => {
// // //         setCustomerSession(sessionData);
// // //         setCId(sessionData.cid);
// // //         setShowLogin(false);
// // //     };

// // //     const handleLogout = () => {
// // //         sessionStorage.removeItem("userSession");
// // //         localStorage.removeItem("userSession");

// // //         setCustomerSession(null);
// // //         setCId(null);
// // //         setsellitem([]);
// // //         setQuantites({});
// // //         setItemCount(0);

// // //         alert("You have been logout..");
// // //     };

// // //     const handleBuyButton = (pid) => {
// // //         setCId(props.data);

// // //         if (!props.data) {
// // //             setShowLogin(true);
// // //             return;
// // //         }

// // //         axios
// // //             .get(`http://localhost:9876/product/showproductstatus/${pid}`)
// // //             .then((res) => {
// // //                 if (res.data.status==='Active') {
// // //                     const selected = plist.find((item) => item.pid === pid);
// // //                     if (!selected) return;

// // //                     setsellitem((prev) => {
// // //                         const already = prev.find((i) => i.pid === pid);
// // //                         if (already) return prev;
// // //                         return [...prev, selected];
// // //                     });

// // //                     setQuantites((prev) => ({
// // //                         ...prev,
// // //                         [pid]: (prev[pid] || 0) + 1,
// // //                     }));

// // //                     setItemCount((prev) => prev + 1);
// // //                 } else {
// // //                     alert("Product out of Stock/Inactive. Cannot add to cart");
// // //                 }
// // //             })
// // //             .catch((err) => alert(err));
// // //     };

// // //     const increaseQty = (pid) => {
// // //         setQuantites((prev) => ({
// // //             ...prev,
// // //             [pid]: (prev[pid] || 1) + 1,
// // //         }));

// // //         setItemCount((prev) => prev + 1);
// // //     };

// // //     const decreaseQty = (pid) => {
// // //         setQuantites((prev) => {
// // //             const newQty = (prev[pid] || 1) - 1;

// // //             if (newQty <= 0) {
// // //                 setsellitem((old) =>
// // //                     old.filter((item) => item.pid !== pid)
// // //                 );

// // //                 const updated = Object.fromEntries(
// // //                     Object.entries(prev).filter(([k]) => k !== String(pid))
// // //                 );

// // //                 const total = Object.values(updated).reduce(
// // //                     (sum, v) => sum + v,
// // //                     0
// // //                 );

// // //                 setItemCount(total);
// // //                 return updated;
// // //             }

// // //             const updated = { ...prev, [pid]: newQty };

// // //             const total = Object.values(updated).reduce(
// // //                 (sum, v) => sum + v,
// // //                 0
// // //             );

// // //             setItemCount(total);
// // //             return updated;
// // //         });
// // //     };

// // //     const handleCheckOutButton = () => {
// // //         if (!cid) {
// // //             setShowLogin(true);
// // //             return;
// // //         }

// // //         if (sellitem.length <= 0) {
// // //             alert("Please buy some product before checkout..");
// // //             return;
// // //         }

// // //         setShowBill(true);
// // //     };

// // //     const handlePaymentSuccess = () => {
// // //         setsellitem([]);
// // //         setQuantites({});
// // //         setItemCount(0);
// // //         setShowBill(false);
// // //     };

// // //     const handleUpdateCart = (pid, newQty) => {
// // //         setQuantites((prev) => {
// // //             const update = { ...prev, [pid]: newQty };
// // //             const total = Object.values(update).reduce(
// // //                 (sum, v) => sum + v,
// // //                 0
// // //             );
// // //             setItemCount(total);
// // //             return update;
// // //         });
// // //     };

// // //     const handleRemoveItem = (pid) => {
// // //         setsellitem((prev) => prev.filter((item) => item.pid !== pid));

// // //         setQuantites((prev) => {
// // //             const updated = { ...prev };
// // //             delete updated[pid];
// // //             const total = Object.values(updated).reduce(
// // //                 (sum, v) => sum + v,
// // //                 0
// // //             );
// // //             setItemCount(total);
// // //             return updated;
// // //         });
// // //     };

// // //     const handleSearch = (evt) => {
// // //         const catgId = evt.target.value;

// // //         const url =
// // //             catgId > 0
// // //                 ? `http://localhost:9876/product/showproductbycatid/${catgId}`
// // //                 : "http://localhost:9876/product/showproduct";

// // //         axios
// // //             .get(url)
// // //             .then((res) => setPList(res.data))
// // //             .catch((err) => alert(err));
// // //     };

// // //     if (showBill) {
// // //         return (
// // //             <Bill
// // //                 data={{ sellitem, cid, quantities }}
// // //                 onBack={() => setShowBill(false)}
// // //                 onPaymentSuccess={handlePaymentSuccess}
// // //                 onUpdateCart={handleUpdateCart}
// // //                 onRemoveItem={handleRemoveItem}
// // //             />
// // //         );
// // //     }

// // //     return (
// // //     <>
// // //         {/* {showLogin && (
// // //             <CustomerLoginPopup
// // //                 onClose={() => setShowLogin(false)}
// // //                 onLoginSuccess={handleLoginSuccess}
// // //             />
// // //         )} */}

// // //         <div className={showLogin ? "pl-blurred-content" : ""}>
// // //             <div className="pl-customer-info">
// // //                 <>
// // //                     <span className="pl-item-count">{itemcount}</span>

// // //                     <button
// // //                         onClick={handleCheckOutButton}
// // //                         className="pl-checkout-btn"
// // //                     >
// // //                         Checkout
// // //                     </button>
// // //                 </>
// // //             </div>

// // //             <div className="pl-container-inner">
// // //                 <div className="pl-form-container">
// // //                     <center>
// // //                         <label className="pl-search-label">Search By Category</label>

// // //                         <select
// // //                             className="pl-select"
// // //                             onChange={handleSearch}
// // //                         >
// // //                             <option value="0">All</option>

// // //                             {pcatglist.map((pcatgitem) => (
// // //                                 <option
// // //                                     key={pcatgitem.pcatgid}
// // //                                     value={pcatgitem.pcatgid}
// // //                                 >
// // //                                     {pcatgitem.pcatgname}
// // //                                 </option>
// // //                             ))}
// // //                         </select>

// // //                         <div className="pl-product-list">
// // //                             {plist.map((item) => {
// // //                                 const cname =
// // //                                     pcatglist.find(
// // //                                         (c) => c.pcatgid === item.pcatgid
// // //                                     )?.pcatgname || "N/A";

// // //                                 const qty = quantities[item.pid] || 0;

// // //                                 return (
// // //                                     <div
// // //                                         className="pl-product-card"
// // //                                         key={item.pid}
// // //                                     >
// // //                                         <img
// // //                                             className="pl-product-image"
// // //                                             height={100} width={100}
// // //                                             src={`http://localhost:9876/product/getproductimage/${item.ppicname}`}
// // //                                             alt={item.pname}
// // //                                         />

// // //                                         <h4 className="pl-product-name">{item.pname}</h4>

// // //                                         <p className="pl-product-price">
// // //                                             <span><del>MRP: ₹{item.pprice}</del></span><br/>
// // //                                             <span className="pl-product-offer">OFFER PRICE: ₹{item.oprice}</span>
// // //                                         </p>

// // //                                         <p className="pl-product-category">{cname}</p>

// // //                                         {qty > 0 ? (
// // //                                             <div className="pl-qty-controls">
// // //                                                 <button onClick={() => decreaseQty(item.pid)} className="pl-qty-btn">-</button>

// // //                                                 <span className="pl-qty-count">{qty}</span>

// // //                                                 <button onClick={() => increaseQty(item.pid)} className="pl-qty-btn">+</button>
// // //                                             </div>
// // //                                         ) : (
// // //                                             <button
// // //                                                 className="pl-buy-btn"
// // //                                                 onClick={() => handleBuyButton(item.pid)}
// // //                                             >
// // //                                                 Buy
// // //                                             </button>
// // //                                         )}
// // //                                     </div>
// // //                                 );
// // //                             })}
// // //                         </div>
// // //                     </center>
// // //                 </div>
// // //             </div>
// // //         </div>                
// // //     </>
// // // );

// // // } 
// // // export default ProductList;

// // // //     return (
// // // //         <>
// // // //             {/* {showLogin && (
// // // //                 <CustomerLoginPopup
// // // //                     onClose={() => setShowLogin(false)}
// // // //                     onLoginSuccess={handleLoginSuccess}
// // // //                 />
// // // //             )} */}

// // // //             <div className={showLogin ? "blurred-content" : ""}>
// // // //                 <div className="customer-info">
// // // //                     <>
// // // //                         <span
// // // //                             style={{ marginLeft: "15px", fontWeight: "bold" }}
// // // //                         >
// // // //                             {itemcount}
// // // //                         </span>

// // // //                         <button
// // // //                             onClick={handleCheckOutButton}
// // // //                             style={{
// // // //                                 marginLeft: "10px",
// // // //                                 backgroundColor: "green",
// // // //                                 color: "white",
// // // //                                 border: "none",
// // // //                                 padding: "5px 12px",
// // // //                                 borderRadius: "5px",
// // // //                                 cursor: "pointer",
// // // //                             }}
// // // //                         >
// // // //                             Checkout
// // // //                         </button>
// // // //                     </>
// // // //                 </div>

// // // //                 <div className="containerinner">
// // // //                     <div className="form-container">
// // // //                         <center>
// // // //                             <label>Search By Category</label>

// // // //                             <select
// // // //                                 className="select"
// // // //                                 onChange={handleSearch}
// // // //                             >
// // // //                                 <option value="0">All</option>

// // // //                                 {pcatglist.map((pcatgitem) => (
// // // //                                     <option
// // // //                                         key={pcatgitem.pcatgid}
// // // //                                         value={pcatgitem.pcatgid}
// // // //                                     >
// // // //                                         {pcatgitem.pcatgname}
// // // //                                     </option>
// // // //                                 ))}
// // // //                             </select>

// // // //                             <div className="product-list">
// // // //                                 {plist.map((item) => {
// // // //                                     const cname =
// // // //                                         pcatglist.find(
// // // //                                             (c) =>
// // // //                                                 c.pcatgid === item.pcatgid
// // // //                                         )?.pcatgname || "N/A";

// // // //                                     const qty =
// // // //                                         quantities[item.pid] || 0;

// // // //                                     return (
// // // //                                         <div
// // // //                                             className="product-card"
// // // //                                             key={item.pid}
// // // //                                         >
// // // //                                             <img height={100} width={100}
// // // //                                                 className="product-image"
// // // //                                                 src={`http://localhost:9876/product/getproductimage/${item.ppicname}`}
// // // //                                                 alt={item.pname}
// // // //                                             />

// // // //                                             <h4>{item.pname}</h4>

// // // //                                            <p>
// // // //                                                <span><del>MRP: ₹{item.pprice}{" "}</del></span><br/>
// // // //                                                 <span className="strike"> OFFER PRICE: ₹{item.oprice}</span>
// // // //                                             </p>

// // // //                                             <p>{cname}</p>

// // // //                                             {qty > 0 ? (
// // // //                                                 <div>
// // // //                                                     <button
// // // //                                                         onClick={() =>
// // // //                                                             decreaseQty(
// // // //                                                                 item.pid
// // // //                                                             )
// // // //                                                         }
// // // //                                                     >
// // // //                                                         -
// // // //                                                     </button>

// // // //                                                     <span
// // // //                                                         style={{
// // // //                                                             margin:
// // // //                                                                 "0 8px",
// // // //                                                         }}
// // // //                                                     >
// // // //                                                         {qty}
// // // //                                                     </span>

// // // //                                                     <button
// // // //                                                         onClick={() =>
// // // //                                                             increaseQty(
// // // //                                                                 item.pid
// // // //                                                             )
// // // //                                                         }
// // // //                                                     >
// // // //                                                         +
// // // //                                                     </button>
// // // //                                                 </div>
// // // //                                             ) : (
// // // //                                                 <button
// // // //                                                     className="buy"
// // // //                                                     onClick={() =>
// // // //                                                         handleBuyButton(
// // // //                                                             item.pid
// // // //                                                         )
// // // //                                                     }
// // // //                                                 >
// // // //                                                     Buy
// // // //                                                 </button>
// // // //                                             )}
// // // //                                         </div>
// // // //                                     );
// // // //                                 })}
// // // //                             </div>
// // // //                         </center>
// // // //                     </div>
// // // //                 </div>
// // // //             </div>
// // // //         </>
// // // //     );
// // // // }

// // // // export default ProductList;


// // // //   import React,{useState,useEffect} from "react";
// // // //   import axios from "axios";
// // // //   import Bill from "../customerviews/Bill";
// // // //   import CustomerLoginPopup from "../customerviews/CustomerLoginPopup";
// // // //   import "../index.css";
// // // //   import "../ProductList.css";

// // // //     function ProductList(props)
// // // //     {
// // // //         const [itemcount,setItemCount]=useState(0);
// // // //         const [sellitem,setsellitem]=useState([]);
// // // //         const [quantities,setQuantites] = useState({});
// // // //         const [cid,setCId] = useState(null);
// // // //         const [customerSession,setCustomerSession] = useState(null);
// // // //         const [plist,setPList]=useState([]);
// // // //         const [pcatglist,setPCatgList] = useState([]);
// // // //         const[showLogin,setShowLogin] = useState(false);
// // // //         const[showBill,setShowBill] = useState(false);

// // // //         useEffect(() => {
// // // //              setCId(props.data);

// // // //              axios.get("http://localhost:9876/product/showproduct").then((res) => setPList(res.data)).catch((err) => alert(err));

// // // //              axios.get("http://localhost:9876/productcatg/showproductcatg").then((res)=> setPCatgList(res.data)).catch((err)=> alert(err));

// // // //              const session = sessionStorage.getItem("useSession") || localStorage.getItem("userSession");

// // // //              if(session)
// // // //              {
// // // //                 const obj = JSON.parse(session);
// // // //                 setCustomerSession(obj);
// // // //                 setCId(obj.cid);
            
// // // //             }
// // // //         },[props.data]);

// // // //         const handleLoginSuccess = (sessionData) => {
// // // //             setCustomerSession(sessionData);
// // // //             setCId(sessionData.cid);
// // // //             setShowLogin(false);
// // // //         };

// // // //          const handleLogout = () => {
// // // //             sessionStorage.removeItem("userSession");
// // // //             localStorage.removeItem("userSession");
// // // //             setCustomerSession(null);

// // // //             setCId(null);
// // // //             setsellitem([]);
// // // //             setQuantites({});
// // // //             setItemCount(0);
// // // //             alert("You have been logout..");

// // // //          };

// // // //         const handleBuyButton = (pid) =>
// // // //         {
// // // //             setCId(props.data);
// // // //             if(!props.data)
// // // //             {
// // // //                 setShowLogin(true);
// // // //                 return;
// // // //             }

// // // //             axios.get(`http://localhost:9876/product/showproductstatus/${pid}`).then((res) => {
// // // //                 if(res.data.status === "Active")
// // // //                 {
// // // //                     const selected = plist.find((item) => item.pid === pid);
// // // //                     if(!selected) return;

// // // //                     setsellitem((prev) => {
// // // //                         const already = prev.find((i) => i.pid === pid);
// // // //                         if(already) return prev;
// // // //                         return[...prev,selected];
// // // //                     });

// // // //                     setQuantites((prev) => ({
// // // //                         ...prev,
// // // //                         [pid] : (prev[pid] || 0) + 1,
// // // //                     }));

// // // //                     setItemCount((prev) => prev+1);
// // // //                 }

// // // //                 else
// // // //                 {
// // // //                     alert("Product out of Stock/Inactive. Cannot add to cart");
// // // //                 }
// // // //             }).catch((err) => alert(err));
// // // //         };

// // // //         // INCREASE QUANTITY

// // // //         const increaseQty = (pid) => {
// // // //              setQuantites((prev) => ({
// // // //                 ...prev,[pid] : (prev[pid] || + 1) + 1,
// // // //              }));
// // // //              setItemCount((prev) => prev + 1);

// // // //         };

// // // //             // DEACRESE QUANTITY

// // // //             // const decreaseQty = (pid) => {
// // // //             //     setQuantites((prev) => (
// // // //             //         const newQty = (prev[pid] || 1) -1 ;

// // // //             //         if(newQty <= 0)
// // // //             //         {
// // // //             //           setsellitem((old) => old.filter((item) => item.pid !== pid));
// // // //             //           const updated = Object.fromEntries(
// // // //             //             Object.entries(prev).filter(([k]) => k !== String(pid))
// // // //             //           );
// // // //             //           const total = Object.values(updated).reduce((sum, v) => sum + v, 0);
// // // //             //           setItemCount(total);
// // // //             //           return updated;
// // // //             //         }
// // // //             //         const updated = {...prev, [pid] : newQty};
// // // //             //         const total = Object.values(updated).reduce((sum,v) => sum + v, 0);
// // // //             //         setItemCount(total);
// // // //             //         return updated;
// // // //             //     ));
// // // //             // };

// // // //             const decreaseQty = (pid) => {
// // // //     setQuantites((prev) => {
// // // //         const newQty = (prev[pid] || 1) - 1;

// // // //         if (newQty <= 0) {
// // // //             setsellitem((old) => old.filter((item) => item.pid !== pid));

// // // //             const updated = Object.fromEntries(
// // // //                 Object.entries(prev).filter(([k]) => k !== String(pid))
// // // //             );

// // // //             const total = Object.values(updated)
// // // //                 .reduce((sum, v) => sum + v, 0);

// // // //             setItemCount(total);
// // // //             return updated;
// // // //         }

// // // //         const updated = { ...prev, [pid]: newQty };

// // // //         const total = Object.values(updated)
// // // //             .reduce((sum, v) => sum + v, 0);

// // // //         setItemCount(total);
// // // //         return updated;
// // // //     });
// // // // };
              
// // // //      const handleCheckOutButton = () => {
// // // //         if(!cid) 
// // // //         {
// // // //             setShowLogin(true);
// // // //             return;
// // // //         }

// // // //         if(sellitem.length <= 0)
// // // //         {
// // // //             alert("Please buy some product before checbut..")
// // // //             return;
// // // //         }
// // // //         setShowBill(true);
// // // //      };

// // // //      const handlePaymentSuccess = () => {

// // // //         setsellitem([]);
// // // //         setQuantites({});
// // // //         setItemCount(0);
// // // //         setShowBill(false);
// // // //      };

// // // //       // QUANTIY UPDATE FROM BILL

// // // //       const handleUpdateCart = (pid, newQty) => {
// // // //         setQuantites((prev) => {
// // // //             const update = {...prev,[pid]: newQty};
// // // //             const total = Object.values(update).reduce((sum, v) => sum + v, 0);
// // // //             setItemCount(total);
// // // //             return update;
// // // //         });
// // // //       };

// // // //       // ITEM REMOVE ALL BILL

// // // //       const handleRemoveItem = (pid) => {
// // // //         setsellitem((prev) => prev.filter((item) => item.pid !== pid));
// // // //         setQuantites((prev) => {
// // // //                const updated = {...prev};
// // // //                delete updated[pid];
// // // //                const total = Object.values(updated).reduce((sum, v) => sum + v,0);
// // // //                setItemCount(total);
// // // //                return updated;
// // // //         });
// // // //       };

// // // //         const handleSearch = (evt) => {
// // // //             const catgId = evt.target.value;
// // // //             const url = catgId >0 ? `http://localhost:9876/product/showproductbycatgid/${catgId}` : "http://localhost:9876:product/showproduct";

// // // //             axios.get(url).then((res) => setPList(res.data)).catch((err)=> alert(err));
// // // //         };
// // // //         if(showBill)
// // // //         {
// // // //             return(
// // // //                 <Bill 
// // // //                 data={{ sellitem,cid,quantities}}
// // // //                 onBack={() => setShowBill(false)}
// // // //                 onPaymentSuccess = {handlePaymentSuccess}
// // // //                 onUpdateCart = {handleUpdateCart}
// // // //                 onRemoveItem = {handleRemoveItem}
// // // //                 />
// // // //             );
// // // //         }

// // // //         return (
// // // //             <>
// // // //             {showLogin && (
// // // //                 <CustomerLoginPopup
// // // //                 onClose ={() => setShowLogin(false)}
// // // //                 onLoginSuccess = {handleLoginSuccess}
// // // //                 />
// // // //             )}

// // // //             <div className={showLogin ? "blurred-content" : ""}>
// // // //                 <div className="customer-info">
// // // //                     <>
// // // //                     <span style={{marginLeft: "15px", fontWeight:"bold"}}>
// // // //                         {itemcount}
// // // //                     </span>

// // // //                     <button onClick={handleCheckOutButton} style={{marginLeft:"10px", backgroundColor:"green", color:"white", border:"none",padding:"5px 12px",borderRadius:"5px",cursor:"pointer"}}>Checkout</button>
// // // //                         </>

// // // //                         ) : (
// // // //                        <span>Customer : Guest</span>
// // // //                         )                 
// // // //                 </div>

// // // //                 <div className="containerinner">
// // // //                     <div className="form-container">
// // // //                         <center>
// // // //                             <label>Search By Category</label>
// // // //                             <select className="select" onChange={handleSearch}>
// // // //                                 <option value="0">All</option>
// // // //                                 {pcatglist.map((pcatgitem) => (
// // // //                                     <option key={pcatgitem.pcatgid} value={pcatgitem,pcatgid}>
// // // //                                         {pcatgitem.pcatgname}
// // // //                                     </option>
// // // //                                 ))}
// // // //                             </select>

// // // //                             <div className="product-list">
// // // //                                 {/* {plist.map((item) => {
// // // //                                     const cname = pcatglist.find((c) => c.pcatgid === item.pcatgid) ?.pcatgname || "N/A";
// // // //                                     const qty = quantities[item.pid] || 0;

// // // //                                     return
// // // //                                     (
// // // //                                <div className="product-card" key={item.pid} >
// // // //                                 <img className="product-image" src={`http://localhost:9876/product/productimage/${item.ppicname}`} alt={item.pname}></img>         
// // // //                                  <h4>{item.pname}</h4> 
// // // //                                  <p>
// // // //                                     {item.oprice}{""}
// // // //                                     <span className="strick">{item.pprice}</span>
// // // //                                     </p>  
// // // //                                     <p>{cname}</p>

// // // //                                     {qty > 0? (
// // // //                                         <div>
// // // //                                             <button onClick={() => decreaseQty(item.pid)}>-</button>
// // // //                                             <span style={{margin:"0 8px"}}>{qty}</span>
// // // //                                             <button onClick={() => increaseQty(item.pid)}>+</button>
                                            
// // // //                                             </div>

// // // //                                     ) : (

// // // //                                         <button className="buy" onClick={() => handleBuyButton(item.pid)}>Buy</button>
// // // //                                     )}
// // // //                                               </div>
// // // //                                     );
// // // //                                 })} */}
// // // //                                 {plist.map((item) => {
// // // //     const cname = pcatglist.find((c) => c.pcatgid === item.pcatgid)?.pcatgname || "N/A";
// // // //     const qty = quantities[item.pid] || 0;

// // // //     return (
// // // //         <div className="product-card" key={item.pid} >
// // // //             <img className="product-image" src={`http://localhost:9876/product/productimage/${item.ppicname}`} alt={item.pname}></img>         
// // // //             <h4>{item.pname}</h4> 
// // // //             <p>
// // // //                 {item.oprice}{""}
// // // //                 <span className="strick">{item.pprice}</span>
// // // //             </p>  
// // // //             <p>{cname}</p>

// // // //             {qty > 0? (
// // // //                 <div>
// // // //                     <button onClick={() => decreaseQty(item.pid)}>-</button>
// // // //                     <span style={{margin:"0 8px"}}>{qty}</span>
// // // //                     <button onClick={() => increaseQty(item.pid)}>+</button>
// // // //                 </div>
// // // //             ) : (
// // // //                 <button className="buy" onClick={() => handleBuyButton(item.pid)}>Buy</button>
// // // //             )}
// // // //         </div>
// // // //     );
// // // // })}

// // // //                             </div>
// // // //                         </center>
                  
// // // //                     </div>
                
// // // //                 </div>
            
// // // //              </div>
// // // //                  </>
// // // //                     )
// // // //     }
// // // //     export default ProductList;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Bill from "../customerviews/Bill";
// import "./ProductList.css";
// import { FaShoppingCart } from "react-icons/fa";


// function ProductList(props) {
//     const [itemcount, setItemCount] = useState(0);
//     const [sellitem, setsellitem] = useState([]);
//     const [quantities, setQuantites] = useState({});
//     const [cid, setCId] = useState(null);
//     const [customerSession, setCustomerSession] = useState(null);
//     const [plist, setPList] = useState([]);
//     const [pcatglist, setPCatgList] = useState([]);
//     const [showLogin, setShowLogin] = useState(false);
//     const [showBill, setShowBill] = useState(false);

//     useEffect(() => {
//         setCId(props.data);

//         axios
//             .get("http://localhost:9876/product/showproduct")
//             .then((res) => setPList(res.data))
//             .catch((err) => alert(err));

//         axios
//             .get("http://localhost:9876/productcatg/showproductcatg")
//             .then((res) => setPCatgList(res.data))
//             .catch((err) => alert(err));

//         const session =
//             sessionStorage.getItem("useSession") ||
//             localStorage.getItem("userSession");

//         if (session) {
//             const obj = JSON.parse(session);
//             setCustomerSession(obj);
//             setCId(obj.cid);
//         }
//     }, [props.data]);

//     const handleBuyButton = (pid) => {
//         setCId(props.data);

//         if (!props.data) {
//             setShowLogin(true);
//             return;
//         }

//         axios
//             .get(`http://localhost:9876/product/showproduct/${pid}`)
//             .then((res) => {

//                 // ✅ ONLY FIX: backend returns ARRAY
//                 if (res.data[0].status === "Active") {

//                     const selected = plist.find((item) => item.pid === pid);
//                     if (!selected) return;

//                     setsellitem((prev) => {
//                         const already = prev.find((i) => i.pid === pid);
//                         if (already) return prev;
//                         return [...prev, selected];
//                     });

//                     setQuantites((prev) => ({
//                         ...prev,
//                         [pid]: (prev[pid] || 0) + 1,
//                     }));

//                     setItemCount((prev) => prev + 1);
//                 } else {
//                     alert("Product out of Stock / Inactive");
//                 }
//             })
//             .catch((err) => alert(err));
//     };

//     const increaseQty = (pid) => {
//         setQuantites((prev) => ({
//             ...prev,
//             [pid]: (prev[pid] || 1) + 1,
//         }));
//         setItemCount((prev) => prev + 1);
//     };

//     const decreaseQty = (pid) => {
//         setQuantites((prev) => {
//             const newQty = (prev[pid] || 1) - 1;

//             if (newQty <= 0) {
//                 setsellitem((old) =>
//                     old.filter((item) => item.pid !== pid)
//                 );

//                 const updated = Object.fromEntries(
//                     Object.entries(prev).filter(([k]) => k !== String(pid))
//                 );

//                 const total = Object.values(updated).reduce(
//                     (sum, v) => sum + v,
//                     0
//                 );

//                 setItemCount(total);
//                 return updated;
//             }

//             const updated = { ...prev, [pid]: newQty };

//             const total = Object.values(updated).reduce(
//                 (sum, v) => sum + v,
//                 0
//             );

//             setItemCount(total);
//             return updated;
//         });
//     };

//     const handleCheckOutButton = () => {
//         if (!cid) {
//             setShowLogin(true);
//             return;
//         }

//         if (sellitem.length <= 0) {
//             alert("Please buy some product before checkout");
//             return;
//         }

//         setShowBill(true);
//     };

//     const handlePaymentSuccess = () => {
//         setsellitem([]);
//         setQuantites({});
//         setItemCount(0);
//         setShowBill(false);
//     };

//     const handleUpdateCart = (pid, newQty) => {
//         setQuantites((prev) => {
//             const update = { ...prev, [pid]: newQty };
//             const total = Object.values(update).reduce(
//                 (sum, v) => sum + v,
//                 0
//             );
//             setItemCount(total);
//             return update;
//         });
//     };

//     const handleRemoveItem = (pid) => {
//         setsellitem((prev) => prev.filter((item) => item.pid !== pid));

//         setQuantites((prev) => {
//             const updated = { ...prev };
//             delete updated[pid];
//             const total = Object.values(updated).reduce(
//                 (sum, v) => sum + v,
//                 0
//             );
//             setItemCount(total);
//             return updated;
//         });
//     };

//          const handleSearch = (evt) => {
//     const catgId = evt.target.value;

//     const url =
//         catgId > 0
//             ? `http://localhost:9876/product/showproductbycatgid/${catgId}`
//             : "http://localhost:9876/product/showproduct";

//     axios
//         .get(url)
//         .then((res) => setPList(res.data))
//         .catch((err) => alert(err));
// };


//     // const handleSearch = (evt) => {
//     //     const catgId = evt.target.value;

//     //     const url =
//     //         catgId > 0
//     //             ? `http://localhost:9876/product/showproductbycatid/${catgId}`
//     //             : "http://localhost:9876/product/showproduct";

//     //     axios
//     //         .get(url)
//     //         .then((res) => setPList(res.data))
//     //         .catch((err) => alert(err));
//     // };

//     if (showBill) {
//         return (
//             <Bill
//                 data={{ sellitem, cid, quantities }}
//                 onBack={() => setShowBill(false)}
//                 onPaymentSuccess={handlePaymentSuccess}
//                 onUpdateCart={handleUpdateCart}
//                 onRemoveItem={handleRemoveItem}
//             />
//         );
//     }

//     return (
//         <>
//             <div className="pl-customer-info">
//                 <span className="pl-item-count">{itemcount}</span>
// {/* 
//                 <button
//                     onClick={handleCheckOutButton}
//                     className="pl-checkout-btn"
//                 >
//                     Checkout
//                 </button> */}

//                 <button
//                    onClick={handleCheckOutButton}
//                       className="pl-checkout-btn"
//                >
//                      <FaShoppingCart className="pl-cart-icon" />
//                        Checkout
//                          </button>

//             </div>

//             <div className="pl-container-inner">
//                 <center>
//                     <label className="pl-search-label">Search By Category</label>

//                     <select className="pl-select" onChange={handleSearch}>
//                         <option value="0">All</option>

//                         {pcatglist.map((pc) => (
//                             <option key={pc.pcatgid} value={pc.pcatgid}>
//                                 {pc.pcatgname}
//                             </option>
//                         ))}
//                     </select>

//                     <div className="pl-product-list">
//                         {plist.map((item) => {
//                             const qty = quantities[item.pid] || 0;

//                             return (
//                                 <div className="pl-product-card" key={item.pid}>
//                                     <img
//                                         height={100}
//                                         width={100}
//                                         src={`http://localhost:9876/product/getproductimage/${item.ppicname}`}
//                                         alt={item.pname}
//                                     />

//                                     <h4>{item.pname}</h4>

//                                     <p>
//                                         <del>₹{item.pprice}</del><br />
//                                         <b>₹{item.oprice}</b>
//                                     </p>

//                                     {qty > 0 ? (
//                                         <div>
//                                             <button onClick={() => decreaseQty(item.pid)}>-</button>
//                                             <span>{qty}</span>
//                                             <button onClick={() => increaseQty(item.pid)}>+</button>
//                                         </div>
//                                     ) : (
//                                         <button onClick={() => handleBuyButton(item.pid)}>
//                                             Buy
//                                         </button>
//                                     )}
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </center>
//             </div>
//         </>
//     );
// }

// export default ProductList;
import React, { useState, useEffect } from "react";
import axios from "axios";
import Bill from "../customerviews/Bill";
import "./ProductList.css";
import { FaShoppingCart } from "react-icons/fa";


function ProductList(props) {
    const [itemcount, setItemCount] = useState(0);
    const [sellitem, setsellitem] = useState([]);
    const [quantities, setQuantites] = useState({});
    const [cid, setCId] = useState(null);
    const [customerSession, setCustomerSession] = useState(null);
    const [plist, setPList] = useState([]);
    const [pcatglist, setPCatgList] = useState([]);
    const [showLogin, setShowLogin] = useState(false);
    const [showBill, setShowBill] = useState(false);

    useEffect(() => {
        setCId(props.data);

        axios
            .get("http://localhost:9876/product/showproduct")
            .then((res) => setPList(res.data))
            .catch((err) => alert(err));

        axios
            .get("http://localhost:9876/productcatg/showproductcatg")
            .then((res) => setPCatgList(res.data))
            .catch((err) => alert(err));

        const session =
            sessionStorage.getItem("useSession") ||
            localStorage.getItem("userSession");

        if (session) {
            const obj = JSON.parse(session);
            setCustomerSession(obj);
            setCId(obj.cid);
        }
    }, [props.data]);

    const handleBuyButton = (pid) => {
        setCId(props.data);

        if (!props.data) {
            setShowLogin(true);
            return;
        }

        axios
            .get(`http://localhost:9876/product/showproduct/${pid}`)
            .then((res) => {

                //  ONLY FIX: backend returns ARRAY
                if (res.data.status == "Active") {

                    const selected = plist.find((item) => item.pid === pid);
                    if (!selected) return;

                    setsellitem((prev) => {
                        const already = prev.find((i) => i.pid === pid);
                        if (already) return prev;
                        return [...prev, selected];
                    });

                    setQuantites((prev) => ({
                        ...prev,
                        [pid]: (prev[pid] || 0) + 1,
                    }));

                    setItemCount((prev) => prev + 1);
                } else {
                    alert("Product out of Stock / Inactive");
                }
            })
            .catch((err) => alert(err));
    };

    const increaseQty = (pid) => {
        setQuantites((prev) => ({
            ...prev,
            [pid]: (prev[pid] || 1) + 1,
        }));
        setItemCount((prev) => prev + 1);
    };

    const decreaseQty = (pid) => {
        setQuantites((prev) => {
            const newQty = (prev[pid] || 1) - 1;

            if (newQty <= 0) {
                setsellitem((old) =>
                    old.filter((item) => item.pid !== pid)
                );

                const updated = Object.fromEntries(
                    Object.entries(prev).filter(([k]) => k !== String(pid))
                );

                const total = Object.values(updated).reduce(
                    (sum, v) => sum + v,
                    0
                );

                setItemCount(total);
                return updated;
            }

            const updated = { ...prev, [pid]: newQty };

            const total = Object.values(updated).reduce(
                (sum, v) => sum + v,
                0
            );

            setItemCount(total);
            return updated;
        });
    };

    const handleCheckOutButton = () => {
        if (!cid) {
            setShowLogin(true);
            return;
        }

        if (sellitem.length <= 0) {
            alert("Please buy some product before checkout");
            return;
        }

        setShowBill(true);
    };

    const handlePaymentSuccess = () => {
        setsellitem([]);
        setQuantites({});
        setItemCount(0);
        setShowBill(false);
    };

    const handleUpdateCart = (pid, newQty) => {
        setQuantites((prev) => {
            const update = { ...prev, [pid]: newQty };
            const total = Object.values(update).reduce(
                (sum, v) => sum + v,
                0
            );
            setItemCount(total);
            return update;
        });
    };

    const handleRemoveItem = (pid) => {
        setsellitem((prev) => prev.filter((item) => item.pid !== pid));

        setQuantites((prev) => {
            const updated = { ...prev };
            delete updated[pid];
            const total = Object.values(updated).reduce(
                (sum, v) => sum + v,
                0
            );
            setItemCount(total);
            return updated;
        });
    };

         const handleSearch = (evt) => {
    const catgId = evt.target.value;

    const url =
        catgId > 0
            ? `http://localhost:9876/product/showproductbycatgid/${catgId}`
            : "http://localhost:9876/product/showproduct";

    axios
        .get(url)
        .then((res) => setPList(res.data))
        .catch((err) => alert(err));
};


    // const handleSearch = (evt) => {
    //     const catgId = evt.target.value;

    //     const url =
    //         catgId > 0
    //             ? `http://localhost:9876/product/showproductbycatid/${catgId}`
    //             : "http://localhost:9876/product/showproduct";

    //     axios
    //         .get(url)
    //         .then((res) => setPList(res.data))
    //         .catch((err) => alert(err));
    // };

    if (showBill) {
        return (
            <Bill
                data={{ sellitem, cid, quantities }}
                onBack={() => setShowBill(false)}
                onPaymentSuccess={handlePaymentSuccess}
                onUpdateCart={handleUpdateCart}
                onRemoveItem={handleRemoveItem}
            />
        );
    }

    return (
        <>
            <div className="pl-customer-info">
                <span className="pl-item-count">{itemcount}</span>
{/* 
                <button
                    onClick={handleCheckOutButton}
                    className="pl-checkout-btn"
                >
                    Checkout
                </button> */}

                <button
                   onClick={handleCheckOutButton}
                      className="pl-checkout-btn"
               >
                     <FaShoppingCart className="pl-cart-icon" />
                       Checkout
                         </button>

            </div>

            <div className="pl-container-inner">
                <center>
                    <label className="pl-search-label">Search By Category</label>

                    <select className="pl-select" onChange={handleSearch}>
                        <option value="0">All</option>

                        {pcatglist.map((pc) => (
                            <option key={pc.pcatgid} value={pc.pcatgid}>
                                {pc.pcatgname}
                            </option>
                        ))}
                    </select>

                    <div className="pl-product-list">
                        {plist.map((item) => {
                            const qty = quantities[item.pid] || 0;

                            return (
                                <div className="pl-product-card" key={item.pid}>
                                    <img
                                        height={100}
                                        width={100}
                                        src={`http://localhost:9876/product/getproductimage/${item.ppicname}`}
                                        alt={item.pname}
                                    />

                                    <h4>{item.pname}</h4>

                                    <p>
                                        <del>₹{item.pprice}</del><br />
                                        <b>₹{item.oprice}</b>
                                    </p>

                                    {qty > 0 ? (
                                        <div>
                                            <button onClick={() => decreaseQty(item.pid)}>-</button>
                                            <span>{qty}</span>
                                            <button onClick={() => increaseQty(item.pid)}>+</button>
                                        </div>
                                    ) : (
                                        <button onClick={() => handleBuyButton(item.pid)}>
                                            Buy
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </center>
            </div>
        </>
    );
}

export default ProductList;
