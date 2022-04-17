import React, { useState } from "react";
import { infoTab, passwordTab, walletTab } from "../../functions/profileTabs.js";
import UpdateInfo from "./UpdateInfoComponent.js";
import UpdatePassword from "./UpdatePasswordComponent.js";
import Wallet from "./WalletComponent.js";

function UserDataComponent(props){
    

    return (
        <div className="col-sm-7 mx-1">
            <div class="card">
                <div class="card-header p-2">
                    <ul class="nav nav-pills">
                        <li class="nav-item" style={{cursor: "pointer"}}><a id="infoTab" class="nav-link active" onClick={infoTab} data-toggle="tab">Info</a></li>
                        <li class="nav-item" style={{cursor: "pointer"}}><a id="passwordTab" class="nav-link" onClick={passwordTab} data-toggle="tab">password</a></li>            
                        <li class="nav-item" style={{cursor: "pointer"}}><a id="walletTab" class="nav-link" onClick={walletTab} data-toggle="tab">Wallet</a></li>            
                    </ul>
                </div>
                <div class="card-body">
                    <div class="tab-content">
                        <div class="active tab-pane" id="settings">
                            <UpdateInfo user={props.user}/>
                        </div>
                        <div class="tab-pane" id="password">
                            <UpdatePassword user={props.user}/>
                        </div>
                        <div class="tab-pane" id="wallet">
                            <Wallet user={props.user}/>
                        </div>
                    </div>
                </div>
            </div>   
        </div>
    )
}

export default UserDataComponent