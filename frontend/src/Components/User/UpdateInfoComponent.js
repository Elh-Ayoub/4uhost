import React, { useState } from "react";
import UserDataService from "../../services/User"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../LoaderComponent";

function UpdateInfo(props) {
    const [username, setUsername] = useState(props.user.username)
    const [fullName, setFullName] = useState(props.user.full_name)
    const [status, setStatus] = useState({loading: false, data: null, error: null})

    const submitUpdate  = async (e) => {
        e.preventDefault()
        setStatus({loading: true, data: null, error: null})
        var data = {username: username, full_name: fullName}
        await UserDataService.update(props.user.id, data)
        .then(response => {
            setStatus({loading: false, data: response.data, error: null})
        }).catch(error => {
            setStatus({loading: false, data: null, error: error.response.data})
        })
    }

    if(status.data){
        if(status.data.status === "success"){
            toast(status.data.message, toast.TYPE.SUCCESS)
        }
        setStatus({loading: false, data: null, error: null})
        window.location.reload()
    }else if(status.error){
        if(status.error.status === "fail"){
            toast(status.error.message, toast.TYPE.ERROR)
        }else if(status.error.status === "fail-arr"){
            console.log(Object.entries(status.error.message));
            for (const [key, value] of Object.entries(status.error.message)) {
                toast(value[0], {type: toast.TYPE.ERROR})
            }
        }
        setStatus({loading: false, data: null, error: null})
    }

    let loader
    if(status.loading){
        loader = <div className="loader_mid"><Loader/></div>
    }

    return(
        <form className="form-horizontal" onSubmit={(e) => {submitUpdate(e)}}>
            <ToastContainer/>
            {loader}
            <div className="form-group row mb-3">
                <label htmlFor="inputUsername" className="col-sm-2 col-form-label">Username</label>
                <div className="col-sm-10">
                <input type="text" className="form-control" id="inputUsername" value={username} onChange={(e) => { setUsername(e.target.value)}}/>
                </div>
            </div>
            <div className="form-group row mb-3">
                <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                <input type="email" className="form-control" id="inputEmail" value={props.user.email} readOnly/>
                </div>
            </div>
            <div className="form-group row mb-3">
                <label htmlFor="inputfull_name" className="col-sm-2 col-form-label">Full name</label>
                <div className="col-sm-10">
                <input type="text" className="form-control" id="inputfull_name"
                    placeholder="Full name" value={fullName} onChange={(e) => { setFullName(e.target.value)}}/>
                </div>
            </div>
            <button className="btn btn-warning mt-1 float-end">Save</button>
        </form>
    )
}

export default UpdateInfo