import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
// import Register from "./page/Register";
import Header from "./component/Header";
import Login from "./page/Login";
import Footer from "./component/Footer";
import Register from "./page/Register";
import { Auth, useAuthContext } from "./context/authContext";
import Cookies from "js-cookie";
import BooksList from "./page/BooksList";
import Books from "./page/Books";
import EditBook from "./page/EditBook";

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
            path="/books"
            element={user ? <Books /> : navigate("/login")}
          />
          <Route
            exact
            path="/"
            element={user ? <BooksList /> : navigate("/login")}
          />
          <Route
            exact
            path="/add-book"
            element={user ? <EditBook /> : navigate("/login")}
          />
          <Route
            exact
            path="/edit-book/:id"
            element={user ? <EditBook /> : navigate("/login")}
          />
        </Routes>
        <Footer />
        <ToastContainer />
      </div>
    </Auth>
  );
}

export default App;
