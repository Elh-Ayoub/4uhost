import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarked, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
function Footer(){
    return(
        <footer>
         <div className="footer">
            <div className="container">
               <div className="row">
                  <div className="col-lg-3 col-md-6 col-sm-6">
                     <div className="infoma text_align_left">
                        <h3>Choose.</h3>
                        <ul className="commodo">
                           <li>Commodo</li>
                           <li>consequat. Duis a</li>
                           <li>ute irure dolor</li>
                           <li>in reprehenderit </li>
                           <li>in voluptate </li>
                        </ul>
                     </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6">
                     <div className="infoma">
                        <h3>Get Support.</h3>
                        <ul className="conta">
                           <li><FontAwesomeIcon icon={faMapMarked}/> Address : Loram Ipusm</li>
                           <li><FontAwesomeIcon icon={faPhone}/> Call : +01 1234567890</li>
                           <li><FontAwesomeIcon icon={faEnvelope}/><a href="Javascript:void(0)"> Email : demo@gmail.com</a></li>
                        </ul>
                     </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6">
                     <div className="infoma">
                        <h3>Company.</h3>
                        <ul className="menu_footer">
                           <li><a href="">Home</a></li>
                           <li><a href="">About </a></li>
                           <li><a href="">Domain</a></li>
                           <li><a href="">Hosting</a></li>
                           <li><a href="">Contact</a></li>
                        </ul>
                     </div>
                  </div>
                  <div className="col-lg-2 col-md-6 col-sm-6">
                     <div className="infoma text_align_left">
                        <h3>Services.</h3>
                        <ul className="commodo">
                           <li>Commodo</li>
                           <li>consequat. Duis a</li>
                           <li>ute irure dolor</li>
                           <li>in reprehenderit </li>
                           <li>in voluptate </li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
            <div className="copyright">
               <div className="container">
                  <div className="row">
                     <div className="col-md-12">
                        <p>© 2020 All Rights Reserved. <a href="https://html.design/"> Free html Templates</a></p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
        </footer>
    )
}

export default Footer