import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import TicketDataService from "../../services/Ticket";
import Loader from "../LoaderComponent";

function SubmitTicket(){
    const [subject, setSubject] = useState(null)
    const [message, setMessage] = useState(null)
    const [department, setDepartment] = useState(null)
    const [priority, setPriority] = useState(null)
    const [status, setStatus] = useState({loading: false, data: null, erro: null})

    const createTicket = () => {
        if(subject && message && department && priority){
            setStatus({loading: true, data: null, erro: null})
            let data = {subject: subject, message: message, department: department, priority: priority}
            TicketDataService.createTicket(data)
            .then(response => {
                setStatus({loading: false, data: response.data, error: null})
            })
            .catch(error => {
                setStatus({loading: false, data: null, error: error.response.data})
            })
        }else{
            toast("All fields are required!", toast.TYPE.ERROR)
        }
    }

    let loader
    if(status.loading){
        loader = <div classNameName="loader_mid"><Loader/></div>
    }
    if(status.data){
        toast(status.data.message, toast.TYPE.SUCCESS)
        setStatus({loading: false, data: null, error: null})
        window.location.reload()
    }

    return(
        <div className="offset-md-1">
            <ToastContainer/>
            <div className="mx-auto">{loader}</div>
            <form className="main_form" onSubmit={(e) => {createTicket(e.preventDefault())}}>
                <div className="row">
                    <div className="col-md-12">
                        <input className="contactus" id="subject" placeholder="Subject" type="type" onChange={(e) => {setSubject(e.target.value)}}/>                          
                    </div>
                    <div className="col-md-12">
                        <textarea className="textarea" id="message" placeholder="Message" type="type" onChange={(e) => {setMessage(e.target.value)}}></textarea>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="input-group mb-3 mx-1">
                            <select id="department" className="form-control custom-select contactus col-sm-5" onChange={(e) => {setDepartment(e.target.value)}}>
                                <option selected disabled>Select department</option>
                                <option value="Technical Support">Technical Support</option>
                                <option value="Sales support">Sales support</option>
                                <option value="reseller Hosting">reseller Hosting</option>
                                <option value="Licensing Departement">Licensing Departement</option>
                                <option value={"Compliances & Abuse Support"}>{"Compliances & Abuse Support"}</option>
                            </select>
                        </div>
                        <div className="input-group mb-3 mx-1">
                            <select id="priority" className="form-control custom-select contactus col-sm-5" onChange={(e) => {setPriority(e.target.value)}}>
                                <option selected disabled>Select priority</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <button className="send_btn">Submit Now</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SubmitTicket