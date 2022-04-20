import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "./LoaderComponent";
import Modal from 'react-bootstrap/Modal'
import PlanById from "./PlanComponent";
import PaymentDataService from "../services/Payment"
import AuthDataServices from "../services/Auth"

function Cart(props){
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("shoppingCart")));
    const [fullPrice, setFullPrice] = useState({loading: false, data: null, error: null})
    const [settings, setSettings] = useState({loading: false, data: null, error: null})
    const [user, setUser] = useState(null)
    const [referral, setReferral] = useState(null)
    const [purchase, setPurchase] = useState({loading: false, data: null, error: null})

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("shoppingCart")))
    }, [cart, props.cart])
    useEffect(() => {
        AuthDataServices.user()
        .then(response => {
           setUser(response.data)
        })
    }, [window.location.pathname])
    useEffect(() => {
        PaymentDataService.getSettings()
        .then(response => {
            setSettings({loading: false, data: response.data, error: null})
        })
        .catch(error => {
            setSettings({loading: false, data: null, error: error.response.data})
        })
    }, [])
    let tax
    let valueOfRefPoints
    let maxReferralBalance
    let referralBalance
    if(settings.data && user){
        var taxObject = settings.data.find(x => x.title == "percentage_tax_in_billing")
        tax = taxObject.value
        var vorpObject = settings.data.find(x => x.title == "value_of_referral_points")
        valueOfRefPoints = vorpObject.value
        var refBalObject = settings.data.find(x => x.title == "max_referral_balance_in_purchase")
        maxReferralBalance = refBalObject.value
        referralBalance = user.referral_points * valueOfRefPoints
    }
    useEffect(() => {
        if(cart.length > 0){
            setFullPrice({loading: true, data: null, error: null})
            PaymentDataService.getFullPrice({plans_ids: cart})
            .then(response => {
                setFullPrice({loading: false, data: response.data, error: null})
            })
            .catch(error => {
                setFullPrice({loading: false, data: null, error: error.response.data})
            }) 
        }
    }, [cart.length])
    let cartElements = <p>Empty..</p>
    if(cart.length > 0){
        cartElements = cart.map((id) =>
            <PlanById id={id} key={id} removeFromCard={props.removeFromCard}/>
        )
    }

    const makePurchase = async () => {
        setPurchase({loading: true, data: null, error: null})
        let data = {plans_ids: cart, referral_balance: referral}
        PaymentDataService.makePurchase(data)
        .then(response => {
            setPurchase({loading: false, data: response.data, error: null})
        })
        .catch(error => {
            setPurchase({loading: false, data: null, error: error.response.data})
        })
    }
    let loader
    if(purchase.loading){
        loader = <Loader/>
    }
    if(purchase.data){
        if(purchase.data.status === "success"){
            toast(purchase.data.message, toast.TYPE.SUCCESS)
        }
        localStorage.setItem("shoppingCart", JSON.stringify([]))
        setPurchase({loading: false, data: null, error: null})
        window.location.reload()
    }else if(purchase.error){
        if(purchase.error.status === "fail"){
            toast(purchase.error.message, toast.TYPE.ERROR)
        }else if(purchase.error.status === "fail-arr"){
            console.log(Object.entries(purchase.error.message));
            for (const [key, value] of Object.entries(purchase.error.message)) {
                toast(value[0], {type: toast.TYPE.ERROR})
            }
        }
        setPurchase({loading: false, data: null, error: null})
    }

    return (
        <Modal show={props.showCart} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title><FontAwesomeIcon icon={faShoppingCart}/> Cart</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loader}
                <table className="table">
                <thead>
                    <tr>
                        <th scope="col" className="border-0 bg-light">
                            <div className="p-2 px-3 text-uppercase">Plan</div>
                        </th>
                        <th scope="col" className="border-0 bg-light">
                            <div className="py-2 text-uppercase">Price</div>
                        </th>
                        <th scope="col" className="border-0 bg-light">
                            <div className="py-2 text-uppercase">Quantity</div>
                        </th>
                        <th scope="col" className="border-0 bg-light">
                            <div className="py-2 text-uppercase">Duration</div>
                        </th>
                        <th scope="col" className="border-0 bg-light">
                            <div className="py-2 text-uppercase">Remove</div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {cartElements}
                </tbody>
                </table>
                <div className="input-group">
                    <label className="col-md-5">Referral ballence ({(referralBalance !== null) ? (referralBalance + " rs") : ("...")})</label>
                    <input type="number" placeholder="Enter refferal balance to use" 
                    className="form-control col-md-5" max={referralBalance} onChange={(e) => {setReferral(e.target.value)}}/>
                </div>
                <p className="small">Max referral balance to use: <span>{(maxReferralBalance) ? (maxReferralBalance + " rs") : ("loading...")}</span></p>
                <p className="small">Value of tax in billing: <span>{(tax) ? (tax + " %") : (null)}</span></p>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-outline-secondary" onClick={props.handleClose}>
                    Close
                </button>
                <button className="btn btn-outline-primary" type="submit" onClick={makePurchase} disabled={purchase.loading}>
                    Pay {(fullPrice.data) ? (fullPrice.data.message + " rs") : (null)}
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default Cart