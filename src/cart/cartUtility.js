import { API } from "../backend";

export const addItemtoCart = (props) => {
  //   let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

  console.log(props);

  const userCartObject = {
    _id: props.product._id,
    category: {
      categoryId: props.product.category._id,
      categoryName: props.product.category.name,
      subCategory: props.product.subCategory,
    },
    createdAt: props.product.createdAt,
    updatedAt: props.product.updatedAt,
    productDetails: {
      productName: props.product.name,
      productDescription: props.product.description,
      productPrice: props.product.price,
      productQuantity: 1,
    },
  };

  let cartItems = [];

  if (typeof window !== undefined) {
    if (localStorage.getItem("cartItems")) {
      cartItems = JSON.parse(localStorage.getItem("cartItems"));
      if (cartItems.length === 0) {
        cartItems[0].cart.push(userCartObject);
      } else {
        let itemPushed = false;
        cartItems[0].cart.map((cartItem) => {
          if (cartItem._id === userCartObject._id) {
            itemPushed = true;
            cartItem.productDetails.productQuantity++;
          }
        });
        if (!itemPushed) {
          cartItems[0].cart.push(userCartObject);
        }
      }
    } else {
      cartItems.push({
        cart: [userCartObject],
      });
    }
  }
  console.log(cartItems);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const loadUserCartItemsFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cartItems")) {
      return JSON.parse(localStorage.getItem("cartItems"));
    }
  }
};

export const removeCartItem = (itemId) => {
  let cartItems = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cartItems")) {
      cartItems = JSON.parse(localStorage.getItem("cartItems"));
    }
    cartItems[0].cart.map((cartItem, index) => {
      if (cartItem._id === itemId) {
        cartItems[0].cart.splice(index, 1);
      }
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
};

export const getTotalPrice = () => {
  let cartItems = [];
  let totalPrice = 0;
  if (typeof window !== undefined) {
    if (localStorage.getItem("cartItems")) {
      cartItems = JSON.parse(localStorage.getItem("cartItems"));
      cartItems[0].cart.map((cartItem) => {
        totalPrice +=
          cartItem.productDetails.productPrice *
          cartItem.productDetails.productQuantity;
      });
    }
  }
  return totalPrice;
};

export const cartItemCount = () => {
  let cartItems = [];
  let itemCount = 0;
  if (typeof window !== undefined) {
    if (localStorage.getItem("cartItems")) {
      cartItems = JSON.parse(localStorage.getItem("cartItems"));
      itemCount = cartItems[0]?.cart?.length;
    }
  }
  return itemCount;
};

export const getUniqueItemCount = (itemId) => {
  let cartItems = [];
  let itemCount = 0;
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cartItems")) {
      cartItems = JSON.parse(localStorage.getItem("cartItems"));
    }
    cartItems.cart.map((cartItem, index) => {
      if (cartItem._id === itemId) {
        itemCount = cartItem.productDetails.productQuantity;
      }
    });
  }
  return itemCount;
};

export const updateCartItemCount = (itemId, itemCount) => {
  let cartItems = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cartItems")) {
      cartItems = JSON.parse(localStorage.getItem("cartItems"));
    }

    cartItems[0].cart.map((cartItem) => {
      if (cartItem._id === itemId) {
        cartItem.productDetails.productQuantity = itemCount;
      }
    });
    localStorage.removeItem("cartItems");
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
};

export const cartEmpty = () => {
  console.log("inside");
  if (typeof window !== "undefined") {
    let cartItems = JSON.parse(localStorage.getItem("cartItems"));
    cartItems[0].cart = [];
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
};

//SAVE CART ITEMS IN USER DB
export const saveUserCartItemsToDB = (userId, token) => {
  const data = loadUserCartItemsFromLocalStorage();
  // console.log("USER CART DATA", JSON.stringify(data));
  fetch(`${API}/user/${userId}/cart`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

//LOAD USER CART FROM DB
export const loadUserCartItemsFromDB = (userId, token) => {
  return fetch(`${API}/user/${userId}/cart`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

//SAVE USER CART DETAILS IN LOCALSTORAGE AFTER FETCHING FROM DB
export const saveUserCartItemsToLocalStorage = (cartDetails) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cartItems", JSON.stringify(cartDetails));
  }
};
