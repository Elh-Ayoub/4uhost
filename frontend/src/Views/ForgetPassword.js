import React, { useState } from "react";
import login_img from "../images/login.jpg"
import "../Css/login.css"
import { Link, useNavigate } from "react-router-dom";
import AuthDataServices from "../services/Auth"
import Loader from "../Components/LoaderComponent"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgetPassword(props){
    props.setLayout(false)
    document.title = "Forgot password - 4uhost"

    const [email, setEmail] = useState(null)
    const [response, seResponse] = useState({loading: false, data: null, error: null})

    async function sendResetLink(e){
        seResponse({loading: true, data: null, error: null})
        e.preventDefault()
        var data = {email: email}
        await AuthDataServices.forgotPassword(data)
        .then(response => {
            toast(response.data.status, toast.TYPE.SUCCESS)
            seResponse({loading: false, data: response.data, error: null})
        }).catch(error => {
            toast(error.response.email, toast.TYPE.ERROR)
            seResponse({loading: false, data: null, error: error.response})
        })
    }
    let loader
    if(response.loading){
        loader = <Loader/>
    }
    return (
        <section className="vh-100">
        <ToastContainer/>
        <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-md-9 col-lg-6 col-xl-5">
                    <img src={login_img} className="img-fluid" alt="Sample image"/>
                </div>
                <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                    {loader}
                    <form method="post" onSubmit={e => sendResetLink(e)}>
                        <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                            <p className="fw-normal mb-0 me-3">Forgot password ? No problem we can email with a reset link.</p>
                        </div>
                        <div className="divider d-flex align-items-center my-4"></div>
                        {/* <!-- Email input --> */}
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="input-container mb-0">
                            <input type="email" id="input_identifier" placeholder="Email" className="form-control container__input" onChange={(e) => {setEmail(e.target.value)}}/>
                            <label className="form-label container__label" htmlFor="input_identifier">Email</label>
                          </div>
                        </div>
                        <div className="text-center text-lg-start mt-4 pt-2">
                            <button type="submit" className="btn btn-primary btn-lg"
                            style={{paddingLeft: "2.5rem", paddingRight: "2.5rem"}}>Send reset link</button>
                            <br/>
                            <br/>
                            <p className="small fw-bold mt-2 pt-1 mb-0"> 
                                <Link to="/auth/login" className="link-danger">Go back to login</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
            {/* <!-- Copyright --> */}
            <div className="text-white mb-3 mb-md-0">
            Copyright © 2020. All rights reserved.
            </div>
            {/* <!-- Copyright --> */}

            {/* <!-- Right --> */}
            <div>
            <a href="#!" className="text-white me-4">
                <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#!" className="text-white me-4">
                <i className="fab fa-twitter"></i>
            </a>
            <a href="#!" className="text-white me-4">
                <i className="fab fa-google"></i>
            </a>
            <a href="#!" className="text-white">
                <i className="fab fa-linkedin-in"></i>
            </a>
            </div>
            {/* <!-- Right --> */}
        </div>
        </section>
    )
}

export default ForgetPassword