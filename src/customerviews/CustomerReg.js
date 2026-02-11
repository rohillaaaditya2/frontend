import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CustomerReg.css";

function CustomerReg() {
  const [cuserid, setCUserId] = useState("");
  const [cuserpass, setCUserPass] = useState("");
  const [customername, setCustomerName] = useState("");
  const [stid, setStId] = useState("");
  const [ctid, setCtId] = useState("");
  const [caddress, setCAddress] = useState("");
  const [ccontact, setCContact] = useState("");
  const [cemail, setCEmail] = useState("");
  const [cid, setCId] = useState("");
  const [image, setImage] = useState({ preview: "", data: null });
  const [status, setStatus] = useState("");
  const [slist, setSList] = useState([]);
  const [ctlist, setCtList] = useState([]);
  const [errors, setErrors] = useState({});

  const url = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${url}/customer/getcustomerlist`)
      .then((res) => setCId(res.data.length + 1))
      .catch((err) => alert(err));

    axios
      .get(`${url}/state/show`)
      .then((res) => setSList(res.data))
      .catch((err) => alert(err));
  }, [url]);

  const handleStIdSelect = (evt) => {
    setStId(evt.target.value);
    axios
      .get(`${url}/city/showcitybystate/` + evt.target.value)
      .then((res) => setCtList(res.data))
      .catch((err) => alert(err));
  };

  const validateForm = () => {
    let temp = {};
    let valid = true;

    if (!cuserpass || cuserpass.length < 6) {
      temp.cuserpass = "Password must be at least 6 characters";
      valid = false;
    }

    if (!customername.match(/^[A-Za-z ]+$/)) {
      temp.customername = "Customer name must contain only letters";
      valid = false;
    }

    if (!stid) {
      temp.stid = "Please select a state";
      valid = false;
    }

    if (!ctid) {
      temp.ctid = "Please select a city";
      valid = false;
    }

    if (!caddress) {
      temp.caddress = "Address is required";
      valid = false;
    }

    if (!/^\d{10}$/.test(ccontact)) {
      temp.ccontact = "Contact must be 10 digits";
      valid = false;
    }

    if (!/\S+@\S+\.\S+/.test(cemail)) {
      temp.cemail = "Enter a valid email address";
      valid = false;
    }

    if (!image.data) {
      temp.cpicname = "Please upload a profile photo";
      valid = false;
    }

    setErrors(temp);
    return valid;
  };

  const handleRegisterButton = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      let formData = new FormData();

      formData.append("CUserId", cuserid);
      formData.append("CUserPass", cuserpass);
      formData.append("CustomerName", customername);
      formData.append("StId", stid);
      formData.append("CtId", ctid);
      formData.append("CAddress", caddress);
      formData.append("CContact", ccontact);
      formData.append("CEmail", cemail);
      formData.append("Cid", cid);
      formData.append("Status", "Inactive");
      formData.append("file", image.data);

      const res = await axios.post(
        `${url}/customer/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(res.data.Message);
      setStatus("Registration successful");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  const handleFileChange = (evt) => {
    const file = evt.target.files[0];
    if (!file) return;

    const img = {
      preview: URL.createObjectURL(file),
      data: file,
    };
    setImage(img);
  };

  return (
    <div className="cr-container">
      <center>
        <div className="cr-form">
          <h2 className="cr-header">CUSTOMER REGISTRATION</h2>
          <p className="cr-status">{status}</p>

          <form onSubmit={handleRegisterButton}>
            <div className="cr-group">
              <label>Customer ID</label>
              <span className="cr-readonly">{cid}</span>
            </div>

            <div className="cr-group">
              <label>User ID</label>
              <input
                type="text"
                onChange={(e) => setCUserId(e.target.value)}
              />
            </div>

            <div className="cr-group">
              <label>Password</label>
              <input
                type="password"
                onChange={(e) => setCUserPass(e.target.value)}
              />
              <span className="cr-error">{errors.cuserpass}</span>
            </div>

            <div className="cr-group">
              <label>Customer Name</label>
              <input
                type="text"
                onChange={(e) => setCustomerName(e.target.value)}
              />
              <span className="cr-error">{errors.customername}</span>
            </div>

            <div className="cr-group">
              <label>State</label>
              <select onChange={handleStIdSelect}>
                <option value="">--Select State--</option>
                {slist.map((item) => (
                  <option key={item.stid} value={item.stid}>
                    {item.stname}
                  </option>
                ))}
              </select>
              <span className="cr-error">{errors.stid}</span>
            </div>

            <div className="cr-group">
              <label>City</label>
              <select onChange={(e) => setCtId(e.target.value)}>
                <option value="">--Select City--</option>
                {ctlist.map((item) => (
                  <option key={item.ctid} value={item.ctid}>
                    {item.ctname}
                  </option>
                ))}
              </select>
              <span className="cr-error">{errors.ctid}</span>
            </div>

            <div className="cr-group">
              <label>Address</label>
              <input
                type="text"
                onChange={(e) => setCAddress(e.target.value)}
              />
              <span className="cr-error">{errors.caddress}</span>
            </div>

            <div className="cr-group">
              <label>Contact</label>
              <input
                type="number"
                onChange={(e) => setCContact(e.target.value)}
              />
              <span className="cr-error">{errors.ccontact}</span>
            </div>

            <div className="cr-group">
              <label>Email</label>
              <input
                type="email"
                onChange={(e) => setCEmail(e.target.value)}
              />
              <span className="cr-error">{errors.cemail}</span>
            </div>

            <div className="cr-group">
              <label>Select Photo</label>
              <input type="file" onChange={handleFileChange} />
              {image.preview && (
                <img
                  src={image.preview}
                  className="cr-img-preview"
                  alt="preview"
                />
              )}
              <span className="cr-error">{errors.cpicname}</span>
            </div>

            <div className="cr-actions">
              <button type="submit" className="cr-btn">
                REGISTER
              </button>
            </div>
          </form>
        </div>
      </center>
    </div>
  );
}

export default CustomerReg;
