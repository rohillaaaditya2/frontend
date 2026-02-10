import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EditVender.css";

function EditVenderProfile({ vender, onClose, onUpdate }) {
  const [formData, setFormData] = useState(vender);
  const [newImage, setNewImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [vendorList, setVendorList] = useState([]);

  const BASE_URL = "https://server-app-xite.onrender.com";

  useEffect(() => {
    setFormData(vender);
    fetchVendorList();
  }, [vender]);

  const fetchVendorList = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/vender/getvendercount`);
      setVendorList(res.data);
    } catch (err) {
      console.error("ERROR FETCHING VENDOR LIST:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);

    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const checkEmailDuplicate = () => {
    return vendorList.some(
      (v) =>
        v.VEmail === formData.VEmail &&
        v.VUserId !== formData.VUserId
    );
  };

  const handleSubmit = async () => {
    if (checkEmailDuplicate()) {
      alert("THIS EMAIL IS ALREADY USED BY ANOTHER VENDOR!");
      return;
    }

    try {
      const form = new FormData();
      form.append("VenderName", formData.VenderName);
      form.append("VAddress", formData.VAddress);
      form.append("VContact", formData.VContact);
      form.append("VEmail", formData.VEmail);

      if (newImage) {
        form.append("file", newImage);
      }

      const res = await axios.put(
        `${BASE_URL}/vender/update/${formData.VUserId}`,
        form
      );

      alert(res.data.message);

      onUpdate({ ...formData, ...res.data.updateData });
      onClose();
    } catch (err) {
      console.log(err);
      alert("ERROR UPDATING PROFILE");
    }
  };

  return (
    <div className="evp-container">
      <h3 className="evp-heading">Edit Vendor Profile</h3>

      <input
        type="text"
        name="VenderName"
        value={formData.VenderName || ""}
        onChange={handleChange}
        placeholder="Vendor Name"
        className="evp-input"
      />

      <input
        type="text"
        name="VAddress"
        value={formData.VAddress || ""}
        onChange={handleChange}
        placeholder="Address"
        className="evp-input"
      />

      <input
        type="text"
        name="VContact"
        value={formData.VContact || ""}
        onChange={handleChange}
        placeholder="Contact"
        className="evp-input"
      />

      <input
        type="email"
        name="VEmail"
        value={formData.VEmail || ""}
        onChange={handleChange}
        placeholder="Email"
        className="evp-input"
      />

      <div className="evp-image-section">
        <p className="evp-label">Current Image:</p>

        {formData.imageUrl && (
          <img
            src={formData.imageUrl}
            alt="Vendor"
            className="evp-current-image"
          />
        )}

        {previewImage && (
          <div className="evp-preview-section">
            <p className="evp-label">New Image Preview:</p>
            <img
              src={previewImage}
              alt="Preview"
              className="evp-preview-image"
            />
          </div>
        )}

        <input
          type="file"
          onChange={handleFileChange}
          className="evp-file-input"
        />
      </div>

      <div className="evp-btn-group">
        <button
          onClick={handleSubmit}
          className="evp-btn evp-btn-save"
        >
          Save
        </button>
        <button
          onClick={onClose}
          className="evp-btn evp-btn-cancel"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditVenderProfile;
