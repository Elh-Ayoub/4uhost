import React from "react";
import aboutImg from "../images/about.png"

function About(){
    return (
        <div className="slider_main" style={{background: "#2E428B"}}>
        <div className="about">
         <div className="container">
            <div className="row">
               <div className="col-md-12">
                  <div className="titlepage text_align_center">
                     <h2>About <span className="blue_light">Comapny</span></h2>
                  </div>
               </div>
               <div className="col-md-10 offset-md-1">
                  <div className="about_img text_align_center">
                     <figure><img src={aboutImg} alt="#"/></figure>
                     <p>
                        when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now 
                     </p>
                     <a className="read_more" href="#">Read More</a>
                  </div>
               </div>
            </div>
         </div>
        </div>
        </div>
    )
}

export default About