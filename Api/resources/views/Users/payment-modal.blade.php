<div id="add-balence-{{$user->id}}" class="modal fade">
    <div class="modal-dialog">
      <form
        role="form"
        action="{{ route('add.balance', $user->id) }}"
        method="post"
        class="modal-content require-validation"
        data-cc-on-file="false"
        data-stripe-publishable-key="{{ env('STRIPE_KEY') }}"
        id="payment-form">
        @csrf
        <div class="modal-header bg-primary">
            <h4 class="modal-title">Add balance to account</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class='form-row'>
                <div class='col-sm-12 row form-group align-items-center required'>
                    <label for="amount" class="col-sm-3">Amount (INR)</label>
                    <input class='form-control col-sm-9' type='number' step="0.01" min="100" id="amount" name="amount" value="100">
                </div>
            </div>
            <div class='form-row'>
                <div class='col-sm-12 row form-group align-items-center required'>
                    <label for="name_on_card" class="col-sm-3">Name on Card</label>
                    <input class='form-control col-sm-9' type='text' id="name_on_card">
                </div>
            </div>
            <div class='form-row'>
                <div class='col-sm-12 form-group row align-items-center required'>
                    <label for="card_num" class="col-sm-3">Card Number</label> 
                    <input autocomplete='off' id="card_num" class='form-control card-number col-sm-9' size='20' type='text'>
                </div>
            </div>
            <div class='form-row row'>
                <div class='col-xs-12 col-md-4 form-group cvc required'>
                    <label class='control-label'>CVC</label> 
                    <input autocomplete='off'class='form-control card-cvc' placeholder='ex. 311' size='4' type='text' required>
                </div>
                <div class='col-xs-12 col-md-4 form-group expiration required'>
                    <label class='control-label'>Expiration Month</label> 
                    <input class='form-control card-expiry-month' placeholder='MM' size='2' type='text' required>
                </div>
                <div class='col-xs-12 col-md-4 form-group expiration required'>
                    <label class='control-label'>Expiration Year</label> 
                    <input class='form-control card-expiry-year' placeholder='YYYY' size='4' type='text' required>
                </div>
            </div>
            {{-- <div class="row">
                <div class="col-xs-12">
                    <button class="btn btn-primary btn-lg btn-block" type="submit">Pay Now ($100)</button>
                </div>
            </div> --}}
        </div>
        <div class="modal-footer justify-content-around">
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"><i class="fas fa-times pr-1"></i>Cancel</button>
          <button type="submit" class="btn btn-outline-primary"><i class="fas fa-money-bill pr-1"></i> Pay</button>
        </div>
      </form>
    </div>
</div>