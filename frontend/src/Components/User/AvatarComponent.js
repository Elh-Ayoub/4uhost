import React from "react";

function AvatarCard(props){
    return (<div className="card card-primary card-outline col-sm-5">
                <div className="card-body box-profile">
                    <div className="text-center">
                    <img id="profile-pic" style={{borderRadius: "50%", width: "90px", height: "90px"}}
                        src={props.user.profile_picture}
                        alt="User profile picture"/>
                    </div>
                    <h3 className="profile-username text-center">{props.user.username}</h3>
                    <p className="text-muted text-center">{props.user.full_name}</p>
                    <ul className="mb-3">
                        <hr/>
                        <li className="d-flex col-md-11 justify-content-between mx-auto">
                            <b>Role</b> <a>{props.user.role_id}</a>
                        </li>
                        <hr/>
                        <li className="d-flex col-md-11 justify-content-between mx-auto">
                            <b>Balance</b> <a>{props.user.wallet_balance}</a>
                        </li>
                        <hr/>
                        <li className="d-flex col-md-11 justify-content-between mx-auto">
                            <b>Profile picture</b>
                            <div>
                                <label className="selectfile btn btn-outline-secondary mx-1" htmlFor="choosefile">Select picture</label>
                                <input id="choosefile" type="file" name="profile_picture" className="d-none"/>
                                <button className="btn btn-outline-warning">save</button>
                            </div>
                        </li>
                        <hr/>
                        <li className="d-flex col-md-11 justify-content-between mx-auto">
                            <b>Reset profile picture</b>
                            <div>
                                <button type="submit" className="btn btn-outline-danger">Delete avatar</button>
                            </div>
                        </li>
                        <hr/>
                    </ul>
                </div>
            </div>
    )
}

export default AvatarCard