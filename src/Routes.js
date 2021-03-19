import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./core/Home";
import Guitars from "./pages/Guitars/Guitars";
import Keyboards from "./pages/Keyboards/Keyboards";
import Drums from "./pages/Drums/Drums";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import Profile from "./user/Profile";
import SignIn from "./user/SignIn";
import SignUp from "./user/SignUp";
import Cart from "./cart/Cart";
// import RazorpayCheckout from "./core/helper/RazorpayCheckout";
import ElectricGuitars from "./pages/Guitars/ElectricGuitars";
import AcousticGuitars from "./pages/Guitars/AcousticGuitars";
import BassGuitars from "./pages/Guitars/BassGuitars";
import Pianos from "./pages/Pianos/Pianos";
import Microphones from "./pages/Microphones/Microphones";
import Softwares from "./pages/Softwares/Softwares";
import Headphones from "./pages/Headphones/Headphones";
import Amplifiers from "./pages/Amplifiers/Amplifiers";
import BluetoothSpeakers from "./pages/Bluetooth Speakers/BluetoothSpeakers";
import DJGear from "./pages/DJ Gear/DJGear";
import Checkout from "./checkout/Checkout";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/collections/guitars" exact component={Guitars}></Route>
        <Route
          path="/collections/electric-guitars"
          exact
          component={ElectricGuitars}
        ></Route>
        <Route
          path="/collections/acoustic-guitars"
          exact
          component={AcousticGuitars}
        ></Route>
        <Route
          path="/collections/bass-guitars"
          exact
          component={BassGuitars}
        ></Route>
        <Route
          path="/collections/keyboards"
          exact
          component={Keyboards}
        ></Route>
        <Route path="/collections/drums" exact component={Drums}></Route>
        <Route path="/collections/dj-gear" exact component={DJGear}></Route>
        <Route
          path="/collections/bluetooth-speakers"
          exact
          component={BluetoothSpeakers}
        ></Route>
        <Route
          path="/collections/amplifiers"
          exact
          component={Amplifiers}
        ></Route>
        <Route
          path="/collections/microphones"
          exact
          component={Microphones}
        ></Route>
        <Route path="/collections/pianos" exact component={Pianos}></Route>
        <Route
          path="/collections/headphones"
          exact
          component={Headphones}
        ></Route>
        <Route
          path="/collections/softwares"
          exact
          component={Softwares}
        ></Route>
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
        <PrivateRoute path="/profile" exact component={Profile} />
        <Route path="/cart" exact component={Cart} />
        <PrivateRoute path="/user/cart" exact component={Cart} />
        <PrivateRoute path="/cart/checkout" exact component={Checkout} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default Routes;
