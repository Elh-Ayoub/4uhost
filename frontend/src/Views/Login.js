import React from "react"
import login_img from "../images/login.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons'
import "../Css/login.css"
import { Link } from "react-router-dom";

function Login(props){
    props.setLocation(false)
    document.title = "Login - 4uhost"
    return (
        <section className="vh-100">
        <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-md-9 col-lg-6 col-xl-5">
                    <img src={login_img} className="img-fluid" alt="Sample image"/>
                </div>
                <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                    <form action="#" method="post">
                        <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                            <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                            <button type="button" className="btn btn-primary btn-floating mx-1">
                                <FontAwesomeIcon icon={faFacebook} />
                            </button>
                            <button type="button" className="btn btn-primary btn-floating mx-1">
                                <FontAwesomeIcon icon={faTwitter} />
                            </button>
                            <button type="button" className="btn btn-primary btn-floating mx-1">
                                <FontAwesomeIcon icon={faLinkedinIn} />
                            </button>
                        </div>

                        <div className="divider d-flex align-items-center my-4">
                            <p className="text-center fw-bold mx-3 mb-0">Or</p>
                        </div>
                        <span>{/*<?=$u_err;?>*/}</span>

                        {/* <!-- Email input --> */}
                        <div className="form-outline mb-4">
                            <input type="text" id="form3Example3" className="form-control form-control-lg"
                            placeholder="Enter username or email" name="user"/>
                            <label className="form-label" htmlFor="form3Example3">Email address</label>
                        </div>
                        <span>{/*<?=$u_err;?>*/}</span> 

                        {/* <!-- Password input --> */}
                        <div className="form-outline mb-3">
                            <input type="password" id="form3Example4" className="form-control form-control-lg"
                            placeholder="Enter password" name="pass"/>
                            <label className="form-label" htmlFor="form3Example4">Password</label>
                        </div>
                        <span> {/*<?=$p_err;?> */}</span>

                        <div className="d-flex justify-content-between align-items-center">
                            {/* <!-- Checkbox --> */}
                            <div className="form-check mb-0">
                            <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                            <label className="form-check-label" htmlFor="form2Example3">
                                Remember me
                            </label>
                            
                            </div>
                            
                        </div>

                        <div className="text-center text-lg-start mt-4 pt-2">
                            <input type="submit" className="btn btn-primary btn-lg"
                            style={{paddingLeft: "2.5rem", paddingRight: "2.5rem"}} name="login"/>
                            <br/>
                            <br/>
                            <a href="#!" className="small fw-bold mt-2 pt-1 mb-0" style={{color: "black"}}>Forgot password?</a>
                            <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? 
                                <Link to="/auth/register" className="link-danger">Register</Link>
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

export default Login