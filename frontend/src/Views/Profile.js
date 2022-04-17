import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthDataServices from "../services/Auth"
import Loader from "../Components/LoaderComponent"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AvatarCard from "../Components/User/AvatarComponent";
import UserDataComponent from "../Components/User/UserDataComponent";

function Profile(props){
    // props.setLayout(true)
    document.title = "Profile - 4uhost"
    const navigate = useNavigate()
    const [user, setUser] = useState({loading: false, user: null})
    const [username, setUsername] = useState(null)
    const [fullName, setFullName] = useState(null)

    useEffect(() => {
        setUser({loading: true, user: null})
        AuthDataServices.user()
        .then(response => {
            setUser({loading: false, user: response.data})
        })
        .catch(error => {
            navigate("/auth/login")
        })
    }, [])

    let content
    if(user.loading){
        content = <div className="loader_mid"><Loader/></div>
    }else if(user.user){
        
        content = 
        <div className="full_bg">
         <div className="slider_main">
            <div className="container">
               <div className="row">
                    <div className="col-12 d-flex justify-content-between">
                        <AvatarCard user={user.user}/>
                        <UserDataComponent user={user.user}/>
                    </div>
                </div>
            </div>
         </div>
        </div>
        
    }

    return <div>{content}</div>
}

export default Profile