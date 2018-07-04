import React from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

import STRIPE_PUBLISHABLE from "../../constants/stripe";
import PAYMENT_SERVER_URL from "../../constants/server";

const CURRENCY = "CAD";

const fromCanToCent = amount => amount * 100;

const successPayment = data => {
  alert("Payment Successful");
  console.log(data);
};

const errorPayment = data => {
  alert("Payment Error");
  console.log(data);
};

const onToken = (amount, description) => token =>
  axios
    .post(PAYMENT_SERVER_URL, {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromCanToCent(amount)
    })
    .then(successPayment)
    .catch(errorPayment);

const Checkout = ({ name, description, amount }) => (
  <StripeCheckout
    name={"Facture pour honoraires"}
    description={"Maître Marc-Antoine Harvey"}
    amount={fromCanToCent(this.state.amount)}
    token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
  />
);

export default Checkout;
