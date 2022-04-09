@foreach ($settings as $row)
<div id="update-settings-{{$row->id}}" class="modal fade">
    <div class="modal-dialog">
        <form class="modal-content" method="POST" action="{{route('payment.settings.update', $row->id)}}">
                @csrf
                @method('PATCH')
                <div class="modal-header bg-danger">
                    <h5 class="modal-title">Update settings</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Row title" name="title" value="{{$row->title}}" 
                        @if(Arr::has(config('payment'), $row->title)) readonly @else required @endif>
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <i class="fas fa-cogs"></i>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input type="number" class="form-control" step="0.01" placeholder="Row value" name="value" value="{{$row->value}}" required>
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <i class="fas fa-hashtag"></i>
                            </div>
                        </div>
                    </div>
                </div>
            <div class="modal-footer row justify-content-around">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"><i class="fas fa-times pr-2"></i>Cancel</button>
                <button type="submit" class="btn btn-outline-danger"><i class="fas fa-plus pr-2"></i>Save</button>
            </div>
        </form>
    </div>
</div>
@endforeach