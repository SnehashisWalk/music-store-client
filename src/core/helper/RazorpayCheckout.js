import React, { useState, useEffect } from "react";
import TopBar from "../TopBar";
import Footer from "../Footer/Footer";
import { loadAllItems, cartEmpty, getTotalPrice } from "../../cart/cartUtility";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../auth/helper";
import Stripe from "react-stripe-checkout";
import { Button } from "react-bootstrap";
import { API } from "../../backend";
import { createOrder } from "./orderhelper";

const RazorpayCheckout = () => {
  const { user } = isAuthenticated();
  console.log("USER", user.name);
  console.log(getTotalPrice());

  console.log(user);

  const loadRazorpay = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      document.body.appendChild(script);
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
    });
  };

  const displayRazorpay = async () => {
    const res = await loadRazorpay(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load");
    }

    const options = {
      key: "rzp_test_4fPfJ2irq7rlsW", // Enter the Key ID generated from the Dashboard
      amount: getTotalPrice() * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Music Store",
      description: "Music Store Test Transaction",
      image: "",
      order_id: "order_GgYgK8nHxnL7mu", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
  };

  return (
    <>
      <TopBar />
      <Button onClick={displayRazorpay}>Pay with Razorpay</Button>
      <Footer />
    </>
  );
};

export default RazorpayCheckout;
