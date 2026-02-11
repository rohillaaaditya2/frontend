import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function ShowBills() {
  const [custlist, setCustList] = useState([]);
  const [billdetailslist, setBillDetailsList] = useState([]);
  const [plist, setPList] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [loadingPDF, setLoadingPDF] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const billsPerPage = 3;
  const url=process.env.REACT_APP_API_URL;


  useEffect(() => {
    axios
      .get(`${url}/customer/getcustomerlist`)
      .then((res) => setCustList(res.data));

    axios
      .get(`${url}/product/showproduct`)
      .then((res) => setPList(res.data))
      .catch((err) => alert(err));
  }, []);

  const handleCustomerSelect = (evt) => {
    const cid = evt.target.value;
    setSelectedCustomer(cid);

    axios
      .get(
        `${url}/bill/billshow/${cid}`
      )
      .then((res) => {
        const bills = res.data;
        const mergedBills = [];
        let totalSum = 0;

        bills.forEach((bitem) => {
          const productData = plist.find(
            (p) => p.pid === bitem.pid
          );

          if (productData) {
            const product = {
              pname: productData.pname,
              price: parseFloat(productData.oprice),
              qty: bitem.qty || 1,
              subtotal:
                parseFloat(productData.oprice) *
                (bitem.qty || 1),
              imageUrl: productData.imageUrl, // NEW
            };

            let existingBill = mergedBills.find(
              (bill) => bill.billid === bitem.billid
            );

            if (!existingBill) {
              existingBill = {
                billid: bitem.billid,
                cid: bitem.cid,
                billdate: bitem.billdate,
                products: [],
                total: 0,
              };
              mergedBills.push(existingBill);
            }

            existingBill.products.push(product);
            existingBill.total += product.subtotal;
            totalSum += product.subtotal;
          }
        });

        setBillDetailsList(mergedBills);
        setGrandTotal(totalSum);
        setCurrentPage(1);
      })
      .catch((err) => alert(err));
  };

  // Pagination
  const indexofLast = currentPage * billsPerPage;
  const indexofFirst = indexofLast - billsPerPage;
  const currentBills = billdetailslist.slice(
    indexofFirst,
    indexofLast
  );
  const totalPages = Math.ceil(
    billdetailslist.length / billsPerPage
  );

  // Convert image to Base64
  const getBase64Image = async (url) => {
    try {
      const respone = await fetch(url);
      const blob = await respone.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    } catch (err) {
      console.error("Image load error:", err);
      return null;
    }
  };

  // PDF
  const downloadPDF = async () => {
    setLoadingPDF(true);
    const doc = new jsPDF();

    try {
      const pageWith = doc.internal.pageSize.getWidth();
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      const title = "Customer Bills Report";
      const textWidth = doc.getTextWidth(title);
      const textX = (pageWith - textWidth) / 2;
      doc.text(title, textX, 12);

      let yPos = 35;

      for (const bill of billdetailslist) {
        doc.setFontSize(13);
        doc.text(
          `Bill ID: ${bill.billid} | Date: ${bill.billdate}`,
          14,
          yPos
        );
        yPos += 6;

        const rows = [];
        const imageMap = {};

        for (let i = 0; i < bill.products.length; i++) {
          const prod = bill.products[i];
          const base64Img = await getBase64Image(
            prod.imageUrl
          );
          if (base64Img) imageMap[i] = base64Img;

          rows.push([
            "",
            prod.pname,
            prod.qty,
            prod.price.toFixed(2),
            prod.subtotal.toFixed(2),
          ]);
        }

        autoTable(doc, {
          head: [["Image", "Product", "Qty", "Price", "Subtotal"]],
          body: rows,
          startY: yPos,
          theme: "grid",
          styles: { fontSize: 11, cellPadding: 3, minCellHeight: 14 },
          didDrawCell: (data) => {
            if (
              data.section === "body" &&
              data.column.index === 0 &&
              imageMap[data.row.index]
            ) {
              const base64Img = imageMap[data.row.index];
              doc.addImage(
                base64Img,
                "JPEG",
                data.cell.x + 2,
                data.cell.y + 2,
                10,
                10
              );
            }
          },
        });

        yPos = doc.lastAutoTable.finalY + 5;
        doc.setFontSize(12);
        doc.text(
          `Total: ₹${bill.total.toFixed(2)}`,
          142,
          yPos
        );
        yPos += 10;
      }

      doc.setFontSize(14);
      doc.setTextColor(0, 100, 0);
      doc.text(
        `Grand Total: ₹${grandTotal.toFixed(2)}`,
        110,
        yPos + 5
      );

      doc.save("CustomerBills.pdf");
    } catch (err) {
      console.error(err);
      alert("Error generating PDF");
    } finally {
      setLoadingPDF(false);
    }
  };

  return (
    <div>
      <center>
        <h2>Bill List (Admin View)</h2>

        <select onChange={handleCustomerSelect}>
          <option value="">--Select Customer--</option>
          {custlist.map((item) => (
            <option key={item.Cid} value={item.Cid}>
              {item.CustomerName} ({item.Cid})
            </option>
          ))}
        </select>

        {billdetailslist.length > 0 && (
          <>
            <table border={1} cellPadding={6}>
              <thead>
                <tr>
                  <th>Bill ID</th>
                  <th>Customer ID</th>
                  <th>Bill Date</th>
                  <th>Product Name</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                  <th>Product Image</th>
                </tr>
              </thead>

              <tbody>
                {currentBills.map((bill) => (
                  <React.Fragment key={bill.billid}>
                    {bill.products.map((prod, idx) => (
                      <tr key={idx}>
                        <td>{idx === 0 ? bill.billid : ""}</td>
                        <td>{idx === 0 ? bill.cid : ""}</td>
                        <td>{idx === 0 ? bill.billdate : ""}</td>
                        <td>{prod.pname}</td>
                        <td>{prod.qty}</td>
                        <td>{prod.price.toFixed(2)}</td>
                        <td>{prod.subtotal.toFixed(2)}</td>
                        <td>
                          <img
                            src={prod.imageUrl}
                            height="80"
                            width="80"
                            alt={prod.pname}
                          />
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>

            <button onClick={downloadPDF}>
              Download PDF
            </button>
          </>
        )}
      </center>
    </div>
  );
}

export default ShowBills;
