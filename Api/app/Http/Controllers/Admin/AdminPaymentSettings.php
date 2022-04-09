<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PaymentSettings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminPaymentSettings extends Controller
{
    public function index(){
        
        return view("Payment-settings.p-settings", ['settings' => PaymentSettings::all()]);
    }

    public function update(Request $request, $id){
        $validator = Validator::make($request->all(), [
            'value' => 'required|numeric',
        ]);
        if($validator->fails()){
            return back()->with('fail-arr', $validator->errors()->toArray());
        }
        $paymentSett = PaymentSettings::find($id);
        if(!$paymentSett){
            return back()->with('fail', 'Row not found!');
        }
        $paymentSett->update([
            'value' => $request->value,
        ]);

        return back()->with('success', 'Settings updated successfully!');
    }
}
