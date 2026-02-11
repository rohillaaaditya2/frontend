import React, { useState, useEffect } from "react";
import axios from "axios";
import "./VenderMgt.css";

function VenderMgt() {
  const [venderlist, setVenderList] = useState([]);
  const [selectedVender, setSelectedVender] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editForm, setEditForm] = useState({
    VenderName: "",
    VAddress: "",
    VContact: "",
    VEmail: "",
    file: null,
    previewImage: "",
  });
  const url=process.env.REACT_APP_API_URL;


  useEffect(() => {
    fetchVenders();
  }, []);

  const fetchVenders = () => {
    axios
      .get(
        `${url}/vender/getvendercount`
      )
      .then((res) => setVenderList(res.data))
      .catch((err) => alert(err));
  };

  const openEditModal = (vender) => {
    setSelectedVender(vender);
    setEditForm({
      VenderName: vender.VenderName,
      VAddress: vender.VAddress,
      VContact: vender.VContact,
      VEmail: vender.VEmail,
      file: null,
      previewImage: vender.VPicUrl || "", // NEW
    });
    setShowModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setEditForm({
        ...editForm,
        file: files[0],
        previewImage: URL.createObjectURL(files[0]),
      });
    } else {
      setEditForm({ ...editForm, [name]: value });
    }
  };

  const handleEditSave = async () => {
    const formData = new FormData();
    formData.append("VenderName", editForm.VenderName);
    formData.append("VAddress", editForm.VAddress);
    formData.append("VContact", editForm.VContact);
    formData.append("VEmail", editForm.VEmail);
    

    if (editForm.file) {
      formData.append("file", editForm.file); // NEW
    }

    axios
      .put(
        `${url}/vender/update/${selectedVender.VUserId}`,
        formData
      )
      .then((res) => {
        alert(res.data.message);
        setShowModal(false);
        fetchVenders();
      })
      .catch((err) => alert(err));
  };

  const toggleStatus = (vid, status) => {
    axios
      .put(
        `${url}/vender/vendermanage/${vid}/${
          status === "Active" ? "Inactive" : "Active"
        }`
      )
      .then(() => {
        fetchVenders();
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <center>
        <h4>Vendor List</h4>
        <table border={1}>
          <thead>
            <tr>
              <th>Photo</th>
              <th>VId</th>
              <th>Vendor Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
              <th>Edit</th>
            </tr>
          </thead>

          <tbody>
            {venderlist.map((item) => (
              <tr key={item.Vid}>
                <td>
                  {item.VPicUrl && (
                    <img
                      src={item.VPicUrl}   // NEW
                      alt="vendor"
                      width="50"
                    />
                  )}
                </td>

                <td>{item.Vid}</td>
                <td>{item.VenderName}</td>
                <td>{item.VEmail}</td>
                <td>{item.Status}</td>

                <td>
                  <button
                    onClick={() =>
                      toggleStatus(item.Vid, item.Status)
                    }
                  >
                    {item.Status === "Active"
                      ? "Inactive"
                      : "Active"}
                  </button>
                </td>

                <td>
                  <button
                    onClick={() => openEditModal(item)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </center>

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              minWidth: "300px",
            }}
          >
            <h3>Edit Vendor</h3>

            <input
              type="text"
              name="VenderName"
              value={editForm.VenderName}
              onChange={handleEditChange}
              placeholder="Vendor Name"
            />
            <br />

            <input
              type="text"
              name="VAddress"
              value={editForm.VAddress}
              onChange={handleEditChange}
              placeholder="Address"
            />
            <br />

            <input
              type="text"
              name="VContact"
              value={editForm.VContact}
              onChange={handleEditChange}
              placeholder="Contact"
            />
            <br />

            <input
              type="email"
              name="VEmail"
              value={editForm.VEmail}
              onChange={handleEditChange}
              placeholder="Email"
            />
            <br />

            {editForm.previewImage && (
              <div style={{ margin: "10px 0" }}>
                <img
                  src={editForm.previewImage}
                  alt="Preview"
                  width="100"
                />
              </div>
            )}

            <input
              type="file"
              onChange={handleEditChange}
            />
            <br />
            <br />

            <button onClick={handleEditSave}>Save</button>
            <button onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VenderMgt;
