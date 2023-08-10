import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./component/Home";
import Name from "./component/Name";
import Price from "./component/Price";
import Form from "./component/Form";
import { ToastContainer } from "react-toastify";
// import Register from "./page/Register";
import Header from "./component/Header";
import Login from "./page/Login";
import Footer from "./component/Footer";
import Register from "./page/Register";
import Auth from "./context/Auth";
import Cookies from "js-cookie";

function App() {
  // const navigate = useNavigate();
  // const data = Cookies.get("userInfo");
  // const user = data ? JSON.parse(data) : undefined;
  return (
    <Auth>
      <div id="main">
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          {/* <Route path="/book-name" element={<Name name={bookName} />} />
            <Route path="/book-price" element={<Price price={bookPrice} />} /> */}
          <Route path="/form" element={<Form />} />
        </Routes>
        <Footer />
        <ToastContainer />
      </div>
    </Auth>
  );
}

export default App;
