<div id="create-web-hosting-plan" class="modal fade">
    <div class="modal-dialog">
        <form class="modal-content" method="POST" action="{{route('plans.store')}}">
            @csrf
            <div class="modal-header bg-warning">
                <h5 class="modal-title">Create new web hosting plan</h5>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                <input type="hidden" value="Web hosting plans" name="name">
                <div class="input-group mb-3">
                    <select name="type" class="form-control custom-select plan_type">
                        <option value="limited" selected>Limited</option>
                        <option value="unlimited" >Unlimited</option>
                    </select>
                </div>
                <div class="input-group mb-3 input_quantity">
                    <input type="number" class="form-control" step="1" placeholder="Number of websites" name="quantity">
                    <div class="input-group-append">
                        <div class="input-group-text">
                            <i class="fas fa-hdd"></i>
                        </div>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <input type="number" class="form-control" step="0.1" placeholder="Price" name="price">
                    <div class="input-group-append">
                        <div class="input-group-text">
                            <i class="fas fa-money-bill-wave"></i>
                        </div>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <select name="duration" class="form-control custom-select">
                        <option value="month" selected>Per month</option>
                        <option value="year">Per year</option>
                    </select>
                </div>
            </div>
            <div class="modal-footer row justify-content-around">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"><i class="fas fa-times pr-2"></i>Cancel</button>
                <button type="submit" class="btn btn-outline-warning"><i class="fas fa-plus pr-2"></i>Create</button>
            </div>
        </form>
    </div>
</div>
@foreach ($web_hosting as $plan)
<div id="update-web-hosting-plan-{{$plan->id}}" class="modal fade">
    <div class="modal-dialog">
        <form class="modal-content" method="POST" action="{{route('plans.update', $plan->id)}}">
            @csrf
            @method('PATCH')
            <div class="modal-header bg-warning">
                <h5 class="modal-title">Update a web hosting plans</h5>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="input-group mb-3">
                    <select name="type" class="form-control custom-select plan_type">
                        <option value="limited" @if($plan->type === "limited") selected @endif>Limited</option>
                        <option value="unlimited" @if($plan->type === "unlimited") selected @endif>Unlimited</option>
                    </select>
                </div>
                <div class="input-group mb-3 input_quantity">
                    <input type="number" class="form-control" step="0.1" placeholder="Number of websites" name="quantity" value="{{$plan->quantity}}">
                    <div class="input-group-append">
                        <div class="input-group-text">
                            <i class="fas fa-hdd"></i>
                        </div>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <input type="number" class="form-control" step="0.1" placeholder="Price" name="price" value="{{$plan->price}}">
                    <div class="input-group-append">
                        <div class="input-group-text">
                            <i class="fas fa-money-bill-wave"></i>
                        </div>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <select name="duration" class="form-control custom-select">
                        <option value="month" @if($plan->duration === "month") selected @endif>Per month</option>
                        <option value="year" @if($plan->duration === "year") selected @endif>Per year</option>
                    </select>
                </div>
            </div>
            <div class="modal-footer row justify-content-around">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"><i class="fas fa-times pr-2"></i>Cancel</button>
                <button type="submit" class="btn btn-outline-warning"><i class="fas fa-save"></i> Save</button>
            </div>
        </form>
    </div>
</div>
<div id="delete-web-hosting-plan-{{$plan->id}}" class="modal fade">
    <div class="modal-dialog">
        <form class="modal-content bg-danger" method="POST" action="{{route('plans.delete', $plan->id)}}" >
            @csrf
            @method('DELETE')
            <div class="modal-header">
                <h5 class="modal-title">Confirmation</h5>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body ">
                <p>You're about to delete a Web hosting plan.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-light" data-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-outline-light"><i class="fas fa-trash pr-2"></i>Confirm</button>
            </div>
        </form>
    </div>
</div>
@endforeach