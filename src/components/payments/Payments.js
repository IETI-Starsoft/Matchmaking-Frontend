import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import axiosHeader from "./../../api/axiosHeader";

class Payments extends Component {
  render() {
    const handleSubmit = e => {
      //e.preventDefault();
      console.log(e);
      const userId = JSON.parse(localStorage.getItem("user")).userId;
      const amount = this.props.amount;

      axiosHeader
        .put("/payments/user/" + userId + "/amount/" + amount)
        .then(
          function(response) {
            localStorage.setItem("user", JSON.stringify(response.data));
            this.props.setCredits(response.data.credits);
            this.props.closeModal();
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error);
          this.props.closeModal();
        });
    };

    return (
      <StripeCheckout
        name="apuesta"
        amount={this.props.value * 100}
        stripeKey="pk_test_cRbI1U70fihYILXixJy9ruoy00pQpdGHZq"
        email="info@vidhub.co"
        token={token => handleSubmit(token)}
        currency="COP"
      ></StripeCheckout>
    );
  }
}

export default Payments;
