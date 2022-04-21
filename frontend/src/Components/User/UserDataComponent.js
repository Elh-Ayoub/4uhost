import React, { useState } from "react";
import { infoTab, passwordTab, walletTab, purchasesTab } from "../../functions/profileTabs.js";
import Purchases from "./PurchasesComponent.js";
import UpdateInfo from "./UpdateInfoComponent.js";
import UpdatePassword from "./UpdatePasswordComponent.js";
import Wallet from "./WalletComponent.js";

function UserDataComponent(props){
    

    return (
        <div className="col-sm-7 mx-1">
            <div className="card">
                <div className="card-header p-2">
                    <ul className="nav nav-pills">
                        <li className="nav-item" style={{cursor: "pointer"}}><a id="infoTab" className="nav-link active" onClick={infoTab} data-toggle="tab">Info</a></li>
                        <li className="nav-item" style={{cursor: "pointer"}}><a id="passwordTab" className="nav-link" onClick={passwordTab} data-toggle="tab">password</a></li>            
                        <li className="nav-item" style={{cursor: "pointer"}}><a id="walletTab" className="nav-link" onClick={walletTab} data-toggle="tab">Wallet</a></li>            
                        <li className="nav-item" style={{cursor: "pointer"}}><a id="purchasesTab" className="nav-link" onClick={purchasesTab} data-toggle="tab">Purchases</a></li>            
                    </ul>
                </div>
                <div className="card-body">
                    <div className="tab-content">
                        <div className="active tab-pane" id="settings">
                            <UpdateInfo user={props.user}/>
                        </div>
                        <div className="tab-pane" id="password">
                            <UpdatePassword user={props.user}/>
                        </div>
                        <div className="tab-pane" id="wallet">
                            <Wallet user={props.user} />
                        </div>
                        <div className="tab-pane" id="purchases">
                            <Purchases/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDataComponent