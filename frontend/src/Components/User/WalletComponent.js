import React from "react";

function Wallet(props){
    return(
        <div>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">Wallet balence</label>
                <div class="col-sm-10">
                    <p class="form-control">{props.user.wallet_balance}</p>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">Referral points</label>
                <div class="col-sm-10">
                    <p class="form-control">{props.user.referral_points}</p>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">Referral balence</label>
                <div class="col-sm-10">
                    <p class="form-control">...</p>
                </div>
            </div>
            <button class="btn btn-primary mt-2 float-end">Add wallet balance</button>
        </div>
    )
}

export default Wallet