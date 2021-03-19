// import React, { useState, useEffect } from "react";
// import TopBar from "../TopBar";
// import Footer from "../Footer/Footer";
// import { loadAllItems, cartEmpty, getTotalPrice } from "../../cart/cartUtility";
// import { Link } from "react-router-dom";
// import { isAuthenticated } from "../../auth/helper";
// import Stripe from "react-stripe-checkout";
// import { Button } from "react-bootstrap";
// import { API } from "../../backend";
// import { createOrder } from "./orderhelper";

// //TODO: Conditional Rendering for Cart for logged in user

// const StripeCheckout = () => {
//   const [checkoutResponse, setCheckoutResponse] = useState({
//     success: false,
//     error: "",
//   });

//   const [cartProducts, setCartProducts] = useState([]);

//   useEffect(() => {
//     setCartProducts(loadAllItems());
//   }, []);

//   const userToken = isAuthenticated() && isAuthenticated().token;
//   const userId = isAuthenticated() && isAuthenticated().user._id;

//   const makePayment = (token) => {
//     const body = {
//       token,
//       cartProducts,
//     };
//     const headers = {
//       "Content-Type": "application/json",
//     };
//     return fetch(`${API}/stripePayment`, {
//       method: "POST",
//       headers,
//       body: JSON.stringify(body),
//     })
//       .then((res) => {
//         console.log("STATUS", res.status);
//         console.log(res);
//         if (res.status == 200) {
//           const orderData = {
//             products: cartProducts,
//             transaction_id: token.card.id,
//             amount: getTotalPrice(),
//           };
//           createOrder(userId, userToken, orderData);
//           cartEmpty(() => {
//             if (JSON.parse(localStorage.getItem("cartItems")).length === 0) {
//               console.log("Cart Items Deleted");
//             }
//           });
//           setCheckoutResponse({ ...checkoutResponse, success: true });
//         }
//       })
//       .catch((err) => console.log(err));
//   };
//   return (
//     <>
//       <TopBar />
//       <h3>Stripe Checkout</h3>
//       {checkoutResponse.success ? (
//         <>
//           <h1>Payment Successful</h1>
//           <Link to="/">Return to Home Page</Link>
//         </>
//       ) : (
//         <Stripe
//           stripeKey="pk_test_51IMzKnAjOHlvw7eGiMcWHoKpTbxLItLwMkNpNr18TYqXW2UuhQPneHwvof34WrNCDYGJBIJ7s1D3unSnPLuWseny00wfFJ8ma8"
//           token={makePayment}
//           amount={getTotalPrice()}
//           name="Checkout Order"
//           shippingAddress
//           billingAddress
//         >
//           <Button>Pay with Stripe</Button>
//         </Stripe>
//       )}
//       <Footer />
//     </>
//   );
// };

// export default StripeCheckout;
