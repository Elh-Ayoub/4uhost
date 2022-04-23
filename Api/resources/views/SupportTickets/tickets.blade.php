<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="shortcut icon" type="image/x-icon" href="{{ asset('assets/logo.png')}}"/>
  <title>Support tickets - {{env('APP_NAME')}}</title>
  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="{{ asset('plugins/fontawesome-free/css/all.min.css')}}">
  <!-- Theme style -->
  <link rel="stylesheet" href="{{ asset('dist/css/adminlte.min.css') }}">
  <style>.nav-item > .active{background-color: darkorange !important;}</style>
  <style>.card-header::after{content: none;}</style>
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
                            <h1 class="m-0">Support tickets</h1>
                        </div>
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><a href="{{route('dashboard')}}">Dashboard</a></li>
                                <li class="breadcrumb-item"><a href="#">Support tickets</a></li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <section class="content">
                <div class="card card-solid">
                    <div class="card-header p-3 row align-items-center justify-content-between col-lg-12">
                        <ul class="nav nav-pills">
                            <li class="nav-item"><a class="nav-link active" href="#pending" data-toggle="tab">pending</a></li>
                            <li class="nav-item"><a class="nav-link" href="#opened" data-toggle="tab">Opened</a></li>
                            <li class="nav-item"><a class="nav-link" href="#closed" data-toggle="tab">Closed</a></li>
                        </ul>
                        <div class="input-group col-sm-3">
                            <input class="form-control" id="search_ticket_id" type="search" placeholder="Search by ID...">
                        </div>
                    </div>
                    <div class="card-body pb-0">
                        <div class="tab-content">
                            <div class="tab-pane active" id="pending">
                                @include('SupportTickets.tickets-collection', ['collection' => $pendingTickets])
                            </div>
                            <div class="tab-pane" id="opened">
                                @include('SupportTickets.tickets-collection', ['collection' => $openedTickets])
                            </div>
                            <div class="tab-pane" id="closed">
                                @include('SupportTickets.tickets-collection', ['collection' => $closedTickets])
                            </div>
                        </div>
                    </div>
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