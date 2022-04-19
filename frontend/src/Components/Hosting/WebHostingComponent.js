import React, { useEffect, useState } from "react";
import PlansDataService from "../../services/Plans"
import Loader from "../LoaderComponent";

function WebHostingPlans(props){
    const [webHostingPlans, setWebHostingPlans] = useState({loading: false, data: null, error: null})

    useEffect(() => {
        setWebHostingPlans({loading: true, data: null, error: null})
        PlansDataService.webHostingPlans()
        .then(response => {
            setWebHostingPlans({loading: false, data: response.data, error: null})
        }).catch(error => {
            setWebHostingPlans({loading: false, data: null, error: error.response})
        })
    }, [])

    let content
    if(webHostingPlans.loading){
        content = <Loader/>
    }

    if(webHostingPlans.data){
        content = webHostingPlans.data.map((plan) => 
            <div className="col-md-4">
                <div id="ho_co" className="order-box_main">
                <div className="order-box text_align_center">
                    <h3>Web hosting plan</h3>
                    <p>STARTING  <span>{plan.price + " rs"}</span> Per {plan.duration}</p>
                    <a>Personal use</a>
                    <ul className="supp">
                        <li>{(plan.type === "limited") ? (plan.quantity + " website(s)") : ("Unimited websites")}</li>
                        <li>24/7 support</li>
                        <li>Personal use</li>
                    </ul>
                </div>
                <a className="read_more" onClick={() => { props.addToCard(plan.id) }}>Buy Now</a>
                </div>
            </div>
        )
    }

    return <div className="row">{content}</div>
}

export default WebHostingPlans