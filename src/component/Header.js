import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Cart4, CartDash } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bookService from "../services/bookService";
import { useAuthContext } from "../context/authContext";
import siteLogo from "./../img/site-logo.svg";
import { useCartContext } from "../context/cartContext";
import cartService from "../services/cartService";

function Header() {
  const context = useAuthContext();
  const cartContext = useCartContext();
  const { signOut, user } = context;
  const { cartData, updateCart } = cartContext;
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [bookSearch, setBookSearch] = useState("");
  const [searchResultList, setSearchResultList] = useState([]);
  const [loading, setLoading] = useState();
  const userInfo = user.email ? user : null;
  const navigate = useNavigate();

  const handleLogOut = () => {
    toast.success("User Logged out successfully!", {
      position: "bottom-right",
    });
    signOut();
  };

  const addItem = (book) => {
    const payload = {
      bookId: book.id,
      userId: user.id,
      quantity: 1,
    };
    cartService
      .AddCartItem(payload)
      .then((res) => {
        if (res && res.status === 200) {
          updateCart();
          toast.success("Item added successfully!!", {
            position: "bottom-right",
          });
        }
      })
      .catch((err) => {
        toast.error(err.response.data.error, {
          position: "bottom-right",
        });
      });
  };

  useEffect(() => {
    setTotalCartItem(cartData.length);
  }, [cartContext]);

  useEffect(() => {
    if (bookSearch.length === 0) {
      document.getElementById("overlay").style.display = "none";
    }
    if (bookSearch.length) {
      const timer = setTimeout(() => {
        setLoading(false);
        handleSearch();
      }, 500);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line
  }, [bookSearch]);

  const handleSearch = async () => {
    const payload = bookSearch;
    await bookService
      .SearchBook(payload)
      .then((res) => {
        setSearchResultList(res.data.result);
      })
      .catch((err) => {
        setSearchResultList([]);
      });
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg "
        style={{ backgroundColor: "white", height: 92 }}
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img alt="TatvaSoft" src={siteLogo} style={{ height: 52 }} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse  "
            id="navbarSupportedContent"
            style={{ position: "relative" }}
          >
            <ul
              className="navbar-nav me-auto mb-2 mb-lg-0  "
              style={{
                position: "absolute",
                right: 10,
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              {!userInfo && (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link "
                      to="/login"
                      style={{ color: "#f14d54" }}
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link disabled" to="">
                      |
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link "
                      to="/register"
                      style={{ color: "#f14d54" }}
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
              {userInfo && (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link "
                      to="/users"
                      style={{ color: "#f14d54" }}
                    >
                      Users
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link disabled" to="#">
                      |
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link "
                      to="/category"
                      style={{ color: "#f14d54" }}
                    >
                      Categories
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link disabled" to="#">
                      |
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link "
                      to="/books"
                      style={{ color: "#f14d54" }}
                    >
                      Books
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link disabled" to="#">
                      |
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link "
                      to="/update-profile"
                      style={{ color: "#f14d54" }}
                    >
                      Update Profile
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <button
            className="btn "
            style={{
              border: "1px solid #cacaca",
              color: "rgb(65,65,65)",
              padding: "8px 15px",
              marginRight: 20,
              fontFamily: "'Roboto', sans-serif",
            }}
            onClick={() => navigate("cart")}
          >
            <Cart4 color="#f14d54" size={20} />
            <span style={{ margin: 2, marginRight: 4, color: "#f14d54" }}>
              {totalCartItem}
            </span>
            Cart
          </button>
          {userInfo && (
            <button
              className="btn "
              style={{
                border: "1px solid #cacaca",
                color: "rgb(65,65,65)",
                padding: "8px 15px",
                fontFamily: "'Roboto', sans-serif",
                fontSize: 15,
                fontWeight: 600,
              }}
              onClick={handleLogOut}
            >
              LOG OUT
            </button>
          )}
        </div>
      </nav>
      <section
        className="d-flex justify-content-center align-items-center"
        style={{ height: 80, backgroundColor: "#f4f4f4" }}
      >
        <div className="d-flex" style={{ height: 40 }}>
          <div style={{ position: "relative" }}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="What are you looking for..."
              aria-label="Search"
              style={{ width: 422, height: 40, color: "rgb(33,33,33)" }}
              value={bookSearch}
              onChange={(e) => {
                document.getElementById("overlay").style.display = "block";
                setLoading(true);
                setBookSearch(e.target.value);
              }}
            />
            <div
              id="overlay"
              className="overlay"
              style={{
                width: 422,
                backgroundColor: "#fff",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                padding: 20,
                fontFamily: "'Roboto', sans-serif",
                display: "none",
                maxHeight: 350,
                overflow: "auto",
              }}
            >
              {!loading && searchResultList.length === 0 && (
                <p style={{ margin: "5px auto 0px 0px", color: "#f14d54" }}>
                  No product found
                </p>
              )}
              {loading && (
                <p style={{ margin: "15px auto 0px 0px", color: "#f14d54" }}>
                  Loading....
                </p>
              )}
              {searchResultList.map((book) => {
                return (
                  <div
                    className="book-info"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      margin: "30px auto 0px 0px",
                    }}
                    key={book.id}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <p
                        style={{
                          fontSize: 16,
                          margin: "2px auto 2px 0px",
                          fontWeight: 500,
                        }}
                      >
                        {book.name}
                      </p>
                      <p
                        style={{
                          fontSize: 14,
                          color: "#838383",
                          margin: "1px auto 0px 0px",
                          fontWeight: 500,
                        }}
                      >
                        {book.category}
                      </p>
                      <p
                        style={{
                          fontSize: 14,
                          color: "#838383",
                          margin: "0px auto 2px 0px",
                          fontWeight: 500,
                        }}
                      >
                        {`${book.description.slice(0, 40)} ${
                          book.description.length > 40 ? "..." : ""
                        }`}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <p
                        style={{
                          fontSize: 14,
                          color: "#414141",
                          marginBottom: 2,
                        }}
                      >
                        {book.price}
                      </p>
                      <p
                        className="globalsearch-add-to-cart"
                        style={{ marginTop: 0, color: "#f14d54" }}
                        onClick={() => addItem(book)}
                      >
                        Add to Cart
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <button
            className="btn "
            style={{
              height: 40,
              margin: "0 10px",
              maxWidth: 129,
              fontSize: 16,
              backgroundColor: "#80BF32",
              color: "white",
              width: 120,
              fontFamily: "'Roboto', sans-serif",
            }}
            onClick={handleSearch}
          >
            <Search style={{ marginRight: 8 }} />
            Search
          </button>

          {/* <button
            className="btn "
            style={{
              height: 40,
              margin: "0 10px",
              maxWidth: 129,
              fontSize: 16,
              backgroundColor: "#f14d54",
              color: "white",
              width: 120,
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            Cancel
          </button> */}
        </div>
      </section>
    </>
  );
}
export default Header;
