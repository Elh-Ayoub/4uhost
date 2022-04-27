<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Stripe;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller
{
    public function index(){
        return User::all();
    }

    public function show($id){
        $user = User::find($id);
        return ($user) ? ($user) : (response(['status' => "fail", "message" => "User not found!"], 404));
    }

    public function update(Request $request, $id)
    {
        if(($id != Auth::id()) && !$this->isAdmin()){
            return response(['status' => 'fail', 'message' => 'This operation is forbidden.'], Response::HTTP_FORBIDDEN);
        }
        $validator = Validator::make($request->all(), [
            'username' => 'string|unique:users,username,' .$id . '|between:5,20',
            'full_name' => 'string|between:5,30',
        ]);

        $user = User::find($id);
        if(!$user) return response(['status' => 'fail', 'message' => 'User not found!'], 404);

        if($validator->fails()){
            return response(['status' => 'fail-arr', 'message' => $validator->errors()->toArray()], 400);
        }
        $user->update([
            'username' => ($request->username) ? ($request->username) : ($user->username),
            'profile_picture' => ($request->file('profile_picture')) ? ($this->uploadImage($request, $user)) : ($user->profile_picture),
            'full_name' => ($request->full_name) ? ($request->full_name) : ($user->full_name),
            'role_id' => ($request->role_id) ? ($request->role_id) : ($user->role_id),
        ]);
        return response(['status' => 'success', 'message' => 'User updated!']);
    }

    public function setAvatar(Request $request, $id){
        $user = User::find($id);
        if(!$user) return response(['status' => 'fail', 'message' => 'User not found!'], 404);

        if($request->file('profile_picture')){
            $user->update([
                'profile_picture' => $this->uploadImage($request, $user),
            ]);
            return response(['status' => 'success', 'message' => 'Profile picture updated!']);
        }else{
            return response(['status' => 'fail', 'message' => 'An image file is required!'], 400);
        }
    }

    function uploadImage($request, $user = null){
        $image = $request->file('profile_picture');
        if($image){
            $username = ($request->username) ? ($request->username) : ($user->username);
            $filename = str_replace(' ', '-', $username). '.png';
            $image = $request->file('profile_picture')->store('public');
            $request->file('profile_picture')->move(public_path('storage/profile-pictures'), $filename);
            return asset('storage/profile-pictures/'.$filename);
        }
        return null;
    }

    public function updatePassword(Request $request, $id){
        if(($id != Auth::id()) && !$this->isAdmin()){
            return response(['status' => 'fail', 'message' => 'This operation is forbidden.'], Response::HTTP_FORBIDDEN);
        }
        $validator = Validator::make($request->all(), [
            'current_password' => 'required|string|min:8',
            'password' => 'required|string|confirmed|min:8',
        ]);
        $user = User::find($id);
        if(!$user) return response(['status' => 'fail', 'message' => 'User not found!'], 400);

        if($validator->fails()){
            return response(['status' => 'fail-arr', 'message' => $validator->errors()->toArray()], 400);
        }
        if(Hash::check($request->current_password, $user->password)){
            $user->update(['password' => bcrypt($request->password)]);
            return response(['status' => 'success', 'message' => 'Password updated!']);
        }else{
            return response(['status' => 'fail', 'message' => "Password inccorect!"], 400);
        }
    }

    public function setDefaultAvatar(Request $request, $id){
        $user = User::find($id);
        if(!$user) return response(['status' => 'fail', 'message' => 'User not found!'], 400);
        $name = substr($user->username, 0, 2);
        File::delete(public_path(parse_url($user->profile_picture, PHP_URL_PATH)));
        $profile_picture = 'https://ui-avatars.com//api//?name='.$name.'&color=7F9CF5&background=EBF4FF';
        $user->update(['profile_picture' => $profile_picture]);
        return response(['status' => 'success','message'=> 'Profile picture deleted!']);
    }

    public function isAdmin($user = null){
        if(!$user){
            $user = Auth::user();
        }
        return $user->role_id == Role::where('title', 'Admin')->first()->id;
    }

    public function destroy($id)
    {
        $user = User::find($id);
        if(($id != Auth::id()) && !$this->isAdmin()){
            return response(['status' => 'fail', 'message' => 'This operation is forbidden.'], Response::HTTP_FORBIDDEN);
        }
        $user->delete();
        return response(['status' => 'success', 'message' => 'User deleted successfully!']);
    }

    public function fillWallet(Request $request, $id){
        $validator = Validator::make($request->all(), [
            'amount' => 'required|numeric',
            'card_number' => 'required|numeric',
            'exp_month' => 'required|numeric',
            'exp_year' => 'required|numeric',
            'cvc' => 'required|numeric',
        ]);
        if($validator->fails()){
            return response(['status' => 'fail-arr', 'message' => $validator->errors()->toArray()], 400);
        }
        $user = User::find($id);
        if(!$user){
            return response(['status' => 'fail', 'message' => "User not found!"], 404);
        }
        if($request->amount < 100){
            return response(['status' => 'fail', 'message' => "Minimum amount is 100 rs"], 400);
        }
        $stripe = new \Stripe\StripeClient(env('STRIPE_SECRET'));
        try {
            $response = $stripe->tokens->create([
                'card' => [
                'number' => $request->card_number,
                'exp_month' => $request->exp_month,
                'exp_year' => $request->exp_year,
                'cvc' => $request->cvc,
                ],
            ]);
        } catch (\Throwable $th) {
            return response(['status' => 'fail', 'message' => "Card not valid!"], 400);
        }
        
        Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
        $payment = Stripe\Charge::create ([
                "amount" => $request->amount * 100,
                "currency" => "INR",
                "source" => $response['id'],
                "description" => "Charging wallet: #" . $user->id . ", username: " . $user->username,
        ]);
        if($payment){
            $wallet_balance = $user->wallet_balance + $request->amount;
            $user->update([
                'wallet_balance' => $wallet_balance,
            ]);
            return response(['status' => 'success', 'message' => "Wallet has been charged successfully!"]);
        }
        return response(['status' => 'fail', 'message' => "Insufficient available balance, or invalid or expired card"], 400);
    }

    public function razorPayment(Request $request)
    {        
        $validator = Validator::make($request->all(), [
            'razorpay_payment_id' => 'required'
        ]);
        if($validator->fails()){
            return response(['status' => 'fail-arr', 'message' => $validator->errors()->toArray()], 400);
        }
        $input = $request->all();
        $api = new Api(env('RAZORPAY_KEY'), env('RAZORPAY_SECRET'));
        $payment = $api->payment->fetch($input['razorpay_payment_id']);

        if(count($input)  && !empty($input['razorpay_payment_id']))
        {
            try 
            {
                $response = $api->payment->fetch($input['razorpay_payment_id'])->capture(array('amount'=>$payment['amount'])); 
            } 
            catch (\Exception $e) 
            {
                return response(['status' => 'fail', 'message' => $e->getMessage()], 400);
            }            
        }
        return response(['status' => 'success', 'message' => 'Payment successful, your order will be despatched in the next 48 hours.']);
    }

    public function contactUs(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'phone_number' => 'required|numeric',
            'subject' => 'required|string',
            'name' => 'required|string',
            'message' => 'required|string',
        ]);
        if($validator->fails()){
            return response(['status' => 'fail-arr', 'message' => $validator->errors()->toArray()], 400);
        }

        $data = [
            'name' => $request->name,
            'msg' => $request->message,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'subject' => $request->subject,
        ];
        Mail::send('mails.contact', $data, function($message) use($data) {
            $message->to(env('MAIL_USERNAME'), 'Contact')->subject($data['subject']);
            $message->from($data['email'], $data['name']);
        });
        return response(['status' => 'success', 'message' => "Email sent successfully!"]);
    }
}
