import React from "react";
import aboutImg from "../images/about.png"

function About(){
    return (
        <div className="slider_main" style={{background: "#2E428B"}}>
        <div class="about">
         <div class="container">
            <div class="row">
               <div class="col-md-12">
                  <div class="titlepage text_align_center">
                     <h2>About <span class="blue_light">Comapny</span></h2>
                  </div>
               </div>
               <div class="col-md-10 offset-md-1">
                  <div class="about_img text_align_center">
                     <figure><img src={aboutImg} alt="#"/></figure>
                     <p>
                        when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now 
                     </p>
                     <a class="read_more" href="#">Read More</a>
                  </div>
               </div>
            </div>
         </div>
        </div>
        </div>
    )
}

export default About