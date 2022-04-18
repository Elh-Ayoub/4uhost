import React, { useEffect, useState } from "react";
import UserDataService from "../../services/User"
import Loader from "../LoaderComponent";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AvatarCard(props){
    const [selectedFile, setSelectedFile] = useState(null)
    const [status, setStatus] = useState({loading: false, data: null, error: null})
    const [role, setRole] = useState({loading: false, data: null, error: null})
    const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
        document.getElementById('profile-pic').src = URL.createObjectURL(event.target.files[0]);
	};

    useEffect(() => {
        setRole({loading: true, data: null, error: null})
        UserDataService.getRole(props.user.role_id)
        .then(response => {
            setRole({loading: false, data: response.data, error: null})
        })
        .catch(error => {
            setRole({loading: false, data: null, error: error.response.data})
        })
    }, [])

    const updateAvatar = async () => {
        if(!selectedFile){
            toast("Select file first!", toast.TYPE.INFO)
        }else{
            setStatus({loading: true, data: null, error: null})
            var form = new FormData();
            form.append("profile_picture", selectedFile)
            await UserDataService.setAvatar(props.user.id, form)
            .then(response => {
                setStatus({loading: false, data: response.data, error: null})
            }).catch(error => {
                setStatus({loading: false, data: null, error: error.response.data})
            })
        }
    }
    const deleteAvatar = async () => {
        setStatus({loading: true, data: null, error: null})
        await UserDataService.deleteAvatar(props.user.id)
        .then(response => {
            setStatus({loading: false, data: response.data, error: null})
        }).catch(error => {
            setStatus({loading: false, data: null, error: error.response})
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

    return (<div className="card card-primary card-outline col-sm-5">
                {loader}
                <ToastContainer/>
                <div className="card-body box-profile">
                    <div className="text-center">
                    <img id="profile-pic" style={{borderRadius: "50%", width: "90px", height: "90px"}}
                        src={props.user.profile_picture}
                        alt="User profile picture"/>
                    </div>
                    <h3 className="profile-username text-center">{props.user.username}</h3>
                    <p className="text-muted text-center">{props.user.full_name}</p>
                    <ul className="mb-3">
                        <hr/>
                        <li className="d-flex col-md-11 justify-content-between mx-auto">
                            <b>Role</b> <a>{(role.data) ? (role.data.title) : ((role.loading) ? ("loading...") : (null))}</a>
                        </li>
                        <hr/>
                        <li className="d-flex col-md-11 justify-content-between mx-auto">
                            <b>Balance</b> <a>{props.user.wallet_balance}</a>
                        </li>
                        <hr/>
                        <li className="d-flex col-md-11 justify-content-between mx-auto">
                            <b>Profile picture</b>
                            <div>
                                <label className="selectfile btn btn-outline-secondary mx-1" htmlFor="choosefile">Select picture</label>
                                <input id="choosefile" type="file" name="profile_picture" onChange={changeHandler} className="d-none"/>
                                <button className="btn btn-outline-warning" onClick={updateAvatar}>save</button>
                            </div>
                        </li>
                        <hr/>
                        <li className="d-flex col-md-11 justify-content-between mx-auto">
                            <b>Reset profile picture</b>
                            <div>
                                <button type="button" onClick={deleteAvatar} className="btn btn-outline-danger">Delete avatar</button>
                            </div>
                        </li>
                        <hr/>
                    </ul>
                </div>
            </div>
    )
}

export default AvatarCard