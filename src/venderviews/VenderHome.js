
//   import React,{useState,useEffect} from "react";
//   import EditVenderProfile from "./EditVenderProfile";
//   import Product from "../productviews/Product";
//   import Vender_Change_Pass from "./Vender_change_Pass";
//    import "./VenderHome.css";
   
//   import VenderSales from "./VenderSales";
// import InventoryDashboard from "./InventoryDashboard";


//   function VenderHome({vender,onLogout})
//   {
//      const [editing,setEditing]=useState(false);
//      const [venderData,setvenderData]=useState(vender);
//      const [isshowproduct,setIsShowProduct]=useState(false);
//      const [isShrunk,setIsShrunk]=useState(false);
//      const [isshowsales,setShowSales]=useState('');
//      const [isshowvendorsales,setIsShowVendorSales]=useState(false);
//      const [isChangePass, setIsChangePass]=useState(false);
//      const [isinventory,setIsinventory]=useState(false);

//      // SHRINK HEADER ON SCROLL

//      useEffect(()=>{
         
//            const handleScroll =()=>{
         
//            if(window.scrollY >50) setIsShrunk(true);
//            else setIsShrunk(false);
//            };
//            window.addEventListener("scroll",handleScroll);
//            return()=> window.removeEventListener("scroll",handleScroll);
//      },[]);

//      return (
//   <div className="vh-container">

//     {/* VENDER INFO HEADER */}
//     <div className="vh-header">
//       <img
//         src={`http://localhost:9876/vender/getimage/${venderData.VPicName}`}
//         alt="Vendor"
//         className={`vh-avatar ${isShrunk ? "vh-avatar-shrink" : ""}`}
//       />
//       <div className="vh-userinfo">
//         <h3 className="vh-name">{venderData.venderName}</h3>
//         {isShrunk && (
//           <>
//             <p className="vh-email">EMAIL: {venderData.VEmail}</p>
//             <p className="vh-contact">CONTACT: {venderData.VContact}</p>
//           </>
//         )}
//       </div>
//     </div>

//     {/* ACTION BUTTONS */}
//     <div className="vh-actions">
//       <button className="vh-btn vh-btn-edit"
//               onClick={() => { setEditing((prev) => !prev); setIsShowProduct(false); }}>
//         {editing ? "Close Edit" : "Edit Profile"}
//       </button>

//       <button className="vh-btn vh-btn-pass"
//               onClick={() => setIsChangePass((prev) => !prev)}>
//         {isChangePass ? "Close Password" : "Change Password"}
//       </button>

//       <button className="vh-btn vh-btn-product"
//               onClick={() => { setIsShowProduct((prev) => !prev); setEditing(false); }}>
//         {isshowproduct ? "Close Product" : "Manage Product"}
//       </button>

//       <button className="vh-btn vh-btn-sales"
//               onClick={() => setIsShowVendorSales((prev) => !prev)}>
//         {isshowvendorsales ? "Close Sales" : "View Sales"}
//       </button>
//       {/* inventory */}
//       <button className="vh-btn vh-btn-sales"
//               onClick={() => setIsinventory((prev) => !prev)}>
//         {isinventory ? "Close Inventory" : "View Inventory"}
//       </button>

//       <button className="vh-btn vh-btn-logout"
//               onClick={() => { localStorage.removeItem("venderSession"); onLogout(); }}>
//         LOGOUT
//       </button>
//     </div>

//     {/* MAIN CONTENT AREA */}
//     <div className="vh-content">
//       {editing && (
//         <EditVenderProfile 
//           vender={venderData} 
//           onClose={() => setEditing(false)}
//           onUpdate={(updated) => setvenderData(updated)}
//         />
//       )}

//       {isChangePass && (
//         <Vender_Change_Pass
//           CUserid={vender.Vid || vender.VUserId}
//           onClose={() => setIsChangePass(false)}
//         />
//       )}

//       {isshowproduct && <Product data={vender.Vid} />}
//       {isshowvendorsales && <VenderSales vender={vender} />}
//       {isinventory && <InventoryDashboard vid={vender.Vid}/>}
//     </div>
//   </div>
// );
//   }
//     export default VenderHome;

// //      return(
// //         <div>

// //             <div className="style" >
              
              

// //                     {/* VENDER INFO */}

// //          <div className="sty2"
// //          >
// //             <img src={`http://localhost:9876/vender/getimage/${venderData.VPicName}`} alt="Vendor" width={isShrunk ? 40 : 70}
// //              height={isShrunk ? 40 : 70} style={{borderRadius : "50%", transform:"all 0.3 ease"}}></img>
            
// //               <div>
// //                 <h3  className="sty3"
// //                 >{venderData.venderName}</h3>
               
// //                  {isShrunk && (
// //                     <>
// //                     <p className="sty4">EMAIL: {venderData.VEmail}</p>
// //                     <p  className="sty4">CONTACT: {venderData.VContact}</p>
                    
// //                     </>
// //                  )}
// //                 </div>
// //         </div>


// //             {/* ACTION BUTTON */}
// //             <div className="sty6" >

// //                 <button  className="btn"  onClick={() => {setEditing((prev) => !prev);
// //                     setIsShowProduct(false); // HIDE PRODUCT IF EDITING
// //                 }} 
                
// //                  > {editing ? "close Edit" : "Edit Profile"}</button>

// //                  <button onClick= {() => 
// //                  { setIsChangePass ((prev) => !prev)
               
// //                    } }

                   
                 
// //                      >

// //                       {isChangePass ? "Close Password" :" Change Password "}
                 
// //                    </button>
                  

// //                      <button  type="button" onClick={() =>{
// //                        setIsShowProduct ((prev) => !prev);
// //                     setEditing(false);  //   HIDE EDIT IF SHOWING PRODUCT
// //                  }}   >
   
// //                       {isshowproduct ? "close product" : "Manage Product"}


// //                      </button>


// //                  <button type="button" onClick={()=> {
// //                      setIsShowVendorSales((prev) => !prev);
// //                  }}>
// //                     {isshowvendorsales ? "close view sales" : "view sales"}
// //                  </button>

// //                  <button
// //                      onClick={()=>{
// //                         localStorage.removeItem("venderSession");
// //                         onLogout();
// //                      }}  >  LOGOUT  </button>

// //             </div>
// //         </div>

// //         {/* //    MAIN CONTENT AREA */}

// //         <div style={{padding:"20px"}}>
// //               {editing && (
// //                 <EditVenderProfile 
// //                 vender={venderData} 
// //                 onClose={()=> setEditing(false)}
// //                  onUpdate={(updated)=> setvenderData(updated)}
// //                      />
// //               )}

// //                    {isChangePass && (
// //                     <div >
// //                       <Vender_Change_Pass
// //                         CUserid={vender.Vid || vender.VUserId}
// //                         onClose={() => setIsChangePass(false)}
// //                         />
// //                     </div>
// //                    )}

// //                    {isshowproduct && <Product data={vender.Vid}/>}

// //         </div>
         
// //            <div style={{padding:"20px"}}> 
             
// //                 {isshowvendorsales && <VenderSales vender={vender} />}

// //            </div>
// //           </div>
// //      );
// //   }
// //           export default VenderHome;












  
// //   import React,{useState,useEffect} from "react";
// //   import EditVenderProfile from "./EditVenderProfile";
   
// //   // import VenderSales from "./VenderSales";
// //   // import "./VenderHome.css";
// // // import { isEditable } from "@testing-library/user-event/dist/utils";
// //    import Product from "../productviews/Product";
// //   //  import Vender_Change_Pass from "./"

// //   function VenderHome({vender,onLogout})
// //   {
// //      const [editing,setEditing]=useState(false);
// //      const [venderData,setvenderData]=useState(vender);
// //      const [isshowproduct,setIsShowProduct]=useState(false);
// //      const [isShrunk,setIsShrunk]=useState(false);
// //      const [isshowsales,setShowSales]=useState('');
// //      const [isshowvendorsales,setIsShowVendorSales]=useState(false);
// //      const [isChangePass, setIsChangePass]=useState(false);

// //      // SHRINK HEADER ON SCROLL

// //      useEffect(()=>{
         
// //            const handleScroll =()=>{
         
// //            if(window.scrollY >50) setIsShrunk(true);
// //            else setIsShrunk(false);
// //            };
// //            window.addEventListener("scroll",handleScroll);
// //            return()=> window.removeEventListener("scroll",handleScroll);
// //      },[]);

// //      return(
// //         <div>

// //             <div
// //                 /* STICKY TOP BAR */

// //                 style={{
// //                          position:"sticky",
// //                          top:0,
// //                          zIndex:1000,
// //                          display:"flex",
// //                          alignItems:"center",
// //                          justifyContent:"space-between",
// //                          padding: isShrunk ? "5px 15px" : "15px 25px",
// //                          background:"blue",
// //                          borderBottom:"10px solid #ddd",
// //                          transition:"all 0.3s ease",
// //                 }}
// //                 >

// //                     {/* VENDER INFO */}

// //          <div style={{display:"flex",alignItems:"center",gap:"15px"}}>
// //             <img src={`http://localhost:9876/vender/getimages/${venderData.VPicName}`} alt="Vendor" width={isShrunk ? 40 : 70}
// //              height={isShrunk ? 40 : 70} style={{borderRadius : "50%", transform:"all 0.3 ease"}}></img>
            
// //               <div>
// //                 <h3 style={{margin:0,fontSize:isShrunk ? "16px" : "20px", transform:"0.3s"}}>{venderData.venderName}</h3>
               
// //                  {isShrunk && (
// //                     <>
// //                     <p style={{margin:0,fontSize:"14px"}}>EMAIL: {venderData.VEmail}</p>
// //                     <p style={{margin:0,fontSize:"14px"}}>CONTACT: {venderData.VContact}</p>
                    
// //                     </>
// //                  )}
// //                 </div>
// //         </div>


// //             {/* ACTION BUTTON */}
// //             <div style={{display:"flex",gap:"10px"}}>

// //                 <button onClick={() => {setEditing((prev) => !prev);
// //                     setIsShowProduct(false); // HIDE PRODUCT IF EDITING
// //                 }} 
                 
// //                 style={{padding:isShrunk ? "5px 10px" : "8px 15px",
// //                     borderRadius:"5px",
// //                     background:"#007bff",
// //                     color:"white",
// //                     border:"none",
// //                     cursor:"pointer",
// //                     transition:"all 0.3s ease"
// //                 }}
// //                  > {editing ? "close Edit" : "Edit Profile"}</button>

// //                  <button type="button" onClick={() =>{
// //                        setIsShowProduct ((prev) => !prev);
// //                     setEditing(false);  //   HIDE EDIT IF SHOWING PRODUCT
// //                  }}
                 
                 
// //                    style={{
// //                        padding: isShrunk ? "5px 10px" : "0px 15px",
// //                        borderRadius:"5px",
// //                        background:"gray",
// //                        color:"white",
// //                        border:"none",
// //                        cursor:"pointer",
// //                        transform:"all 0.3s ease",
// //                    }}
                 
// //                  >

// //                       {isshowproduct ? "close product" : "Manage Product"}
// //                  </button>

// //                  <button type="button" onClick={()=> {
// //                      setIsShowVendorSales((prev) => !prev);
// //                  }}>
// //                     {isshowvendorsales ? "close view sales" : "view sales"}
// //                  </button>

// //                  <button
// //                      onClick={()=>{
// //                         localStorage.removeItem("venderSession");
// //                         onLogout();
// //                      }}

// //                        style={{
// //                        padding: isShrunk ? "5px 10px" : "0px 15px",
// //                        borderRadius:"5px",
// //                        background:"red",
// //                        color:"white",
// //                        border:"none",
// //                        cursor:"pointer",
// //                        transform:"all 0.3s ease",
// //                    }}
// //                 >  LOGOUT  </button>

// //             </div>
// //         </div>

// //         {/* //    MAIN CONTENT AREA */}

// //         <div style={{padding:"20px"}}>
// //               {editing && (
// //                 <EditVenderProfile 
// //                 vender={venderData} 
// //                 onClose={()=> setEditing(false)}
// //                  onUpdate={(updated)=> setvenderData(updated)}
// //                      />
// //               )}
// //                    {isshowproduct && <Product data={vender.Vid}/>}
// //         </div>
         
// //            <div style={{padding:"20px"}}> 
             
// //              {/* {isshowvendorsales && <VenderSales vender={vender} />} */}

// //            </div>
// //           </div>
// //      );
// //   }
// //   export default VenderHome;
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

        <button onClick={() => setActiveSection("dashboard")}
          className={activeSection === "dashboard" ? "active" : ""}>
          Dashboard
        </button>

        <button onClick={() => setActiveSection("edit")}
          className={activeSection === "edit" ? "active" : ""}>
          Edit Profile
        </button>

        <button onClick={() => setActiveSection("password")}
          className={activeSection === "password" ? "active" : ""}>
          Change Password
        </button>

        <button onClick={() => setActiveSection("product")}
          className={activeSection === "product" ? "active" : ""}>
          Manage Product
        </button>

        <button onClick={() => setActiveSection("sales")}
          className={activeSection === "sales" ? "active" : ""}>
          View Sales
        </button>

        <button onClick={() => setActiveSection("inventory")}
          className={activeSection === "inventory" ? "active" : ""}>
          Inventory
        </button>

        <button className="logout" onClick={() => {
          localStorage.removeItem("venderSession");
          onLogout();
        }}>
          Logout
        </button>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className="vh-main">
        <div className="vh-topbar">
          <img
            src={`http://localhost:9876/vender/getimage/${vender.VPicName}`}
            alt="vendor"
          />
          <div>
            <h3>{vender.VenderName}</h3>
            <p>{vender.VEmail}</p>
          </div>
        </div>

        <div className="vh-content">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default VenderHome;
