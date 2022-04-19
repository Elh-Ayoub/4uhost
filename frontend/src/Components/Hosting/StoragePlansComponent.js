import React, { useEffect, useState } from "react";
import PlansDataService from "../../services/Plans"
import Loader from "../LoaderComponent";

function StoragePlans(props){
    const [storagePlans, setStoragePlans] = useState({loading: false, data: null, error: null})


    useEffect(() => {
        setStoragePlans({loading: true, data: null, error: null})
        PlansDataService.storagePlans()
        .then(response => {
            setStoragePlans({loading: false, data: response.data, error: null})
        }).catch(error => {
            setStoragePlans({loading: false, data: null, error: error.response})
        })
    }, [])

    let content
    if(storagePlans.loading){
        content = <Loader/>
    }

    if(storagePlans.data){
        content = storagePlans.data.map((plan) => 
            <div className="col-md-4">
                <div id="ho_co" className="order-box_main">
                <div className="order-box text_align_center">
                    <h3>Storage plan</h3>
                    <p>STARTING  <span>{plan.price + " rs"}</span> Per {plan.duration}</p>
                    <a>Personal use</a>
                    <ul className="supp">
                        <li>{(plan.type === "limited") ? (plan.quantity + " GB") : ("Unlimited storage")}</li>
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

export default StoragePlans