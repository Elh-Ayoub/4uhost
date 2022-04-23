<div class="row justify-content-between">
    @foreach ($collection as $ticket)
        @php
            $user = App\Models\User::find($ticket->user_id);
        @endphp
        <div class="col-sm-6 mb-2 shadow shadow-sm p-3 ticket" style="border-radius: 15px">
            <div class="media">
                <i class="fa fa-file-o pull-left"></i>
                <div class="media-body">
                    <div class="row justify-content-between">
                        <div># <span class="ticket_id">{{$ticket->id}}</span></div>
                        @php
                            $statusClassName = "";
                            if($ticket->status == 'pending') $statusClassName = "badge-primary";
                            if($ticket->status == 'opened') $statusClassName = "badge-success";
                            if($ticket->status == 'closed') $statusClassName = "badge-dark";
                            $priorityClassName = "";
                            if($ticket->priority == 'low') $priorityClassName = "badge-success";
                            if($ticket->priority == 'medium') $priorityClassName = "badge-warning";
                            if($ticket->priority == 'high') $priorityClassName = "badge-danger";
                        @endphp
                        <div>
                            <span class="badge {{$statusClassName}}" style="cursor: pointer"
                            data-toggle="modal" data-target="#update-ticket-status-{{$ticket->id}}">{{$ticket->status}}</span>
                            <span class="badge {{$priorityClassName}}" style="cursor: pointer">{{$ticket->priority}}</span>
                        </div>
                        
                    </div>
                    <div>
                        <strong>{{$ticket->message}}</strong>
                    </div>
                    <div>
                        <span>Opened by </span>
                        <a href="{{route("users.show", $user->id)}}">{{$user->username}}</a> 
                        {{$ticket->created_at}}
                    </div>
                </div>
            </div>
        </div>
        <div id="update-ticket-status-{{$ticket->id}}" class="modal fade">
            <div class="modal-dialog">
                <form class="modal-content" method="POST" action="{{route('tickets.update', $ticket->id)}}">
                    @csrf
                    @method('PATCH')
                    <div class="modal-header bg-success">
                        <h5 class="modal-title">Update ticket status</h5>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="input-group mb-3">
                            <select id="inputRole" name="status" class="form-control custom-select">
                                <option value="pending" @if($ticket->status == 'pending') selected @endif>Pending</option>
                                <option value="opened" @if($ticket->status == 'opened') selected @endif>Opened</option>
                                <option value="closed" @if($ticket->status == 'closed') selected @endif>Closed</option>
                            </select>
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <i class="fas fa-tag"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer row justify-content-around">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"><i class="fas fa-times pr-2"></i>Cancel</button>
                        <button type="submit" class="btn btn-outline-warning"><i class="fas fa-pen pr-2"></i>Save changes</button>
                    </div>
                </form>
            </div>
        </div>
    @endforeach
</div>