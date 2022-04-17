import React from "react";

function UpdatePassword(props){
    return (
        <form>
            <div class="form-group row">
                <label for="inputCurrPass" class="col-sm-4 col-form-label">Current password</label>
                <div class="col-sm-8">
                    <input type="password" class="form-control" name="current_password" id="inputCurrPass"/>
                </div>
            </div>
            <div class="form-group row">
                <label for="inputPass" class="col-sm-4 col-form-label">New password</label>
                <div class="col-sm-8">
                    <input type="password" class="form-control" name="password" id="inputPass"/>
                </div>
            </div>
            <div class="form-group row">
                <label for="inputConfirmPass" class="col-sm-4 col-form-label">Confirm new password</label>
                <div class="col-sm-8">
                    <input type="password" class="form-control" name="password_confirmation" id="inputConfirmPass"/>
                </div>
            </div>
            <div class="form-group d-flex justify-content-end">
                <button type="submit" class="btn btn-warning mt-3">Save</button>
            </div> 
        </form>
    )
}

export default UpdatePassword