// src/adminviews/productcatgms.js to manage product category
import React ,{useEffect,useState} from "react";
import axios from "axios";
import "./ProductCatg.css";

function ProductCatMgt(){
    const[pcatgid,setPCatgId] = useState();
    const[pcatgname, setPCatgName]= useState("");
    const[pcatgList,setPCatgList] = useState([]);
    const[isEditMode,setIsEditMode]= useState(false);

    useEffect(() => {
        fetchCategoryList();
    }, []);

    const fetchCategoryList = () =>{
        axios.get("http://localhost:9876/productcatg/showproductcatg")
        .then((res) => {
            setPCatgList(res.data);
            if(!isEditMode){
                setPCatgId(res.data.length +1);
            }
        }).catch ((err) => alert (err));
    };
    const handleSaveButton = ()=>{
        if(!pcatgname.trim()) {
            alert("CATEGORY NAME CANNOT BE EMPTY.");
            return;
        }

        axios.post(`http://localhost:9876/productcatg/addproductcatg/${pcatgid}/${pcatgname}`)
        .then((res) => {
            alert(res.data);
            setPCatgName("");
            setIsEditMode(false);
            fetchCategoryList();
        })
        .catch((err) => alert(err));
       };

       const handleUpdateButton = () => {
        if(!pcatgname.trim()){
            alert("categort name cannot be empty.");
            return;
        }
        axios.put(`http://localhost:9876/productcatg/updateproductcatg/${pcatgid}/${pcatgname}`)
        .then((res) =>{
            alert(res.data);
            setPCatgName("");
            setIsEditMode(false);
            fetchCategoryList();
        })
        .catch((err) => alert(err));
       };

       const handleEdit=(item)=>
    {
        setPCatgId(item.pcatgid);
        setPCatgName(item.pcatgname);
        setIsEditMode(true);
    };

       return(
        <div className="productcatg-container">
            <h2 className="productcatg-title"> Product Category Form </h2>

            <table className="productcatg-table">
                <tbody>
                    <tr>
                        <td>Product Id: </td>
                        <td>{pcatgid}</td>
                    </tr>
                    <tr>
                        <td>category Name:</td>
                        <td>
                            <input 
                            type="text"
                            value={pcatgname}
                            className="form-control"
                            onChange={(e)=> setPCatgName(e.target.value)}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {
                                isEditMode?(
                                <button onClick={handleUpdateButton}>Update</button>
                                ):(
                                    <button onClick={handleSaveButton}>Save</button>
                                )
                            }
                        </td>
                        <td>
                         <button onClick={fetchCategoryList}>Show</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <h3  className="productcatg-list-title">
                PRODUCT CATEGORY LIST
            </h3>
            <table className="list-table">
                <thead>
                    <tr>
                        <th className="id">id</th>
                        <th className="name" style={{textAlign:"center"}}>Category name</th>
                        <th className="act" >Action</th>
                    </tr>
                </thead>
                <tbody>
                    {pcatgList.map((item) =>(
                        <tr key={item.pcatgid}>
                            <td className="id">{item.pcatgid}</td>
                            <td className="name">{item.pcatgname}</td>
                            <td>
                                <button onClick={() => handleEdit(item)} className="act" >Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
       );
}export default ProductCatMgt;







//     // SRC / ADMINVIEWS / PRODUCTCATMGT.JS TO MANAGE PRODUCT CATEGORY

//   import React,{useEffect,useState} from "react";
//   import axios from "axios";

//   function ProductCatgMgt()
//   {
//     const [pcatgid,setPCatgid]=useState(0);
//     const [pcatgname,setPCatgName]=useState("");
//     const [pcatgList,setPCatgList]=useState([]);
//     const [isEditMode,setIsEditMode]=useState(false);

//     useEffect(() =>{
//         fetchCategoryList();
//     },[]);
//     const fetchCategoryList=()=>{
//         axios.get("http://localhost:6789/productcatg/showproductcatg").then((res)=>{
//             setPCatgList(res.data);
//             if(!isEditMode)
//             {
//                 setPCatgList(res.data.length+1);
//             }
//         }).catch((err)=>{
//            alert(err);
//         })
//     }

//     const handleSaveButton=()=>{
//           if(!pcatgname.trim())
//           {
//             alert ("CATEGORY NAME CANNOT BE EMPTY");
//             return;
//           }
//           axios.post(`http://localhost:9876/productcatg/addproductcatg/${pcatgid}/${pcatgname}`).then((res)=> {
//             alert (res.data);
//             setPCatgName("");
//             setIsEditMode(false);
//             fetchCategoryList();
//           }).catch((err)=>
//             alert(err));
//     };

//         const handleUpdateButton=()=>{
//           if(!pcatgname.trim())
//           {
//             alert ("CATEGORY NAME CANNOT BE EMPTY.");
//             return;
//           }
//           axios.put(`http://localhost:9876/productcatg/updateproductcatg/${pcatgid}/${pcatgname}`).then((res)=> {
//             alert (res.data);
//             setPCatgName("");
//             setIsEditMode(false);
//             fetchCategoryList();
//           }).catch((err)=>
//             alert(err));
//     };

//          const handleEdit = (item) =>{
//             setPCatgid(item.pcatgid);
//             setPCatgName(item.setPCatgName);
//             setIsEditMode(true);
//          };



//          return(
//             <div style={{textAlign: "center",padding:"20px"}}>
//                 <h2 style={{color:"blue"}}>PRODUCT CATEGORY FORM</h2>

//                 <table style={{margin:'0 auto'}}>
//                     <tbody>
//                         <tr>
//                             <td>PRODUCT ID</td>
//                             <td>{pcatgid}</td>
//                         </tr>

//                         <tr>
//                             <td>CATEGORY NAME</td>
//                             <td>
//                                 <input type="text" value={pcatgname} className="form-control" onChange={(e) => setPCatgName(e.target.value)}>
//                                 </input>
//                             </td>
//                         </tr>

//                         <tr>
//                             <td>
//                                 {
//                                     isEditMode ? (
//                                         <button onClick={handleUpdateButton}>UPDATE</button>
//                                     ) : (
//                                         <button onClick={handleSaveButton}>SAVE</button>
//                                     )
//                                 }
//                             </td>

//                             <td>
//                                 <button onClick={fetchCategoryList}>SHOW</button>
//                             </td>
//                         </tr>
//                     </tbody>
//                        </table>

//                        <h3 style={{color:"blue",backgroundColor:"lightgray",marginTop:"30px"}}>PRODUCT CATEGORY LIST</h3>
              
//                       <table border="1" style={{margin:"0 auto",width:"70px",textAlign:"left"}}>

//                         <thead>
//                             <tr>
//                                 <th>ID</th>
//                                 <th>CATEGORY NAME</th>
//                                 <th>ACTION</th>
//                             </tr>
//                         </thead>

//                         <body>
//                             {pcatgList.map((item) =>{
//                                 <tr key={item.pcatgid}>
//                                     <td>{item.pcatgid}</td>
//                                     <td>{item.pcatgname}</td>

//                                         <td>
//                                         <button onClick={() => handleEdit(item)}>EDIT</button>
//                                         </td> 
//                                   </tr>
//                             })}
//                         </body>
//                       </table>
//                         </div>
//          );
//          }
//   export default ProductCatgMgt;