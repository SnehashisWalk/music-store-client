import React, { useState, useLayoutEffect, useEffect } from "react";
import "./topbar.css";
import {
  Badge,
  Button,
  Nav,
  Navbar,
  NavDropdown,
  NavItem,
  Spinner,
} from "react-bootstrap";
import SignIn from "../user/SignIn";
import SignUp from "../user/SignUp";
import {
  authenticate,
  isAuthenticated,
  signin,
  signout,
} from "../auth/helper/index";
import { withRouter } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import {
  cartEmpty,
  cartItemCount,
  saveUserCartItemsToDB,
} from "../cart/cartUtility";
import { BsMusicNoteList } from "react-icons/bs";

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

const TopBar = ({ history }) => {
  const [signInModalShow, setSignInModalShow] = useState(false);
  const [signUpModalShow, setSignUpModalShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");

  // console.log(useWindowSize()[0]);

  const { token, user } = isAuthenticated();

  const redirectToProfilePage = () => {
    const path = "/profile";
    if (isAuthenticated()) {
      history.push(path);
    }
  };

  const redirectToCartPage = () => {
    const path = "/cart";
    if (isAuthenticated()) {
      history.push(path);
    }
  };

  /*
  ********************************
  HANDLE DEMO ACCOUNT
  ********************************
  */

  useEffect(() => {
    const timer = setInterval(() => {
      performRedirect();
    }, 200);
    return () => {
      clearInterval(timer);
    };
  }, [redirect]);

  const handleDemoAccount = () => {
    const USER_EMAIL_ID = "jason@gmail.com";
    const USER_PASSWORD = "12345";
    setLoading(true);
    signin({ email: USER_EMAIL_ID, password: USER_PASSWORD })
      .then((data) => {
        if (data.errors) {
          setRedirect(false);
          setLoading(false);
          setError(data.errors[0].msg);
        } else if (data.error) {
          setRedirect(false);
          setLoading(false);
          setError(data.error);
        } else {
          authenticate(data);
          if (isAuthenticated()) {
            setRedirect(true);
            setLoading(true);
            setError(false);
          }
        }
      })
      .catch((error) => console.log("signin in request failed", error));
  };

  const performRedirect = () => {
    if (redirect && localStorage.getItem("cartItems")) {
      setRedirect(false);
      setLoading(false);
      window.location.href = "/";
    }
  };
  /*
   *********************************
   */

  return (
    <>
      <Navbar
        style={{ backgroundColor: "whitesmoke" }}
        expand="lg"
        className="px-5"
      >
        <Navbar.Brand className="font-weight-bold" href="/">
          <BsMusicNoteList color="red" /> Music Store
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          {useWindowSize()[0] > 992 ? (
            <Nav className="px-5">
              {isAuthenticated() ? (
                <>
                  <Nav.Link
                    onClick={() => {
                      redirectToProfilePage();
                    }}
                  >
                    {user.role === 1 ? "Admin" : user.name}
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      signout(() => {
                        saveUserCartItemsToDB(user._id, token);
                        cartEmpty();
                        window.location.href = "/";
                      });
                    }}
                  >
                    Sign Out
                  </Nav.Link>
                  {user.role !== 1 ? (
                    <Button onClick={redirectToCartPage}>
                      {redirect ? (
                        "Cart..."
                      ) : (
                        <>
                          <AiOutlineShoppingCart /> Cart{" "}
                          <Badge variant="light">{cartItemCount()}</Badge>
                        </>
                      )}
                    </Button>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <>
                  <Button
                    className="mr-1"
                    variant={!loading ? "outline-dark" : "dark"}
                    onClick={() => {
                      handleDemoAccount();
                    }}
                  >
                    {!loading ? (
                      "Demo Account"
                    ) : (
                      <>
                        Demo Account ...
                        <Spinner size="sm" animation="grow"></Spinner>
                      </>
                    )}
                  </Button>
                  <Button
                    className="mr-1"
                    variant="outline-dark"
                    onClick={() => setSignInModalShow(true)}
                  >
                    Signin
                  </Button>
                  ``
                  <Button
                    variant="primary"
                    className="font-weight-bold"
                    onClick={() => setSignUpModalShow(true)}
                  >
                    Signup
                  </Button>
                </>
              )}
            </Nav>
          ) : (
            <Nav>
              {isAuthenticated() ? (
                <>
                  <NavDropdown.Item
                    style={{ color: "#007bff" }}
                    onClick={() => {
                      redirectToProfilePage();
                    }}
                  >
                    {user.role === 1 ? "Admin" : user.name}
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => {
                      signout(() => {
                        cartEmpty();
                        window.location.href = "/";
                      });
                    }}
                  >
                    Sign Out
                  </NavDropdown.Item>
                  {user.role !== 1 ? (
                    <NavDropdown.Item onClick={redirectToCartPage}>
                      <AiOutlineShoppingCart /> Cart{" "}
                      <Badge variant="primary">{cartItemCount()}</Badge>
                    </NavDropdown.Item>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <>
                  <NavDropdown title="Signin/Signup">
                    <NavDropdown.Item onClick={() => setSignInModalShow(true)}>
                      Signin
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="font-weight-bold"
                      onClick={() => setSignUpModalShow(true)}
                    >
                      Signup
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavItem
                    className="mr-1"
                    style={{ color: "#007bff" }}
                    onClick={() => {
                      handleDemoAccount();
                    }}
                  >
                    {!loading ? (
                      "Demo Account"
                    ) : (
                      <>
                        Demo Account ...
                        <Spinner size="sm" animation="grow"></Spinner>
                      </>
                    )}
                  </NavItem>
                </>
              )}

              <NavDropdown.Divider></NavDropdown.Divider>
              <NavDropdown title="Musical Instruments" id="basic-nav-dropdown">
                <NavDropdown.Item href="/collections/guitars">
                  Guitars
                </NavDropdown.Item>
                <NavDropdown.Item href="/collections/pianos">
                  Keyboards & Pianos
                </NavDropdown.Item>
                <NavDropdown.Item href="/collections/ ">
                  Drums & Percussions
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Studio Recording" id="basic-nav-dropdown">
                <NavDropdown.Item href="/collections/microphones">
                  Microphones
                </NavDropdown.Item>
                <NavDropdown.Item href="/collections/softwares">
                  Software & Plugins
                </NavDropdown.Item>
                <NavDropdown.Item href="/collections/amplifiers">
                  Amplifiers
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title="Personal / Home Audio"
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="/collections/headphones">
                  Headphones
                </NavDropdown.Item>
                <NavDropdown.Item href="/collections/bluetooth-speakers">
                  Bluetooth Speakers
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="DJ / Live Sound" id="basic-nav-dropdown">
                <NavDropdown.Item href="/collections/dj-gear">
                  DJ Gear
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
      {/* 
        ************************************************
        SECOND NAVBAR FOR LARGE SCREEN 
        ************************************************        
       */}
      {useWindowSize()[0] > 992 ? (
        <Navbar
          style={{ backgroundColor: "whitesmoke" }}
          expand="lg"
          className="px-5"
        >
          <Nav style={{ width: "100%", justifyContent: "space-around" }}>
            <NavDropdown title="Musical Instruments" id="basic-nav-dropdown">
              <NavDropdown.Item href="/collections/guitars">
                Guitars
              </NavDropdown.Item>
              <NavDropdown.Item href="/collections/keyboards">
                Keyboards
              </NavDropdown.Item>
              <NavDropdown.Item href="/collections/pianos">
                Pianos
              </NavDropdown.Item>
              <NavDropdown.Item href="/collections/drums">
                Drums & Percussions
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Studio Recording" id="basic-nav-dropdown">
              <NavDropdown.Item href="/collections/microphones">
                Microphones
              </NavDropdown.Item>
              <NavDropdown.Item href="/collections/softwares">
                Software & Plugins
              </NavDropdown.Item>
              <NavDropdown.Item href="/collections/amplifiers">
                Amplifiers
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Personal / Home Audio" id="basic-nav-dropdown">
              <NavDropdown.Item href="/collections/headphones">
                Headphones
              </NavDropdown.Item>
              <NavDropdown.Item href="/collections/bluetooth-speakers">
                Bluetooth Speakers
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="DJ / Live Sound" id="basic-nav-dropdown">
              <NavDropdown.Item href="/collections/dj-gear">
                DJ Gear
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar>
      ) : (
        ""
      )}
      <SignIn show={signInModalShow} onHide={() => setSignInModalShow(false)} />
      <SignUp show={signUpModalShow} onHide={() => setSignUpModalShow(false)} />
    </>
  );
};

export default withRouter(TopBar);
