import React, { useEffect, useState } from "react";
import Loader from "../Components/LoaderComponent";
import PlansDataService from "../services/Plans"

function Domain(props){
    const [domainPlan, setDomainPlan] = useState({loading: false, data: null, error: null})
    const [domainName, setDomainName] = useState(null)
    useEffect(() => {
        setDomainPlan({loading: true, data: null, error: null})
        PlansDataService.domain()
        .then(response => {
            setDomainPlan({loading: false, data: response.data, error: null})
        }).catch(error => {
            setDomainPlan({loading: false, data: null, error: error.response})
        })
    }, [])

    const addDomaintoCart = () => {
        props.addToCard(domainPlan.data[0].id)
        localStorage.setItem("domainName", domainName)
        setDomainName(null)
        document.getElementById("input_domain_name").value = ""
    }

    let content
    if(domainPlan.loading){
        content = <div className="loader_mid"><Loader/></div>
    }
    if(domainPlan.data){
        content = <div className="slider_main" style={{background: "#2E428B"}}>
            <div className="domain">
                <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="titlepage text_align_center">
                            <h2>all starts with  <span className="blue_light">a domain</span></h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-10 offset-md-1">
                        <div className="form">
                            <div className="searchbar">
                            <input className="search_input" id="input_domain_name" type="text" placeholder="Search Domain" onChange={(e) => {setDomainName(e.target.value)}}/>
                            <a href="#" className="search_icon"><i className="fa fa-search" aria-hidden="true"></i>
                            </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-10 offset-md-1">
                        <div className="domain_bg">
                            <div className="row">
                            <div className="col-sm-2">
                                <div className="domain-price">
                                    <strong>{(domainName) ? (domainName) : ("Domain")} <br/> Per Year</strong>
                                </div>
                            </div>
                            <div className="col-sm-10">
                                <div className="domain-price_main ">
                                    <div className="domain-price">
                                        <span>com.</span>
                                        <strong>{domainPlan.data[0].price + " rs"}</strong>
                                    </div>
                                    <div className="domain-price">
                                        <span>org.</span>
                                        <strong>{domainPlan.data[0].price + " rs"}</strong>
                                    </div>
                                    <div className="domain-price">
                                        <span>net.</span>
                                        <strong>{domainPlan.data[0].price + " rs"}</strong>
                                    </div>
                                    <div className="domain-price">
                                        <span>io.</span>
                                        <strong>{domainPlan.data[0].price + " rs"}</strong>
                                    </div>
                                    <div className="domain-price">
                                        <span>tech.</span>
                                        <strong>{domainPlan.data[0].price + " rs"}</strong>
                                    </div>
                                    <div className="domain-price">
                                        <span>me.</span>
                                        <strong>{domainPlan.data[0].price + " rs"}</strong>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <button className="read_more" id="add_to_cart" href="domain.html" onClick={addDomaintoCart} disabled={(domainName) ? (false) : (true)}>Add to cart</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    }

    return <div>{content}</div>
}

export default Domain