import React, { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import { Bar } from "react-chartjs-2";
import "./AdminVenderSales.css";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import autoTable from "jspdf-autotable";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function AdminVendorSales() {
  const [sales, setSales] = useState([]);
  const [salesSearch, setSalesSearch] = useState("");
  const [salesPage, setSalesPage] = useState(1);
  const [salesPerPage] = useState(10);
  const [grandTotal, setGrandTotal] = useState(0);
  const [productTotals, setProductTotals] = useState({});
  const [totalProductSold, setTotalProductSold] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const chartRef = useRef(null);
  const [venderlist, setVenderList] = useState([]);
  const [selectedVender, setSelectedVender] = useState("");
    const url=process.env.REACT_APP_API_URL;

  //================ FETCH VENDERS =================
  useEffect(() => {
    axios
      .get(`${url}/vender/getvendercount`)
      .then((res) => setVenderList(res.data || []))
      .catch(() => alert("Unable to load vendors"));
  }, []);

  //================ FETCH SALES =================
  useEffect(() => {
    if (!selectedVender) return;

    axios
      .get(
        `${url}/sales/vender/${selectedVender}`
      )
      .then((res) => {
        const data = res.data.sales ?? [];
        setSales(Array.isArray(data) ? data : []);
        setSalesPage(1);
      })
      .catch(() => alert("Unable to load sales"));
  }, [selectedVender]);


  const filteredSales = useMemo(() => {
    return sales.filter((s) => {
      const productName = (s.product?.pname || "").toLowerCase();
      const billIdStr = s.billid ? String(s.billid) : "";
      const searchLower = salesSearch.toLowerCase();

      return (
        productName.includes(searchLower) ||
        billIdStr.includes(searchLower)
      );
    });
  }, [sales, salesSearch]);


  useEffect(() => {
    const totalRevenue = filteredSales.reduce(
      (sum, s) => sum + (Number(s.totalPrice) || 0),
      0
    );
    setGrandTotal(totalRevenue);

    const summary = {};
    let totalQty = 0;

    filteredSales.forEach((s) => {
      const pname = s.product?.pname || "Unknown";

      if (!summary[pname]) {
        summary[pname] = { qty: 0, revenue: 0, sample: s.product };
      }

      summary[pname].qty += Number(s.quantity) || 0;
      summary[pname].revenue += Number(s.totalPrice) || 0;
      totalQty += Number(s.quantity) || 0;
    });

    setProductTotals(summary);
    setTotalProductSold(totalQty);
  }, [filteredSales]);

  //================ CHART =================
  const chartData = useMemo(
    () => ({
      labels: Object.keys(productTotals),
      datasets: [
        {
          label: "Revenue (₹)",
          data: Object.values(productTotals).map((p) => p.revenue),
          backgroundColor: "rgba(75,192,192,0.6)",
        },
      ],
    }),
    [productTotals]
  );

  //================ PAGINATION =================
  const totalPages =
    Math.ceil(filteredSales.length / salesPerPage) || 1;
  const startIndex = (salesPage - 1) * salesPerPage;
  const currentSales = filteredSales.slice(
    startIndex,
    startIndex + salesPerPage
  );

  //================ MAIN PDF =================
  const exportPDF = () => {
    if (!filteredSales.length) return alert("No Sales");

    const doc = new jsPDF();
    doc.text("Vendor Sales Report", 14, 15);

    autoTable(doc, {
      startY: 25,
      head: [["Bill", "Date", "Product", "Qty", "Total"]],
      body: filteredSales.map((s) => [
        s.billid,
        new Date(s.date).toLocaleDateString(),
        s.product?.pname,
        s.quantity,
        s.totalPrice,
      ]),
    });

    doc.text(
      `Grand Total: ₹${grandTotal}`,
      14,
      doc.lastAutoTable.finalY + 10
    );
    doc.save("Vendor_Sales_Report.pdf");
  };

  //================ UI =================
  return (
    <div className="vendor-sales-page">
      <h3>Vendor Sales Report</h3>

      <select
        onChange={(e) => setSelectedVender(e.target.value)}
      >
        <option value="">--Select--</option>
        {venderlist.map((v) => (
          <option key={v.Vid} value={v.Vid}>
            {v.VenderName}
          </option>
        ))}
      </select>

      <button onClick={exportPDF}>Export PDF</button>

      <input
        placeholder="Search"
        value={salesSearch}
        onChange={(e) => setSalesSearch(e.target.value)}
      />

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Bill</th>
            <th>Date</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Photo</th>
          </tr>
        </thead>
        <tbody>
          {currentSales.map((s) => (
            <tr key={s._id}>
              <td>{s.billid}</td>
              <td>
                {new Date(s.date).toLocaleDateString()}
              </td>
              <td>{s.product?.pname}</td>
              <td>{s.quantity}</td>
              <td>{s.totalPrice}</td>
              <td>
                <img
                  src={s.product?.imageUrl}
                  alt={s.product?.pname}
                  height="40"
                  width="40"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Total Product Sold: {totalProductSold}</h4>
      <h4>Grand Total: ₹{grandTotal}</h4>

      <div style={{ maxWidth: 700, margin: "30px auto" }}>
        <Bar ref={chartRef} data={chartData} />
      </div>
    </div>
  );
}
