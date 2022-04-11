<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminPlanController extends Controller
{
    public function storagePlans(){
        $limited_storage_plans = Plan::where(['name'=> 'Storage plans', 'type' => 'limited'])->get()->sortby('quantity')->sortby('duration');
        $unlimited_storage_plans = Plan::where(['name'=> 'Storage plans', 'type' => 'unlimited'])->get();
        $storage_plans = $limited_storage_plans->merge($unlimited_storage_plans);
        return view('Plans.Storage.storage', ['storage_plans' => $storage_plans]);
    }

    public function webHostingPlans(){
        $limited_web_hosting = Plan::where(['name' => 'Web hosting plans', 'type' => 'limited'])->get()->sortby('quantity')->sortby('duration');
        $unlimited_web_hosting = Plan::where(['name' => 'Web hosting plans', 'type' => 'unlimited'])->get();
        $web_hosting = $limited_web_hosting->merge($unlimited_web_hosting);
        return view('Plans.Web-hosting.web-hosting', ['web_hosting' => $web_hosting]);
    }

    public function emailPlans(){
        $email_plans = Plan::where('name', 'Email plans')->get();
        return view('Plans.Email.email-plans', ['email_plans' => $email_plans]);
    }

    public function domainsPlans(){
        $domains = Plan::where('name', 'Domains')->get();
        return view('Plans.Domains.domains', ['domains' => $domains]);
    }

    public function backupPlans(){
        $backup_plans = Plan::where('name', 'Backup plans')->get();
        return view('Plans.Backup.backup-plans', ['backup_plans' => $backup_plans]);
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'price' => 'required|numeric',
            'duration' => 'required|string',
            'type' => 'required|string',
        ]);
        if($validator->fails()){
            return back()->with('fail-arr', $validator->errors()->toArray());
        }

        $plan = Plan::create([
            'name' => $request->name,
            'quantity' => ($request->type == 'limited') ? ($request->quantity) : (null),
            'price' => $request->price,
            'duration' => $request->duration,
            'type' => $request->type,
            'backup_rate' => $request->backup_rate,
            'discount' => $request->discount,
        ]);

        if($plan){
            return back()->with('success', 'New plan created');
        }
        return back()->with('fail', 'Something went wrong! Try again.');
    }

    public function update(Request $request, $id){
        $validator = Validator::make($request->all(), [
            'price' => 'required|numeric',
            'duration' => 'required|string',
            'type' => 'required|string',
        ]);
        if($validator->fails()){
            return back()->with('fail-arr', $validator->errors()->toArray());
        }

        $plan = Plan::find($id);
        if(!$plan){
            return back()->with('fail', 'Plane not found!');
        }
        $plan->update([
            'quantity' => ($request->type == 'limited') ? ($request->quantity) : (null),
            'price' => $request->price,
            'duration' => $request->duration,
            'type' => $request->type,
            'backup_rate' => $request->backup_rate,
            'discount' => $request->discount,
        ]);

        return back()->with('success', 'Plan updated successfully!');
    }

    public function destroy($id){
        $plan = Plan::find($id);
        if($plan){
            $plan->delete();
            return back()->with('success', 'Plan deleted successfully!');
        }else{
            return back()->with('fail', 'Plan not found!');
        }
    }
}
