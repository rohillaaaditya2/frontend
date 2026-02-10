
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

  const ProUrl = "https://server-app-xite.onrender.com/product/";

  /* LOAD PRODUCTS */
  useEffect(() => {
    axios.get(`${ProUrl}showproduct`)
      .then(res => setPlist(res.data.filter(p => p.status === "Active")))
      .catch(() => toast.error("Product load failed"));

    axios.get("https://server-app-xite.onrender.com/productcatg/showproductcatg")
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
                src={`https://server-app-xite.onrender.com/customer/getimage/${customerSession.cpicname}`}
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
