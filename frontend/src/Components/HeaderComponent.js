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
import Modal from 'react-bootstrap/Modal'
import PlanById from "./PlanComponent";
import Cart from "./CartComponent";

function Header(props){
   const [status, setStatus] = useState({loading: false, data: null, error: null})
   const [showCart, setShowCart] = useState(false);
   const [shownav, setShownav] = useState(false);
   const navigate = useNavigate()
   const [cart, setCart] = useState(JSON.parse(localStorage.getItem("shoppingCart")));
   const handleClose = () => setShowCart(false);
   const handleShow = () => setShowCart(true);
   
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

   //Cart
   useEffect(() => {
      setCart(JSON.parse(localStorage.getItem("shoppingCart")))
   }, [cart, props.cart])

   let cartElement = <p>Empty..</p>
   if(cart.length > 0){
      cartElement = props.cart.map((id) =>
         <PlanById id={id} key={id} removeFromCard={props.removeFromCard}/>
      )
   }
   const showNavHandler = () => {
      setShownav(!shownav)
   }
   
    return (
        <div className="header">
         <div className="container">
            <div className="row d_flex">
               <div className=" col-md-1 col-sm-3 col logo_section">
                  <div className="full">
                     <div className="center-desk">
                        <div className="logo">
                           <a href=""><img src={logo} alt="#" /></a>
                        </div>
                     </div>
                  </div>
               </div>
               {loader}
               <div className="col-md-7 col-sm-12">
                  <nav className="navigation navbar navbar-expand-md navbar-dark" style={{boxShadow: "none"}}>
                     <button className="navbar-toggler" type="button" onClick={showNavHandler} data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
                     <span className="navbar-toggler-icon"></span>
                     </button>
                     <div className={(shownav) ? ("collapse navbar-collapse show") : ("collapse navbar-collapse")} id="navbar_col" onClick={() => {setShownav(false)}}>
                        <ul className="navbar-nav mr-auto">
                           <li className="nav-item active">
                              <Link to="/" className="nav-link p-3">Home</Link>
                           </li>
                           <li className="nav-item">
                              <Link to="/about" className="nav-link p-3">About</Link>
                           </li>
                           <li className="nav-item">
                              <Link to="/hosting-plans" className="nav-link p-3">Hosting</Link>
                           </li>
                           <li className="nav-item">
                              <Link to="/domain" className="nav-link p-3">Domain</Link>
                           </li>
                           <li className="nav-item">
                              <Link to="/contact-us" className="nav-link p-3">Contact Us</Link>
                           </li>
                           {(props.user) ? (
                           <li className="nav-item">
                              <Link to="/support" className="nav-link p-3">Support</Link>
                           </li>
                           ):(null)}
                        </ul>
                     </div>
                  </nav>
               </div>
               <div className="col-md-4 d_none">
                  <ul className="email d_flex align-items-center justify-content-end">
                     <li>
                        <a onClick={handleShow} style={{color: "white", cursor: "pointer"}}>
                            <FontAwesomeIcon icon={faShoppingCart}/>
                            <span className="badge badge-warning" id='lblCartCount'>{cart.length}</span>
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
         <div>
            <Cart showCart={showCart} user={props.user} handleClose={handleClose} removeFromCard={props.removeFromCard}/>
         </div>
         <ToastContainer/>
      </div>
   )
}

export default Header