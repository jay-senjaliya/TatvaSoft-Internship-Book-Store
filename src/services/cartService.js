import axios from "axios";

const BASE_URL = "https://book-e-sell-node-api.vercel.app/api/cart";

class BookService {
  GetCartItems = async (id) => {
    return axios.get(`${BASE_URL}?userId=${id}`);
  };

  AddCartItem = async (payload) => {
    return axios.post(BASE_URL, payload);
  };

  DelteCartItem = async (id) => {
    return axios.delete(`${BASE_URL}?id=${id}`);
  };

  UpdateCart = async (payload) => {
    return axios.put(BASE_URL, payload);
  };

  removeItem = async (id) => {
    return axios.delete(`${BASE_URL}?id=${id}`);
    //   .then((res) => {
    //     return res;
    //   })
    //   .catch((e) => {
    //     return e;
    //   });
  };

  Order = async (payload) => {
    return axios.post(
      "https://book-e-sell-node-api.vercel.app/api/order",
      payload
    );
  };
}

// eslint-disable-next-line
export default new BookService();
