import axios from "axios";

const BASE_URL = "https://book-e-sell-node-api.vercel.app/api/user";

class AuthService {
  Register = async (payload) => {
    return axios.post(`${BASE_URL}`, payload);
  };

  Login = async (payload) => {
    return axios.post(`${BASE_URL}/login`, payload);
  };
}

// eslint-disable-next-line
export default new AuthService();
