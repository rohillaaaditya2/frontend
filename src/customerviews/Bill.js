
import React,{useState,useEffect,useCallback} from "react";
 import axios from "axios";
 import logo from "../logo.svg";
 import {toast,ToastContainer} from "react-toastify";
 import "./Bill.css";
 
   function Bill ({data,onBack, onPaymentSuccess,onUpdateCart,onRemoveItem})
   {
    const [customer, setCustomer] = useState({name:"", address:"", contact:""});
    const[date,setDate]= useState("");
    const [items,setItems] = useState([]);
    const [quantities,setQuantites]=useState({});
    const [isPaymentDone,setIsPaymentDone] = useState(false);
    const[billId,setBillId] =useState("");
    const[isProcessing,setIsProcessing]=useState(false);

    const getCurrentDate = () => {
        const d =new Date();
        return `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`;
    };

    

    useEffect(() =>{
        if(!data)
        {
            setItems([]);
            setQuantites({});
            return;
        }

        setDate(getCurrentDate());

        

        const sel = data.sellitem ?? data.items ?? [];
        // console.log("sell",sel);
        setItems(sel);

        const qtyObj = {};
        (sel || []).forEach((it)=> {
            const key = String(it.pid);
            qtyObj[it.pid] = data.quantities?.[key] ?? data.quantities?.[it.pid] ?? it.qty ?? 1;
        });

        setQuantites(qtyObj);

        if(data.cid)
        {
            axios.get(`${url}/customer/getcustomerdetails/${data.cid}`).then((res) => {
                const body = res.data || {};
                setCustomer({
                    name:body.CustomerName || body.name || "",
                    address: body.CAddress || body.address || "",
                    contact : body.CContact || body.contact || "",
                });
            }).catch(() => {
                setCustomer({name: "",address:"", contact:""});
            });
        }
    },[data])

    // console.log("name",customer.name);

    const totalAmount = items.reduce((acc, item) => acc + (item.oprice || 0) * (quantities[item.pid] || 1),0);

    const increaseQty = (pid) => {
        setQuantites((prev) => {
              const newQty = (prev[pid] || 1) + 1;
              onUpdateCart?.(pid,newQty);
              return{...prev,[pid] : newQty};
        });
    };

    const decreaseQty = (pid) => {
        setQuantites((prev) => {
            const newQty = Math.max((prev[pid] || 1) - 1,1);
            onUpdateCart?.(pid,newQty);
            return{...prev,[pid]:newQty};
        });
    };

    const removeItemHandler = (pid) => {
        setItems((prev) => prev.filter((it) => it.pid !== pid));
        setQuantites((prev) => {
            const q={...prev};
            delete q[pid];
            return q;
        });

        onRemoveItem?.(pid);
    };

    const loadScript = (src) => new Promise((resolve) => { 
        const existing = document.querySelector(`script[src="${src}"]`);
        if(existing) return resolve(true);
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });

    const saveBill = useCallback(async () => {
         if(!items.length) return null;
         const res = await axios.get(`${url}/bill/getbillid`);
         const nextId = parseInt(res.data?.[0]?.billId || 0,10)+1;
         setBillId(nextId);
         const today = getCurrentDate();

         for (const item of items)
         {
            const qty = quantities[item.pid] || 1;
            await axios.post (`${url}/bill/billsave`, {
                billid : nextId,
                billdate: today,
                cid: data.cid,
                pid : item.pid,
                qty,
            });

            await axios.post(`${url}/sales/add`,{
                venderId : item.vid ?? item.venderId ?? null,
                productId : item.pid,
                quantity : qty,
                totalPrice :(item.oprice || 0) * qty,
                billid:nextId,
                date: today,
            })
         }

         return nextId;
    },[items,quantities,data?.cid]);

    const buildPurchaseItems = () => items.map((item) => ({pid: item.pid,vid:item.vid ?? null, qty: quantities [item.pid] || 1}));

    const callInventoryPurchase = async (purchaseItems) => {
        if(!purchaseItems || purchaseItems.length === 0) 
            {return {success: true,message : "no items to purchase"}; }

        const base = `${url}`;

        const endpoints = [ "/inventory/purchase"];

        let lastError = null;
         for(const ep of endpoints)                   
         {
            try{
                const res = await axios.post(base + ep, {items: purchaseItems});

                if(res && (res.data?.success || res.status === 200))
                {
                    return { success: true,data : res.data};
                }
                    return {success : false,message:res.data?.message || "unknow response", data: res.data};
            } catch(err)
            {
                lastError = err;
            }
         }
         return {success: false,message : lastError?.message || "Inventory API failed", error : lastError};
    };

    const displayRazorpay = async () => {
        if(isPaymentDone)
        {
            alert("Payment already done!");
            return;
        }

        if(isProcessing) return;
        if(!items.length)
        {                                                 

            alert("No items in bill");
            return;
        }

        setIsProcessing(true);

        let saveBillId= null;
        try
        {
            saveBillId = await saveBill();
        }
        catch(err)
        {
            alert("Failed to save bill details. Payment aborted");
            setIsProcessing(false);
            return;
        }                           

        const sdkLoaded = await loadScript(`${url}/v1/checkout.js`);
        if(!sdkLoaded)
        {
            alert("Failed to load Rozorpay SDk. Are you online?");
            setIsProcessing(false);
            return;
        }

        try{
            const amountInPaisa = Math.round(totalAmount * 100);
            const order = await axios.post(`${url}/payment/orders/${amountInPaisa}`);
            // console.log("amount paisa",amountInPaisa);
            const {id: order_id,amount,currency } = order.data;
            
            const options = {
                key : "rzp_test_8CxHBNuMQt1Qn8",
                  amount:amount.toString(),
                currency,
                name:"Universal Informatics Pvt. Ltd.",
                description:"Order Payment",
                image: logo,
                order_id,

                 method: {
        upi: true,
        card: true,
        netbanking: true,
        wallet: true,
        paylater: true
               },
                handler: async function (response)
                {

                    try {
                        await axios.post(`${url}/paymentdetails/paymentdetailsave`,{
                            orderCreationId:order_id,
                            razorpayPaymentId:response.razorpay_payment_id,
                            razorpayOrderId:response.razorpay_order_id,
                            razorpaySignature:response.razorpay_signature,
                            cid:data.cid,
                            amount:amount/100,
                            billid:saveBillId,
                        });

                        const purchaseItems= buildPurchaseItems();
                        const invRes=await callInventoryPurchase(purchaseItems);
                        if (!invRes.success) {
                            toast.warning("Payment is Succeeded, but inventory update failed,checked server logs");
                        }else{
                            setIsPaymentDone(true);
                            toast.success("Payment Successfull and Inventory Updated");
                        }
                        onPaymentSuccess?.();
                    } catch (error) {
                        toast.error("Payment is Succeeded but post-processing failed. Check Console");
                        onPaymentSuccess?.();
                    }finally{
                        setIsProcessing(false);
                    }
                },
                prefill:{
                    name:customer.name||"Customer",
                    email:"universal@gmail.com",
                    contact:customer.contact||"9532571972",
                },
                notes:{address:"Universal Informatics Indore Pvt. Ltd"},
                theme:{color:"#61dafb"},
            };
            new window.Razorpay(options).open();
        } catch (error) {
            toast.warning("Could Not Create payment order. Check Server.");
            setIsProcessing(false);
        }

    };
        console.log("sell items length",items.length);
        console.log(isProcessing);

            return (
        <div className="div" role="dialog" aria-modal="true">
            <div className="bill-card">
            <div className="header">
             <h3>Bill / Checkout</h3>
             <div className="headerr">
                <button className="btn-link" onClick={onBack}>Back</button>
             </div>
            </div>

            <div className="bill-meta">
               <div className="bill-meta-left">
                 <div><strong>Customer</strong>{customer.name || "-"}</div>
                 <div><strong>Contact</strong>{customer.contact || "-"}</div>
                 <div className="bill">{customer.address}</div>
               </div>

               <div className="bill-meta-right">
                <div><strong>Bill Date</strong>{date}</div>
                {billId ? <div><strong>Bill ID</strong> {billId}</div> : null}
               </div>
            </div>

            {(!date || !data.cid) && <div className="bill-warning">Warning: Missing billing data </div>}
            <div className="bill-table">
                <table className="bill-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Subtotal</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {items.length ? (
                            items.map((item) => {
                                const qty = quantities[item.pid] || 1;
                                const Subtotal = (item.oprice || 0) * qty;

                                return(
                                    <tr key={item.pid}>
                                        <td>{item.pid}</td>
                                        <td className="bill-product-name">{item.pname}</td>

                                        <td>
                                    <button className="qty-btn" onClick={() => decreaseQty(item.pid)}>-</button>
                                    <span className="qty-value">{qty}</span>
                                    <button className="qty-btn" onClick={() => increaseQty(item.pid)}>+</button>
                                      </td>

                                        <td>{item.oprice}</td>
                                        <td>{Subtotal}</td>

                             <td>
                                <button className="remove-btn" onClick={() => removeItemHandler(item.pid)}>Remove</button>
                                </td>       
                                   </tr>
                                );
                            })

                        ) : (

                            <tr>
                                <td colSpan="6" className="no-items">No items selected</td>
                            </tr>
                           )}
                    </tbody>
                </table>
            </div>

            <div className="bll-footer">
                <div className="pay-btn">Total: {totalAmount}</div>
           
              <div>
           <button className="pay-btn" onClick={displayRazorpay} disabled={!items.length  || isProcessing}>
              {isProcessing ? "Processing..." : isPaymentDone ? "Paid" : "Pay Now"}
             </button>
                   </div>
            </div>
        </div>
      </div>
    )
   }
   export default Bill;