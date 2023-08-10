import axios from "axios";

const BASE_URL = "https://book-e-sell-node-api.vercel.app/api/book";

class BookService {
  SearchBook = async (payload) => {
    return axios.get(`${BASE_URL}/search?keyword=${payload}`);
  };
}

// eslint-disable-next-line
export default new BookService();
