import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import ProductCatgMgt from './adminviews/ProductCatgMgt';
import StateMgt from './adminviews/StateMgt';
import CityMgt from './adminviews/CityMgt';
import VenderReg from './venderviews/VenderReg';
import VenderLogin from './venderviews/VenderLogin';
import CustomerReg from './customerviews/CustomerReg';
 import CustomerLogin from './customerviews/CustomerLogin';
 import AdminLogin from './adminviews/AdminLogin';
 import AdminHome from './adminviews/AdminHome';
 import UpdateOrderStatus from './adminviews/UpdateOrderStatus';
 import MainPage from './MainPage';


 import ProductList from './productviews/ProductList';
 import ProductListforMainpage from './productviews/ProductlistforMainpage';
 import Product from './productviews/Product';
 
 import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
     {/* <ProductCatgMgt /> */}
     {/* <StateMgt/> */}
    {/* <CityMgt/>  */}
       {/* <VenderReg/>  */}
    {/* <VenderLogin/> */}
    {/* <CustomerReg/> */}
    {/* <CustomerLogin/> */}
    {/* <UpdateOrderStatus/> */}
     {/* <AdminLogin/> */}
    {/* <AdminHome/>  */}
   
    <MainPage/>
   
   
   
    {/* <Product/> */}
    {/* <ProductList/> */}
    {/* <ProductListforMainpage/> */}


  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
