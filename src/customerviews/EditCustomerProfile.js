
   import React,{useEffect,useState} from "react";
   import axios from "axios";
// import { GrFormDown } from "react-icons/gr";
import"./EditCustomerProfile.css";

   function EditCustomerProfile({user,onClose,onUpdate})
   {
    const [formData,setFormData] = useState(null);
    const[stlist,setStList] = useState([]);
    const[ctlist,setCtList] = useState([]);
    const [newImage,setnewImage] =useState(null);
    const [preview,setPreview] = useState(null);
    const [errors,setErrors] = useState({});

    // LOAD EXISTING CUSTOMER = STATE
    useEffect(() => {
        axios.get(`https://server-app-xite.onrender.com/customer/getcustomerdetails/${user.Cid}`).then((res) => {
            setFormData(res.data);
            if(res.data.StId)
            {
                axios.get(`https://server-app-xite.onrender.com/city/showcitybystate/${res.data.StId}`).then((ctRes) => setCtList(ctRes.data));
            }
        }).catch((err) => console.error(err));

        axios.get("https://server-app-xite.onrender.com/state/show/").then((res) => setStList(res.data)).catch((err) => console.error(err));
    },[user.Cid])

    if(! formData) return <div>Loading...</div>;

    // HANDLE FILELD CHANGE

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value});
    };

    // STATE CHANGED ->> REAOLD CITIES

    const handleStateChange = (e) => {
        const stid =e.target.value;
        setFormData({...formData,StId: stid, CtId : ""});

        axios.get(`https://server-app-xite.onrender.com/city/showcitybystate/${stid}`).then((res) => setCtList(res.data)).catch((err) => console.error(err));
    };

    // IMAGE SELECTION

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setnewImage(file);
        setPreview(file ? URL.createObjectURL(file): null);
    };

    // VALIDATION FORM

    const validate = () => {
        const errs ={};
        if(!formData.CustomerName?.trim()) errs.CustomerName="Full Name is required";
        if(!formData.StId) errs.StId = "state is required";
        if(!formData.CtId) errs.CtId ="City is required";
        if(!formData.CAddress?.trim()) errs.CAddress ="Address is Required";
        if(!formData.CEmail?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))errs.CEmail="valid email is required";

        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit =async () => {
        if(!validate()) return;

        try{
            const form = new FormData();
            form.append("CustomerName",formData.CustomerName);
            form.append("CUserId",formData.CUserId);
            form.append("StId",formData.StId);
            form.append("CAddress",formData.CAddress);
            form.append("CContact",formData.CContact);
            form.append("CEmail",formData.CEmail);

            if(newImage)
            {
                form.append("CPicName",newImage);
            }
            const res =await axios.put(`https://server-app-xite.onrender.com/customer/update/${user.Cid}`,
                form,{
                    headers: {"Content-Type" : "multipart/form-data"}
                }
            );
             
            alert(res.data.message); // ONLY SHOW SUCCESS MESSAGE

            const updatedUser = res.data.customer;

            //  SAVE UPDATED INFO LOCAL/SESSION STORAGE

            const strong = localStorage.getItem("userSession") !== null ? localStorage : sessionStorage;
            strong.setItem("userSession", JSON.stringify(updatedUser));

            onUpdate(updatedUser);
            onClose();
        } catch(err)
        {
            console.error(err);
            const msg = err.response?.data?.message || " Error updating Profiles";
            alert(msg);     //SHOW ACTUAL BACKEND MESSSSAGE
        }
    };

    return(
    <div className="edit-profile-container">
        <h4 className="edit-profile-header">Edit Profile</h4>

        <input className="edit-profile-input" type="text" name="CustomerName" value={formData.CustomerName || ""} onChange={handleChange} placeholder="Full Name" />
        {errors.CustomerName && <p className="edit-profile-error">{errors.CustomerName}</p>}

        <select className="edit-profile-select" name="StId" value={formData.StId || ""} onChange={handleStateChange}>
            <option value="">--Select State--</option>
            {stlist.map((s) => (
                <option key={s.stid} value={s.stid}>{s.stname}</option>
            ))} 
        </select>
        {errors.StId && <p className="edit-profile-error">{errors.StId}</p>}

        <select className="edit-profile-select" name="CtId" value={formData.CtId || ""} onChange={(e) => setFormData ({...formData, CtId: e.target.value})}>
            <option value="">-- SELECT CITY--</option>
            {ctlist.map((c)=> (
                <option key={c.ctid} value={c.ctid}>{c.ctname}</option>
            ))}
        </select>
        {errors.CtId && <p className="edit-profile-error">{errors.CtId}</p>}

        <input className="edit-profile-input" type="text" name="CAddress" value={formData.CAddress || ""} onChange={handleChange} placeholder="Address" />
        {errors.CAddress && <p className="edit-profile-error">{errors.CAddress}</p>}

        <input className="edit-profile-input" type="text" name="CContact" value={formData.CContact || ""} onChange={handleChange} placeholder="Contact" />
        {errors.CContact && <p className="edit-profile-error">{errors.CContact}</p>}

        <input className="edit-profile-input" type="email" name="CEmail" value={formData.CEmail || ""} onChange={handleChange} placeholder="Email" />
        {errors.CEmail && <p className="edit-profile-error">{errors.CEmail}</p>}

        <p className="edit-profile-label">Profile Image</p>
        <img className="edit-profile-img" src={preview ? preview : `https://server-app-xite.onrender.com/customer/getimage/${formData.CPicName}`} alt="Customer" />

        <input className="edit-profile-file" type="file" onChange={handleFileChange} />

        <div className="edit-profile-buttons">
            <button className="edit-profile-btn save-btn" onClick={handleSubmit}>Save</button>
            <button className="edit-profile-btn cancel-btn" onClick={onClose}>Cancel</button>
        </div>
    </div>
);
   }
   export default EditCustomerProfile;


    //   return(
    //     <div style={{margin:20,padding:15,border:"1px solid #fcc"}}>
    //         <h4>Edit Profile</h4>

    //         <input type="text" name="CustomerName" value={formData.CustomerName || ""} onChange={handleChange} placeholder="Full Name"></input>
    //         {errors.CustomerName && <p style={{color:"red"}}>{errors.CustomerName}</p>}
    //         <br/>

    //         <select name="StId" value={formData.StId || " "} onChange={handleStateChange}>
    //             <option value="">--Select State--</option>
    //             {stlist.map((s) => (
    //                 <option key={s.stid} value={s.stid}>{s.stname}</option>
    //             ))} 
    //         </select>

    //         {errors.StId && <p style={{color:"red"}}>{errors.StId}</p>}
    //         <br/>

    //         <select name="CtId" value={formData.CtId || ""} onChange={(e) => setFormData ({...formData, CtId: e.target.value})}>

    //             <option value="">-- SELECT CITY--</option>
    //             {ctlist.map((c)=> (
    //                 <option key={c.ctid} value={c.ctid}>{c.ctname}</option>
    //             ))}
    //         </select>
    //          {errors.CtId && <p style={{color: "red"}}>{errors.CtId}</p>}
    //          <br/>

    //          <input type="text" name="CAddress" value={formData.CAddress || ""} onChange={handleChange} placeholder="Address"></input>
    //          {errors.CAddress && <p style={{color:"red"}}>{errors.CAddress}</p>}
    //          <br/>

    //          <input type="text" name="CContact" value={formData.CContact || ""} onChange={handleChange} placeholder="Contact"></input>
    //          {errors.CContact && <p style={{color:"red"}}>{errors.CContact}</p>}
    //          <br/>

    //          <input type="email" name="CEmail" value={formData.CEmail || ""} onChange={handleChange} placeholder="Email"></input>
    //          {errors.CEmail && <p style={{color:"red"}}>{errors.CEmail}</p>}
    //          <br/>

    //           <p>Profile Image</p>
    //           <img src={preview ? preview : `http://localhost:9876/customer/getimage/${formData.CPicName}`}
    //            height={80} width={80} style={{borderRadius:"50px"}} alt="Customer"
    //           ></img>
    //           <br/>

    //           <input type="file" onChange={handleFileChange}></input>
    //           <br/>

    //           <button onClick={handleSubmit} style={{marginRight: 10}}>Save</button>

    //           <button onClick={onClose}>Cancel</button>

    //                  </div>
    //   );
    // }

    // export default EditCustomerProfile;

