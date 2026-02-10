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
        axios.get("https://server-app-xite.onrender.com/productcatg/showproductcatg")
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

        axios.post(`https://server-app-xite.onrender.com/productcatg/addproductcatg/${pcatgid}/${pcatgname}`)
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
        axios.put(`https://server-app-xite.onrender.com/productcatg/updateproductcatg/${pcatgid}/${pcatgname}`)
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






