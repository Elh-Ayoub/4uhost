import React, { useState } from "react";
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Purchases from "./PurchasesComponent.js";
import UpdateInfo from "./UpdateInfoComponent.js";
import UpdatePassword from "./UpdatePasswordComponent.js";
import Wallet from "./WalletComponent.js";

function UserDataComponent(props){
    

    return (
        <div className="col-sm-7 mx-1">
            <div className="card">
                <div className="card-body">
                    <Tabs defaultActiveKey="info" className="mb-3">
                        <Tab eventKey="info" title="Personal informations">
                            <UpdateInfo user={props.user}/>
                        </Tab>
                        <Tab eventKey="password" title="Password">
                            <UpdatePassword user={props.user}/>
                        </Tab>
                        <Tab eventKey="wallet" title="Wallet">
                            <Wallet user={props.user} />
                        </Tab>
                        <Tab eventKey="purchases" title="Purchases">
                            <Purchases/>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default UserDataComponent