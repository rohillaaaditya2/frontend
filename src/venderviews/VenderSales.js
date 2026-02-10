import React,{useState,useEffect,useRef} from "react";
import axios from "axios";
import jsPDF from "jspdf";
import {Bar} from "react-chartjs-2";
import "./VenderSale.css";

import {
    Chart as Chartjs,BarElement,CategoryScale,LinearScale,Tooltip,Legend
} from "chart.js";
import autoTable from "jspdf-autotable";

Chartjs.register(BarElement,CategoryScale,LinearScale,Tooltip,Legend);

function VenderSales({vender})
{
    const IMG_URL = "https://server-app-xite.onrender.com/product/getproductimage/";

    const [sales,setSales] = useState([]);
    const [salesSearch,setSalesSearch] = useState("");
    const [fromDate,setFromDate] = useState("");
    const [toDate,setToDate] = useState("");
    const [salesPage,setSalesPage] = useState(1)
    const [salesPerPage] = useState(10);
    const [grandTotal,setGrandTotal] = useState(0);
    const [productTotals,setProductTotals] = useState({});
    const [selectedProduct,setSelectedProduct] = useState(null);
    const [popupVisible,setPopupVisible] = useState(false);
    const [totalProductSold,setTotalProductSold] = useState(0);
    const chartRef = useRef(null);

    // FETCH SALES
    useEffect(() => {
        if(!vender?.Vid) return;

        axios.get(`https://server-app-xite.onrender.com/sales/vender/${vender.Vid}`)
        .then(res => setSales(res.data.sales || []))
        .catch(() => alert("Error Fetching Sales Data"));
    },[vender?.Vid]);

    // FILTER
    const filteredSales = sales.filter((s) => {
        const productName = s.product?.pname?.toLowerCase() || "";
        const billIdStr = s.billid ? s.billid.toString() : "";
        const searchLower = salesSearch.toLowerCase();

        const matchSearch =
            productName.includes(searchLower) ||
            billIdStr.includes(searchLower);

        const saleDate = new Date(s.date);
        const matchDate =
            (!fromDate || saleDate >= new Date(fromDate)) &&
            (!toDate || saleDate <= new Date(toDate));

        return matchSearch && matchDate;
    });

    const totalPages = Math.ceil(filteredSales.length / salesPerPage);
    const startIndex = (salesPage - 1) * salesPerPage;
    const currentSales = filteredSales.slice(
        startIndex,
        startIndex + salesPerPage
    );

    // TOTALS
    useEffect(() => {
        let totalRevenue = 0;
        let totalQty = 0;
        const summary = {};

        filteredSales.forEach((s) => {
            const pname = s.product?.pname || "unknown";

            if(!summary[pname]) summary[pname] = {qty:0, revenue:0};

            summary[pname].qty += s.quantity;
            summary[pname].revenue += s.totalPrice;

            totalRevenue += s.totalPrice;
            totalQty += s.quantity;
        });

        setGrandTotal(totalRevenue);
        setProductTotals(summary);
        setTotalProductSold(totalQty);

    },[filteredSales]);

    // CHART
    const productNames = Object.keys(productTotals);
    const chartData = {
        labels: productNames,
        datasets: [{
            label: "Revenue (₹)",
            data: Object.values(productTotals).map(p => p.revenue),
            backgroundColor: "rgba(54,162,235,0.6)"
        }]
    };

    const chartOption = {
        responsive: true,
        plugins: { legend: { position: "top" } }
    };

    // UI
    return (
        <div className="Vender-Sales-page">

            <h3>Vender Sales Report</h3>

            <table border="1" cellPadding="8" style={{width:"100%"}}>
                <thead>
                    <tr>
                        <th>Bill ID</th>
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
                            <td>{new Date(s.date).toLocaleDateString()}</td>
                            <td>{s.product?.pname}</td>
                            <td>{s.quantity}</td>
                            <td>{s.totalPrice}</td>

                            <td>
                                <img
                                    src={`${IMG_URL}${s.product?.ppicname}`}
                                    alt=""
                                    height="45"
                                    width="45"
                                    onError={(e)=>{
                                        e.target.src = `${IMG_URL}default.png`;
                                    }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h4>Total Product Sold: {totalProductSold}</h4>
            <h4>Grand Total: ₹{grandTotal}</h4>

            <div style={{maxWidth:700, margin:"30px auto"}}>
                <Bar ref={chartRef} data={chartData} options={chartOption}/>
            </div>
        </div>
    );
}

export default VenderSales;
