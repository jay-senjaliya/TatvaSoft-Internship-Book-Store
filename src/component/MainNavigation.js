import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import Login from "../page/Login";
import Register from "../page/Register";
import BooksList from "../page/BooksList";
import Users from "../page/Users";
import EditUser from "../page/EditUser";
import Category from "../page/Category";
import EditCategory from "../page/EditCategory";
import Books from "../page/Books";
import EditBook from "../page/EditBook";
import Cart from "../page/Cart";
import UpdateProfile from "../page/UpdateProfile";

const RoutePaths = {
  Login: "/login",
  Register: "/register",
  User: "/users",
  EditUser: "/edit-user/:id",
  Category: "/category",
  EditCategory: "/edit-category/:id",
  AddCategory: "/add-category",
  Book: "/books",
  EditBook: "/edit-book/:id",
  AddBook: "/add-book",
  BookListing: "/",
  Cart: "/Cart",
  UpdateProfile: "/update-profile",
};
const AppRoutes = () => {
  const authContext = useAuthContext();
  // console.log(authContext);
  const Redirect = <Navigate to={RoutePaths.Login} />;

  return (
    <Routes>
      <Route exact path={RoutePaths.Login} element={<Login />} />
      <Route
        exact
        path={RoutePaths.Register}
        element={!authContext.user.id ? <Register /> : Redirect}
      />
      <Route
        exact
        path={RoutePaths.BookListing}
        element={authContext.user.id ? <BooksList /> : Redirect}
      />

      <Route
        exact
        path={RoutePaths.User}
        element={authContext.user.id ? <Users /> : Redirect}
      />
      <Route
        exact
        path={RoutePaths.EditUser}
        element={authContext.user.id ? <EditUser /> : Redirect}
      />
      <Route
        exact
        path={RoutePaths.Category}
        element={authContext.user.id ? <Category /> : Redirect}
      />
      <Route
        exact
        path={RoutePaths.EditCategory}
        element={authContext.user.id ? <EditCategory /> : Redirect}
      />
      <Route
        exact
        path={RoutePaths.AddCategory}
        element={authContext.user.id ? <EditCategory /> : Redirect}
      />
      <Route
        exact
        path={RoutePaths.Book}
        element={authContext.user.id ? <Books /> : Redirect}
      />
      <Route
        exact
        path={RoutePaths.EditBook}
        element={authContext.user.id ? <EditBook /> : Redirect}
      />
      <Route
        exact
        path={RoutePaths.AddBook}
        element={authContext.user.id ? <EditBook /> : Redirect}
      />

      <Route
        exact
        path={RoutePaths.Cart}
        element={authContext.user.id ? <Cart /> : Redirect}
      />
      <Route
        exact
        path={RoutePaths.UpdateProfile}
        element={authContext.user.id ? <UpdateProfile /> : Redirect}
      />
    </Routes>
  );
};

export default AppRoutes;
