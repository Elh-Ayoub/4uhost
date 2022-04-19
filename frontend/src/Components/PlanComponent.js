import React, { useEffect, useState } from "react";
import PlansDataService from "../services/Plans"
import Loader from "./LoaderComponent";

function PlanById(props){
    const [plan, setPlan] = useState({loading: false, data: null, error: null})

    useEffect(() => {
        setPlan({loading: true, data: null, error: null})
        PlansDataService.getById(props.id)
        .then(response => {
            setPlan({loading: false, data: response.data, error: null})
        })
        .catch(error => {
            setPlan({loading: false, data: null, error: error.response.data})
        })
    }, [])

    let content = null
    let unity = ""
    if(plan.loading){
        content = <Loader/>
    }
    if(plan.data){
        if(plan.data.name =="Storage plans") unity = "GB" 
        if(plan.data.name =="Web hosting plans") unity = "website(s)" 
        if(plan.data.name =="Email plans") unity = "email(s)" 
        if(plan.data.name =="Domains") unity = "domain"

        content = 
        <tr>
            <th scope="row" class="border-0">
            <div class="p-2">
                <div class="ml-3 d-inline-block align-middle">
                <h5 class="mb-0"> <a href="#" class="text-dark d-inline-block align-middle">{plan.data.name}</a></h5>
                </div>
            </div>
            </th>
            <td class="border-0 align-middle"><strong className="plan_price">{plan.data.price + " rs"}</strong></td>
            <td class="border-0 align-middle">
                <strong>
                    {(plan.data.type == "limited") ? ((plan.data.name != "Backup plans") ? (plan.data.quantity + " " + unity) : (plan.data.backup_rate)) : ("Unlimited")}
                </strong>
            </td>
            <td class="border-0 align-middle"><button class="btn btn-outline-danger" onClick={() => {props.removeFromCard(plan.data.id)}}><i class="fa fa-trash"></i></button></td>
        </tr>
    }

    return content
}

export default PlanById