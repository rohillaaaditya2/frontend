import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactDOM from "react-dom/client";
import Bill from "../customerviews/Bill";
import "./ProductList.css";

function ProductList(props) {
  const [itemcount, setItemCount] = useState(0);
  const [selitems, setSelItems] = useState([]);
  const [pcatglist, setPCatgList] = useState([]);
  const [plist, setPList] = useState([]);
  const [vlist, setVList] = useState([]);

  let cname = "";

  useEffect(() => {
    axios
      .get("https://server-app-xite.onrender.com/product/showproduct")
      .then((res) => {
        setPList(res.data);
      })
      .catch((err) => {
        alert(err);
      });

    axios
      .get("https://server-app-xite.onrender.com/productcatg/showproductcatg")
      .then((res) => {
        setPCatgList(res.data);
      })
      .catch((err) => {
        alert(err);
      });

    // GET VENDER
    axios
      .get("https://server-app-xite.onrender.com/vender/getvendercount")
      .then((res) => {
        setVList(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const handleActiveButton = (evt) => {
    let pid = parseInt(evt);
    let status = "Active";
    axios
      .put(
        "https://server-app-xite.onrender.com/product/updateproductstatus/" +
          pid +
          "/" +
          status
      )
      .then(() => {
        alert("Product Status Updated");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleInactiveButton = (evt) => {
    let pid = parseInt(evt);
    let status = "Inactive";
    axios
      .put(
        "https://server-app-xite.onrender.com/product/updateproductstatus/" +
          pid +
          "/" +
          status
      )
      .then(() => {
        alert("Product Status Updated");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleSearch = (evt) => {
    if (evt.target.value > 0) {
      axios
        .get(
          "https://server-app-xite.onrender.com/product/showproductbycatgid/" +
            evt.target.value
        )
        .then((res) => {
          setPList(res.data);
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      axios
        .get("https://server-app-xite.onrender.com/product/showproduct")
        .then((res) => {
          setPList(res.data);
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  const handleSearchByVender = (evt) => {
    if (evt.target.value > 0) {
      axios
        .get(
          "https://server-app-xite.onrender.com/product/showproductbyvender/" +
            evt.target.value
        )
        .then((res) => {
          setPList(res.data);
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      axios
        .get("https://server-app-xite.onrender.com/product/showproduct")
        .then((res) => {
          setPList(res.data);
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  const handleSearchByStatus = (evt) => {
    if (evt.target.value !== "0") {
      axios
        .get(
          "https://server-app-xite.onrender.com/product/showproductstatus/" +
            evt.target.value
        )
        .then((res) => {
          setPList(res.data);
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      axios
        .get("https://server-app-xite.onrender.com/product/showproduct")
        .then((res) => {
          setPList(res.data);
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  return (
    <div className="ProDiv">
      <center>
        <h1>Search By Category</h1>
        <select onClick={handleSearch}>
          <option value="0">All</option>
          {pcatglist.map((pcatgitem) => (
            <option
              key={pcatgitem.pcatgid}
              value={pcatgitem.pcatgid}
            >
              {pcatgitem.pcatgname}
            </option>
          ))}
        </select>

        <p>
          Search By Vender{" "}
          <select onClick={handleSearchByVender}>
            <option value="0">All</option>
            {vlist.map((vitem) => (
              <option key={vitem.Vid} value={vitem.Vid}>
                {vitem.VenderName}
              </option>
            ))}
          </select>
        </p>

        <p>
          Search By Status{" "}
          <select onClick={handleSearchByStatus}>
            <option value="0">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </p>

        <p style={{ backgroundColor: "green", color: "white" }}>
          Product List
        </p>

        <table border={1} className="borrdrer">
          <thead>
            <tr>
              <th>Id</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Offer Price</th>
              <th>Category</th>
              <th>Photo</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {plist.map((item) => (
              <tr key={item.pid}>
                <td>{item.pid}</td>
                <td>{item.pname}</td>
                <td>{item.pprice}</td>
                <td>{item.oprice}</td>

                <td>
                  {pcatglist.map((citem) => {
                    if (item.pcatgid === citem.pcatgid) {
                      cname = citem.pcatgname;
                    }
                    return null;
                  })}
                  {cname}
                </td>

                {/* IMAGE COLUMN (Cloudinary URL) */}
                <td>
                  <img
                    src={item.imageUrl}
                    alt="product"
                    height="100"
                    width="100"
                  />
                </td>

                <td>{item.status}</td>
                <td>
                  <button
                    type="submit"
                    onClick={() => handleActiveButton(item.pid)}
                  >
                    Active
                  </button>
                  <span></span>
                  <button
                    type="submit"
                    onClick={() => handleInactiveButton(item.pid)}
                  >
                    Inactive
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </center>
    </div>
  );
}

export default ProductList;
