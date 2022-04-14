<?php

namespace App\Console\Commands;

use App\Models\Plan;
use App\Models\Purchase;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use Str;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

class PlansExperation extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'plans:experation';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command to check experation of purchased plans.';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        foreach(Purchase::all() as $purchase){
            foreach(explode(", ", $purchase->plans_ids) as $id){
                $plan = Plan::find($id);
                $experation_date = date('Y-m-d', strtotime("+1 " . $plan->duration . "s", strtotime($purchase->created_at)));

                //   Remove (or delete) plan from purchase at experation date
                if(date('Y-m-d') == $experation_date){
                    info("Plan #" . $id . "  expired!");
                    $new_plans_ids = str_replace(($id . ', '), '',$purchase->plans_ids);
                    if(Str::contains($new_plans_ids, $id)){
                        $new_plans_ids = str_replace($id, '', $purchase->plans_ids);
                    }
                    info($new_plans_ids);
                    if($new_plans_ids === ''){
                        $purchase->delete();
                    }else{
                        $purchase->update([
                            'plans_ids' => $new_plans_ids,
                        ]);
                    }                    
                }

                //send email remainder 1 week or 1 day before experation
                if(date('Y-m-d', strtotime("+1 week")) == $experation_date || date('Y-m-d', strtotime("+1 day")) == $experation_date){
                    $user = User::find($purchase->user_id);
                    $dur = (date('Y-m-d', strtotime("+1 week")) == $experation_date) ? "1 week" : ("1 day");
                    $data = [
                        'msg' => 'Hello! ' . $user->username . ", we want to inform you that a plan you purchased is about ". $dur ." to expire",
                        'plan' => $plan,
                        'purchase' => $purchase,
                        'experation_date' => $experation_date,
                        'user' => $user,
                    ];
                    Mail::send('mails.template', $data, function($message) use($data) {
                        $message->to($data['user']->email, 'Experation remainder')->subject('Experation remainder');
                        $message->from(env('MAIL_USERNAME'), env('APP_NAME'));
                    });
                }
            }
        }
        return 0;
    }
}
