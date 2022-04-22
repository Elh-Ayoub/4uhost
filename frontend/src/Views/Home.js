import React, { useState } from "react";
import dream_img from "../images/dream_img.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel'

function Home(){
   document.title = "Home page"
   const [index, setIndex] = useState(0);

   const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
   };
   const nexSlide = () => {
      if(index == 2){
         handleSelect(0)
      }else{
         handleSelect(index+1)
      }
   }
   const previousSlide = () => {
      if(index == 0){
         handleSelect(2)
      }else{
         handleSelect(index-1)
      }
   }
    return (
        <div className="full_bg">
         <div className="slider_main">
            <div className="container">
               <div className="row">
                  <div className="col-md-12">
                     {/* <!-- carousel code --> */}
                     <div id="banner1" className="carousel slide">
                        <Carousel  activeIndex={index} onSelect={handleSelect} fade>
                           <Carousel.Item>
                                    <div className="row">
                                       <div className="col-md-6">
                                          <div className="dream">
                                             <h1>
                                                PowerFul <br/>HOSTING <br/>Your dream <br/>website
                                             </h1>
                                             <Link to="/auth/login" className="read_more">Get Started</Link> 
                                             <Link to="/contact-us" className="read_more">Contact Us</Link>
                                          </div>
                                       </div>
                                       <div className="col-md-6">
                                          <div className="dream_img">
                                             <figure><img src={dream_img} alt="#"/></figure>
                                          </div>
                                       </div>
                                    </div>
                           </Carousel.Item>
                           <Carousel.Item>
                                    <div className="row">
                                       <div className="col-md-6">
                                          <div className="dream">
                                             <h1>
                                                Keep your<br/>website <br/>running smoothly<br/>with us
                                             </h1>
                                             <Link to="/auth/login" className="read_more">Get Started</Link> 
                                             <Link to="/contact-us" className="read_more">Contact Us</Link>
                                          </div>
                                       </div>
                                       <div className="col-md-6">
                                          <div className="dream_img">
                                             <figure><img src={dream_img} alt="#"/></figure>
                                          </div>
                                       </div>
                                    </div>
                           </Carousel.Item>
                           <Carousel.Item>
                              <div className="row">
                                 <div className="col-md-6">
                                    <div className="dream">
                                       <h1>
                                             Give <br/>Your ideas <br/>A chance <br/>to rise
                                       </h1>
                                       <Link to="/auth/login" className="read_more">Get Started</Link> 
                                       <Link to="/contact-us" className="read_more">Contact Us</Link>
                                    </div>
                                 </div>
                                 <div className="col-md-6">
                                    <div className="dream_img">
                                       <figure><img src={dream_img} alt="#"/></figure>
                                    </div>
                                 </div>
                              </div>
                           </Carousel.Item>
                        </Carousel>
                        {/* <!-- controls --> */}
                        <a className="carousel-control-prev" onClick={previousSlide} role="button" data-slide="prev">
                            <FontAwesomeIcon icon={faArrowLeft}/>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" onClick={nexSlide} role="button" data-slide="next">
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