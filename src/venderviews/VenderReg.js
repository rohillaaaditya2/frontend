import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Vender.css";

function VenderReg() {
  const [vuserid, setVUserId] = useState("");
  const [vuserpass, setVUserPass] = useState("");
  const [vendername, setVenderName] = useState("");
  const [vaddress, setVAddress] = useState("");
  const [vcontact, setVContact] = useState("");
  const [vemail, setVEmail] = useState("");
  const [vid, setVId] = useState("");
  const [image, setImage] = useState({ preview: "", data: null });
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});
  const [venderList, setVenderList] = useState([]);

  // FIXED: url variable added
  const url = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchVendorList();
  }, []);

  const fetchVendorList = async () => {
    try {
      const res = await axios.get(`${url}/vender/getvendercount`);
      setVenderList(res.data);
      setVId(res.data.length + 1);
    } catch (err) {
      alert("Error fetching vendor list");
    }
  };

  const validateForm = () => {
    let temp = {};
    let valid = true;

    if (!vuserid || vuserid.length < 4) {
      temp.vuserid = "USER ID MUST BE AT LEAST 4 CHARACTERS";
      valid = false;
    } else if (venderList.some((v) => v.VUserId === vuserid)) {
      temp.vuserid = "USER ID ALREADY EXISTS";
      valid = false;
    }

    if (!vuserpass || vuserpass.length < 6) {
      temp.vuserpass = "PASSWORD MUST BE AT LEAST 6 CHARACTERS";
      valid = false;
    }

    if (!vendername || !vendername.match(/^[A-Za-z ]+$/)) {
      temp.vendername = "VENDOR NAME MUST CONTAIN ONLY LETTERS";
      valid = false;
    }

    if (!vaddress) {
      temp.vaddress = "ADDRESS IS REQUIRED";
      valid = false;
    }

    if (!/^\d{10}$/.test(vcontact)) {
      temp.vcontact = "CONTACT MUST BE 10 DIGITS";
      valid = false;
    }

    if (!/\S+@\S+\.\S+/.test(vemail)) {
      temp.vemail = "ENTER A VALID EMAIL ADDRESS";
      valid = false;
    }

    if (!image.data) {
      temp.vpicname = "PLEASE UPLOAD A PROFILE PHOTO";
      valid = false;
    }

    setErrors(temp);
    return valid;
  };

  const handleRegisterButton = async () => {
    if (!validateForm()) return;

    try {
      let form = new FormData();

      form.append("VUserId", vuserid);
      form.append("VUserPass", vuserpass);
      form.append("VenderName", vendername);
      form.append("VAddress", vaddress);
      form.append("VContact", vcontact);
      form.append("VEmail", vemail);
      form.append("Vid", vid);
      form.append("Status", "Inactive");
      form.append("file", image.data);

      const res = await axios.post(`${url}/vender/register`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(res.data.message || "Registration successful");
      setStatus("Registration successful");

      // reset form
      setVUserId("");
      setVUserPass("");
      setVenderName("");
      setVAddress("");
      setVContact("");
      setVEmail("");
      setImage({ preview: "", data: null });

      fetchVendorList();
    } catch (err) {
      console.error(err);
      alert("Vendor registration failed");
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
    <div className="vendContainer_guru">
      <center>
        <div className="vendBox_guru">
          <h2 className="vendHeading_guru">VENDOR REGISTRATION</h2>
          <p className="vendStatus_guru">{status}</p>

          <div className="vendRow_guru">
            <label className="vendLabel_guru">VENDOR ID</label>
            <span className="vendReadonly_guru">{vid}</span>
          </div>

          <div className="vendRow_guru">
            <label className="vendLabel_guru">USER ID</label>
            <input
              type="text"
              value={vuserid}
              onChange={(e) => setVUserId(e.target.value)}
              className="vendInput_guru"
            />
            <span className="vendError_guru">{errors.vuserid}</span>
          </div>

          <div className="vendRow_guru">
            <label className="vendLabel_guru">PASSWORD</label>
            <input
              type="password"
              value={vuserpass}
              onChange={(e) => setVUserPass(e.target.value)}
              className="vendInput_guru"
            />
            <span className="vendError_guru">{errors.vuserpass}</span>
          </div>

          <div className="vendRow_guru">
            <label className="vendLabel_guru">VENDOR NAME</label>
            <input
              type="text"
              value={vendername}
              onChange={(e) => setVenderName(e.target.value)}
              className="vendInput_guru"
            />
            <span className="vendError_guru">{errors.vendername}</span>
          </div>

          <div className="vendRow_guru">
            <label className="vendLabel_guru">ADDRESS</label>
            <input
              type="text"
              value={vaddress}
              onChange={(e) => setVAddress(e.target.value)}
              className="vendInput_guru"
            />
            <span className="vendError_guru">{errors.vaddress}</span>
          </div>

          <div className="vendRow_guru">
            <label className="vendLabel_guru">CONTACT</label>
            <input
              type="number"
              value={vcontact}
              onChange={(e) => setVContact(e.target.value)}
              className="vendInput_guru"
            />
            <span className="vendError_guru">{errors.vcontact}</span>
          </div>

          <div className="vendRow_guru">
            <label className="vendLabel_guru">EMAIL</label>
            <input
              type="email"
              value={vemail}
              onChange={(e) => setVEmail(e.target.value)}
              className="vendInput_guru"
            />
            <span className="vendError_guru">{errors.vemail}</span>
          </div>

          <div className="vendRow_guru">
            <label className="vendLabel_guru">UPLOAD PHOTO</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="vendInput_guru"
            />
            {image.preview && (
              <img
                src={image.preview}
                className="vendPreview_guru"
                height={100}
                width={100}
                alt="preview"
              />
            )}
            <span className="vendError_guru">{errors.vpicname}</span>
          </div>

          <div className="vendActions_guru">
            <button
              onClick={handleRegisterButton}
              className="vendBtn_guru vendBtnPrimary_guru"
            >
              REGISTER
            </button>
          </div>
        </div>
      </center>
    </div>
  );
}

export default VenderReg;
