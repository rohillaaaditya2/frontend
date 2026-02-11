import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import OrderTrackingPerBillId from "./OrderTrackingPerBillid";
import "./BillById.css";

function BillByID(props) {
  const [billidlist, setBillIdList] = useState([]);
  const [billdatelist, setBillDateList] = useState([]);
  const [billdetailslist, setBillDetailsList] = useState([]);
  const [plist, setPlist] = useState([]);
  const [custDetails, setCustDetails] = useState({});
  const [billId, setBillId] = useState("");
  const [billdate, setBillDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [isshowordertracking, setIsShowOrderTracking] = useState(false);

  useEffect(() => {
    setLoading(true);

    Promise.all([
      axios.get(
        `${url}/bill/billshowbillids/${props.data}`
      ),
      axios.get(
        `${url}/product/showproduct`
      ),
      axios.get(
        `${url}/bill/billshowbilldates/${props.data}`
      ),
    ])
      .then(([billRes, prodRes, dateRes]) => {
        setBillIdList(billRes.data);
        setPlist(prodRes.data);
        setBillDateList(dateRes.data);
      })
      .catch((err) => alert(err))
      .finally(() => setTimeout(() => setLoading(false), 1000));
  }, [props.data]);

  const handleBillIdSelect = async (evt) => {
    const selectedId = evt.target.value;
    setBillId(selectedId);
    setBillDate("");
    setBillDetailsList([]);

    try {
      const res = await axios.get(
       `${url}/bill/showbillbyid/${selectedId}`
      );
      setBillDetailsList(res.data);
    } catch (err) {
      alert(err);
    }
  };

  const handleBillDateSelect = async (evt) => {
    const selectDate = evt.target.value;
    setBillDate(selectDate);
    setBillId("");
    setBillDetailsList([]);

    try {
      const res = await axios.get(
        `${url}/bill/showbillbydate/${selectDate}`
      );
      setBillDetailsList(res.data);
    } catch (err) {
      alert(err);
    }
  };

  const fetchCustomerDetails = async () => {
    try {
      const res = await axios.get(
        `${url}/customer/getcustomerdetails/${props.data}`
      );
      setCustDetails(res.data);
      return res.data;
    } catch (err) {
      alert(err);
      return {};
    }
  };

  const toDataURL = (url) =>
    fetch(url)
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
          })
      );

  // GROUP BILLS
  const groupedBills = useMemo(() => {
    if (!billdetailslist.length) return [];

    const groups = {};

    billdetailslist.forEach((bitem) => {
      const billid = bitem.billid;

      if (!groups[billid]) {
        groups[billid] = {
          items: [],
          total: 0,
          count: 0,
          qtyTotal: 0,
        };
      }

      const product = plist.find((p) => p.pid === bitem.pid);
      const price = product?.oprice || 0;
      const qty = bitem.qty || 1;
      const amount = price * qty;

      groups[billid].items.push({
        ...bitem,
        pname: product?.pname || "",
        price,
        qty,
        amount,
        imageUrl: product?.imageUrl || "",
      });

      groups[billid].total += amount;
      groups[billid].count += 1;
      groups[billid].qtyTotal += qty;
    });

    return Object.entries(groups).map(([billid, data]) => ({
      billid,
      ...data,
    }));
  }, [billdetailslist, plist]);

  // PDF
  const generatePDF = async (bill) => {
    const customer = await fetchCustomerDetails();
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Customer Invoice", 70, 25);
    doc.line(10, 30, 200, 30);

    doc.setFontSize(12);
    doc.text(`Customer ID: ${customer.Cid}`, 10, 40);
    doc.text(`Name: ${customer.CustomerName}`, 10, 48);
    doc.text(`Address: ${customer.CAddress}`, 10, 56);
    doc.text(`Contact: ${customer.CContact}`, 10, 64);
    doc.text(`Bill ID: ${bill.billid}`, 10, 72);

    let y = 90;

    for (const item of bill.items) {
      doc.text(item.pname, 15, y);
      doc.text(`Rs${item.price}`, 70, y);
      doc.text(`${item.qty}`, 100, y);
      doc.text(`Rs${item.amount}`, 120, y);

      if (item.imageUrl) {
        const base64Img = await toDataURL(item.imageUrl);
        doc.addImage(base64Img, "JPEG", 160, y - 6, 20, 20);
      }

      y += 25;
    }

    doc.text(
      `Total Amount: Rs${bill.total.toFixed(2)}`,
      120,
      y + 5
    );

    doc.save(`Bill_${bill.billid}.pdf`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <center>
        <h3>View Orders</h3>

        {groupedBills.map((group) => (
          <div key={group.billid}>
            <h4>Bill ID: {group.billid}</h4>

            <table border="1">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Amount</th>
                  <th>Photo</th>
                </tr>
              </thead>
              <tbody>
                {group.items.map((bitem, i) => (
                  <tr key={i}>
                    <td>{bitem.pname}</td>
                    <td>{bitem.price}</td>
                    <td>{bitem.qty}</td>
                    <td>{bitem.amount}</td>
                    <td>
                      <img
                        src={bitem.imageUrl}
                        height="80"
                        width="80"
                        alt="product"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button onClick={() => generatePDF(group)}>
              Download Bill #{group.billid}
            </button>
          </div>
        ))}
      </center>
    </div>
  );
}

export default BillByID;
