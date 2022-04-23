<aside class="main-sidebar sidebar-dark-primary elevation-4">
    <a href="{{route('dashboard')}}" class="brand-link">
        <img src="{{asset('assets/logo2.png')}}" alt="icon" class="brand-image img-size-50">
        <span class="brand-text font-weight-light">{{env('APP_NAME')}}</span>
    </a>
    <div class="sidebar">
        @if(Auth::user())
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
            <div class="image">
                <img src="{{Auth::user()->profile_picture}}" class="img-circle elevation-2" alt="User-Image">
            </div>
            <div class="info">
                <a href="{{route("users.show", Auth::id())}}" class="d-block">{{Auth::user()->username}}</a>
            </div>
        </div>
        @endif
        <div class="form-inline mt-4">
            <div class="input-group" data-widget="sidebar-search">
                <input class="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search">
            <div class="input-group-append">
                <button class="btn btn-sidebar">
                    <i class="fas fa-search fa-fw"></i>
                </button>
            </div>
            </div>
        </div>
        <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <li class="nav-item">
                <a href="{{route('dashboard')}}" class="nav-link @if(Request::url() === route('dashboard')) active @endif">
                    <i class="fa fa-home"></i>
                    <p>Home</p>
                </a>
            </li>
            <li class="nav-item">
                <a href="{{route('users.admin')}}" class="nav-link @if(Request::url() === route('users.admin')) active @endif">
                    <i class="fa fa-user"></i>
                    <p>Manage Users</p>
                </a>
            </li>
            <li class="nav-item">
                <a href="{{route('roles.admin')}}" class="nav-link @if(Request::url() === route('roles.admin')) active @endif">
                    <i class="fa fa-tag"></i>
                    <p>Manage roles</p>
                </a>
            </li>
            <li class="nav-item">
                <a href="{{route('payment.settings')}}" class="nav-link @if(Request::url() === route('payment.settings')) active @endif">
                    <i class="fas fa-money-bill"></i>
                    <p>Payment settings</p>
                </a>
            </li>
            <li class="nav-item @if(Str::contains(Request::url(), 'plans')) menu-open @endif">
                <a href="#" class="nav-link">
                    <i class="fas fa-clipboard-list pr-1"></i>
                  <p>
                    Hosting Plans
                    <i class="right fas fa-angle-left"></i>
                  </p>
                </a>
                <ul class="nav nav-treeview">
                  <li class="nav-item">
                    <a href="{{route('storage.plans')}}" class="nav-link @if(Request::url() === route('storage.plans')) active @endif">
                      <i class="fas fa-box-open nav-icon"></i>
                      <p>Storage Plans</p>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="{{route('webHosting.plans')}}" class="nav-link @if(Request::url() === route('webHosting.plans')) active @endif">
                        <i class="fas fa-server nav-icon"></i>
                      <p>Web Hosting Plans</p>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="{{route('email.plans')}}" class="nav-link @if(Request::url() === route('email.plans')) active @endif">
                        <i class="fas fa-at nav-icon"></i>
                      <p>Email Plans</p>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="{{route('domains.plans')}}" class="nav-link @if(Request::url() === route('domains.plans')) active @endif">
                        <i class="fas fa-user-tag nav-icon"></i>
                      <p>Domains</p>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="{{route('backup.plans')}}" class="nav-link @if(Request::url() === route('backup.plans')) active @endif">
                        <i class="fas fa-undo nav-icon"></i>
                      <p>Backup plans</p>
                    </a>
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <a href="{{route('purchases')}}" class="nav-link @if(Request::url() === route('purchases')) active @endif">
                  <i class="fas fa-cash-register"></i>
                  <p>Purchases</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="{{route('tickets.list')}}" class="nav-link @if(Request::url() === route('tickets.list')) active @endif">
                  <i class="fas fa-headset"></i>
                  <p>Support tickets</p>
                </a>
              </li>
            </ul>
        </nav>
    </div>
</aside>