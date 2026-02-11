import React,{useState} from "react";
import axios from "axios";
import "./State.css";



  function StateMgt()
  {
    const [stid,setStId]= useState();
    const [stname,setStName]= useState();
    const [status,setStatus]= useState();
    const [stlist,setSList]= useState([]);
    const [isupdatestname,setIsUpdateStName]= useState(false);
    const [isupdatestatus,setIsUpdateStatus]= useState(false);
    const url=process.env.REACT_APP_API_URL;



    const handleStIdText = (evt)=>{
         setStId(evt.target.value);
    }

     const handleStNameText = (evt)=>{
         setStName(evt.target.value);
    }

     const handleStatusText = (evt)=>{
         setStatus(evt.target.value);
    }
         
      const handleAddNewButton = ()=>{
        axios.get(`${url}/state/getall`).then((res)=>{
            setStId(res.data.length+1);
            setStatus(1);
             }).catch((err)=>{
                 alert(err);
             });
      }

      const handleSaveButton=()=>{
        if(stid==""||stid ==undefined||stname==""||stname==undefined||status==""||status==undefined)
        {
            alert("PLEASE FILL ALL FEILDS");
            return;
        }
        else
        {
            axios.get(`${url}/state/searchbyname`+stname).then((res)=>{
                if(res.data.stname!=undefined)
                {
                    alert("STATE NAME ALREADY EXITS");
                }
                else
                {
                    let obj={
                        stid:stid,
                        stname:stname,
                        status:status
                    }

                    axios.post(`${url}/state/save`,obj).then((res)=>{
                        alert(res.data);
                        setStId("");
                        setStName("");
                        setStatus("");
                    }).catch((err)=>{
                        alert(err);
                    });
                }
            }).catch((err)=>{
                alert(err);
            });
        }
      }

      const handleShowButton=()=>{
        axios.get(`${url}/state/getall`).then((res)=>{
            setSList(res.data);
        }).catch((err)=>{
            alert(err);
        });
      }

       const handleSearchButton=()=>{
          if(stid!=undefined && stid!="")
          {
            axios.get(`${url}/state/search`+stid).then((res)=>{
                if(res.data.stid!=undefined)
                {
                    setStId(res.data.stid);
                    setStName(res.data.stname);
                    setStatus(res.data.status);
                }
                else
                {
                    alert("DATA NOT FOUND");
                }
            }).catch((err)=>{
                alert(err);
            });
          }
       }

       const handleUpdateButton=()=>{
        if(stid==""||stid==undefined||stname==""||stname==undefined||status==""||status==undefined)
        {
            alert("PLEASE FILL ALL FILEDS");
            return;
        }
        else
        {
            let obj={
                stid:stid,
                stname:stname,
                status:status
            }
            axios.put(`${url}/state/update`,obj).then((res)=>{
                alert(res.data);
                setStId("");
                setStName("");
                setStatus("");
            }).catch((err)=>{
                alert(err);
            });
        }
       }

       const handleDeleteButton=()=>{
        if(stid!=undefined&&stid!="")
        {
            axios.delete(`${url}/state/delete`+stid).then((res)=>{
                alert(res.data);
            }).catch((err)=>{
                alert(err);
            });
        }
        else
        {
            alert("FILL STATE ID TO DELETE")
        }
       }

       return (
  <div>
    <center>
      <h6 style={{fontSize:"30px", color:"red", backgroundColor:"wheat"}}>STATE MANAGMENT</h6>

      <div className="stateBox_guru">
        <center>
          <table>
            <tr>
              <td className="stateLabel_id_guru">STATE ID</td>
              <td>
                <input
                  type="number"
                  onChange={handleStIdText}
                  className="form-control"
                  value={stid}
                />
              </td>
            </tr>

            <tr>
              <td className="stateLabel_name_guru">STATE NAME</td>
              <td>
                <input
                  type="text"
                  onChange={handleStNameText}
                  className="form-control"
                  value={stname}
                />
              </td>
            </tr>

            <tr>
              <td className="stateLabel_status_guru">STATUS</td>
              <td>
                <input
                  type="text"
                  onChange={handleStatusText}
                  className="form-control"
                  value={status}
                />
              </td>
            </tr>

            <tr></tr>
            <tr></tr>
          </table>

          <table>
            <tr>
   <td><button type="submit" onClick={handleAddNewButton} className="btn-new_guru">NEW</button></td>
<td><button type="submit" onClick={handleSaveButton} className="btn-save_guru">SAVE</button></td>
<td><button type="submit" onClick={handleShowButton} className="btn-show_guru">SHOW</button></td>
<td><button type="submit" onClick={handleUpdateButton} className="btn-update_guru">UPDATE</button></td>
<td><button type="submit" onClick={handleDeleteButton} className="btn-delete_guru">DELETE</button></td>

            </tr>
          </table>
        </center>
      </div>

      <div className="stateBox_table_guru">
        <center>
          <table>
            <tr>
              <th className="stateCol_id_guru">STATE ID</th>
              <th className="stateCol_name_guru">STATE NAME</th>
              <th className="stateCol_status_guru">STATUS</th>
            </tr>

            {
              stlist.map((item) => (
                <tr key={item.stid}>
                  <td className="stateCol_id_guru">{item.stid}</td>
                  <td className="stateCol_name_guru">{item.stname}</td>
                  <td className="stateCol_status_guru">
                    {item.status == 1 ? <h5>enable</h5> : <h5>disable</h5>}
                  </td>
                </tr>
              ))
            }
          </table>
        </center>
      </div>

    </center>
  </div>
);

}
export default StateMgt;

