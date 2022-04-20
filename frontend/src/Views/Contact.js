import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../Components/LoaderComponent";
import UserDataService from "../services/User"

function Contact(){
    const [status, setStatus] = useState({loading: false, data: null, error: null})
    const [name, setName] = useState(null)
    const [phoneNumber, setPhoneNumber] = useState(null)
    const [email, setEmail] = useState(null)
    const [subject, setSubject] = useState(null)
    const [message, setMessage] = useState(null)
    const submitMessage = async () => {
        window.scrollTo(0, 0)
        if(name && phoneNumber && email && subject && message){
            setStatus({loading: true, data: null, error: null})
            let data ={name: name, phone_number: phoneNumber, 
                email: email, subject: subject, message: message}
            await UserDataService.contactUs(data)
            .then(response => {
                setStatus({loading: false, data: response.data, error: null})
                toast(response.data.message, toast.TYPE.SUCCESS)
                //reload
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
        document.getElementById("name").value = ""
        setName(null)
        document.getElementById("phone_number").value = ""
        setPhoneNumber(null)
        document.getElementById("subject").value = ""
        setSubject(null)
        document.getElementById("email").value = ""
        setEmail(null)
        document.getElementById("message").value = ""
        setMessage(null)
        setStatus({loading: false, data: null, error: null})
    }
    return (
        <div className="slider_main" style={{background: "#2E428B"}}>
            <ToastContainer/>
            <div className="contact">
                <div className="container">
                    <div className="row ">
                    <div className="col-md-12">
                        <div className="titlepage text_align_center">
                            <h2>Contact <span className="blue_light">Us</span></h2>
                        </div>
                    </div>
                    <div className="col-md-10 offset-md-1">
                        <div className="mx-auto">{loader}</div>
                        <form className="main_form" onSubmit={(e) => {submitMessage(e.preventDefault())}}>
                            <div className="row">
                                <div className="col-md-12 ">
                                    <input className="contactus" id="name" placeholder="Name" type="type" onChange={(e) => {setName(e.target.value)}} /> 
                                </div>
                                <div className="col-md-12">
                                    <input className="contactus" id="phone_number" placeholder="Phone number" type="type" onChange={(e) => {setPhoneNumber(e.target.value)}}/>                          
                                </div>
                                <div className="col-md-12">
                                    <input className="contactus" id="subject" placeholder="Subject" type="type" onChange={(e) => {setSubject(e.target.value)}}/>                          
                                </div>
                                <div className="col-md-12">
                                    <input className="contactus" id="email" placeholder="Your Email" type="type" onChange={(e) => {setEmail(e.target.value)}}/>                          
                                </div>
                                <div className="col-md-12">
                                    <textarea className="textarea" id="message" placeholder="Message" type="type" onChange={(e) => {setMessage(e.target.value)}}></textarea>
                                </div>
                                <div className="col-md-12">
                                    <button className="send_btn">Submit Now</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact