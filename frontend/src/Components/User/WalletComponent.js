import React, { useState } from "react";
import UserDataService from "../../services/User";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loader from "../LoaderComponent"
import Modal from 'react-bootstrap/Modal'

function Wallet(props){
    const [paymentSettings, setPaymentSettings] = useState(null)
    const [status, setStatus] = useState({loading: false, data:null, error: null});
    const [show, setShow] = useState(false);
    const [amount, setAmount] = useState(100);
    const [cardNumber, setCardNumber] = useState(null);
    const [expMonth, setExpMonth] = useState(null);
    const [expYear, setExpYear] = useState(null);
    const [cvc, setCvc] = useState(null);
    const [disableBtn, setDisbleBtn] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const submitPayment = async () => {
        setStatus({loading: true, data:null, error: null})
        setDisbleBtn(true)
        let data = {amount: amount, card_number: cardNumber, exp_month: expMonth, exp_year: expYear, cvc: cvc}
        await UserDataService.fillWallet(props.user.id, data)
        .then(response => {
            setStatus({loading: false, data: response.data, error: null})
            setDisbleBtn(false)
        }).catch(error => {
            setStatus({loading: false, data: null, error: error.response.data})
            setDisbleBtn(false)
        })
        
    }

    if(status.data){
        if(status.data.status === "success"){
            toast(status.data.message, toast.TYPE.SUCCESS)
        }
        setStatus({loading: false, data: null, error: null})
        window.location.reload()
    }else if(status.error){
        if(status.error.status === "fail"){
            toast(status.error.message, toast.TYPE.ERROR)
        }else if(status.error.status === "fail-arr"){
            console.log(Object.entries(status.error.message));
            for (const [key, value] of Object.entries(status.error.message)) {
                toast(value[0], {type: toast.TYPE.ERROR})
            }
        }
        setStatus({loading: false, data: null, error: null})
    }

    let loader
    if(status.loading){
        loader = <div className="loader_mid"><Loader/></div>
    }

    return(
        <div>
            <ToastContainer/>
            <div className="form-group row mb-3">
                <label className="col-sm-4 col-form-label">Wallet balence</label>
                <div className="col-sm-8">
                    <p className="form-control">{props.user.wallet_balance}</p>
                </div>
            </div>
            <div className="form-group row mb-3">
                <label className="col-sm-4 col-form-label">Referral points</label>
                <div className="col-sm-8">
                    <p className="form-control">{props.user.referral_points}</p>
                </div>
            </div>
            <div className="form-group row mb-1">
                <label className="col-sm-4 col-form-label">Referral balence</label>
                <div className="col-sm-8">
                    <p className="form-control">...</p>
                </div>
            </div>
            <button className="btn btn-primary mt-2 float-end" onClick={handleShow}>Add wallet balance</button>
            <div>
            <Modal show={show} onHide={handleClose}>
                <form onSubmit={(e) => submitPayment(e.preventDefault())} className="modal-content require-validation" 
                data-cc-on-file="false" id="payment-form">
                <Modal.Header closeButton>
                    <Modal.Title>Add amount to wallet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loader}
                    <div className='form-row'>
                        <div className='col-sm-12 form-group required'>
                            <label htmlFor="amount" className="col-sm-3">Amount (INR)</label>
                            <input className='form-control col-sm-9' type='number' step="0.01" 
                            min="100" id="amount" value={amount} onChange={(e) => {setAmount(e.target.value)}}/>
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className='col-sm-12 form-group required'>
                            <label htmlFor="name_on_card" className="col-sm-3">Name on Card</label>
                            <input className='form-control col-sm-9' type='text' id="name_on_card"/>
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className='col-sm-12 form-group required'>
                            <label htmlFor="card-number" className="col-sm-3">Card Number</label> 
                            <input autoComplete='off' id="card-number" className='form-control col-sm-9' size='20' type='text' onChange={(e) => {setCardNumber(e.target.value)}}/>
                        </div>
                    </div>
                    <div className='form-row row'>
                        <div className='col-xs-12 col-md-4 form-group cvc required'>
                            <label className='control-label'>CVC</label> 
                            <input autoComplete='off' id="card-cvc" className='form-control' placeholder='ex. 311' 
                            size='4' type='text' onChange={(e) => {setCvc(e.target.value)}} required/>
                        </div>
                        <div className='col-xs-12 col-md-4 form-group expiration required'>
                            <label className='control-label'>Expiration Month</label> 
                            <input className='form-control' id="card-expiry-month" placeholder='MM'
                             size='2' type='text' onChange={(e) => {setExpMonth(e.target.value)}} required/>
                        </div>
                        <div className='col-xs-12 col-md-4 form-group expiration required'>
                            <label className='control-label'>Expiration Year</label> 
                            <input className='form-control' id="card-expiry-year" placeholder='YYYY'
                             size='4' type='text' onChange={(e) => {setExpYear(e.target.value)}} required/>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleClose}>
                        Close
                    </button>
                    <button className="btn btn-primary" type="submit" disabled={disableBtn}>Pay</button>
                </Modal.Footer>
                </form>
            </Modal>
            </div>
        </div>
    )
}

export default Wallet