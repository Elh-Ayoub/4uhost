import React, {useState} from "react"
import login_img from "../images/login.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons'
import "../Css/login.css"
import { Link } from "react-router-dom";
import AuthDataServices from "../services/Auth"
import Loader from "../Components/LoaderComponent"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login(props){
    props.setLocation(false)
    document.title = "Login - 4uhost"

    const [identifier, setIdentifier] = useState(null)
    const [password, setPassword] = useState(null)
    const [status, setStatus] = useState({loading: false, data: null, error: null})

    async function submitLogin(event){
        event.preventDefault();
        if(identifier && password){
            setStatus({loading: true, data: null})
            let data = {identifier: identifier, password: password}
            await AuthDataServices.login(data)
            .then(response => {
                setStatus({
                  loading: false,
                  data: response.data,
                  error: null
                })
            }).catch(error => {
                setStatus({
                  loading: false,
                  data: null,
                  error: error.response.data
                })                
            })

            if(status.data){
                if(status.data.status == "success"){
                    toast(status.data.message, {type: toast.TYPE.SUCCESS}) 
                }
            }
            if(status.error){
                if(status.error.status == "fail"){
                    toast(status.error.message, {type: toast.TYPE.ERROR})
                }else{
                    for (const [key, value] of Object.entries(status.error.message)) {
                        toast(value[0], {type: toast.TYPE.ERROR})
                    }
                }
            }
        }else{
            toast("All fields are required!", {type: toast.TYPE.ERROR})
        } 
    }
    
    let loader
    if(status.loading){
      loader = <div className='loader'><Loader/></div>
    }else{
      loader = null
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
                    <form method="post" onSubmit={e => submitLogin(e)}>
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
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="input-container mb-0">
                            <input type="text" id="input_identifier" placeholder="Email or username" className="form-control container__input" onChange={(e) => {setIdentifier(e.target.value)}}/>
                            <label className="form-label container__label" htmlFor="input_identifier">Email or username</label>
                          </div>
                        </div>

                        {/* <!-- Password input --> */}
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="input-container mb-0">
                            <input type="password" id="input_password_login" placeholder="Password" className="form-control container__input" onChange={(e) => {setPassword(e.target.value)}}/>
                            <label className="form-label container__label" htmlFor="input_password_login">Password</label>
                          </div>
                        </div>

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