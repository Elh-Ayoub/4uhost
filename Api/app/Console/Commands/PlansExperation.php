<?php

namespace App\Console\Commands;

use App\Models\Plan;
use App\Models\Purchase;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use Str;

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
            }
        }
        return 0;
    }
}
