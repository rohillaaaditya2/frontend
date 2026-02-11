
   import React,{useEffect,useState} from "react";
   import axios from "axios";
   import "./City.css";


     function CityMgt()
     {
        const [ctid,setCtId]=useState();
        const [ctname,setCtName]=useState();
        const [stid,setStId]=useState();
        const [status,setStatus]=useState();
        const [ctlist,setCtList]=useState([]);
        const [stlist,setStList]=useState([]);
        let statename="";
        const url=process.env.REACT_APP_API_URL;

        const handleCtIdText=(evt)=>{
              setCtId(evt.target.value);
        }

        const handleCtNameText=(evt)=>{
              setCtName(evt.target.value);
        }

        const handleStIdSelect=(evt)=>{
               alert(evt.target.value);
              setStId(evt.target.value);
        }

        const handleStatusText=(evt)=>{
            setStatus(evt.target.value);
        }

        //  HANDLE PAGE LOAD EVENT OR THIS FUNCTION WILL EXECUTE AUTOMATICALLY AT THE LOADING TIME OF COMPONENTS

        useEffect(()=>{
              axios.get(`${url}/state/show`).then((res)=>{
                setStList(res.data);
              }).catch((err)=>{
                alert(err);
              });
        })
              const handleAddNewButton=()=>{
                axios.get(`${url}/city/getall`).then((res)=>{
                    setCtId(res.data.length+1);
                    setStatus(1);
                }).catch((err)=>{
                    alert(err);
                });
              }
            const handleSaveButton=()=>{
                if(ctid=="" || ctid==undefined || ctname=="" || ctname==undefined || stid=="" || stid==undefined || status=="" || status==undefined || stid=="0")
                {
                 alert("PLEASE FILL ALL FIELDS");
                 return;   
                }
                else{
                    axios.get(`${url}/city/searchbyname/`+ctname).then((res)=>{
                        if(res.data.ctname!=undefined)
                        {
                            alert("CITY NAME ALLREADY EXIST");
                        }
                        else
                        {
                            let obj = {
                                ctid:ctid,
                                ctname:ctname,
                                stid:stid,
                                status:status
                            }
                            axios.post(`${url}/city/save/`,obj).then((res)=>{
                                alert(res.data);
                                setCtId("");
                                setCtName("");
                                setStId("");
                                setStatus("");
                            }).catch((err)=>{
                                alert(err);
                            })
                        }
                    }).catch((err)=>{
                        alert(err);
                    })
                }
                }

                const handleShowButton=()=>{
                    axios.get(`${url}/city/getall/`).then((res)=>{
                        setCtList(res.data);
                    }).catch((err)=>{
                        alert(err);
                    });
                }

                const handleSearchButton=()=>{
                    if(ctid!=undefined&&ctid!="")
                    {
                        axios.get(`${url}/city/search/`+ctid).then((res)=>{
                            if(res.data.stid!=undefined)
                            {
                                setCtId(res.data.ctid);
                                setCtName(res.data.ctname);
                                setStId(res.data.stid);
                                setStatus(res.data.status);
                            }
                            else{
                                alert("DATA NOT FOUND");
                            }
                        }).catch((err)=>{
                            alert(err);
                        });
                    }
                    if(ctname!=undefined&&ctname!="")
                    {
                      axios.get(`${url}/city/searchbyname/`+ctname).then((res)=>{
                        if(res.data.stid!=undefined)
                        {
                            setCtId(res.data.ctid);
                            setCtName(res.data.ctname);
                            setStId(res.data.stid);
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
                    if(ctid=="" || ctid==undefined || ctname=="" || ctname==undefined || status=="" || status==undefined|| stid=="" || stid==undefined)
                    {
                        alert("PLEASE FILL ALL FILEDS");
                        return;
                    }

                    else
                    {
                        let obj={
                            ctid:ctid,
                            ctname:ctname,
                            stid:stid,
                            status:status
                        }
                        axios.put(`${url}/city/update`, {
                              ctid: ctid,
                              ctname: ctname,
                              stid: stid,
                              status: status
                            })
                            .then((res) => {
                              alert(res.data);
                            })
                            .catch((err) => {
                              alert(err);
                            });
                    }
                }

                      const handleDeleteButton=()=>{
                        if(ctid!=undefined && ctid!="")
                        {
                            axios.delete(`${url}/city/delete/`+ctid).then((res)=>{
                                alert(res.data);
                            }).catch((err)=>{
                                alert(err);
                            })
                        }
                        else
                        {
                            alert("FILL STATE ID TO DELETE");
                        }
                      }


                      return (
  <div>
    <center>
      <h6 className="cityTitle_guru">CITY MANAGEMENT</h6>
      <div className="cityContainer_guru">
        <center>
          <table className="cityFormTable_guru">
            <tr>
              <td className="cityLabel_guru">CITY ID</td>
              <td>
                <input type="number" onChange={handleCtIdText} value={ctid} className="cityInput_guru" />
              </td>
            </tr>

            <tr>
              <td className="cityLabel_guru">CITY NAME</td>
              <td>
                <input type="text" onChange={handleCtNameText} value={ctname} className="cityInput_guru" />
              </td>
            </tr>

            <tr>
              <td className="cityLabel_guru">STATE NAME</td>
              <td>
                <select onChange={handleStIdSelect} className="citySelect_guru">
                  <option value="0">SELECT STATE</option>
                  {stlist.map((item) => (
                    <option value={item.stid} key={item.stid}>{item.stname}</option>
                  ))}
                </select>
              </td>
            </tr>

            <tr>
              <td className="cityLabel_guru">STATUS</td>
              <td>
                <input type="text" onChange={handleStatusText} value={status} className="cityInput_guru" />
              </td>
            </tr>
          </table>

          <table className="cityBtnTable_guru">
            <tr>
              <td><button onClick={handleAddNewButton} className="cityBtnNew_guru">NEW</button></td>
              <td><button onClick={handleSaveButton} className="cityBtnSave_guru">SAVE</button></td>
              <td><button onClick={handleShowButton} className="cityBtnShow_guru">SHOW</button></td>
              <td><button onClick={handleSearchButton} className="cityBtnSearch_guru">SEARCH</button></td>
              <td><button onClick={handleUpdateButton} className="cityBtnUpdate_guru">UPDATE</button></td>
              <td><button onClick={handleDeleteButton} className="cityBtnDelete_guru">DELETE</button></td>
            </tr>
          </table>
        </center>
      </div>

      <div className="cityTableContainer_guru">
        <center>
          <table className="cityDataTable_guru">
            <tr>
              <th>CITY ID</th>
              <th>CITY NAME</th>
              <th>STATE NAME</th>
              <th>STATUS</th>
            </tr>

            {ctlist.map((item) => (
              <tr key={item.ctid}>
                <td>{item.ctid}</td>
                <td>{item.ctname}</td>
                <td>
                  {stlist.map((stitem) => {
                    if (item.stid === stitem.stid) statename = stitem.stname;
                  })}
                  {statename}
                </td>
                <td>{item.status === 1 ? <h5>enable</h5> : <h5>disable</h5>}</td>
              </tr>
            ))}
          </table>
        </center>
      </div>
    </center>
  </div>
);

     } export default CityMgt;

                    //   return(
        //                 <div>
        //                     <center>
        //                         <h6>CITY MANAGMENT</h6>
        //                         <div className="myDiv">
        //                       <center>
        //                         <table>
        //                             <tr>
        //                                 <td>CITY ID</td>
        //                                 <td>
        //     <input type="number" onChange={handleCtIdText} value={ctid} className="form-control"></input>
        //                                 </td>
        //                             </tr>

        //  <tr>
        //     <td>CITY NAME</td>
        //     <td>
        //         <input type="text" onChange={handleCtNameText} value={ctname} className="form-control">
        //            </input>
        //     </td>
        //     </tr>      

        //               <tr>
        //                 <td>STATE NAME</td>
        //                 <td>
        //          {/* <select onClick={handleStIdSelect} id="stdropdown" name="stateddl" className="form-control">
        //        <option value="0">SELECT STATE</option> */}

        //      <select onChange={handleStIdSelect} id="stdropdown" name="stateddl" className="form-control">
        //          <option value="0">SELECT STATE</option>
        //                         {
        //                             stlist.map((item)=>(
        //                                 <option value={item.stid} key={item.stid}>{item.stname}</option>
        //                             ))
        //                         }
        //                     </select>
        //                 </td>
        //               </tr>

        //                 <tr>
        //                     <td>STATUS</td>
        //                     <td>
        //                         <input type="text" onChange={handleStatusText} className="form-control" value={status}></input>
        //                     </td>
        //                 </tr>

        //                 <tr></tr>
        //                 <tr></tr>

        //              </table>

        //              <table>
        //                 <tr>
        //                     <td>
        //                         <button type="submit" onClick={handleAddNewButton} className="btn btn-primary">NEW</button>
        //                     </td>

        //                     <td>
        //              <button type="submit" onClick={handleSaveButton} className="btn btn-success">SAVE</button>
        //                     </td>

        //                     <td>
        //           <button type="submit" onClick={handleShowButton} className="btn btn-secondary">SHOW</button>
        //                     </td>
                           
        //                      <td>
        //           <button type="submit" onClick={handleSearchButton} className="btn btn-success">SEARCH</button>
        //                     </td>

        //                       <td>
        //           <button type="submit" onClick={handleUpdateButton} className="btn btn-primary">UPDATE</button>
        //                     </td>

        //                       <td>
        //           <button type="submit" onClick={handleDeleteButton} className="btn btn-danger">DELETE</button>
        //                     </td>

        //                 </tr>
        //              </table>
        //                       </center>
        //                         </div>

        //                         <div className="myDiv2">
        //                             <center>
        //                                 <table>
        //                                     <tr>
        //                                         <th>CITY ID</th>
        //                                         <th>CITY NAME</th>
        //                                         <th>STATE NAME</th>
        //                                         <th>STATUS</th>
        //                                     </tr>

        //                                     {
        //                                      ctlist.map((item)=>(
        //                                         <tr>
        //                                             <td>{item.ctid}</td>
        //                                             <td>{item.ctname}</td>

        //                                             <td>
        //                                                 {
        //                                                     stlist.map((stitem)=>{
        //                                                         if(item.stid==stitem.stid)
        //                                                         {
        //                                                             statename=stitem.stname;
        //                                                         }
        //                                                     })
        //                                                 }
        //                                                 {statename}
        //                                             </td>


        //                                             <td>
        //                        {item.status==1 ? <h5>enable</h5>:<h5>disable</h5>}
        //                                             </td>
        //                                         </tr>
        //                                      ))
        //                                     }
        //                                 </table>
        //                             </center>

        //                         </div>
        //                     </center>
        //                 </div>

        //     )
