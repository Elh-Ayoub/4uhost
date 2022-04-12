<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="shortcut icon" type="image/x-icon" href="{{ asset('assets/logo.png')}}"/>
  <title>Purchases - {{env('APP_NAME')}}</title>
  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="{{ asset('plugins/fontawesome-free/css/all.min.css')}}">
  <!-- Theme style -->
  <link rel="stylesheet" href="{{ asset('dist/css/adminlte.min.css') }}">
  <style>.nav-item > .active{background-color: #1DA4BA !important;}</style>
</head>
<body class="hold-transition sidebar-mini layout-fixed">
    <div class="wrapper">
        @include('layouts.navmenu')
        @include('layouts.sidebar')
        <div class="content-wrapper">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Purchases Table</h1>
                        </div>
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><a href="{{route('dashboard')}}">Dashboard</a></li>
                                <li class="breadcrumb-item"><a href="#">Purchases</a></li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <section class="content">
                <table class="table table-striped table-bordered">
                    <thead class="bg-gradient-info">
                        <tr class="text-center">
                            <th scope="col">Client</th>
                            <th scope="col">Plans purchased</th>
                            <th scope="col">Full price</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($purchases as $purchase)
                            <tr>
                                @php $user = App\Models\User::find($purchase->user_id);@endphp
                                <td class="row align-items-center mx-2 border-0">
                                    <img src="{{$user->profile_picture}}" class="img-fluid img-md img-circle mr-2" alt="Avatar">
                                    <a class="link-muted text-bold" href="{{route('users.show', $user->id)}}">{{$user->username}}</a>
                                </td>
                                <td>
                                    @foreach (explode(", ", $purchase->plans_ids) as $plan_id)
                                        @php $plan = App\Models\Plan::find($plan_id); @endphp
                                        <p>{{$plan->name . "  Qty: " .  $plan->quantity . ", per " . $plan->duration}}</p>
                                    @endforeach
                                </td>
                                <td class="text-xl text-bold text-center">{{$purchase->full_price . " rs"}}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
                <div class="row col-12 justify-content-center">
                    {{ $purchases->links() }}
                </div> 
            </section>
        </div>
        @include('layouts.footer')
    </div>
<!-- jQuery -->
<script src="{{ asset('plugins/jquery/jquery.min.js') }}"></script>
<!-- Bootstrap 4 -->
<script src="{{ asset('plugins/bootstrap/js/bootstrap.bundle.min.js')}}"></script>
<!-- AdminLTE App -->
<script src="{{ asset('dist/js/adminlte.min.js')}}"></script>
<script src="{{ asset('js/helper.js')}}"></script>
@include('layouts.toastrs')
</body>
</html>