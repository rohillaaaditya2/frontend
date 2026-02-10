// // import axios from "axios";
// // import React, { useEffect, useState } from "react";
// // import Bill from "../customerviews/Bill";
// // import { toast } from "react-toastify";
// // import CustomerLoginPopup from "../customerviews/CustomerLoginPopup";
// // import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// // import "./ProductlistforMainpage.css";

// // export default function ProductListforMainpage() {
// //   const [itemcount, setItemCount] = useState(0);
// //   const [sellitem, setSellitem] = useState([]);
// //   const [quantities, setQuantities] = useState({});
// //   const [cid, setCid] = useState(null);
// //   const [customerSession, setCustomerSession] = useState(null);
// //   const [pcatglist, setPcgatList] = useState([]);
// //   const [plist, setPlist] = useState([]);
// //   const [showlogin, setShowlogin] = useState(false);
// //   const [showBill, setShowbill] = useState(false);
// //   const ProUrl = "http://localhost:9876/product/";

  

// //   useEffect(() => {
// //     const timer = setInterval(() => {
// //       // setSlideIndex((prev) => (prev + 1) % sliderImages.length);
// //     }, 3000);
// //     return () => clearInterval(timer);
// //   }, []);

// //   // ===== LOAD PRODUCTS & CATEGORY =====
// //   useEffect(() => {
// //     axios
// //       .get(`${ProUrl}showproduct`)
// //       .then((res) => {
// //         setPlist(res.data.filter((product) => product.status === "Active") || []);
// //       })
// //       .catch((err) => toast.error(err));

// //     axios
// //       .get("http://localhost:9876/productcatg/showproductcatg")
// //       .then((res) => setPcgatList(res.data))
// //       .catch((err) => toast.error(err));

// //     const session =
// //       sessionStorage.getItem("Usersession") || localStorage.getItem("Usersession");
// //     if (session) {
// //       const obj = JSON.parse(session);
// //       setCustomerSession(obj);
// //       setCid(obj.cid);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     const selectedItems = plist.filter((item) => quantities[item.pid] > 0);
// //     setSellitem(selectedItems);
// //   }, [quantities, plist]);

  
// //       console.log("sellporoduct items",sellitem);

// //   // ===== LOGIN / LOGOUT =====
// //   const handleLoginSucces = (sessionData) => {
// //     setCustomerSession(sessionData);
// //     setCid(sessionData.cid);
// //     setShowlogin(false);
// //   };

// //   const handleLogout = () => {
// //     sessionStorage.removeItem("Usersession");
// //     localStorage.removeItem("Usersession");
// //     setCustomerSession(null);
// //     setCid(null);
// //     setSellitem([]);
// //     setQuantities({});
// //     setItemCount(0);
// //     toast.warning("You have been logout");
// //   };

// //   // ===== BUY BUTTON =====
// //   const handleBuybtn = (pid) => {
// //     if (!cid) {
// //       setShowlogin(true);
// //       return;
// //     }

// //     const selected = plist.find((item) => item.pid === pid);
// //     if (!selected) return;

// //     if (selected.status !== "Active") {
// //       toast.warning("Product is Out of Stock");
// //       return;
// //     }

// //     setQuantities((prev) => ({
// //       ...prev,
// //       [pid]: (prev[pid] || 0) + 1,
// //     }));

// //     setItemCount((prev) => prev + 1);
// //   };

// //   // ===== QUANTITY CONTROL =====
// //   const increaseQantity = (pid) => {
// //     setQuantities((prev) => ({
// //       ...prev,
// //       [pid]: (prev[pid] || 1) + 1,
// //     }));
// //     setItemCount((prev) => prev + 1);
// //   };

// //   const decreaseQnty = (pid) => {
// //     setQuantities((prev) => {
// //       let newQty = (prev[pid] || 1) - 1;
// //       if (newQty <= 0) {
// //         setSellitem((old) => old.filter((item) => item.pid !== pid));
// //         const updated = Object.fromEntries(
// //           Object.entries(prev).filter((k) => k !== String(pid))
// //         );
// //         return updated;
// //       }
// //       return { ...prev, [pid]: newQty };
// //     });
// //     setItemCount((prev) => (prev > 0 ? prev - 1 : 0));
// //   };

// //   // ===== CHECKOUT =====
// //   const handleCheckOutBtn = () => {
// //     if (!cid) {
// //       setShowlogin(true);
// //       return;
// //     }
// //     if (sellitem.length <= 0) {
// //       toast.warning("Please buy some product before Checkout");
// //       return;
// //     }
// //     setShowbill(true);
// //   };

// //   const handlePaymentSuccess = () => {
// //     setSellitem([]);
// //     setQuantities({});
// //     setItemCount(0);
// //     setShowbill(false);
// //   };

// //   const handleUpdateCart = (pid, newQty) => {
// //     setQuantities((prev) => ({ ...prev, [pid]: newQty }));
// //     const total = Object.values({ ...quantities, [pid]: newQty }).reduce(
// //       (sum, v) => sum + v,
// //       0
// //     );
// //     setItemCount(total);
// //   };

// //   const handleRemoveItem = (pid) => {
// //     setSellitem((prev) => prev.filter((item) => item.pid !== pid));
// //     setQuantities((prev) => {
// //       const updated = { ...prev };
// //       delete updated[pid];
// //       return updated;
// //     });
// //     const total = Object.values(quantities)
// //       .filter((_, key) => key !== pid)
// //       .reduce((sum, v) => sum + v, 0);
// //     setItemCount(total);
// //   };

// //   // ===== SEARCH BY CATEGORY =====
// //   const handleSearch = (evt) => {
// //     const catgid = evt.target.value;
// //     const url =
// //       catgid > 0
// //         ? `${ProUrl}showproductbycatgid/${catgid}`
// //         : `${ProUrl}showproduct`;
// //     axios.get(url).then((res) => setPlist(res.data)).catch((err) => toast.error(err));
// //   };

// //   // ===== RENDER BILL IF CHECKOUT =====
// //   console.log("showbill sellitems",sellitem);
// //   if (showBill) {
// //     return (
// //       <Bill
// //         data={{ sellitem, cid, quantities }}
// //         onBack={() => setShowbill(false)}
// //         onPaymenSuccess={handlePaymentSuccess}
// //         onUpdatecart={handleUpdateCart}
// //         onRemoveitem={handleRemoveItem}
// //       ></Bill>
// //     );
// //   }

// //   return (
// //     <>
// //       {showlogin && (
// //         <CustomerLoginPopup
// //           onClose={() => setShowlogin(false)}
// //           onLoginSuccess={handleLoginSucces}
// //         />
// //       )}

// //       <div className={showlogin ? "plm_blur_wrapper" : "plm_main_wrapper"}>
    

// //         {/* ===== CUSTOMER INFO ===== */}
// //         <div className="customer_info_wrapper">
// //           {customerSession ? (
// //             <>
// //               <img
// //                 src={`http://localhost:9876/customer/getimage/${customerSession.cpicname}`}
// //                 alt={customerSession.cpicname}
// //                 className="customer_img"
// //               />
// //               <span className="customer_name">{customerSession.cfname}</span>
// //               <span className="cart_item_count">{itemcount}</span>
// //               <button className="checkout_button" onClick={handleCheckOutBtn}>
// //                 Checkout
// //               </button>
// //               <button className="logout_button" onClick={handleLogout}>
// //                 Logout
// //               </button>
// //             </>
// //           ) : (
// //             <span className="guest_label">Customer: Guest</span>
// //           )}
// //         </div>

// //         {/* ===== SEARCH & PRODUCTS ===== */}
// //         <div className="search_product_wrapper">
// //           <center>
// //             <label className="search_label">Search By Category</label>
// //             <select className="category_select" onChange={handleSearch}>
// //               <option value="0">All</option>
// //               {pcatglist.map((pcatitem) => (
// //                 <option key={pcatitem.pcatgid} value={pcatitem.pcatgid}>
// //                   {pcatitem.pcatgname}
// //                 </option>
// //               ))}
// //             </select>

// //             <div className="product_list_wrapper">
// //               {plist.map((item) => {
// //                 const cname =
// //                   pcatglist.find((c) => c.pcatgid === item.pcatgid)?.pcatgname || "N/A";
// //                 const Qty = quantities[item.pid] || 0;

// //                 return (
// //                   <div className="product_card_wrapper" key={item.pid}>
// //                     <img
// //                       className="product_image"
// //                       src={`${ProUrl}getproductimage/${item.ppicname}`}
// //                       alt={item.ppicname}
// //                     />
// //                     <h4 className="product_name">{item.pname}</h4>
// //                     <p className="product_price">
// //                       ₹{item.oprice}{" "}
// //                       <span className="product_price_strike">₹{item.price}</span>
// //                     </p>
// //                     <p className="product_category">{cname}</p>

// //                     {Qty > 0 ? (
// //                       <div className="quantity_controls">
// //                         <button className="qty_btn" onClick={() => decreaseQnty(item.pid)}>
// //                           -
// //                         </button>
// //                         <span className="qty_count">{Qty}</span>
// //                         <button className="qty_btn" onClick={() => increaseQantity(item.pid)}>
// //                           +
// //                         </button>
// //                       </div>
// //                     ) : (
// //                       <button className="buy_button" onClick={() => handleBuybtn(item.pid)}>
// //                         Buy
// //                       </button>
// //                     )}
// //                   </div>
// //                 );
// //               })}
// //             </div>
// //           </center>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }















// // // import axios from "axios";
// // // import React, { useEffect, useState } from "react";
// // // import Bill from "../customerviews/Bill";
// // // import { toast } from "react-toastify";
// // // import CustomerLoginPopup from "../customerviews/CustomerLoginPopup";
// // // import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// // // import "./ProductlistForMainPage.css";


// // // export default function ProductListforMainpage(){
// // //     const [itemcount, setItemCount]=useState(0);
// // //     const [sellitem,setSellitem]=useState([]);
// // //     const [quantities,setQuantities]=useState({});
// // //     const [cid,setCid]=useState(null);
// // //     const [customerSession,setCustomerSession]=useState(null);
// // //     const [pcatglist,setPcgatList]=useState([]);
// // //     const [plist,setPlist]=useState([]);
// // //     const [showlogin,setShowlogin]=useState(false);
// // //     const [showBill,setShowbill]=useState(false);
// // //     const ProUrl="http://localhost:9876/product/";


// // //     useEffect(()=>{
// // //         axios.get(`${ProUrl}showproduct`).then((res)=>{
// // //             setPlist(res.data.filter(product=>product.status==="Active")||[]);
// // //         }).catch(err=> toast.error(err));

// // //         axios.get("http://localhost:9876/productcatg/showproductcatg").then((res)=>setPcgatList(res.data)).catch(err=>toast.error(err));
// // //         const session=sessionStorage.getItem("Usersession")||localStorage.getItem("Usersession");
// // //         if (session) {
// // //             const obj=JSON.parse(session);
// // //             setCustomerSession(obj);
// // //             setCid(obj.cid);
// // //         }
// // //     },[]);

// // //     useEffect(() => {
// // //     const selectedItems = plist.filter(
// // //         (item) => quantities[item.pid] > 0
// // //     );
// // //     setSellitem(selectedItems);
// // // }, [quantities, plist]);


// // //     const handleLoginSucces=(sessionData)=>{
// // //         setCustomerSession(sessionData);
// // //         setCid(sessionData.cid);
// // //         setShowlogin(false);
// // //     };

// // //     const handleLogout=()=>{
// // //             sessionStorage.removeItem("Usersession");
// // //             localStorage.removeItem("Usersession");
// // //             setCustomerSession(null);
// // //             setCid(null);
// // //             setSellitem([]);
// // //             setQuantities({});
// // //             setItemCount(0);
// // //             toast.warning("You have been logout");
// // //         };


// // //           // BUY BUTTON ADDS OR INCREASE QUANTITY
// // //     //        const handleBuybtn=(pid)=>{
// // //     //       // setCid(props.data);
// // //     //     if (!cid) {
// // //     //         setShowlogin("Active");
// // //     //         return;
// // //     //     }
// // //     //      axios.get(`${ProUrl}showproduct/${pid}`).then(res=>{
// // //     //         if (res.data.status==="Active") {
// // //     //             const selected=plist.find((item)=> item.pid===pid);
// // //     //             if(!selected)return;

// // //     //             setSellitem((prev)=>{
// // //     //                 const already=prev.find(i=> i.pid===pid);
// // //     //                 if(already)return prev;
// // //     //                 return [...prev,selected];
// // //     //             });
// // //     //             setQuantities((prev)=>({...prev,[pid]:(prev[pid]||0)+1,
// // //     //                 }));
// // //     //                 setItemCount((prev)=> prev+1);
// // //     //         }else{
// // //     //             toast.warning("Product is Out of Stock. Cannot add to cart");
// // //     //         }
// // //     //     }).catch(err=> toast.error(err));

// // //     // };

// // //      const handleBuybtn = (pid) => {
// // //     if (!cid) {
// // //         setShowlogin(true);
// // //         return;
// // //     }

// // //     const selected = plist.find(item => item.pid === pid);
// // //     if (!selected) return;

// // //     if (selected.status !== "Active") {
// // //         toast.warning("Product is Out of Stock");
// // //         return;
// // //     }

// // //     setQuantities(prev => ({
// // //         ...prev,
// // //         [pid]: (prev[pid] || 0) + 1
// // //     }));

// // //     setItemCount(prev => prev + 1);
// // // };



// // //     //increase qnty
// // //     const increaseQantity=(pid)=>{
// // //         setQuantities((prev)=>({
// // //             ...prev,[pid]:(prev[pid]||1)+1,
// // //         }));
// // //         setItemCount(prev=>prev+1);
// // //     };

// // //           // DEACRESE QUANTITY
// // //     const decreaseQnty=(pid)=>{
// // //         setQuantities((prev)=>{
// // //             let newQty=(prev[pid]||1)-1;
// // //             if (newQty<=0) {
// // //                 setSellitem((old)=> old.filter((item)=> item.pid!==pid));
// // //                 const updated=Object.fromEntries(Object.entries(prev).filter((k)=>k!==String(pid)));
// // //                 return updated;
// // //             }
// // //             return{...prev,[pid]:newQty};
// // //         });
// // //             setItemCount((prev)=>(prev>0?prev-1:0));
// // //     };

// // //     const handleCheckOutBtn=()=>{
// // //         console.log("chekcout");
// // //         if (!cid) {
// // //             // setShowlogin("Active");
// // //              setShowlogin("true");
// // //             return;
// // //         }
// // //         if (sellitem.length<=0) {
// // //             toast.warning("Please buy some product before Checkout");
// // //             return;
// // //         }

      

// // //         setShowbill("Active");
// // //     };
// // //       const handlePaymentSuccess=()=>{
// // //         setSellitem([]);
// // //         setQuantities({});
// // //         setItemCount(0);
// // //         setShowbill(false);
// // //     };
// // //     //qantity update from bill

// // //     const handleUpdateCart=(pid,newQty)=>{
// // //         setQuantities((prev)=>({...prev,[pid]:newQty}))
// // //             const total=Object.values({...quantities,[pid]:newQty}).reduce((sum,v)=> sum+v,0);
// // //             setItemCount(total);        
// // //     };

// // //     //item remove from bill

// // //     const handleRemoveItem=(pid)=>{
// // //         setSellitem((prev)=> prev.filter((item)=>item.pid !== pid));
// // //         setQuantities((prev)=>{
// // //             const updated={...prev};
// // //             delete updated[pid];
// // //             return updated;
// // //         });
// // //          const total=Object.values(quantities).filter((_,key)=>key!==pid).reduce((sum,v)=> sum+v,0);
// // //             setItemCount(total); 

// // //     };

// // //     const handleSearch=(evt)=>{
// // //         // alert("aasalamwalekum lyari")
// // //         const catgid=evt.target.value;
// // //         const url=catgid>0?`${ProUrl}showproductbycatgid/${catgid}`:`${ProUrl}showproduct`;
// // //         axios.get(url).then(res=> setPlist(res.data)).catch(err=> toast.error(err));
// // //     };

// // //      if (showBill) {
// // //             return(
// // //                 <Bill data={{sellitem,cid,quantities}} onBack={()=>setShowbill(false)} onPaymenSuccess={handlePaymentSuccess}
// // //                 onUpdatecart={handleUpdateCart} onRemoveitem={handleRemoveItem}></Bill>
// // //             );
// // //         }

// // //         return (
// // //     <>
// // //         {showlogin && (
// // //             <CustomerLoginPopup 
// // //                 onClose={() => setShowlogin(false)} 
// // //                 onLoginSuccess={handleLoginSucces} 
// // //             />
// // //         )}

// // //         <div className={showlogin ? "plm-blurred-content" : "plm-container"}>
// // //             <div className="plm-customer-info">
// // //                 {customerSession ? (
// // //                     <>
// // //                         <img 
// // //                             src={`http://localhost:9876/customer/getimage/${customerSession.cpicname}`} 
// // //                             alt={customerSession.cpicname} 
// // //                             className="plm-customer-img"
// // //                         />
// // //                         <span className="plm-customer-name">{customerSession.cfname}</span>
// // //                         <span className="plm-item-count">{itemcount}</span>
// // //                         <button className="plm-checkout-btn" onClick={handleCheckOutBtn}>Checkout</button>
// // //                         <button className="plm-logout-btn" onClick={handleLogout}>Logout</button>
// // //                     </>
// // //                 ) : (
// // //                     <span className="plm-guest">Customer: Guest</span>
// // //                 )}
// // //             </div>

// // //             <div className="plm-search-section">
// // //                 <center>
// // //                     <label className="plm-search-label">Search By Category</label>
// // //                     <select className="plm-select" onChange={handleSearch}>
// // //                         <option value="0">All</option>
// // //                         {pcatglist.map((pcatitem) => (
// // //                             <option key={pcatitem.pcatgid} value={pcatitem.pcatgid}>
// // //                                 {pcatitem.pcatgname}
// // //                             </option>
// // //                         ))}
// // //                     </select>

// // //                     <div className="plm-product-list">
// // //                         {plist.map((item) => {
// // //                             const cname = pcatglist.find((c) => c.pcatgid === item.pcatgid)?.pcatgname || "N/A";
// // //                             const Qty = quantities[item.pid] || 0;

// // //                             return (
// // //                                 <div className="plm-product-card" key={item.pid}>
// // //                                     <img 
// // //                                         className="plm-product-img" 
// // //                                         src={`${ProUrl}getproductimage/${item.ppicname}`} 
// // //                                         alt={item.ppicname} 
// // //                                     />
// // //                                     <h4 className="plm-product-name">{item.pname}</h4>
// // //                                     <p className="plm-product-price">
// // //                                         ₹{item.oprice} <span className="plm-strike">₹{item.price}</span>
// // //                                     </p>
// // //                                     <p className="plm-product-category">{cname}</p>

// // //                                     {Qty > 0 ? (
// // //                                         <div className="plm-qty-controls">
// // //                                             <button className="plm-qty-btn" onClick={() => decreaseQnty(item.pid)}>-</button>
// // //                                             <span className="plm-qty-count">{Qty}</span>
// // //                                             <button className="plm-qty-btn" onClick={() => increaseQantity(item.pid)}>+</button>
// // //                                         </div>
// // //                                     ) : (
// // //                                         <button className="plm-buy-btn" onClick={() => handleBuybtn(item.pid)}>Buy</button>
// // //                                     )}
// // //                                 </div>
// // //                             );
// // //                         })}
// // //                     </div>
// // //                 </center>
// // //             </div>
// // //         </div>
// // //     </>
// // // );
// // // }

    
// // //         return(
// // //             <>
// // //              {showlogin&& (
// // //                 <CustomerLoginPopup onClose={()=>setShowlogin(false)} onLoginSuccess={handleLoginSucces}></CustomerLoginPopup>
// // //             )}
    
// // //             <div className={showlogin?"blured-content":""}>
// // //                 <div className="customer-info">
// // //                     {customerSession?(
// // //                         <>
// // //                         <img src={`http://localhost:9876/customer/getimage/${customerSession.cpicname}`} alt={customerSession.cpicname} style={{borderRadius:50,height:150,width:150}}></img>
// // //                         <span>{customerSession.cfname}</span>
// // //                         <span style={{marginLeft:"15px",fontWeight:"bold"}}>{itemcount}</span>
// // //                         <button onClick={handleCheckOutBtn}>Checkout</button>
// // //                         <button onClick={handleLogout}>Logout</button>
// // //                         </>
// // //                     ):(
// // //                        <span>Customer: Guest</span> 
// // //                     )}
// // //                 </div>
// // //                 <>
// // //                 <div>
// // //                     <center>
// // //                         <label>Search By Category</label>
// // //                         <select className="Select"onChange={handleSearch}>
// // //                             <option value="0">All</option>
// // //                             {pcatglist.map((pcatitem)=>(
// // //                                 <option key={pcatitem.pcatgid} value={pcatitem.pcatgid}>{pcatitem.pcatgname}</option>
// // //                             ))}
// // //                         </select>
// // //                         <div className="product-list">
// // //                                 {plist.map((item)=>{
// // //                                     const cname=pcatglist.find((c)=> c.pcatgid===item.pcatgid)?.pcatgname||"N/A";
// // //                                     const Qty=quantities[item.pid]||0;
// // //                                     return(
// // //                                         <div className="product-card" key={item.pid}>
// // //                                             <img className="product-img" src={`${ProUrl}getimage/${item.ppicname}`} alt={item.ppicname}></img>
// // //                                             <h4>{item.pname}</h4>
// // //                                             <p>
// // //                                                 ₹{item.oprice}{" "}
// // //                                                 <span className="strike">₹{item.price}</span>
// // //                                             </p>
// // //                                             <p>{cname}</p>
// // //                                             {Qty > 0 ?(<div> 
// // //                                                <button onClick={()=> decreaseQnty(item.pid)}>-</button>
// // //                                                <span>{Qty}</span>
// // //                                                <button onClick={()=>increaseQantity(item.pid)}>+</button> 
// // //                                             </div>):(<button className="buy-btn" onClick={()=>handleBuybtn(item.pid)}>Buy</button>)}
// // //                                         </div>
// // //                                     );
// // //                                 })}
// // //                         </div>
// // //                     </center>
// // //                 </div>
// // //                 </>
// // //                 </div>
// // //                 </>
// // //         )
// // // }
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import Bill from "../customerviews/Bill";
// import { toast } from "react-toastify";
// import CustomerLoginPopup from "../customerviews/CustomerLoginPopup";
// import "./ProductlistforMainpage.css";

// export default function ProductListforMainpage({ searchText = "" }) {
//   const [itemcount, setItemCount] = useState(0);
//   const [sellitem, setSellitem] = useState([]);
//   const [quantities, setQuantities] = useState({});
//   const [cid, setCid] = useState(null);
//   const [customerSession, setCustomerSession] = useState(null);
//   const [pcatglist, setPcgatList] = useState([]);
//   const [plist, setPlist] = useState([]);
//   const [showlogin, setShowlogin] = useState(false);
//   const [showBill, setShowbill] = useState(false);

//   const ProUrl = "http://localhost:9876/product/";

//   /* ===== LOAD PRODUCTS & CATEGORY ===== */
//   useEffect(() => {
//     axios
//       .get(`${ProUrl}showproduct`)
//       .then((res) => {
//         setPlist(res.data.filter((p) => p.status === "Active") || []);
//       })
//       .catch(() => toast.error("Product load failed"));

//     axios
//       .get("http://localhost:9876/productcatg/showproductcatg")
//       .then((res) => setPcgatList(res.data))
//       .catch(() => toast.error("Category load failed"));

//     const session =
//       sessionStorage.getItem("Usersession") ||
//       localStorage.getItem("Usersession");
//     if (session) {
//       const obj = JSON.parse(session);
//       setCustomerSession(obj);
//       setCid(obj.cid);
//     }
//   }, []);

//   /* ===== UPDATE CART ITEMS ===== */
//   useEffect(() => {
//     const selectedItems = plist.filter((item) => quantities[item.pid] > 0);
//     setSellitem(selectedItems);
//   }, [quantities, plist]);

//   /* ===== PRODUCT NAME SEARCH (ADDED) ===== */
//   const filteredPlist = plist.filter((item) =>
//     item.pname?.toLowerCase().includes(searchText.toLowerCase())
//   );

//   /* ===== LOGIN / LOGOUT ===== */
//   const handleLoginSucces = (sessionData) => {
//     setCustomerSession(sessionData);
//     setCid(sessionData.cid);
//     setShowlogin(false);
//   };

//   const handleLogout = () => {
//     sessionStorage.removeItem("Usersession");
//     localStorage.removeItem("Usersession");
//     setCustomerSession(null);
//     setCid(null);
//     setSellitem([]);
//     setQuantities({});
//     setItemCount(0);
//     toast.info("Logged out");
//   };

//   /* ===== BUY ===== */
//   const handleBuybtn = (pid) => {
//     if (!cid) {
//       setShowlogin(true);
//       return;
//     }

//     setQuantities((prev) => ({
//       ...prev,
//       [pid]: (prev[pid] || 0) + 1,
//     }));

//     setItemCount((prev) => prev + 1);
//   };

//   const increaseQantity = (pid) => {
//     setQuantities((prev) => ({ ...prev, [pid]: prev[pid] + 1 }));
//     setItemCount((prev) => prev + 1);
//   };

//   const decreaseQnty = (pid) => {
//     setQuantities((prev) => {
//       const qty = prev[pid] - 1;
//       if (qty <= 0) {
//         const updated = { ...prev };
//         delete updated[pid];
//         return updated;
//       }
//       return { ...prev, [pid]: qty };
//     });
//     setItemCount((prev) => (prev > 0 ? prev - 1 : 0));
//   };

//   /* ===== CATEGORY SEARCH ===== */
//   const handleSearch = (e) => {
//     const catgid = e.target.value;
//     const url =
//       catgid > 0
//         ? `${ProUrl}showproductbycatgid/${catgid}`
//         : `${ProUrl}showproduct`;

//     axios
//       .get(url)
//       .then((res) => setPlist(res.data))
//       .catch(() => toast.error("Search failed"));
//   };

//   /* ===== CHECKOUT ===== */
//   const handleCheckOutBtn = () => {
//     if (!cid) {
//       setShowlogin(true);
//       return;
//     }
//     if (sellitem.length === 0) {
//       toast.warning("Cart is empty");
//       return;
//     }
//     setShowbill(true);
//   };

//   const handlePaymentSuccess = () => {
//     setSellitem([]);
//     setQuantities({});
//     setItemCount(0);
//     setShowbill(false);
//   };

//   if (showBill) {
//     return (
//       <Bill
//         data={{ sellitem, cid, quantities }}
//         onBack={() => setShowbill(false)}
//         onPaymentSuccess={handlePaymentSuccess}
//       />
//     );
//   }

//   /* ===== UI ===== */
//   return (
//     <>
//       {showlogin && (
//         <CustomerLoginPopup
//           onClose={() => setShowlogin(false)}
//           onLoginSuccess={handleLoginSucces}
//         />
//       )}

//       <div className="plm_main_wrapper">
//         {/* CUSTOMER BAR */}
//         <div className="customer_info_wrapper">
//           {customerSession ? (
//             <>
//               <img
//                 src={`http://localhost:9876/customer/getimage/${customerSession.cpicname}`}
//                 className="customer_img"
//                 alt=""
//               />
//               <span>{customerSession.cfname}</span>
//               <span className="cart_item_count">{itemcount}</span>
//               <button onClick={handleCheckOutBtn}>Checkout</button>
//               <button onClick={handleLogout}>Logout</button>
//             </>
//           ) : (
//             <span>Customer: Guest</span>
//           )}
//         </div>

//         {/* CATEGORY */}
//         <div className="search_product_wrapper">
//           <label>Search By Category</label>
//           <select onChange={handleSearch}>
//             <option value="0">All</option>
//             {pcatglist.map((c) => (
//               <option key={c.pcatgid} value={c.pcatgid}>
//                 {c.pcatgname}
//               </option>
//             ))}
//           </select>

//           {/* PRODUCTS */}
//           <div className="product_list_wrapper">
//             {filteredPlist.length === 0 && (
//               <p style={{ marginTop: 20 }}>No product found</p>
//             )}

//             {filteredPlist.map((item) => {
//               const qty = quantities[item.pid] || 0;

//               return (
//                 <div className="product_card_wrapper" key={item.pid}>
//                   <img
//                     src={`${ProUrl}getproductimage/${item.ppicname}`}
//                     className="product_image"
//                     alt=""
//                   />
//                   <h4>{item.pname}</h4>
//                   <p>₹{item.oprice}</p>

//                   {qty > 0 ? (
//                     <div>
//                       <button onClick={() => decreaseQnty(item.pid)}>-</button>
//                       <span>{qty}</span>
//                       <button onClick={() => increaseQantity(item.pid)}>+</button>
//                     </div>
//                   ) : (
//                     <button onClick={() => handleBuybtn(item.pid)}>Buy</button>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
import axios from "axios";
import React, { useEffect, useState } from "react";
import Bill from "../customerviews/Bill";
import { toast } from "react-toastify";
import CustomerLoginPopup from "../customerviews/CustomerLoginPopup";
import "./ProductlistforMainpage.css";

export default function ProductListforMainpage({ searchText = "" }) {
  const [itemcount, setItemCount] = useState(0);
  const [sellitem, setSellitem] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [cid, setCid] = useState(null);
  const [customerSession, setCustomerSession] = useState(null);
  const [pcatglist, setPcgatList] = useState([]);
  const [plist, setPlist] = useState([]);
  const [showlogin, setShowlogin] = useState(false);
  const [showBill, setShowbill] = useState(false);

  const ProUrl = "http://localhost:9876/product/";

  /* LOAD PRODUCTS */
  useEffect(() => {
    axios.get(`${ProUrl}showproduct`)
      .then(res => setPlist(res.data.filter(p => p.status === "Active")))
      .catch(() => toast.error("Product load failed"));

    axios.get("http://localhost:9876/productcatg/showproductcatg")
      .then(res => setPcgatList(res.data))
      .catch(() => toast.error("Category load failed"));

    const session =
      sessionStorage.getItem("Usersession") ||
      localStorage.getItem("Usersession");

    if (session) {
      const obj = JSON.parse(session);
      setCustomerSession(obj);
      setCid(obj.cid);
    }
  }, []);

  /* CART UPDATE */
  useEffect(() => {
    const selected = plist.filter(p => quantities[p.pid] > 0);
    setSellitem(selected);
  }, [quantities, plist]);

  /* SEARCH BY NAME */
  const filteredPlist = plist.filter(item =>
    item.pname?.toLowerCase().includes(searchText.toLowerCase())
  );

  /* LOGIN */
  const handleLoginSucces = (sessionData) => {
    setCustomerSession(sessionData);
    setCid(sessionData.cid);
    setShowlogin(false);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    setCustomerSession(null);
    setCid(null);
    setSellitem([]);
    setQuantities({});
    setItemCount(0);
    toast.info("Logged out");
  };

  /* BUY */
  const handleBuybtn = (pid) => {
    if (!cid) return setShowlogin(true);
    setQuantities(prev => ({ ...prev, [pid]: (prev[pid] || 0) + 1 }));
    setItemCount(prev => prev + 1);
  };

  const increaseQantity = (pid) => {
    setQuantities(prev => ({ ...prev, [pid]: prev[pid] + 1 }));
    setItemCount(prev => prev + 1);
  };

  const decreaseQnty = (pid) => {
    setQuantities(prev => {
      const qty = prev[pid] - 1;
      if (qty <= 0) {
        const updated = { ...prev };
        delete updated[pid];
        return updated;
      }
      return { ...prev, [pid]: qty };
    });
    setItemCount(prev => (prev > 0 ? prev - 1 : 0));
  };

  /* CATEGORY SEARCH */
  const handleSearch = (e) => {
    const catgid = e.target.value;
    const url = catgid > 0
      ? `${ProUrl}showproductbycatgid/${catgid}`
      : `${ProUrl}showproduct`;

    axios.get(url)
      .then(res => setPlist(res.data))
      .catch(() => toast.error("Search failed"));
  };

  /* CHECKOUT */
  const handleCheckOutBtn = () => {
    if (!cid) return setShowlogin(true);
    if (sellitem.length === 0) return toast.warning("Cart is empty");
    setShowbill(true);
  };

  if (showBill) {
    return (
      <Bill
        data={{ sellitem, cid, quantities }}
        onBack={() => setShowbill(false)}
      />
    );
  }

  return (
    <>
      {showlogin && (
        <CustomerLoginPopup
          onClose={() => setShowlogin(false)}
          onLoginSuccess={handleLoginSucces}
        />
      )}

      <div className="plm_main_wrapper">
        <div className="customer_info_wrapper">
          {customerSession ? (
            <>
              <img
                src={`http://localhost:9876/customer/getimage/${customerSession.cpicname}`}
                className="customer_img"
                alt=""
              />
              <span>{customerSession.cfname}</span>
              <span className="cart_item_count">{itemcount}</span>
              <button onClick={handleCheckOutBtn}>Checkout</button>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <span>Customer: Guest</span>
          )}
        </div>

        <div className="search_product_wrapper">
          <label>Search By Category</label>
          <select onChange={handleSearch}>
            <option value="0">All</option>
            {pcatglist.map(c => (
              <option key={c.pcatgid} value={c.pcatgid}>
                {c.pcatgname}
              </option>
            ))}
          </select>

          <div className="product_list_wrapper">
            {filteredPlist.map(item => {
              const qty = quantities[item.pid] || 0;
              return (
                <div className="product_card_wrapper" key={item.pid}>
                  <img
                    src={`${ProUrl}getproductimage/${item.ppicname}`}
                    className="product_image"
                    alt=""
                  />
                  <h4>{item.pname}</h4>
                  <p className="price">₹{item.oprice}</p>

                  {qty > 0 ? (
                    <div className="qty_box">
                      <button onClick={() => decreaseQnty(item.pid)}>-</button>
                      <span>{qty}</span>
                      <button onClick={() => increaseQantity(item.pid)}>+</button>
                    </div>
                  ) : (
                    <button className="buy_btn" onClick={() => handleBuybtn(item.pid)}>
                      Buy
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
