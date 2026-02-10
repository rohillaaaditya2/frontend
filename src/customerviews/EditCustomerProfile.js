import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EditCustomerProfile.css";

function EditCustomerProfile({ user, onClose, onUpdate }) {
  const [formData, setFormData] = useState(null);
  const [stlist, setStList] = useState([]);
  const [ctlist, setCtList] = useState([]);
  const [newImage, setnewImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  // LOAD CUSTOMER
  useEffect(() => {
    axios
      .get(
        `https://server-app-xite.onrender.com/customer/getcustomerdetails/${user.Cid}`
      )
      .then((res) => {
        setFormData(res.data);

        // preview image
        if (res.data.imageUrl) {
          setPreview(res.data.imageUrl);
        }

        if (res.data.StId) {
          axios
            .get(
              `https://server-app-xite.onrender.com/city/showcitybystate/${res.data.StId}`
            )
            .then((ctRes) => setCtList(ctRes.data));
        }
      })
      .catch((err) => console.error(err));

    axios
      .get("https://server-app-xite.onrender.com/state/show/")
      .then((res) => setStList(res.data))
      .catch((err) => console.error(err));
  }, [user.Cid]);

  if (!formData) return <div>Loading...</div>;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStateChange = (e) => {
    const stid = e.target.value;
    setFormData({ ...formData, StId: stid, CtId: "" });

    axios
      .get(
        `https://server-app-xite.onrender.com/city/showcitybystate/${stid}`
      )
      .then((res) => setCtList(res.data))
      .catch((err) => console.error(err));
  };

  // IMAGE CHANGE
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setnewImage(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  // VALIDATION
  const validate = () => {
    const errs = {};
    if (!formData.CustomerName?.trim())
      errs.CustomerName = "Full Name is required";
    if (!formData.StId) errs.StId = "State is required";
    if (!formData.CtId) errs.CtId = "City is required";
    if (!formData.CAddress?.trim())
      errs.CAddress = "Address is required";
    if (
      !formData.CEmail?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    )
      errs.CEmail = "Valid email is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const form = new FormData();
      form.append("CustomerName", formData.CustomerName);
      form.append("CUserId", formData.CUserId);
      form.append("StId", formData.StId);
      form.append("CtId", formData.CtId);
      form.append("CAddress", formData.CAddress);
      form.append("CContact", formData.CContact);
      form.append("CEmail", formData.CEmail);

      if (newImage) {
        form.append("CPicName", newImage);
      }

      const res = await axios.put(
        `https://server-app-xite.onrender.com/customer/update/${user.Cid}`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(res.data.message);

      const updatedUser = res.data.customer;

      const storage =
        localStorage.getItem("userSession") !== null
          ? localStorage
          : sessionStorage;

      storage.setItem("userSession", JSON.stringify(updatedUser));

      onUpdate(updatedUser);
      onClose();
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message ||
        "Error updating profile";
      alert(msg);
    }
  };

  return (
    <div className="edit-profile-container">
      <h4 className="edit-profile-header">Edit Profile</h4>

      <input
        className="edit-profile-input"
        type="text"
        name="CustomerName"
        value={formData.CustomerName || ""}
        onChange={handleChange}
        placeholder="Full Name"
      />
      {errors.CustomerName && (
        <p className="edit-profile-error">
          {errors.CustomerName}
        </p>
      )}

      <select
        className="edit-profile-select"
        name="StId"
        value={formData.StId || ""}
        onChange={handleStateChange}
      >
        <option value="">--Select State--</option>
        {stlist.map((s) => (
          <option key={s.stid} value={s.stid}>
            {s.stname}
          </option>
        ))}
      </select>

      <select
        className="edit-profile-select"
        name="CtId"
        value={formData.CtId || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            CtId: e.target.value,
          })
        }
      >
        <option value="">--Select City--</option>
        {ctlist.map((c) => (
          <option key={c.ctid} value={c.ctid}>
            {c.ctname}
          </option>
        ))}
      </select>

      <input
        className="edit-profile-input"
        type="text"
        name="CAddress"
        value={formData.CAddress || ""}
        onChange={handleChange}
        placeholder="Address"
      />

      <input
        className="edit-profile-input"
        type="text"
        name="CContact"
        value={formData.CContact || ""}
        onChange={handleChange}
        placeholder="Contact"
      />

      <input
        className="edit-profile-input"
        type="email"
        name="CEmail"
        value={formData.CEmail || ""}
        onChange={handleChange}
        placeholder="Email"
      />

      <p className="edit-profile-label">Profile Image</p>
      <img
        className="edit-profile-img"
        src={
          preview ||
          formData.imageUrl ||
          "https://via.placeholder.com/100"
        }
        alt="Customer"
      />

      <input
        className="edit-profile-file"
        type="file"
        onChange={handleFileChange}
      />

      <div className="edit-profile-buttons">
        <button
          className="edit-profile-btn save-btn"
          onClick={handleSubmit}
        >
          Save
        </button>
        <button
          className="edit-profile-btn cancel-btn"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditCustomerProfile;
