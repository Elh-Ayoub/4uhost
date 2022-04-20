import React, { useEffect, useState } from "react";
import PlansDataService from "../../services/Plans"
import Loader from "../LoaderComponent";

function EmailsPlans(props){
    const [emailsPlans, setEmailsPlans] = useState({loading: false, data: null, error: null})

    useEffect(() => {
        setEmailsPlans({loading: true, data: null, error: null})
        PlansDataService.emailsPlans()
        .then(response => {
            setEmailsPlans({loading: false, data: response.data, error: null})
        }).catch(error => {
            setEmailsPlans({loading: false, data: null, error: error.response})
        })
    }, [])

    let content
    if(emailsPlans.loading){
        content = <Loader/>
    }

    if(emailsPlans.data){
        content = emailsPlans.data.map((plan) => 
            <div key={plan.id} className="col-md-4">
                <div id="ho_co" className="order-box_main">
                <div className="order-box text_align_center">
                    <h3>Email plan</h3>
                    <p>STARTING  <span>{plan.price + " rs"}</span> Per {plan.duration}</p>
                    <a>Personal use</a>
                    <ul className="supp">
                        <li>{(plan.type === "limited") ? (plan.quantity + " email(s)") : ("Unimited emails")}</li>
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

export default EmailsPlans