<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use Illuminate\Http\Request;

class AdminPlanController extends Controller
{
    public function storagePlans(){
        $storage_plans = Plan::where('name', 'Storage plans')->get();
        return view('Plans.Storage.storage', ['storage_plans' => $storage_plans]);
    }

    public function webHostingPlans(){
        $web_hosting = Plan::where('name', 'Web hosting plans')->get();
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

}
