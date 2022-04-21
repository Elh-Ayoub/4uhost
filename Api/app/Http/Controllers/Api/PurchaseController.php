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
        $domain_name = null;
        foreach($request->plans_ids as $plan_id){
            $plan = Plan::find($plan_id);
            if($plan){
                $full_price += $plan->price;
                if($plan->name === "Domains"){
                    if(!$request->domain_name){
                        return response(['status' => 'fail', 'message' => 'Domain name not specified!'], 404);
                    }
                    $domain_name = $request->domain_name;
                }
            }else{
                return response(['status' => 'fail', 'message' => 'Some plan not found! Please try again.'], 404);
            }
        }
        if($full_price < $min = PaymentSettings::where('title', 'minimum_total_purchase_price')->first()->value){
            return response(['status' => 'fail', 'message' => 'Minimum full price to purchase is: ' . $min . ' rs'], 400);
        }

        //referral balance
        if($request->referral_balance){
            $refPointsValue = PaymentSettings::where('title', 'value_of_referral_points')->first()->value;
            $maxRefBalance = PaymentSettings::where('title', 'max_referral_balance_in_purchase')->first()->value;
            $ref_balance = Auth::user()->referral_points * $refPointsValue;
            if($ref_balance >= $request->referral_balance){
                if($request->referral_balance <= $maxRefBalance){
                   $full_price -= $request->referral_balance;
                   $new_referral_points = Auth::user()->referral_points - ($request->referral_balance / $refPointsValue);
                    Auth::user()->update([
                        'referral_points' => $new_referral_points,
                    ]);
                }else{
                    return response(['status' => 'fail', 'message' => 'Referral balance requested more than maximum alowed!'], 400);
                }
            }else{
                return response(['status' => 'fail', 'message' => 'Referral balance not insufficient'], 400);
            }
        }
        // add tax bill  
        $tax_percentage = PaymentSettings::where('title', 'percentage_tax_in_billing')->first()->value;
        $full_price += ($full_price * $tax_percentage) / 100;

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
            'domain_name' => $domain_name,
        ]);
        if($purchase){
            return response(['status' => 'success', 'message' => 'Purchase made successfully!']);
        }
        return response(['status' => 'fail', 'message' => 'Something went wromg! Try again.'], 400);
    }

    public function show($id){
        return Plan::find($id);
    }

    public function getUserPurchases(){
        $purchases = Purchase::where("user_id", Auth::id())->get();
        $res = array();
        foreach($purchases as $purchase){
            foreach(explode(", ", $purchase->plans_ids) as $id){
                $plan = Plan::find($id);
                if($plan->name == "Domains"){
                    $plan->domain_name = $purchase->domain_name;
                }
                array_push($res, $plan);
            }
        }
        return response(['status' => 'success', 'message' => $res]);
    }

    public function getFullPrice(Request $request){
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
        $tax_percentage = PaymentSettings::where('title', 'percentage_tax_in_billing')->first()->value;
        $full_price += ($full_price * $tax_percentage) / 100;

        return response(['status' => 'success', 'message' => $full_price]);
    }

    public function getPaymentSettings(){
        return PaymentSettings::all();
    }

    public function getStoragePlans(){
        $limited_storage_plans = Plan::where(['name'=> 'Storage plans', 'type' => 'limited'])->get()->sortby('quantity')->sortby('duration');
        $unlimited_storage_plans = Plan::where(['name'=> 'Storage plans', 'type' => 'unlimited'])->get();
        return $limited_storage_plans->merge($unlimited_storage_plans);
    }

    public function getWebhostingPlans(){
        $limited_web_hosting = Plan::where(['name' => 'Web hosting plans', 'type' => 'limited'])->get()->sortby('quantity')->sortby('duration');
        $unlimited_web_hosting = Plan::where(['name' => 'Web hosting plans', 'type' => 'unlimited'])->get();
        return $limited_web_hosting->merge($unlimited_web_hosting);
    }

    public function getEmailPlans(){
        $limited_email_plans = Plan::where(['name' => 'Email plans', 'type' => 'limited'])->get()->sortby('quantity')->sortby('duration');
        $unlimited_emails_plans =Plan::where(['name' => 'Email plans', 'type' => 'unlimited'])->get();
        return $limited_email_plans->merge($unlimited_emails_plans);
    }

    public function getDomainPlans(){
        return Plan::where('name', 'Domains')->get();
    }

    public function getBackupPlans(){
        return Plan::where('name', 'Backup plans')->get();
    }
}
