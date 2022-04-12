<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PaymentSettings;
use App\Models\Plan;
use App\Models\Purchase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class PurchaseController extends Controller
{
    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            "plans_ids"    => "required|array|min:1",
            "plans_ids.*"  => "required|numeric",
        ]);

        if($validator->fails()){
            return response(['status' => 'fail-arr', 'message' => $validator->errors()->toArray()], 400);
        }
        $full_price = 0;
        foreach($request->plans_ids as $plan_id){
            $plan = Plan::find($plan_id);
            if($plan){
                $full_price += $plan->price;
            }else{
                return response(['status' => 'fail', 'message' => 'Some plan not found! Please try again.'], 404);
            }
        }
        if($full_price < $min = PaymentSettings::where('title', 'minimum_total_purchase_price')->first()->value){
            return response(['status' => 'fail', 'message' => 'Minimum full price to purchase is: ' . $min . ' rs'], 400);
        }
        if(Auth::user()->wallet_balance < $full_price){
            return response(['status' => 'fail', 'message' => 'Wallet balace not insufficient for this purchase'], 400); 
        }else{
            $new_balence = Auth::user()->wallet_balance - $full_price;
            Auth::user()->update([
                'wallet_balance' =>$new_balence,
            ]);
        }
        $purchase = Purchase::create([
            'user_id' => Auth::id(),
            'plans_ids' => implode(', ', $request->plans_ids),
            'full_price' => $full_price,
        ]);
        if($purchase){
            return response(['status' => 'success', 'message' => 'Purchase made successfully!']);
        }
        return response(['status' => 'fail', 'message' => 'Something went wromg! Try again.'], 400);
    }
}
