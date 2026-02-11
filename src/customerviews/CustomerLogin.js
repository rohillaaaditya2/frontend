import React,{useState,useEffect} from "react";
import axios  from "axios";
import Cookies from "js-cookie";
// import {Navigate, useNavigate} from "react-router-dom";
import CustomerHome from "./CustomerHome";
import ReactDOM from "react-dom/client"
import "./CustomerLogin.css";

function CustomerLogin ()
{
     const [uid,setUId] = useState("");
     const [upass,setUPass] = useState("");
     const [isChecked,setIsChecked] = useState(false);
     const [errors,setErrors] = useState({});
     const [authError,setAuthError] = useState("");    // NEW STATE FOR AUTH ERRORS

     // FORGET PASSWORD STATES

     const [showForgot,setShowForgot] = useState(false);
     const [forgotStep,setForgotStep] = useState(1); // 1=ENTER ID,,, 2=OTP + NEW PASS              

     const [forgotEmail,setForgotEmail] = useState("");
     const [otp,setOtp] = useState(" ");
     const [newPassword,setNewPassword] = useState("");
     const [forgotMessage,setForgotMessage] = useState("");

    //  const navigate = useNavigate();

     useEffect(() => {
        const myCookies = Cookies.get("auth");
        if(myCookies)
        {
            const obj = JSON.parse(myCookies);
            setUId(obj.username);
            setUPass(obj.password);
        }
     },[]);

     const validateForm = ()=> {
        let temp = {};
        let valid = true;

        if(!uid || uid.length <4)
        {
            temp.cuserid = "UserID must be at least 4 charecters";
            valid = false;
        }

        if(!upass || upass.length <3)
        {
            temp.cuserpass = "Password must be at least 3 charecters";
            valid = false;
        }
        setErrors(temp);
        return valid;
     };

     const handleLogin = (e) => {
        e.preventDefault();

        if(!validateForm())
            return;

        setAuthError(" ");    // RESET PREIVIOUS AUTH ERRORS

        axios.post(`${url}/customer/login`, {
              CUserId : uid,
              CUserPass : upass,
        }).then((res) =>{
            if(res.data.CUserId)
            {
                if(res.data.Status === "Inactive")
                {
                    alert("User not activate.Please wait for admin activation");

                    return;
                }

                if(isChecked)
                {
                    Cookies.set(
                        "auth",
                        JSON.stringify({username: uid, password:upass}),{expires : 7}
                    );
                }

                const sessionDate = {
                    cfname : res.data.CustomerName,
                    Cpicname: res.data.CPicName,
                    Cid:res.data.Cid,
                    CUserId:res.data.CUserId,
                };

                if(isChecked)
                {
                    localStorage.setItem("userSession",JSON.stringify(sessionDate));
                }
                else
                {
                    sessionStorage.setItem("userSession",JSON.stringify(sessionDate));
                }
                localStorage.setItem("customertoken","sometoken456");

                const root=ReactDOM.createRoot(document.getElementById('root'));
                root.render(<CustomerHome/>)
                // navigate("/customermain/customerhome");
            }
            else
            {
                setAuthError("Authentication failed : Invalid ID or password");
            }
        }).catch((err) =>{
            if(err.response)
            {
                if(err.response.status === 404)
                {
                    setAuthError("Server error :" + err.response.data.message || err.message);
                }
            }
            else
            {
                setAuthError("Server error:" + err.message);
            }
        });
     };

       // STEP 1: SEND OTP

       const handleSendOtp = (e) => {
        e.preventDefault();
        if(! forgotEmail)
        {
            setForgotMessage("Please enter your Customer ID.");
            return;
        }

        axios.post(`${url}/customer/forgotpassword/send-otp`, {
            CUserId : forgotEmail,
        }).then((res) =>{
            setForgotMessage(res.data.message || "OTP sent to your email.");
            setForgotStep(2);
        }).catch((err) =>
            setForgotMessage("Error:" + err.message));
       };

       // STEP 2: VERIFY OTP & RESET PASSWORD

       const handleResetPassword = (e)=>{
        e.preventDefault();
                                                      
        if(!otp || !newPassword)
        {
            setForgotMessage("Please enter OTP and new password.");
            return;
        }
        axios.post(`${url}/customer/forgotpassword/verify-otp`,
            {
                CUserId: forgotEmail,
                OTP:otp,
                NewPassword:newPassword,
            }
        ).then((res)=>{
            setForgotMessage(res.data.message || "Password reset succesfully");
            setForgotStep(1);
            setShowForgot(false);
            setOtp("");
            setNewPassword("");
        }).catch((err) =>
            setForgotMessage("Error:" + err.message));
        };

        return (
  <div className="cl-container">
      <center>
        <div className="cl-form">
           {!showForgot ? (
            <>
              <h4 className="cl-header">Customer Login</h4>
              
              <input 
                type="text" 
                placeholder="Customer ID" 
                value={uid} 
                onChange={(e) => setUId(e.target.value)} 
                className="cl-input"
              />
              <span className="cl-error">{errors.cuserid}</span>

              <input 
                type="password" 
                placeholder="Password" 
                value={upass} 
                onChange={(e) => setUPass(e.target.value)}
                className="cl-input"
              />
              <span className="cl-error">{errors.cuserpass}</span>

              {authError && <p className="cl-error">{authError}</p>}

              <div className="cl-remember">
                <input type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
                <span>Remember Me</span>
              </div>

              <button className="cl-btn" onClick={handleLogin}>Login</button>

              <p className="cl-forgot" onClick={() => setShowForgot(true)}>Forgot Password?</p>
            </>
           ) : (
            <>
              <h4 className="cl-header">Forgot Password</h4>
              {forgotStep === 1 ? (
                <>
                  <input 
                    type="text" 
                    placeholder="Enter Customer ID" 
                    value={forgotEmail} 
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="cl-input"
                  />
                  <button className="cl-btn" onClick={handleSendOtp}>Send OTP</button>
                </>
              ) : (
                <>
                  <input 
                    type="text" 
                    placeholder="Enter OTP" 
                    value={otp} 
                    onChange={(e) => setOtp(e.target.value)}
                    className="cl-input"
                  />
                  <input 
                    type="password" 
                    placeholder="Enter New Password" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="cl-input"
                  />
                  <button className="cl-btn" onClick={handleResetPassword}>Reset Password</button>
                </>
              )}

              {forgotMessage && <p className="cl-message">{forgotMessage}</p>}
              <p className="cl-back" onClick={() => {
                  setShowForgot(false);
                  setForgotStep(1);
                  setForgotMessage("");
                  setOtp('');
                  setNewPassword('');
              }}>Back To Login</p>
            </>
           )}
        </div>
      </center>
  </div>
);
}
  export default CustomerLogin;

