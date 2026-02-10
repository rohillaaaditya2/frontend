import React,{useState, useEffect} from "react";
import axios from "axios";
import {FaEye,FaEyeSlash} from "react-icons/fa";
import "./VenderChangePass.css";

export default function Vender_Change_pass()
{
    const [VUserId,setVUserId] = useState("");
    const [oldPassword,setOldPassword] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [message,setMessage] = useState(null);
    const [error,setError]= useState(null);
    const [showPassword,setShowPassword] = useState({
        old: false,
        new: false,
        confirm: false
    });

    useEffect(()=>{
        if(message || error){
            const timer = setTimeout(()=>{
                setMessage(null);
                setError(null);
            },4000);
            return ()=> clearTimeout(timer);
        }
    },[message,error]);

    function passwordStrength(pw)
    {
        if(!pw) return{lable: "", score:0};

        let score =0;

        if(pw.length >=8) score++;
        if (/[A-Z]/.test(pw)) score++;
        if (/[0-9]/.test(pw)) score++;
        if(/[^A-Za-z0-9]/.test(pw)) score++;

        const lables =["Very Weak","Weak", "Good","Strong"];
        return{lable: lables[score -1] || "", score};
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);

        if(! VUserId || !oldPassword || !newPassword || !confirmPassword){
            setError("Please fill all fields.");
            return;
        }
        if(newPassword !== confirmPassword){
            setError("New password and confirm password do not match");
            return;
        }

        if(newPassword.length <6){
            setError("New password must be at least 6 chrecter long.");
            return;
        }
        setLoading(true);

        try{
            const res = await axios.post("http://localhost:9876/vender/changepassword", {
                VUserId,
                OldPassword:oldPassword,
                newPassword: newPassword,
            });

            setMessage(res.data?.message || "Password changed succesfully");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        }
        catch(err){
            const msg = err?.response?.data?.message || err.message || "failed to change password";
            setError(msg)
        }
        finally{
            setLoading(false);
        }
    };

    const strength = passwordStrength(newPassword);

    return (
  <div className="vcp-container">
    <div className="vcp-card">
      <h2 className="vcp-heading">CHANGE PASSWORD</h2>

      {message && <div className="vcp-alert vcp-success">{message}</div>}
      {error && <div className="vcp-alert vcp-error">{error}</div>}

      <form onSubmit={handleSubmit} className="vcp-form">

        <label className="vcp-label">User ID</label>
        <input 
          type="text" 
          value={VUserId} 
          onChange={(e) => setVUserId(e.target.value)} 
          placeholder="Enter your User ID"
          className="vcp-input"
        />

        <label className="vcp-label">OLD PASSWORD</label>
        <div className="vcp-pass-field">
          <input 
            type={showPassword.old ? "text" : "password"} 
            value={oldPassword} 
            onChange={(e) => setOldPassword(e.target.value)} 
            placeholder="Enter current password"
            className="vcp-input"
          />
          <span onClick={() => setShowPassword({...showPassword, old: !showPassword.old})} className="vcp-eye">
            {showPassword.old ? <FaEyeSlash /> : <FaEye/>}
          </span>
        </div>

        <label className="vcp-label">NEW PASSWORD</label>
        <div className="vcp-pass-field">
          <input 
            type={showPassword.new ? "text" : "password"} 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
            placeholder="Enter New Password"
            className="vcp-input"
          />
          <span onClick={() => setShowPassword({...showPassword, new: !showPassword.new})} className="vcp-eye">
            {showPassword.new ? <FaEyeSlash/> : <FaEye/>}
          </span>
        </div>

        {strength.lable && (
          <div className="vcp-strength">
            <div className={`vcp-bar vcp-level-${strength.score}`}></div>
            <span className="vcp-strength-label">{strength.lable}</span>
          </div>
        )}

        <label className="vcp-label">CONFIRM NEW PASSWORD</label>
        <div className="vcp-pass-field">
          <input 
            type={showPassword.confirm ? "text" : "password"} 
            value={confirmPassword}  
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="vcp-input"
          />
          <span onClick={() => setShowPassword({...showPassword,confirm : !showPassword.confirm})} className="vcp-eye">
            {showPassword.confirm ? <FaEyeSlash/> : <FaEye/>}
          </span>
        </div>

        <button type="submit" className="vcp-btn" disabled={loading}>
          {loading ? "Saving..."  : "Change Password"}
        </button>
      </form>

      <p className="vcp-hint">
        TIP: Use a strong password (8+ chars, uppercase, numbers, symbols)
      </p>
    </div>
  </div>
);
}

//     return(


//         <div className="changep-container">
//             <div className="changepass-cd">
//                 <h2>CHANGE PASSWORD</h2>

//                 {message && <div className="alert suess"> {message}</div>}
//                 {error && <div className="ale error">{error}</div>}

//                 <form onSubmit={handleSubmit}>

//                     <label>User ID</label>
//                     <input 
//                         type="text" 
//                         value={VUserId} 
//                         onChange={(e) => setVUserId(e.target.value)} 
//                         placeholder="Enter your User ID"
//                     />

//                     <label>OLD PASSWORD</label>
//                     <div className="passwd-filed">
//                         <input 
//                             type={showPassword.old ? "text" : "password"} 
//                             value={oldPassword} 
//                             onChange={(e) => setOldPassword(e.target.value)} 
//                             placeholder="Enter current passowrd"
//                         />
//                         <span onClick={() => setShowPassword({...showPassword, old: !showPassword.old})}>
//                             {showPassword.old ? <FaEyeSlash /> : <FaEye/>}
//                         </span>
//                     </div>

//                     <label>NEW PASSWORD</label>
//                     <div className="passwd-filed">
//                         <input 
//                             type={showPassword.new ? "text" : "password"} 
//                             value={newPassword} 
//                             onChange={(e) => setNewPassword(e.target.value)} 
//                             placeholder="Enter New Password"
//                         />

//                         <span onClick={() => setShowPassword({...showPassword, new: !showPassword.new})}>
//                             {showPassword.new ? <FaEyeSlash/> : <FaEye/>}
//                         </span>
//                     </div>

//                     {strength.lable && (
//                         <div className="strht-bar">
//                             <div className={`bar leel-${strength.score}`}></div>
//                             <span>{strength.lable}</span>
//                         </div>
//                     )}

//                     <label>Confrim New Password</label>
//                     <div className="ssword-filed">
//                         <input 
//                             type={showPassword.confirm ? "text" : "password"} 
//                             value={confirmPassword}  
//                             onChange={(e) => setConfirmPassword(e.target.value)}
//                         />
//                         <span onClick={() => setShowPassword({...showPassword,confirm : !showPassword.confirm})}>
//                             {showPassword.confirm ? <FaEyeSlash/> : <FaEye/>}
//                         </span>
//                     </div>

//                     <button type="submit" disabled={loading}>
//                         {loading ? "Saving..."  : "Change Password"}
//                     </button>

//                 </form>

//                 <p className="hint">
//                     TIP: Use a strong password (8+ chars,uppercase, numbers, symbols)
//                 </p>
//             </div>
//         </div>
//     );
// }

     
     
     
     
     
     
     
     
     
    //  import React,{useState, useEffect} from "react";
    //   import axios from "axios";

    //   import {FaEye,FaEyeSlash} from "react-icons/fa";
    //     //    import "./Vender_Change_Pass.css";

    //     export default function Vender_Change_pass()
    //     {
    //          const [VUserId,setVUserId] = useState("");
    //          const [oldPassword,setOldPassword] = useState("");
    //          const [newPassword,setNewPassword] = useState("");
    //          const [confirmPassword,setConfirmPassword] = useState("");

    //          const [loading, setLoading] = useState(false);
    //          const [message,setMessage] = useState(null);
    //          const [error,setError]= useState(null);
    //          const [showPassword,setShowPassword] = useState({
    //             old: false,
    //             new: false,
    //             confirm: false
    //          });

    //           // AUTO CLEAR MESSAGE AFTER 4s
    //           useEffect(()=>{
    //             if(message || error)
    //             {
    //                 const timer = setTimeout(() =>{

    //                      setMessage(null);
    //                      setError(null);
    //                 },4000);
    //                 return() => clearTimeout(timer);
    //             }
    //           },[message,error]);

    //           // PASSWORD STRENGHT EVALUATION

    //           function passwordStrength(pw)
    //           {
    //             if(!pw) return{lable: "", score:0};

    //             let score =0;

    //             if(pw.length >=8) score++;
    //             if (/[A-Z]/.test(pw)) score++;
    //             if (/[0-9]/.test(pw)) score++;
    //             if(/[^A-Za-z0-9]/.test(pw))  score++;

    //             const lables =["Very Weak","Weak", "Good","Strong"];
    //             return{lable: lables[score -1] || "", score};
    //           }

    //           const handleSubmit = async(e) => {
    //             e.preventDefault();
    //             setMessage(null);
    //             setError(null);

    //             if(! VUserId || !oldPassword || !newPassword || !confirmPassword)
    //             {
    //                 setError("Please fill all fields.");
    //                 return;
    //             }
    //             if(newPassword !== confirmPassword)
    //             {
    //                 setError("New password and confirm password do not match");
    //                 return;
    //             }

    //             if(newPassword.length <6)
    //             {
    //                 setError("New password must be at least 6 chrecter long.");
    //                 return;
    //             }
    //             setLoading(true);
    //             try
    //             {
    //                 const res = await axios.post("http://localhost:9876/vender/changepassword", {
    //                     VUserId,
    //                     oldPassword:oldPassword,
    //                     newPassword: newPassword,
    //                 });

    //                 setMessage(res.data?.message || "Password changed succesfully");
    //                 setOldPassword("");
    //                 setNewPassword("");
    //                 setConfirmPassword("");
    //             }
    //             catch(err)
    //             {
    //                 const msg = err?.response?.data?.message || err.message || "failed to change password";
    //                 setError(msg)
    //             } finally{
    //                 setLoading(false);
    //             }
    //           };

    //           const strength = passwordStrength(newPassword);

    //           return(
    //             <div className="changepass-container">
    //                 <div className="changepass-card">
    //                     <h2>CHANGE PASSWORD</h2>

    //                     {message && <div className="alert success"> {message}</div>}
    //                     {error && <div className="alert error">{error}</div>}

    //                     <form onSubmit={handleSubmit}>
    //                              {/* USER ID */}

    //                              <label>User ID</label>
    //                              <input type="text" value={VUserId} onChange={(e) => setVUserId(e.target.value)} placeholder="Enter your User ID">
    //                              </input>

    //                              {/* OLD PASSWORD */}

    //                              <label>OLD PASSWORD</label>
    //                              <div className="password-filed">
    //                                 <input type={showPassword.old ? "text" : "password"} value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder="Enter current passowrd"></input>

    //                            <span onClick={() => setShowPassword ({...showPassword, old : !showPassword.old})}>
    //                              {showPassword.old ? <FaEyeSlash /> : <FaEye/>}
    //                             </span>     

    //                              </div>


    //                              {/* NEW PASSWORD */}
    //                              <label>NEW PASSWORD</label>
    //                              <div className="password-filed">
    //                                 <input type={showPassword.now ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter New Password"></input>
                               
    //                            <span onClick={() => setShowPassword ({...showPassword, new: !showPassword.new})}>
    //                             {showPassword.new ? <FaEyeSlash/> : <FaEye/>}
    //                            </span>
    //                              </div>

    //                  {/* PASSWORD STRENGHT BAR */}

    //                  {strength.lable && (
    //                     <div className="strenght-bar">
    //                         <div className={`bar level-${strength.score}`}></div>
    //                         <span>{strength.lable}</span>
    //                     </div>
    //                  )}

    //                        {/* CONFRIM PASSWORD */}

    //                        <label>Confrim New Password</label>
    //                        <div className="password-filed">
    //                         <input type={showPassword.confirm ? "text" : "password"} value={confirmPassword}  onChange={(e) => setConfirmPassword(e.target.value)}></input>
    //                        <span onClick={() => setShowPassword({...showPassword,confirm : !showPassword.confirm})}>

    //                         {showPassword.confirm ? <FaEyeSlash/> : <FaEye/>}
    //                        </span>
    //                         </div>

    //             <button type="submit" disabled={loading}>
    //                 {loading ? "Saving..."  : "Change Password"}
    //             </button>

    //                     </form>

    //                     <p className="hint">
    //                         TIP: Use a strong password (8+ chars,uppercase, numbers, symbols)
    //                     </p>
    //                 </div>
    //             </div>
    //           );
    //     }