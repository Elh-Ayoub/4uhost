<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="shortcut icon" type="image/x-icon" href="{{ asset('assets/logo.png')}}"/>
  <title>Manage web hosting plans- {{env('APP_NAME')}}</title>
  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="{{ asset('plugins/fontawesome-free/css/all.min.css')}}">
  <!-- Theme style -->
  <link rel="stylesheet" href="{{ asset('dist/css/adminlte.min.css') }}">
  <style>.nav-item > .active{background-color: #f7e70a !important;}</style>
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
                            <h1 class="m-0">Manage web hosting plans</h1>
                        </div>
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><a href="{{route('dashboard')}}">Dashboard</a></li>
                                <li class="breadcrumb-item"><a href="#">Web hosting plans</a></li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <section class="content">
                <div class="row mb-3 ml-1">
                    <button class="btn btn-warning" data-toggle="modal" data-target="#create-web-hosting-plan"><i class="fas fa-plus mr-2"></i> Create new web hosting plan</button>  
                </div>
                <table class="table table-striped table-bordered">
                    <thead class="bg-warning">
                        <tr>
                            <th>Number of websites</th>
                            <th>Price</th>
                            <th>Duration</th>
                            <th class="text-center">Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($web_hosting as $plan)
                        <tr>
                            <td>{{($plan->quantity) ? ($plan->quantity) : ($plan->type)}}</td>
                            <td>{{$plan->price}} rs</td>
                            <td>Per {{$plan->duration}}</td>
                            <td class="row justify-content-center">
                                <button class="btn btn-outline-warning mr-3" data-toggle="modal" data-target="#update-web-hosting-plan-{{$plan->id}}"><i class="fas fa-pen"></i></button>
                                <button class="btn btn-outline-danger" data-toggle="modal" data-target="#delete-web-hosting-plan-{{$plan->id}}"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </section>
        </div>
        @include('Plans.Web-hosting.modals')
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