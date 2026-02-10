 import axios from "axios";
import React,{useState,useEffect} from "react";
  
  import VenderForgetPassword from "./VenderForgetPassword";
import VenderHome from "./VenderHome";
import "./Venlogin.css";


  function VenderLogin()
  {
      const [vuid,setVuid]=useState("");
      const [vupass,setVupass]=useState("");
      const [rememberMe,setRememberMe]=useState(false);
      const [vender,setVender]=useState(null);
      const [showForget,setShowForget]=useState(false);


        // LOAD SESSION IF EXITS

        useEffect(()=>{
            const savedSession = localStorage.getItem("venderSession");
            if(savedSession)
            {
                setVender(JSON.parse(savedSession));
            }

            const savedUid = localStorage.getItem("venderUID");
            const savedPass = localStorage.getItem("venderUPass");  

            if(savedUid && savedPass)
            {
                setVuid(savedUid);
                setVupass(savedPass);
                setRememberMe(true);
            }
        },[]);

        const handleLogin = async()=>{
            try{
                console.log("vuid"+vuid);
                console.log("vupass"+vupass);
               const res= await axios.post('http://localhost:9876/vender/getone',{vuid,vupass});
            //    const res= await axios.post('http://localhost:9876/vender/getone',{vuid,vupass});
               console.log('response data '+res);
                alert(res.data.VUserId+" "+res.data.Status)

                if(res.data && res.data.VUserId)
                {
                    if(res.data.Status === "Inactive")
                    {
                        alert("USER NOT ACTIVE. PLEASE WAIT FOR ADMIN ACTICATION.");
                        return;
                    }

                    setVender(res.data);
                    localStorage.setItem("venderSession",JSON.stringify(res.data));

                    if(rememberMe)
                    {
                        localStorage.setItem("venderUID",vuid);
                        localStorage.setItem("venderUPass",vupass);
                    }
                    else
                    {
                        localStorage.removeItem("venderUID");
                        localStorage.removeItem("venderUPass");
                    }
                }

                else
                {
                    alert("INVALID LOGIN");
                }
            }catch(err)
            {
                        console.error(err);
                        alert("LOGIN FAILED");
            }
        };

        const handleLogout = () =>{
            setVender(null);
            localStorage.removeItem("venderSession");
        };

        if(showForget)
        {
            return <VenderForgetPassword onBack={() => setShowForget(false)}/>;
        }

        if(vender)
        {
            //  alert("WELCOME TO HOME")
              return <VenderHome vender={vender} onLogout={handleLogout}/>;
        }

        return (
    <div className="vlg-container">
       <div className="vlg-form">
             <h4 className="vlg-heading">VENDER LOGIN</h4>

             <input type="text" 
                    placeholder="Vender User ID" 
                    value={vuid} 
                    onChange={(e) => setVuid(e.target.value)}
                    className="vlg-input" />

             <input type="password" 
                    placeholder="Password" 
                    value={vupass} 
                    onChange={(e) => setVupass(e.target.value)}
                    className="vlg-input" />

            <div className="vlg-remember-me">
               <input type="checkbox"  
                      checked={rememberMe} 
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="vlg-checkbox" />
               <label className="vlg-label">REMEMBER ME</label>
            </div>

            <button className="vlg-btn vlg-btn-login" onClick={handleLogin}>LOGIN</button>

            <button className="vlg-btn vlg-btn-forget" 
                    onClick={() => setShowForget(true)}>
                Forget Password
            </button>
       </div>
    </div>
)
  }
  export default VenderLogin;


//         return(
//             <div className="venderlogin-container">
//                <div className="venderlogin-form">
//                      <h4>VENDER LOGIN</h4>

//                      <input type="text" placeholder="Vender User ID" value={vuid} onChange={(e) => setVuid(e.target.value)}></input>

//          <input type="password" placeholder="Password" value={vupass} onChange={(e) => setVupass(e.target.value)}></input>
 
//                 <div className="remember-me">
//            <input type="checkbox"  checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}></input>

//                      <label>REMEMBER ME</label>
//                     </div>

//                     <button className="venderlogin-button" onClick={handleLogin}>LOGIN</button>

//                     <button className="venderlogin-button" style={{backgroundColor:"#555",marginTop:"10px"}}
//                      onClick={()=>setShowForget(true)}>Forget Password</button>
//                </div>
//             </div>
//         )
//   } export default VenderLogin;














//   import axios from "axios";
// import React,{useState,useEffect} from "react";
  
// //   import VenderForgetPassword from "./VenderForgetPassword";
// import VenderHome from "./VenderHome";

//   function VenderLogin()
//   {
//       const [vuid,setVuid]=useState("");
//       const [vupass,setVupass]=useState("");
//       const [rememberMe,setRememberMe]=useState(false);
//       const [vender,setVender]=useState(null);
//       const [showForget,setShowForget]=useState(false);


//         // LOAD SESSION IF EXITS

//         useEffect(()=>{
//             const savedSession = localStorage.getItem("venderSession");
//             if(savedSession)
//             {
//                 setVender(JSON.parse(savedSession));
//             }

//             const savedUid = localStorage.getItem("venderUID");
//             const savedPass = localStorage.getItem("venderUPass");

//             if(savedUid && savedPass)
//             {
//                 setVuid(savedUid);
//                 setVupass(savedPass);
//                 setRememberMe(true);
//             }
//         },[]);

//         const handleLogin = async()=>{
//             try{
//                 console.log("vuid"+vuid);
//                 console.log("vupass"+vupass);
//                const res= await axios.post('http://localhost:9876/vender/getone',{vuid,vupass});
//                console.log('response data '+res);
//                 alert(res.data.VUserId+" "+res.data.Status)

//                 if(res.data && res.data.VUserId)
//                 {
//                     if(res.data.Status === "Inactive")
//                     {
//                         alert("USER NOT ACTIVE. PLEASE WAIT FOR ADMIN ACTICATION.");
//                         return;
//                     }

//                     setVender(res.data);
//                     localStorage.setItem("venderSession",JSON.stringify(res.data));

//                     if(rememberMe)
//                     {
//                         localStorage.setItem("venderUID",vuid);
//                         localStorage.setItem("venderUPass",vupass);
//                     }
//                     else
//                     {
//                         localStorage.removeItem("venderUID");
//                         localStorage.removeItem("venderUPass");
//                     }
//                 }

//                 else
//                 {
//                     alert("INVALID LOGIN");
//                 }
//             }catch(err)
//             {
//                         console.error(err);
//                         alert("LOGIN FAILED");
//             }
//         };

//         const handleLogout = () =>{
//             setVender(null);
//             localStorage.removeItem("venderSession");
//         };

//         if(showForget)
//         {
//             // return <VenderForgetPassword onBack={() => setShowForget(false)}/>;
//         }

//         if(vender)
//         {
//             //  alert("WELCOME TO HOME")
//               return <VenderHome vender={vender} onLogout={handleLogout}/>;
//         }

//         return(
//             <div className="venderlogin-container">
//                <div className="venderlogin-form">
//                      <h4>VENDER LOGIN</h4>

//                      <input type="text" placeholder="Vender User ID" value={vuid} onChange={(e) => setVuid(e.target.value)}></input>

//          <input type="password" placeholder="Password" value={vupass} onChange={(e) => setVupass(e.target.value)}></input>
 
//                 <div className="remember-me">
//            <input type="checkbox"  checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}></input>

//                      <label>REMEMBER ME</label>
//                     </div>

//                     <button className="venderlogin-button" onClick={handleLogin}>LOGIN</button>

//                     <button className="venderlogin-button" style={{backgroundColor:"#555",marginTop:"10px"}}
//                      onClick={()=>setShowForget(true)}>Forget Password</button>
//                </div>
//             </div>
//         )
//   } export default VenderLogin;

