
   import React,{useEffect, useState} from "react";
   import axios from "axios";
   import "./Product.css";


    function Product({data})
    {
        const venderid = data;

        const [pid,setPId]=useState("");
        const [pname,setPName]=useState("");
        const [pprice,setPPrice]=useState("");
        const [oprice,setOPrice]=useState("");
        const [ppicname,setPPicName]=useState("");
        const [pcatgid,setPCatgId]=useState("");
        const [image,setImage]=useState({preview: " ",data:""});
        const [plist,setPList]=useState([]);
        const [pcatglist,setPCatgList]=useState([]);
        const [isEditing,setIsEditing]=useState(false);
  


       // FETCH CATEGORIES & NEXT PRODUCT ID

       useEffect(()=>{
         getNewPid();
         axios.get("http://localhost:9876/productcatg/showproductcatg")
         .then(res => setPCatgList(res.data)).catch(err => alert(err));
       },[]);

       // FETCH VENDER PRODUCTS

       const fetchProducts  = () =>{
        if(venderid)
        {
        axios.get(`http://localhost:9876/product/showproductbyvender/${venderid}`)
        .then(res => setPList(res.data))
        .catch(err => alert(err));    
        }
       };

       useEffect(() =>{
          fetchProducts();
       },[venderid]);

         // GET NEW PRODUCT ID

         const getNewPid = () =>{
            axios.get("http://localhost:9876/product/getmaxpid")
            .then(res => setPId(res.data.length + 1))
            .catch(err => alert(err));
         };

           
         //  IMAGE SELECTION

         const handleFileChange = (e) => {
            const file = e.target.files[0];

            if(file)
            {
                setImage({preview : URL.createObjectURL(file), data:file});
                setPPicName(file.name);
            };
         };

          // UPLOAD IMAGE

          const handleUpload = async(e) =>{
            e.preventDefault();
            if(! image.data) { alert("SELECT A FILE FIRST"); return}

            const formData =new FormData();
            formData.append("file",image.data);

            try{
                const response = await fetch("http://localhost:9876/product/saveproductimage", {
                    method:"POST" , body: formData
                });

                alert(response.ok ?  "FILE UPLOADED SUCCESFULLY " : "UPLOAD FAILED");
            } catch(err) {
                alert("ERROR:"+err.message);
            }
          };

             //  SAVE BUTTON
            const handleSaveButton = () =>{
    const obj = {pid,pname,pprice,oprice,ppicname,pcatgid,vid:venderid,status:"Inactive"};

    if(isEditing)
    {
        axios.put(`http://localhost:9876/product/updateproduct/${pid}`,obj)
        .then(() => {
            alert("PRODUCT UPDATED");
            fetchProducts();
            handleNewButton();
        })
        .catch(err => alert(err));
    }
    else
    {
        axios.post("http://localhost:9876/product/saveproduct/",obj)
        .then(() => {
            alert("PRODUCT SAVED");
            fetchProducts();
            handleNewButton();
            // Createinventory();
        })
        .catch(err => alert(err));
        }
     }

                   // CREATE INVENTORY FUNCTION

                  //  let Createinventory = () => {
                  //   let obj1 = {pid:pid,vid:venderid}
                  //   axios.post("http://localhost:9876/inventory/createinventory",obj1).then(res => {alert(res.message);
                  //     console.log("inventory API",res.message);
                  //   }).catch(err => console.log(err))
                  //  }

                    


          // RESET FORM

          const handleNewButton=()=>{
            getNewPid();
            setPName("");
            setPPrice("");
            setOPrice("");
            setPPicName("");
            setPCatgId("");
            setImage({preview:" ",data:" "});
            setIsEditing(false);
          };


          //  EDIT PRODUCTS

          const handleEdit = (item) =>{
            setPId(item.pid);
            setPName(item.pname);
            setPPrice(item.pprice);
            setOPrice(item.oprice);
            setPPicName(item.ppicname); 
            setPCatgId(item.pcatgid);
            setImage({preview: `http://localhost:9876/getimageproduct/${item.ppicname}`,data:""})
          setIsEditing(true);
          };

           //  SOFT DELETE PRODUCT

           const handleDelete=(pid)=>{
            if(!window.confirm("DELETE THIS PRODUCT?")) return;

            axios.put(`http://localhost:9876/product/updateproductstatus/${pid}/Inactive`)
            .then(() => { alert("PRODUCT DELETED"); fetchProducts(); })
            .catch(err => alert(err));
           };

           return (
  <div className="prod-container">
    <h2 className="prod-heading">MANAGE PRODUCTS</h2>

    {/* PRODUCT FORM */}
    <div className="prod-form">
      <h4 className="prod-subheading">{isEditing ? "Edit Product" : "Add New Product"}</h4>

      <div className="prod-form-fields">
        <label className="prod-label">Product ID: <span>{pid}</span></label>

        <input 
          type="text"
          placeholder="Product Name"
          value={pname}
          onChange={e => setPName(e.target.value)}
          className="prod-input"
        />

        <input 
          type="number"
          placeholder="Price"
          value={pprice}
          onChange={e => setPPrice(e.target.value)}
          className="prod-input"
        />

        <input 
          type="number"
          placeholder="Offer Price"
          value={oprice}
          onChange={e => setOPrice(e.target.value)}
          className="prod-input"
        />

        <select 
          value={pcatgid} 
          onChange={e => setPCatgId(e.target.value)}
          className="prod-select"
        >
          <option value="">--SELECT CATEGORY--</option>
          {pcatglist.map(cat => (
            <option key={cat.pcatgid} value={cat.pcatgid}>
              {cat.pcatgname}
            </option>
          ))}
        </select>

        <input type="file" onChange={handleFileChange} className="prod-file-input" />
        {image.preview && <img src={image.preview} className="prod-preview" alt="preview" />}

        <div className="prod-btn-group">
          <button onClick={handleNewButton} className="prod-btn prod-btn-new">NEW</button>
          <button onClick={handleSaveButton} className="prod-btn prod-btn-save">
            {isEditing ? "Update" : "Save"}
          </button>
          <button onClick={handleUpload} className="prod-btn prod-btn-upload">Upload Image</button>
        </div>
      </div>
    </div>

    {/* PRODUCT LIST */}
    <h3 className="prod-list-heading">Product List</h3>
    <div className="prod-list-table-wrapper">
      <table className="prod-table">
        <thead className="prod-thead">
          <tr>
            <th>SNO</th>
            <th>PID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Offer</th>
            <th>Category</th>
            <th>Photo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plist.map((item, index) => (
            <tr key={item.pid} className="prod-tr">
              <td>{index + 1}</td>
              <td>{item.pid}</td>
              <td>{item.pname}</td>
              <td>{item.pprice}</td>
              <td>{item.oprice}</td>
              <td>{pcatglist.find(c => c.pcatgid === item.pcatgid)?.pcatgname || "N/A"}</td>
              <td>
                <img 
                  src={`http://localhost:9876/product/getproductimage/${item.ppicname}`} 
                  alt={item.pname} 
                  className="prod-img" 
                />
              </td>
              <td className="prod-action-btns">
                <button onClick={() => handleEdit(item)} className="prod-btn prod-btn-edit">Edit</button>
                <button onClick={() => handleDelete(item.pid)} className="prod-btn prod-btn-delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
    }
    export default Product;


          //  return(
               
//              <div style={{padding: "20px"}}>
//                 <h2 style={{textAlign:"center"}}>MANAGE PRODUCTS</h2>
                      
//                       {/* PRODUCT FORM */}

//                   <div style={{maxWidth:"600px", margin:"auto",background:"#f9f9f9", padding:"15px", borderRadius:"8px", boxShadow:"0 2px 6px rgba(0,0,0,0)"}}>

//                     <h4>{isEditing ? "Edit Product" : "Add New Product"}</h4>
//                     <div style={{display: "flex", flexDirection:"column",gap:"10px"}}>
//                      <label>Product ID: <br/>{pid}</label>
//                      {/* <label>Product ID: <br>{pid}</br></label> */}

//                      <input placeholder="Product Name" value={pname} onChange={e => setPName(e.target.value)}></input>

//           <input type="number" placeholder=" Price" value={pprice} onChange={e => setPPrice(e.target.value)}></input>

//            <input type="number" placeholder="Offer Price" value={oprice} onChange={e => setOPrice(e.target.value)}></input>

//            <select value={pcatgid} onChange={e => setPCatgId (e.target.value)}>
//               <option value="">--SELECT CATEGORY--</option>
//               {pcatglist.map(cat => <option key={cat.pcatgid} value={cat.pcatgid}>
//                 {cat.pcatgname}   </option>)}
//            </select>

//               <input type="file" onChange={handleFileChange}></input>
//               {image.preview && <img src={image.preview} width="100" height="100" alt="preview"/>}

//               <button onClick={handleUpload}>Upload Image</button>

//               <div style={{display:"flex" , gap:"10px" }}>
//                 <button onClick={handleNewButton}>NEW</button>
//                  <button onClick={handleSaveButton}>{isEditing ? "Update" : "Save"}</button>
            
//                      </div>
//                     </div>
//                 </div>

//                       {/* PRODUCT LIST */}

//                       <h3 style={{marginTop: "30px"}}>product List</h3>
                     
//                      <div style={{overflow:"auto"}}>
                      
//          <table style={{width:"100" , borderCollapse:"collapse", minWidth:"700px"}}>
//              <thead style={{background: "#007bff", color:"white"}}>
//                 <tr>
//                     <th>SNO</th> <th>PID</th> <th>Name</th>  <th>Price</th> <th>Offer</th> <th>Category</th> <th>Photo</th> <th>Actions</th>  </tr>
            
//              </thead>

//              <tbody>
//                 {plist.map((item, index) => (
//                     <tr key={item.pid} style={{textAlign:"center"}}>
//                         <td>{index +1}</td>
//                         <td>{item.pid}</td>
//                         <td>{item.pname}</td>
//                         <td>{item.pprice}</td>
//                         <td>{item.oprice}</td>
//          <td>{pcatglist.find(c => c.pcatgid === item.pcatgid) ?. pcatgname || "N/A" }</td>
//           <td><img src={`http://localhost:9876/product/getproductimage/${item.ppicname}`} alt={item.pname} width="60" height="60" style={{borderRadius: "6px"}}></img></td>

//              <td>
//                 <button onClick={() => handleEdit(item)}>Edit</button>
//                 <button onClick={() => handleDelete(item.pid)} style={{background:"red", color:"white"}}>Delete</button>
//              </td>

//                     </tr>
//                   ))}
//                 </tbody>
//                </table>
//              </div>
//          </div>  
//      )

//    } 
   
//  export default Product;