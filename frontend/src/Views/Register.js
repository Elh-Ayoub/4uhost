import React, { useState } from "react"
import login_img from "../images/login.jpg"
import { Link } from "react-router-dom";
import AuthDataServices from "../services/Auth"
import Loader from "../Components/LoaderComponent"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register(props){
    props.setLayout(false)
    document.title = "Register - 4uhost"

    const [username, setUsername] = useState(null)
    const [fullName, setfullName] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [cPassword, setCpassword] = useState(null)
    const [referral, setReferral] = useState(null)
    const [status, setStatus] = useState({loading: false, data: null, error: null})

    function submitRegister(event){
      event.preventDefault();
      if(username && fullName && email && password && cPassword){
          if(document.getElementById('checkbox_agree_terms').checked){
              setStatus({loading: true, data: null})
              let data = {username: username, full_name: fullName, email: email, 
                  password: password, password_confirmation: cPassword, referral_code: referral}
              AuthDataServices.register(data)
              .then(response => {
                  setStatus({
                    loading: false,
                    data: response.data,
                    error: null
                  })
                  // console.log(response.data);
              }).catch(error => {
                  setStatus({
                    loading: false,
                    data: null,
                    error: error.response.data
                  })
                  console.log(error.response.data)
              })
          }else{
              alert("Please read and agreeon Terms of service")
          }
      }else{
          alert("All (*) fields required!")
      }
    }
    if(status.data){
      if(status.data.status == "success"){
        toast(status.data.message, {type: toast.TYPE.SUCCESS})
        document.getElementById("input_username").value = ""
        document.getElementById("input_fullname").value = ""
        document.getElementById("input_email").value = ""
        document.getElementById("input_password").value = ""
        document.getElementById("input_confirm_pass").value = ""
        document.getElementById("input_referral").value = ""
        setStatus({loading: false, data: null, error: null})
      }
    }else if(status.error){
      if(status.error.status == "fail"){
        toast(status.error.message)
      }else{
        console.log(Object.entries(status.error.message));
        for (const [key, value] of Object.entries(status.error.message)) {
          toast(value[0], {type: toast.TYPE.ERROR})
        }
      }
      setStatus({loading: false, data: null, error: null})
    }
    let loader
    if(status.loading){
      loader = <div className='loader'><Loader/></div>
    }else{
      loader = null
    }

    return(
        <section className="vh-100" style={{backgroundColor: "#eee"}}>
        <ToastContainer/>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{borderRadius: "25px"}}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-3 mx-1 mx-md-4 mt-4 d-flex align-items-center justify-content-center">
                        <div className="col-md-8">Sign up</div>{loader}
                      </p>
                      <form className="mx-1 mx-md-4" onSubmit={(e) => {submitRegister(e)}}>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <span className="text-xs text-danger">*</span>
                          <div className="input-container mb-0">
                            <input type="text" id="input_username" placeholder="Username" className="form-control container__input" onChange={(e) => {setUsername(e.target.value)}}/>
                            <label className="form-label container__label" htmlFor="input_username">Username</label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <span className="text-xs text-danger">*</span>
                          <div className="input-container  mb-0">
                            <input type="text" id="input_fullname" placeholder="Full name" className="form-control container__input" onChange={(e) => {setfullName(e.target.value)}}/>
                            <label className="form-label container__label" htmlFor="input_fullname">Full name</label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <span className="text-xs text-danger">*</span>
                          <div className="input-container mb-0">
                            <input type="email" id="input_email" placeholder="Your Email" className="form-control container__input" onChange={(e) => {setEmail(e.target.value)}}/>
                            <label className="form-label container__label" htmlFor="input_email">Your Email</label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <span className="text-xs text-danger">*</span>
                          <div className="input-container mb-0">
                            <input type="password" id="input_password" placeholder="Password" className="form-control container__input" onChange={(e) => {setPassword(e.target.value)}}/>
                            <label className="form-label container__label" htmlFor="input_password">Password</label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <span className="text-xs text-danger">*</span>
                          <div className="input-container mb-0">
                            <input type="password" id="input_confirm_pass" placeholder="Repeat your password" className="form-control container__input" onChange={(e) => {setCpassword(e.target.value)}}/>
                            <label className="form-label container__label" htmlFor="input_confirm_pass">Repeat your password</label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-book-reader fa-lg me-3 fa-fw"></i>
                          <div className="input-container mb-0">
                            <input type="text" id="input_referral" placeholder="Referral" className="form-control container__input" onChange={(e) => {setReferral(e.target.value)}}/>
                            <label className="form-label container__label" htmlFor="input_referral">Referral</label>
                          </div>
                        </div>
      
                        <div className="form-check d-flex justify-content-center mb-5">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            value=""
                            id="checkbox_agree_terms"
                          />
                          <label className="form-check-label" htmlFor="checkbox_agree_terms">
                            I agree all statements in <a href="#!">Terms of service</a>
                          </label>
                        </div>
                        <div className="d-flex justify-content-center mx-4 mb-1">
                          <button type="submit" className="btn btn-primary btn-lg" name="signUp">Register</button>
                        </div>
                        <p className="small fw-bold mt-2 pt-1 mb-0">Already have an account? 
                                <Link to="/auth/login" className="link-danger">Login</Link>
                        </p>
                      </form>
                    </div>
                    
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img src={login_img} className="img-fluid" alt="Sample image"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}

export default Register