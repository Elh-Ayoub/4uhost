import React from "react";
import dream_img from "../images/dream_img.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
function Home(){
    document.title = "Home page"
    return (
        <div className="full_bg">
         <div className="slider_main">
            <div className="container">
               <div className="row">
                  <div className="col-md-12">
                     {/* <!-- carousel code --> */}
                     <div id="banner1" className="carousel slide">
                        <ol className="carousel-indicators">
                           <li data-target="#banner1" data-slide-to="0" className="active"></li>
                           <li data-target="#banner1" data-slide-to="1"></li>
                           <li data-target="#banner1" data-slide-to="2"></li>
                        </ol>
                        <div className="carousel-inner">
                           {/* <!-- first slide --> */}
                           <div className="carousel-item active">
                              <div className="carousel-caption relative">
                                 <div className="row">
                                    <div className="col-md-6">
                                       <div className="dream">
                                          <h1>
                                             PowerFul <br/>HOSTING <br/>Your dream <br/>website
                                          </h1>
                                          <a className="read_more" href="login.php">Get Started</a>    
                                          <a className="read_more" href="contact.html">Contact Us</a>
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="dream_img">
                                          <figure><img src={dream_img} alt="#"/></figure>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           {/* <!-- second slide --> */}
                           <div className="carousel-item">
                              <div className="carousel-caption relative">
                                 <div className="row">
                                    <div className="col-md-6">
                                        <div className="dream">
                                            <h1>
                                                Give <br/>A chance <br/>To your <br/>Idea
                                            </h1>
                                            <a className="read_more" href="">Get Started</a>    
                                            <a className="read_more" href="">Contact Us</a>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="dream_img">
                                          <figure><img src={dream_img} alt="#"/></figure>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           {/* <!-- third slide--> */}
                           <div className="carousel-item">
                              <div className="carousel-caption relative">
                                 <div className="row">
                                    <div className="col-md-6">
                                       <div className="dream">
                                          <h1>
                                             PowerFul <br/>HOSTING <br/>Your dream <br/>website
                                          </h1>
                                          <a className="read_more" href="">Get Started</a>    
                                          <a className="read_more" href="">Contact Us</a>
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="dream_img">
                                          <figure><img src={dream_img} alt="#"/></figure>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        {/* <!-- controls --> */}
                        <a className="carousel-control-prev" href="#banner1" role="button" data-slide="prev">
                            <FontAwesomeIcon icon={faArrowLeft}/>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#banner1" role="button" data-slide="next">
                            <FontAwesomeIcon icon={faArrowRight}/>
                            <span className="sr-only">Next</span>
                        </a>
                     </div>
                  </div>
               </div>
            </div>
         </div>
        </div>
    )
}

export default Home