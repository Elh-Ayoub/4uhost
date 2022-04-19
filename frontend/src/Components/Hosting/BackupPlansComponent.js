import React, { useEffect, useState } from "react";
import PlansDataService from "../../services/Plans"
import Loader from "../LoaderComponent";

function BackupPlans(){
    const [backupPlans, setBackupPlans] = useState({loading: false, data: null, error: null})

    useEffect(() => {
        setBackupPlans({loading: true, data: null, error: null})
        PlansDataService.backupPlans()
        .then(response => {
            setBackupPlans({loading: false, data: response.data, error: null})
        }).catch(error => {
            setBackupPlans({loading: false, data: null, error: error.response})
        })
    }, [])

    let content
    if(backupPlans.loading){
        content = <Loader/>
    }

    if(backupPlans.data){
        content = backupPlans.data.map((plan) => 
            <div className="col-md-4">
                <div id="ho_co" className="order-box_main">
                <div className="order-box text_align_center">
                    <h3>Backup plan</h3>
                    <p>STARTING  <span>{plan.price + " rs"}</span> Per {plan.duration}</p>
                    <ul className="supp">
                        <li className="text-capitalize">{plan.backup_rate + " backup"}</li>
                        <li>24/7 support</li>
                    </ul>
                </div>
                <a className="read_more" href="">Buy Now</a>
                </div>
            </div>
        )
    }

    return <div className="row">{content}</div>
}

export default BackupPlans