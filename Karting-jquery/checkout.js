$(document).ready(function() {

  // Show/hide card fields
  $('input[name="payment"]').on('change', function() {
    if($('#card').is(':checked')) $('#cardDetails').show();
    else $('#cardDetails').hide();
  }).trigger('change');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateNumeric(value) {
    return /^\d+$/.test(value);
  }

  $('#placeOrder').click(function(e) {
    e.preventDefault();
    let isValid = true;
    let firstError = null;
    $('.form-control, .form-select').removeClass('is-invalid is-valid');
    $('.invalid-feedback').text('');

    const errors = [];

    // Full Name
    const name = $('#name').val().trim();
    if(name.length < 3) {
      $('#name').addClass('is-invalid');
      $('#name').siblings('.invalid-feedback').text('Full name must be at least 3 characters.');
      isValid=false;
      if(!firstError) firstError = $('#name');
    } else { $('#name').addClass('is-valid'); }

    // Email
    const email = $('#email').val().trim();
    if(!validateEmail(email)) {
      $('#email').addClass('is-invalid');
      $('#email').siblings('.invalid-feedback').text('Enter a valid email.');
      isValid=false;
      if(!firstError) firstError = $('#email');
    } else { $('#email').addClass('is-valid'); }

    // Phone
    const phone = $('#phone').val().trim();
    if(!validateNumeric(phone) || phone.length < 10) {
      $('#phone').addClass('is-invalid');
      $('#phone').siblings('.invalid-feedback').text('Phone must be at least 10 digits.');
      isValid=false;
      if(!firstError) firstError = $('#phone');
    } else { $('#phone').addClass('is-valid'); }

    // Address
    const address = $('#address').val().trim();
    if(address==="") {
      $('#address').addClass('is-invalid');
      $('#address').siblings('.invalid-feedback').text('Address required.');
      isValid=false;
      if(!firstError) firstError = $('#address');
    } else { $('#address').addClass('is-valid'); }

    // City
    const city = $('#city').val().trim();
    if(city==="") {
      $('#city').addClass('is-invalid');
      $('#city').siblings('.invalid-feedback').text('City required.');
      isValid=false;
      if(!firstError) firstError = $('#city');
    } else { $('#city').addClass('is-valid'); }

    // Postal
    const postal = $('#postal').val().trim();
    if(!validateNumeric(postal) || postal.length<4 || postal.length>6) {
      $('#postal').addClass('is-invalid');
      $('#postal').siblings('.invalid-feedback').text('Postal must be 4-6 digits.');
      isValid=false;
      if(!firstError) firstError = $('#postal');
    } else { $('#postal').addClass('is-valid'); }

    // Country
    const country = $('#country').val();
    if(!country) {
      $('#country').addClass('is-invalid');
      $('#country').siblings('.invalid-feedback').text('Select a country.');
      isValid=false;
      if(!firstError) firstError = $('#country');
    } else { $('#country').addClass('is-valid'); }

    // Payment
    const payment = $('input[name="payment"]:checked').val();
    if(!payment) {
      errors.push('Select payment method.');
    }

    // Card fields if card selected
    if($('#card').is(':checked')) {
      const cardName = $('#cardName').val().trim();
      const cardNumber = $('#cardNumber').val().trim();
      const expiry = $('#expiry').val().trim();
      const cvv = $('#cvv').val().trim();

      if(cardName==="") { $('#cardName').addClass('is-invalid').siblings('.invalid-feedback').text('Required'); isValid=false; if(!firstError) firstError = $('#cardName'); } else { $('#cardName').addClass('is-valid'); }
      if(!validateNumeric(cardNumber) || cardNumber.length<12) { $('#cardNumber').addClass('is-invalid').siblings('.invalid-feedback').text('Invalid'); isValid=false; if(!firstError) firstError = $('#cardNumber'); } else { $('#cardNumber').addClass('is-valid'); }
      if(!expiry) { $('#expiry').addClass('is-invalid').siblings('.invalid-feedback').text('Required'); isValid=false; if(!firstError) firstError = $('#expiry'); } else { $('#expiry').addClass('is-valid'); }
      if(!validateNumeric(cvv) || cvv.length<3) { $('#cvv').addClass('is-invalid').siblings('.invalid-feedback').text('Invalid'); isValid=false; if(!firstError) firstError = $('#cvv'); } else { $('#cvv').addClass('is-valid'); }
    }

    // Terms
    if(!$('#termsCheck').is(':checked')) {
      errors.push('Agree to Terms & Conditions.');
    }

    // Scroll to first error
    if(!isValid || errors.length) {
      if(firstError) $('html, body').animate({scrollTop: firstError.offset().top - 100}, 500);
      if(errors.length) alert(errors[0]); // show first error only
      return false;
    }

    // Success
    alert('Order placed successfully!');
  });
});
