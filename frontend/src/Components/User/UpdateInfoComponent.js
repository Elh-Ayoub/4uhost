import React, { useState } from "react";

function UpdateInfo(props) {
    const [username, setUsername] = useState(props.user.username)
    const [fullName, setFullName] = useState(props.user.full_name)

    return(
        <form class="form-horizontal">
            <div class="form-group row">
                <label for="inputEmail" class="col-sm-2 col-form-label">Username</label>
                <div class="col-sm-10">
                <input type="email" class="form-control" id="inputEmail" value={username} onChange={(e) => { setUsername(e.target.value)}}/>
                </div>
            </div>
            <div class="form-group row">
                <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                <input type="email" class="form-control" id="inputEmail" value={props.user.email} readonly/>
                </div>
            </div>
            <div class="form-group row">
                <label for="inputfull_name" class="col-sm-2 col-form-label">Full name</label>
                <div class="col-sm-10">
                <input type="text" class="form-control" id="inputfull_name" name="full_name"
                    placeholder="Full name" value={fullName} onChange={(e) => { setFullName(e.target.value)}}/>
                </div>
            </div>
        </form>
    )
}

export default UpdateInfo