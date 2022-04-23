<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Api\SupportTicketController;
use App\Http\Controllers\Controller;
use App\Models\SupportTicket;
use Illuminate\Http\Request;

class AdminSupportTicketController extends Controller
{
    public function index(){
        return view("SupportTickets.tickets", [
            'pendingTickets' => SupportTicket::where('status', 'pending')->get(),
            'openedTickets' => SupportTicket::where('status', 'opened')->get(),
            'closedTickets' => SupportTicket::where('status', 'closed')->get(),
        ]);
    }

    public function updateStatus(Request $request, $id){
        $supportController = new SupportTicketController;
        $response = $supportController->updateStatus($request, $id);

        $res = json_decode($response->content());

        if($res->status == "success"){
            return back()->with('success', $res->message);
        }
        else if($res->status == "fail"){
            return back()->with('fail', $res->message);
        }
        else{
            return back()->with('fail-arr', $res->message);
        }
    }
}
