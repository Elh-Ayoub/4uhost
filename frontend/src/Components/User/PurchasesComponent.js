import React, { useEffect, useState } from "react";
import UserDataService from "../../services/User";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../LoaderComponent";

function Purchases(){
    const [purchases, setPurchases] = useState({loading: false, data:null, error: null})

    useEffect(() => {
        setPurchases({loading: true, data:null, error: null})
        UserDataService.getPurchases()
        .then(response => {
            setPurchases({loading: false, data: response.data, error: null})
        })
        .catch(error => {
            setPurchases({loading: false, data: null, error: error.response.data})
        })
    }, [])

    let content
    let rows
    if(purchases.loading){
        content = <Loader/>
    }
    const getName = (plan) => {
        if(plan.name =="Domains") {
            return plan.name + "(" + plan.domain_name + ")"
        }
        return plan.name
    }

    const getUnity = (plan) => {
        if(plan.name =="Storage plans") return " GB" 
        if(plan.name =="Web hosting plans") return " website(s)" 
        if(plan.name =="Email plans") return " email(s)"
        return "" 
    }
    if(purchases.data){
        
        
        rows = purchases.data.message.map((plan) =>
            <tr>
                <td>{getName(plan)}</td>
                <td>{plan.price + " rs"}</td>
                <td>{plan.quantity + getUnity(plan)}</td>
                <td>{"Per " + plan.duration}</td>
            </tr>
        )
        content = 
        <table className="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>Plan</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Duration</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    }

    return content
}

export default Purchases