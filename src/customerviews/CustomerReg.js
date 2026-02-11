
  import React,{useState,useEffect} from "react";
  import axios from "axios";
  import "./CustomerReg.css";

   function CustomerReg()
   {
      const[cuserid,setCUserId] = useState("");
      const[cuserpass,setCUserPass] =useState("");
      const[customername,setCustomerName] =useState("");
      const[stid,setStId] =useState("");
      const[ctid,setCtId] =useState("");
      const[caddress,setCAddress] =useState("");
      const[ccontact,setCContact] =useState("");
      const[cemail,setCEmail] =useState("");
      const[cpicname,setCPicName] =useState("");
      const[cid,setCId] =useState("");
      const[image,setImage] =useState({preview:'',data:''});
      const[status,setStatus] =useState("");
      const[slist,setSList] =useState([]);
      const[ctlist,setCtList] =useState([]);
      const[errors,setErrors] =useState({});
     

        useEffect(() =>{
            axios.get(`${url}/customer/getcustomercount`).then((res)=> setCId(res.data.length+1)).catch((err) => alert(err));

            axios.get(`${url}/state/show`).then((res)=> setSList(res.data)).catch((err) => alert(err));
        },[]);

        const handleStIdSelect = (evt) =>{
            setStId(evt.target.value);
            axios.get(`${url}/city/showcitybystate/`+evt.target.value).then((res)=> setCtList(res.data)).catch((err)=> alert(err));
        }

        const validateForm = () =>{
            let temp = {};
            let valid = true;

            if(! cuserpass|| cuserpass.length <6)
            {
                temp.cuserpass = "Password must be at least 6 charecters";
                valid = false;
            }

            if(!customername.match(/^[A-Za-z ]+$/))
            {
                temp.customername = "Customer name must contain only letters";
                  valid = false;
            }
            if(! stid)
            {
                temp.stid = "Please select a state";
                valid = false;
            }

            if(! ctid)
            {
                temp.ctid ="Please select a city";
                valid=false;
            }

            if(!caddress)
            {
                temp.caddress = "Address is required";
                valid = false;
            }
            if(! /^\d{10}$/.test(ccontact))
            {
                temp.ccontact = "Contact must be 10 digits";
                valid = false;
            }

            if(!/\S+@\S+\.\S+/.test(cemail))
            {
                temp.cemail="a valid email address";
                valid=false;
            }

            if(!cpicname)
            {
                temp.cpicname = "Please upload a profile photo";
                valid = false;
            }

            setErrors(temp);
            return valid;
        }

         const handleRegisterButton = async(e) =>{
             e.preventDefault();
             if(!validateForm()) return;
             
             var obj ={
                 CUserId:cuserid,
                 CUserPass:cuserpass,
                 CustomerName:customername,
                 StId:stid,
                 CtId:ctid,
                 CAddress:caddress,
                 CContact:ccontact,
                 CEmail:cemail,
                 CPicName:cpicname,
                 Cid:cid,
                 Status:"Inactive"
                };
                
                let formData = new FormData();
                formData.append('file', image.data);
               const res= await fetch(`${url}/customer/savecustomerimage`,{
                method:"POST",
                body:formData,
               });

                    if(res.ok)
                    {
                        setStatus("File uploaded Succesfully");
                    }
                    else
                    {
                        console.log('failed to upload');
                        setStatus("Failed to Uploaded File");
                    }

                    axios.post(`${url}/customer/register`,obj).then((res)=> {
                        alert(res.data.Message);
                    }).catch((err) =>{
                        if(err.response && err.response.data && err.response.data.Message)
                        {
                            alert(err.response.data.Message);  // SHOW PRPOER ERROR Message
                        }
                        else
                        {
                            alert("Something went Wrong");
                        }
                    });
         }

           const handleFileChange = (evt) =>{
             const img = {
                 preview : URL.createObjectURL(evt.target.files[0]),
                 data:evt.target.files[0]
             }
             setImage(img);
             setCPicName(evt.target.files[0].name);
           }


              return(
  <div className="cr-container">
      <center>
        <div className="cr-form">
            <h2 className="cr-header">CUSTOMER REGISTRATION</h2>
            <p className="cr-status">{status}</p>
            <form onSubmit={handleRegisterButton}>
                
                <div className="cr-group">
                    <label className="cr-label-id">Customer ID</label>
                    <span className="cr-readonly">{cid}</span>
                </div>

                <div className="cr-group">
                    <label className="cr-label-uid">User ID</label>
                    <input type="text" onChange={(e) => setCUserId(e.target.value)} />
                    <span className="cr-error">{errors.cuserid}</span>
                </div>

                <div className="cr-group">
                    <label className="cr-label-pass">Password</label>
                    <input type="password" onChange={(e) => setCUserPass(e.target.value)} />
                    <span className="cr-error">{errors.cuserpass}</span>
                </div>

                <div className="cr-group">
                    <label className="cr-label-name">Customer Name</label>
                    <input type="text" onChange={(e) => setCustomerName(e.target.value)} />
                    <span className="cr-error">{errors.customername}</span>
                </div>

                <div className="cr-group">
                    <label className="cr-label-state">State</label>
                    <select onChange={handleStIdSelect}>
                        <option value="">--Select State--</option>
                        {slist.map((item) => (
                            <option key={item.stid} value={item.stid}>{item.stname}</option>
                        ))}
                    </select>
                    <span className="cr-error">{errors.stid}</span>
                </div>

                <div className="cr-group">
                    <label className="cr-label-city">City</label>
                    <select onChange={(e) => setCtId(e.target.value)}>
                        <option value="">--Select City--</option>
                        {ctlist.map((item) => (
                            <option key={item.ctid} value={item.ctid}>{item.ctname}</option>
                        ))}
                    </select>
                    <span className="cr-error">{errors.ctid}</span>
                </div>

                <div className="cr-group">
                    <label className="cr-label-add">Address</label>
                    <input type="text" onChange={(e) => setCAddress(e.target.value)} />
                    <span className="cr-error">{errors.caddress}</span>
                </div>

                <div className="cr-group">
                    <label className="cr-label-contact">Contact</label>
                    <input type="number" onChange={(e) => setCContact(e.target.value)} />
                    <span className="cr-error">{errors.ccontact}</span>
                </div>

                <div className="cr-group">
                    <label className="cr-label-email">Email</label>
                    <input type="email" onChange={(e) => setCEmail(e.target.value)} />
                    <span className="cr-error">{errors.cemail}</span>
                </div>

                <div className="cr-group">
                    <label className="cr-label-photo">Select Photo</label>
                    <input type="file" onChange={handleFileChange} />
                    {image.preview && <img src={image.preview} className="cr-img-preview" alt="preview" />}
                    <span className="cr-error">{errors.cpicname}</span>
                </div>

                <div className="cr-actions">
                    <button type="submit" className="cr-btn">REGISTER</button>
                </div>

            </form>
        </div>
      </center>
  </div>
);
   }
    export default  CustomerReg;
       
    
    
    
    
    
    
   