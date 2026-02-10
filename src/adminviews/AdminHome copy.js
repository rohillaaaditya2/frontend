
 import React,{useState} from "react";
 import { useNavigate } from "react-router-dom";
 import StateMgt from "./StateMgt";
 import CityMgt from "./CityMgt";
 import ProductCatMgt from "./ProductCatgMgt";
 import VenderMgt from "./VenderMgt";
 import "../index.css";
 import ShowBills from "./ShowBills";
 import ProductList from "./ProductList";
 import CustomerMgt from "./CustomerMgt";
 import UpdateOrderStatus from "./UpdateOrderStatus";
 import AdminVenderSales from "./AdminVendorSales";
 

 function AdminHome()
 {
    const [isstateshow,setIsStateShow] = useState(false);
    const [iscityshow,setIsCityShow] = useState(false);
    const [ispcatgshow,setIsPCatgShow] = useState(false);
    const [isvendershow,setIsVenderShow] = useState(false);
    const [isbillshow,setIsBillShow] = useState(false);
    const [isproductlistshow,setIsProductListShow] = useState(false);
    const [iscustomershow,setIsCustomerShow] = useState(false);
    const [isupdateordershow,setIsUpdateOrderShow] = useState(false);
    const [isvendersalesshow,setIsVenderSalesShow] = useState(false);
    const navigate = useNavigate();

    function LogOutButtonClick()
    {
        localStorage.removeItem("admintoken");
        navigate("/adminmain/adminlogin");
    }

    return(
        <div className="AdimHome">
            <center>
                <h4>Admin DashBoard</h4>
                <div style={{backgroundColor:"gray"}}>
                    <button onClick={() => setIsStateShow(!isstateshow)} className="BUTTONstate">State</button>

     <button onClick={() => setIsCityShow(!iscityshow)} className="BUTTONcity" style={{marginLeft:10}}>City</button> 

      <button onClick={() => setIsPCatgShow(!ispcatgshow)} className="BUTTONpcatg" style={{marginLeft:10}}>Category</button> 

      <button onClick={() => setIsVenderShow(!isvendershow)} className="BUTTONvender" style={{marginLeft:10}}>Vender</button> 

     <button onClick={() => setIsBillShow(!isbillshow)} className="BUTTONbill" style={{marginLeft:10}}>Bills</button> 

     <button onClick={() => setIsUpdateOrderShow(!isupdateordershow)} className="BUTTONupdate" style={{marginLeft:10}}>Order Status</button> 

     <button onClick={() => setIsProductListShow(!isproductlistshow)} className="BUTTONproduct" style={{marginLeft:10}}>Product</button> 

     <button onClick={() => setIsCustomerShow(!iscustomershow)} className="BUTTONcustomer" style={{marginLeft:10}}>Customer</button> 

     <button onClick={() => setIsVenderSalesShow(!isvendersalesshow)} className="BUTTONvensale" style={{marginLeft:10}}>Vender Sales</button> 
      
     <button onClick={LogOutButtonClick} className="BUTTONlogout" style={{marginLeft:10}}>Logout</button>
                </div>

                {isstateshow && <StateMgt/>}
                {iscityshow && <CityMgt/>}
                {ispcatgshow && <ProductCatMgt/>}
                {isvendershow && <VenderMgt/>}
                {isbillshow && <ShowBills/>}
                {isproductlistshow && <ProductList/>}
                {iscustomershow && <CustomerMgt/>}
                {isupdateordershow && <UpdateOrderStatus updateByName={"Admin"}/>}
                {isvendersalesshow && <AdminVenderSales/>}
            </center>
        </div>
    )
 }
  export default AdminHome;
