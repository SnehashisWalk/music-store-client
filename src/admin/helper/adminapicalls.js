import { API } from "../../backend";

//category calls

//CREATE A CATEGORY
export const createCategory = (userId, token, category) => {
  //   console.log("fetch call", category);
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

//GET ALL CATEGORIES
export const getAllCategories = () => {
  return fetch(`${API}/categories`).then((res) => res.json());
};

//UPDATE A CATEGORY
export const updateCategory = (userId, category, token, newCategory) => {
  const categoryId = category._id;
  return fetch(`${API}/category/${categoryId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newCategory),
  }).then((res) => res.json());
};

//DELETE A CATEGORY
export const deleteCategory = (userId, token, category) => {
  const categoryId = category._id;
  return fetch(`${API}/category/${categoryId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

//PRODUCT CALLS

//CREATE A PRODUCT
export const createProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: product,
  }).then((res) => res.json());
};
