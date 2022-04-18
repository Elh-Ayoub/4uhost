import React, { useEffect, useState } from "react";
import logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import "../Css/shoopingCart.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "./LoaderComponent";
import AuthDataServices from "../services/Auth"

function Header(props){
   const [status, setStatus] = useState({loading: false, data: null, error: null})
   const navigate = useNavigate()

   async function logout(){
      setStatus({loading: true, data: null, error: null})
      await AuthDataServices.logout()
      .then(response => {
         setStatus({loading: false, data: response.data, error: null})
         props.setUser(null)
      }).catch(error => {
         setStatus({loading: false, data: null, error: error.response})
      })
      navigate("/auth/login")
   }

   if(status.data){
      if(status.data.status == "success"){
         toast("Logged out successfully!", {type: toast.TYPE.SUCCESS})
      }
   }else if(status.error){
      toast(status.error, {type: toast.TYPE.ERROR})
   }
   let loader
   if(status.loading){
      loader = <div className="position-absolute top-left"><Loader/></div>
   }

    return (
        <div className="header">
         <div className="container">
            <div className="row d_flex">
               <div className=" col-md-2 col-sm-3 col logo_section">
                  <div className="full">
                     <div className="center-desk">
                        <div className="logo">
                           <a href=""><img src={logo} alt="#" /></a>
                        </div>
                     </div>
                  </div>
               </div>
               {loader}
               <div className="col-md-6 col-sm-12">
                  <nav className="navigation navbar navbar-expand-md navbar-dark" style={{boxShadow: "none"}}>
                     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
                     <span className="navbar-toggler-icon"></span>
                     </button>
                     <div className="collapse navbar-collapse" id="navbarsExample04">
                        <ul className="navbar-nav mr-auto">
                           <li className="nav-item active">
                              <Link to="/" className="nav-link p-3">Home</Link>
                           </li>
                           <li className="nav-item">
                              <Link to="/about" className="nav-link p-3">About</Link>
                           </li>
                           <li className="nav-item">
                              <a className="nav-link p-3" href="">Hosting</a>
                           </li>
                           <li className="nav-item">
                              <a className="nav-link p-3" href="">Domain</a>
                           </li>
                           <li className="nav-item">
                              <a className="nav-link p-3" href="">Contact Us</a>
                           </li>
                        </ul>
                     </div>
                  </nav>
               </div>
               <div className="col-md-4 d_none">
                  <ul className="email d_flex align-items-center justify-content-end">
                     <li>
                        <a href="">
                            <FontAwesomeIcon icon={faShoppingCart}/>
                            <span className="badge badge-warning" id='lblCartCount'>0</span>
                        </a>
                     </li>
                     {(props.user) ? (
                        <li>
                           <Link to="/users/profile" className="d_flex align-items-center">
                              <img className="profile_picture" src={props.user.profile_picture}/>
                              <span className="username ml-2">{props.user.username}</span>
                           </Link>
                        </li>
                     ) : (null)}
                     {(props.user) ? (
                        <li>
                           <a className="btn btn-outline-info" onClick={logout}>Logout</a>
                        </li> 
                     ) : (null)}
                     {(!props.user) ? (   
                           <li>
                              <Link to="/auth/login" className="right">Sign In</Link>
                           </li>
                     ):(null)}
                     
                  </ul>
               </div>
            </div>
         </div>
         <ToastContainer/>
      </div>
    )
}

export default Header