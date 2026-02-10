
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
            .get("https://server-app-xite.onrender.com/product/showproduct")
            .then((res) => setPList(res.data))
            .catch((err) => alert(err));

        axios
            .get("https://server-app-xite.onrender.com/productcatg/showproductcatg")
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
            .get(`https://server-app-xite.onrender.com/product/showproduct/${pid}`)
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
            ? `https://server-app-xite.onrender.com/product/showproductbycatgid/${catgId}`
            : "https://server-app-xite.onrender.com/product/showproduct";

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
                                        src={`https://server-app-xite.onrender.com/product/getproductimage/${item.ppicname}`}
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
