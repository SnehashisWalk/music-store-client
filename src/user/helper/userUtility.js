import { API } from "../../backend";

export const saveUserAddresses = (userId, token, userAddresses) => {
  return fetch(`${API}/user/${userId}/addresses`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userAddresses),
  }).then((res) => res.json());
};

export const fetchUserAddresses = (userId, token) => {
  return fetch(`${API}/user/${userId}/addresses`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const deleteUserAddress = (userId, token, addressId) => {
  return fetch(`${API}/user/${userId}/addresses/${addressId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};
