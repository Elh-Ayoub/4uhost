<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use App\Models\Purchase;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StorageController extends Controller
{
    public function checkPurchases(){
        $user = Auth::user();
        if(!$user){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], 403);
        }
        $purchases = Purchase::where("user_id", Auth::id())->get();
        $res = array();
        foreach($purchases as $purchase){
            foreach(explode(", ", $purchase->plans_ids) as $id){
                $plan = Plan::find($id);
                if($plan->name == "Storage plans"){
                    $res = $plan;
                    break;
                }
            }
        }
        if(empty($res)){
            return response(["status" => "fail", "message" => "Storage plan not purchased yet!"], 400);
        }
        return response(['status' => 'success', 'message' => $res]);
    }

    public function upload(Request $request){
        if(!$request->file('files')){
            return response(['status' => 'fail', 'message' => 'Noting upladed!'], 400);
        }
        $check = $this->checkPurchases();
        $check = json_decode($check->content());
        if($check->status == "success"){
            $plan = $check->message;
            if($this->checkSpaceAvailability($request->file('files'), $plan)){
                foreach($request->file('files') as $item){
                    $filename = $item->getClientOriginalName();
                    $dir = public_path('storage/' . Auth::id());
                    $i = 1;
                    $t_filename = $filename;
                    while(file_exists($dir. "/" .$filename)){
                        $file = explode('.', $t_filename);
                        $filename = $file[0] . "(". $i . ")." . $file[1];
                        $i++;
                    }
                    $item2 = $item->store('public');
                    $item->move($dir, $filename);
                }
                return response(['status' => 'success', 'message' => "Files uploaded successfully!"]);
            }else{
                return response(['status' => 'fail', 'message' => "Space in purchased plan is not enough"], 400);
            }            
        }
        return response(['status' => 'fail', 'message' => "You don't have any storage plan!"], 404);
    }

    public function checkSpaceAvailability($files, $plan){
        $freeSpace = $plan->quantity * 1073741824;  //Convert GB to Bytes
        $dir  = public_path('storage/' . Auth::id());
        if(file_exists($dir)){
            if ($handle = opendir(public_path('storage/' . Auth::id()))) {
                while (false !== ($entry = readdir($handle))) {
                    $freeSpace -= filesize($dir . "/" . $entry);
                }
                closedir($handle);
            }
        }
        $size = 0;
        foreach($files as $item){
            $size += $item->getSize();
        }
        if($size <= $freeSpace){
            return true;
        }
        return false;
    }

    public function updateFileContent(Request $request){
        $dir = public_path('storage/' . Auth::id());
        if(!file_exists($dir . "/" . $request->file)){
            return response(['status' => 'fail', 'message' => "File not found!"], 404);
        }
        file_put_contents($dir . "/" . $request->file, $request->content);
        return response(['status' => 'success', 'message' => "Changes saved successfully!"]);
    }
}
