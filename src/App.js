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
import { Auth, useAuthContext } from "./context/authContext";
import Cookies from "js-cookie";
import Books from "./page/BooksList";

function App() {
  const context = useAuthContext();
  const { user } = context;
  // console.log(user);
  const navigate = useNavigate();
  return (
    <Auth>
      <div id="main">
        <Header />
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route
            exact
            path="/books-list"
            element={user ? <Books /> : navigate("/login")}
          />
          <Route
            exact
            path="/"
            element={user ? <Home /> : navigate("/login")}
          />
          <Route exact path="/form" element={<Form />} />
        </Routes>
        <Footer />
        <ToastContainer />
      </div>
    </Auth>
  );
}

export default App;
