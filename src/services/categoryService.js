import axios from "axios";

const BASE_URL = "https://book-e-sell-node-api.vercel.app/api/category";

class CategoryService {
  GetAll = async (params) => {
    return axios.get(BASE_URL, { params });
  };

  GetAllCategory = async () => {
    return axios.get(`${BASE_URL}/all`);
  };

  Save = async (payload) => {
    return axios.post(BASE_URL, payload);
  };

  DeleteCategory = async (id) => {
    return axios.delete(`${BASE_URL}?id=${id}`);
  };

  UpdateCategory = async (payload) => {
    return axios.put(BASE_URL, payload);
  };

  GetCategoryById = async (id) => {
    return axios.get(`${BASE_URL}/byId?id=${id}`);
  };
}

// eslint-disable-next-line
export default new CategoryService();
