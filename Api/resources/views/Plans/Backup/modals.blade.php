@foreach ($backup_plans as $plan)
<div id="update-backup-plan-{{$plan->id}}" class="modal fade">
    <div class="modal-dialog">
        <form class="modal-content" method="POST" action="{{route('plans.update', $plan->id)}}">
            @csrf
            @method('PATCH')
            <div class="modal-header bg-warning">
                <h5 class="modal-title">Update backup plan</h5>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                <input type="hidden" value="{{$plan->backup_rate}}" name="backup_rate">
                <div class="input-group mb-3 hidden">
                    <select name="type" class="form-control custom-select plan_type">
                        <option value="limited" @if($plan->type === "limited") selected @endif>Limited</option>
                        <option value="unlimited" @if($plan->type === "unlimited") selected @endif>Unlimited</option>
                    </select>
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
@endforeach