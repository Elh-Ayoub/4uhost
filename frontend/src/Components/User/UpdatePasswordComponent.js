import React, { useState } from "react";
import UserDataService from "../../services/User";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../LoaderComponent";

function UpdatePassword(props){
    const [currentPassword, setCurrentPassword] = useState(null)
    const [password, setPassword] = useState(null)
    const [passwordConfirm, setPasswordConfirm] = useState(null)
    const [status, setStatus] = useState({loading: false, data: null, error: null})

    const submitUpdatePaassword = async (e) => {
        e.preventDefault()
        let data = {current_password: currentPassword, password: password, password_confirmation: passwordConfirm}
        await UserDataService.updatePassword(props.user.id, data)
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

    return (
        <form onSubmit={(e) => submitUpdatePaassword(e)}>
            <ToastContainer/>
            {loader}
            <div className="form-group row mb-3">
                <label htmlFor="inputCurrPass" className="col-sm-4 col-form-label">Current password</label>
                <div className="col-sm-8">
                    <input type="password" className="form-control" id="inputCurrPass" onChange={(e) => {setCurrentPassword(e.target.value)}}/>
                </div>
            </div>
            <div className="form-group row mb-3">
                <label for="inputPass" className="col-sm-4 col-form-label">New password</label>
                <div className="col-sm-8">
                    <input type="password" className="form-control" id="inputPass" onChange={(e) => {setPassword(e.target.value)}}/>
                </div>
            </div>
            <div className="form-group row mb-2">
                <label htmlFor="inputConfirmPass" className="col-sm-4 col-form-label">Confirm new password</label>
                <div className="col-sm-8">
                    <input type="password" className="form-control" id="inputConfirmPass" onChange={(e) => {setPasswordConfirm(e.target.value)}}/>
                </div>
            </div>
            <div className="form-group d-flex justify-content-end">
                <button type="submit" className="btn btn-warning mt-3">Save</button>
            </div> 
        </form>
    )
}

export default UpdatePassword