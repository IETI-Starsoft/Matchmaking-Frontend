import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="apuesta"
        amount={500}
        stripeKey="pk_test_cRbI1U70fihYILXixJy9ruoy00pQpdGHZq"
      />
    );
  }
}

export default Payments;
