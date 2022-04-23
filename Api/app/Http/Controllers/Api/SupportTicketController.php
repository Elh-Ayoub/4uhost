<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\SupportTicket;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class SupportTicketController extends Controller
{
    public function index(){
        return SupportTicket::all();
    }
    
    public function show($id){
        $ticket = SupportTicket::find($id);
        if($ticket){
            return response(['status' => 'success', 'message' => $ticket]);
        }
        return response(['status' => 'fail', 'message' => "Ticket not found!"], 404);   
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'subject' => "required|string",
            "message" => "required|string",
            "department" => "required|string",
            "priority" => "required|string",
        ]);

        if($validator->fails()){
            return response(['status' => 'fail-arr', 'message' => $validator->errors()->toArray()], 400);
        }

        $ticket = SupportTicket::create([
            'user_id' => Auth::id(),
            'subject' => $request->subject,
            'message' => $request->message,
            'department' => $request->department,
            'priority' => $request->priority,
        ]);
        if($ticket){
            $data = [
                'user' => Auth::user(),
                'msg' => "Thank you for sending us message, we will have a response for you within two or three business days."
            ];
            Mail::send('mails.issue-received', $data, function($message) use($data) {
                $message->to($data['user']->email, 'Issue received')->subject("Issue received");
                $message->from(env('MAIL_USERNAME'), env('APP_NAME'));
            });
            return response(['status' => 'success', 'message' => "ticket created successfully!"]);
        }

        return response(['status' => 'fail', 'message' => "something went wrong! Please try again."], 400);
    }

    public function updateStatus(Request $request, $id){

        if(!$this->isAdmin()){
            return response(['status' => 'fail', 'message' => 'This operation is forbidden.'], Response::HTTP_FORBIDDEN);
        }

        $validator = Validator::make($request->all(), [
            'status' => "required|string",
        ]);

        if($validator->fails()){
            return response(['status' => 'fail-arr', 'message' => $validator->errors()->toArray()], 400);
        }

        $ticket = SupportTicket::find($id);
        if(!$ticket){
            return response(['status' => 'fail', 'message' => "Ticket not found!"], 404);   
        }

        $ticket->update([
            'status' => $request->status,
        ]);
        return response(['status' => 'success', 'message' => "ticket status updated successfully!"]);
    }

    public function isAdmin($user = null){
        if(!$user){
            $user = Auth::user();
        }
        return $user->role_id == Role::where('title', 'Admin')->first()->id;
    }

    public function showUsersTickets($id){

        $user = User::find($id);
        if(!$user){
            return response(['status' => 'fail', 'message' => "User not found!"], 404);   
        }
        return SupportTicket::where('user_id', $id)->orderBy('created_at', 'desc')->get();
    }

    public function destroy($id){
        $ticket = SupportTicket::find($id);
        if($ticket){
            $ticket->delete();
            return response(['status' => 'success', 'message' => "ticket deleted successfully!"]);
        }
        return response(['status' => 'fail', 'message' => "Ticket not found!"], 404);   
    }
}
