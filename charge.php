<?php
// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
\Stripe\Stripe::setApiKey("pk_test_Zpooc1w4cUlZMOMsrHrs85V9");

// Token is created using Checkout or Elements!
// Get the payment token ID submitted by the form:
$token = $_POST['stripeToken'];

// Charge the user's card:
$charge = \Stripe\Charge::create(array(
  "amount" => 999,
  "currency" => "usd",
  "description" => "Example charge",
  "source" => $token,
));
?>