import axios from "axios";

const BASE_URL = "https://book-e-sell-node-api.vercel.app/api/user";

class BookService {
  //   SearchBook = async (payload) => {
  //     return axios.get(`${BASE_URL}/search?keyword=${payload}`);
  //   };

  GetAllUsers = async (params) => {
    return axios.get(`${BASE_URL}`, { params });
  };

  Save = async (payload) => {
    return axios.post(BASE_URL, payload);
  };

  GetUserById = async (id) => {
    return axios.get(`${BASE_URL}/byId?id=${id}`);
  };

  GetAllRoles = async () => {
    return axios.get(`${BASE_URL}/roles`);
  };

  UpdateUser = async (payload) => {
    return axios.put(BASE_URL, payload);
  };

  DeleteUser = async (id) => {
    return axios.delete(`${BASE_URL}?id=${id}`);
  };
}

// eslint-disable-next-line
export default new BookService();
