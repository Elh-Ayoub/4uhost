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
    let domainName
    if(plan.loading){
        content = <Loader/>
    }

    const removeCardItems = (id, removeDomainName) => {
        props.removeFromCard(id)
        if(removeDomainName){
            localStorage.removeItem("domainName")
        }
    }

    if(plan.data){
        if(plan.data.name =="Storage plans") unity = "GB" 
        if(plan.data.name =="Web hosting plans") unity = "website(s)" 
        if(plan.data.name =="Email plans") unity = "email(s)" 
        if(plan.data.name =="Domains") {
            unity = "domain" 
            domainName = localStorage.getItem("domainName")
        }

        content = 
        <tr>
            <td className="border-0 align-middle">
                <strong className="plan_price">{plan.data.name}<span className="small text-center mx-1">{(domainName) ? ("(" + domainName + ")") : (null)}</span></strong>
            </td>
            <td className="border-0 align-middle"><strong className="plan_price">{plan.data.price + " rs"}</strong></td>
            <td className="border-0 align-middle">
                <strong>
                    {(plan.data.type == "limited") ? ((plan.data.name != "Backup plans") ? (plan.data.quantity + " " + unity) : (plan.data.backup_rate)) : ("Unlimited")}
                </strong>
            </td>
            <td className="border-0 align-middle"><strong className="plan_price">{"Per " + plan.data.duration}</strong></td>
            <td className="border-0 align-middle"><button className="btn btn-outline-danger" onClick={() => {removeCardItems(plan.data.id, domainName)}}><i className="fa fa-trash"></i></button></td>
        </tr>
    }

    return content
}

export default PlanById