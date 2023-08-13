import axios from "axios";

const BASE_URL = "https://book-e-sell-node-api.vercel.app/api/category";

class CategoryService {
  GetAll = async () => {
    return axios.get(`${BASE_URL}/all`);
  };
}

// eslint-disable-next-line
export default new CategoryService();
