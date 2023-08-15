import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Header from "./component/Header";
import Login from "./page/Login";
import Footer from "./component/Footer";
import Register from "./page/Register";
import { Auth, useAuthContext } from "./context/authContext";
import BooksList from "./page/BooksList";
import Books from "./page/Books";
import EditBook from "./page/EditBook";
import Users from "./page/Users";
import EditUser from "./page/EditUser";
import EditCategory from "./page/EditCategory";
import Category from "./page/Category";
import UpdateProfile from "./page/UpdateProfile";

function App() {
  const context = useAuthContext();
  const { user } = context;
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
          <Route
            exact
            path="/users"
            element={user ? <Users /> : navigate("/login")}
          />
          <Route
            exact
            path="/add-user"
            element={user ? <EditUser /> : navigate("/login")}
          />
          <Route
            exact
            path="/edit-user/:id"
            element={user ? <EditUser /> : navigate("/login")}
          />
          <Route
            exact
            path="/category"
            element={user ? <Category /> : navigate("/login")}
          />
          <Route
            exact
            path="/add-category"
            element={user ? <EditCategory /> : navigate("/login")}
          />
          <Route
            exact
            path="/edit-category/:id"
            element={user ? <EditCategory /> : navigate("/login")}
          />
          <Route
            exact
            path="/update-profile"
            element={user ? <UpdateProfile /> : navigate("/login")}
          />
        </Routes>
        <Footer />
        <ToastContainer />
      </div>
    </Auth>
  );
}

export default App;
