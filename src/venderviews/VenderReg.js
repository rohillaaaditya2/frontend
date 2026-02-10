
  import React,{useEffect,useState} from "react";
  import axios from "axios";
  import "./Vender.css";


  function VenderReg()
  {
        const [vuserid,setVUserId] = useState("");
        const [vuserpass,setVUserPass] = useState("");
        const [vendername,setVenderName] = useState("");
        const [vaddress,setVAddress] = useState("");
        const [vcontact,setVContact] = useState("");
        const [vemail,setVEmail] = useState("");
        const [vpicname,setVPicName] = useState("");
        const [vid,setVId] = useState("");
        const [image,setImage] = useState({preview:"",data:""});
        const [status,setStatus] = useState("");
        const [errors,setErrors] = useState({});
        const [venderList,setVenderList] = useState([]);

                                   
      useEffect(()=>{
        fetchVendorList();
      },[]);
                                         
      const fetchVendorList = async()=>{
        try{
            const res = await  axios.get("https://server-app-xite.onrender.com/vender/getvendercount/");
            setVenderList(res.data);
            setVId(res.data.length + 1);
        }
        catch(err)
        {
            alert(err);
        }
      };

           
          const validateForm = () =>{
    let temp = {};
    let valid = true;

    if(!vuserid || vuserid.length < 4){
        temp.vuserid = "USER ID MUST BE AT LEAST 4 CHARACTERS";
        valid = false;
    }
    else if(venderList.some((v)=> v.VUserId === vuserid)){
        temp.vuserid = "USER ID ALREADY EXISTS";
        valid = false;
    }

    if(!vuserpass || vuserpass.length < 6){
        temp.vuserpass = "PASSWORD MUST BE AT LEAST 6 CHARACTERS";
        valid = false;
    }

    if(!vendername.match(/^[A-Za-z]+$/)){
        temp.vendername = "VENDER NAME MUST CONTAIN ONLY LETTERS";
        valid=false;
    }

    if(!vaddress){
        temp.vaddress="ADDRESS IS REQUIRED";
        valid=false;
    }

    if(!/^\d{10}$/.test(vcontact)){
        temp.vcontact = "CONTACT MUST BE 10 DIGITS";
        valid=false;
    }

    if (!/\S+@\S+\.\S+/.test(vemail)){
        temp.vemail = "ENTER A VALID EMAIL ADDRESS";
        valid=false;
    }
      
       if(!vpicname)
       {
        temp.vpicname="PLEASE UPLOAD A PROFILE PHOTO";
        valid=false;
       }

             setErrors(temp);
             return valid;
            };

            const handleRegisterButton = () =>{
                if(!validateForm()) return;

                const obj ={

                    VUserId:vuserid,
                    VUserPass:vuserpass,
                    VenderName:vendername,
                    VAddress:vaddress,
                    VContact:vcontact,
                    VEmail:vemail,
                    VPicName:vpicname,
                    Vid:vid,
                    Status:"Inactive"

                    
                };

                axios.post("https://server-app-xite.onrender.com/vender/register",obj).then((res)=>{
             alert(res.data);
               fetchVendorList();
             }).catch((err)=>
                 alert(err));
                };

            const handleSubmit = async(evt) =>{
                evt.preventDefault();
                if(!image.data) return;

                let formData = new FormData();
                formData.append("file",image.data);

                try
                {
                    const response = await fetch("https://server-app-xite.onrender.com/vender/savevenderimage",{
                        method:"POST",
                        body : formData,
                 } );
                                              
                 if(response.ok)
                 {
                    alert("FILE UPLOADED SUCCESSSFULLY");
                    // setStatus("FILE UPLOADED SUCCESSSFULLY");
                 }
                 else{
                    
                     setStatus("FAILED TO UPLOAD FILE");
                }
                } catch(err)
                {
                    console.error(err);
                    setStatus("FAILED TO UPLOAD FILE");
                }
            };

            const handleFileChange = (evt)=>{
                const img = {
                    preview:URL.createObjectURL(evt.target.files[0]),
                    data:evt.target.files[0],
                };
                setImage(img);
                setVPicName(evt.target.files[0].name);
            };

           return (
  <div className="vendContainer_guru">
    <center>
      <div className="vendBox_guru">
        <h2 className="vendHeading_guru">VENDER REGISTRATION</h2>
        <p className="vendStatus_guru">{status}</p>

        <div className="vendRow_guru">
          <label className="vendLabel_guru">VENDER ID</label>
          <span className="vendReadonly_guru">{vid}</span>
        </div>

        <div className="vendRow_guru">
          <label className="vendLabel_guru">USER ID</label>
          <input type="text" onChange={(e)=>setVUserId(e.target.value)} className="vendInput_guru"/>
          <span className="vendError_guru">{errors.vuserid}</span>
        </div>

        <div className="vendRow_guru">
          <label className="vendLabel_guru">PASSWORD</label>
          <input type="password" onChange={(e)=>setVUserPass(e.target.value)} className="vendInput_guru"/>
          <span className="vendError_guru">{errors.vuserpass}</span>
        </div>

        <div className="vendRow_guru">
          <label className="vendLabel_guru">VENDER NAME</label>
          <input type="text" onChange={(e)=>setVenderName(e.target.value)} className="vendInput_guru"/>
          <span className="vendError_guru">{errors.vendername}</span>
        </div>

        <div className="vendRow_guru">
          <label className="vendLabel_guru">ADDRESS</label>
          <input type="text" onChange={(e)=>setVAddress(e.target.value)} className="vendInput_guru"/>
          <span className="vendError_guru">{errors.vaddress}</span>
        </div>

        <div className="vendRow_guru">
          <label className="vendLabel_guru">CONTACT</label>
          <input type="number" onChange={(e)=>setVContact(e.target.value)} className="vendInput_guru"/>
          <span className="vendError_guru">{errors.vcontact}</span>
        </div>

        <div className="vendRow_guru">
          <label className="vendLabel_guru">EMAIL</label>
          <input type="email" onChange={(e)=>setVEmail(e.target.value)} className="vendInput_guru"/>
          <span className="vendError_guru">{errors.vemail}</span>
        </div>

        <div className="vendRow_guru">
          <label className="vendLabel_guru">UPLOAD PHOTO</label>
          <input type="file" onChange={handleFileChange} className="vendInput_guru"/>
          {image.preview && <img src={image.preview} className="vendPreview_guru" height={100} width={100}/>}
          <span className="vendError_guru">{errors.vpicname}</span>
          <button onClick={handleSubmit} className="vendBtn_guru vendBtnDanger_guru">UPLOAD</button>
        </div>

        <div className="vendActions_guru">
          <button onClick={handleRegisterButton} className="vendBtn_guru vendBtnPrimary_guru">REGISTER</button>
        </div>

      </div>
    </center>
  </div>
);

  }
  export default VenderReg;

     