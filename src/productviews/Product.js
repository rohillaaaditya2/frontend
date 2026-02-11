import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Product.css";

function Product({ data }) {
  const venderid = data;

  const [pid, setPId] = useState("");
  const [pname, setPName] = useState("");
  const [pprice, setPPrice] = useState("");
  const [oprice, setOPrice] = useState("");
  const [pcatgid, setPCatgId] = useState("");
  const url = process.env.REACT_APP_API_URL;

  const [image, setImage] = useState({ preview: "", data: "" });

  const [plist, setPList] = useState([]);
  const [pcatglist, setPCatgList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  // FETCH CATEGORIES & NEXT PRODUCT ID
  useEffect(() => {
    getNewPid();
    axios
      .get(`${url}/productcatg/showproductcatg`)
      .then((res) => setPCatgList(res.data))
      .catch((err) => alert(err));
  }, []);

  // FETCH VENDOR PRODUCTS
  const fetchProducts = () => {
    if (venderid) {
      axios
        .get(
          `${url}/product/showproductbyvender/${venderid}`
        )
        .then((res) => setPList(res.data))
        .catch((err) => alert(err));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [venderid]);

  // GET NEW PRODUCT ID
  const getNewPid = () => {
    axios
      .get(`${url}/product/getmaxpid`)
      .then((res) => setPId(res.data.length + 1))
      .catch((err) => alert(err));
  };

  // IMAGE SELECTION
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage({
        preview: URL.createObjectURL(file),
        data: file,
      });
    }
  };

  // SAVE PRODUCT (WITH IMAGE)
  const handleSaveButton = async () => {
    const formData = new FormData();
    formData.append("pid", pid);
    formData.append("pname", pname);
    formData.append("pprice", pprice);
    formData.append("oprice", oprice);
    formData.append("pcatgid", pcatgid);
    formData.append("vid", venderid);
    formData.append("status", "Inactive");

    if (image.data) {
      formData.append("file", image.data);
    }

    try {
      if (isEditing) {
        await axios.put(
          `${url}/product/updateproduct/${pid}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        alert("PRODUCT UPDATED");
      } else {
        await axios.post(
          `${url}/product/saveproduct`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        alert("PRODUCT SAVED");
      }

      fetchProducts();
      handleNewButton();
    } catch (err) {
      alert(err);
    }
  };

  // RESET FORM
  const handleNewButton = () => {
    getNewPid();
    setPName("");
    setPPrice("");
    setOPrice("");
    setPCatgId("");
    setImage({ preview: "", data: "" });
    setIsEditing(false);
  };

  // EDIT PRODUCT
  const handleEdit = (item) => {
    setPId(item.pid);
    setPName(item.pname);
    setPPrice(item.pprice);
    setOPrice(item.oprice);
    setPCatgId(item.pcatgid);

    setImage({
      preview: item.imageUrl || "",
      data: "",
    });

    setIsEditing(true);
  };

  // SOFT DELETE
  const handleDelete = (pid) => {
    if (!window.confirm("DELETE THIS PRODUCT?")) return;

    axios
      .put(
        `${url}/product/updateproductstatus/${pid}/Inactive`
      )
      .then(() => {
        alert("PRODUCT DELETED");
        fetchProducts();
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="prod-container">
      <h2 className="prod-heading">MANAGE PRODUCTS</h2>

      {/* PRODUCT FORM */}
      <div className="prod-form">
        <h4 className="prod-subheading">
          {isEditing ? "Edit Product" : "Add New Product"}
        </h4>

        <div className="prod-form-fields">
          <label className="prod-label">
            Product ID: <span>{pid}</span>
          </label>

          <input
            type="text"
            placeholder="Product Name"
            value={pname}
            onChange={(e) => setPName(e.target.value)}
            className="prod-input"
          />

          <input
            type="number"
            placeholder="Price"
            value={pprice}
            onChange={(e) => setPPrice(e.target.value)}
            className="prod-input"
          />

          <input
            type="number"
            placeholder="Offer Price"
            value={oprice}
            onChange={(e) => setOPrice(e.target.value)}
            className="prod-input"
          />

          <select
            value={pcatgid}
            onChange={(e) => setPCatgId(e.target.value)}
            className="prod-select"
          >
            <option value="">--SELECT CATEGORY--</option>
            {pcatglist.map((cat) => (
              <option key={cat.pcatgid} value={cat.pcatgid}>
                {cat.pcatgname}
              </option>
            ))}
          </select>

          <input
            type="file"
            onChange={handleFileChange}
            className="prod-file-input"
          />

          {image.preview && (
            <img
              src={image.preview}
              className="prod-preview"
              alt="preview"
            />
          )}

          <div className="prod-btn-group">
            <button
              onClick={handleNewButton}
              className="prod-btn prod-btn-new"
            >
              NEW
            </button>
            <button
              onClick={handleSaveButton}
              className="prod-btn prod-btn-save"
            >
              {isEditing ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>

      {/* PRODUCT LIST */}
      <h3 className="prod-list-heading">Product List</h3>
      <div className="prod-list-table-wrapper">
        <table className="prod-table">
          <thead className="prod-thead">
            <tr>
              <th>SNO</th>
              <th>PID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Offer</th>
              <th>Category</th>
              <th>Photo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {plist.map((item, index) => (
              <tr key={item.pid} className="prod-tr">
                <td>{index + 1}</td>
                <td>{item.pid}</td>
                <td>{item.pname}</td>
                <td>{item.pprice}</td>
                <td>{item.oprice}</td>
                <td>
                  {pcatglist.find(
                    (c) => c.pcatgid === item.pcatgid
                  )?.pcatgname || "N/A"}
                </td>
                <td>
                  <img
                    src={
                      item.imageUrl ||
                      "https://via.placeholder.com/60"
                    }
                    alt={item.pname}
                    className="prod-img"
                  />
                </td>
                <td className="prod-action-btns">
                  <button
                    onClick={() => handleEdit(item)}
                    className="prod-btn prod-btn-edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.pid)}
                    className="prod-btn prod-btn-delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Product;
