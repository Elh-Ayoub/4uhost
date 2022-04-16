import React, { useEffect, useState } from "react";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import "../Css/shoopingCart.css"
import AuthDataServices from "../services/Auth"

function Header(){

   const [user, setUser] = useState(null)
   useEffect(() => {
      AuthDataServices.user()
      .then(response => {
         setUser(response.data)
      })
   }, [])

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
               <div className="col-md-7 col-sm-12">
                  <nav className="navigation navbar navbar-expand-md navbar-dark" style={{boxShadow: "none"}}>
                     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
                     <span className="navbar-toggler-icon"></span>
                     </button>
                     <div className="collapse navbar-collapse" id="navbarsExample04">
                        <ul className="navbar-nav mr-auto">
                           <li className="nav-item active">
                              <a className="nav-link p-3" href="">Home</a>
                           </li>
                           <li className="nav-item">
                              <a className="nav-link p-3" href="">About</a>
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
               <div className="col-md-3 d_none">
                  <ul className="email d_flex align-items-center">
                     <li>
                        <a href="">
                            <FontAwesomeIcon icon={faShoppingCart}/>
                            <span className="badge badge-warning" id='lblCartCount'>0</span>
                        </a>
                     </li>
                     <li>
                        {(user) ? (
                           <Link to="/auth/login" className="d_flex align-items-center">
                              <img className="profile_picture" src={user.profile_picture}/>
                              <span className="username ml-2">{user.username}</span>
                           </Link>
                        ):(
                           <Link to="/auth/login">Sign In</Link>
                        )}
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
    )
}

export default Header