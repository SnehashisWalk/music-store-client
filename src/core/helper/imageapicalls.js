import { API } from "../../backend";

export const getProductImages = (products) => {
  return `${API}/product/photo/${products._id}`;
  //return <img src={imageUrl} style={{ maxHeight: "100%", maxWidth: "100%" }} />;
};
