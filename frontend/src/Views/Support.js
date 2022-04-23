import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Loader from "../Components/LoaderComponent"
import SubmitTicket from "../Components/SupportTicket/SubmitTicketComponent"
import SupportTicket from "../Components/SupportTicket/SupportTicketComponent"
import AuthDataServices from "../services/Auth"

function Support(){
    document.title = "Support - 4uhost"
    const [user, setUser] = useState({loading: false, user: null})
    const navigate = useNavigate()
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
        
        <div className="slider_main" style={{background: "#2E428B"}}>
            <div className="about">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3 tickets">
                            <SupportTicket user={user.user}/>
                        </div>
                        <div className="col-sm-9">
                            <SubmitTicket/>
                        </div>
                    </div>
                </div>
            </div>
       </div>
    }

    return content
}

export default Support