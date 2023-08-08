import * as React from "react";
import logo from "../img/Tatvasoft-logo-profile.jpg";
import { Link } from "react-router-dom";
import { Search, Cart4 } from "react-bootstrap-icons";

function Header() {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg "
        style={{ backgroundColor: "white", height: 92 }}
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img alt="TatvaSoft" src={logo} style={{ height: 92 }} />
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
              style={{ position: "absolute", right: 10 }}
            >
              <li className="nav-item">
                <Link className="nav-link " to="/" style={{ color: "#f14d54" }}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link disabled" to="#">
                  |
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="#" style={{ color: "#f14d54" }}>
                  Register
                </Link>
              </li>
            </ul>
          </div>
          <button
            className="btn "
            style={{
              border: "1px solid rgb(65,65,65)",
              color: "black",
              padding: "8px 15px",
            }}
          >
            <Cart4 color="#f14d54" size={20} />
            <span style={{ margin: 2, marginRight: 4, color: "#f14d54" }}>
              0
            </span>
            Cart
          </button>
        </div>
      </nav>
      <section
        className="d-flex justify-content-center align-items-center"
        style={{ height: 80, backgroundColor: "#f4f4f4" }}
      >
        <div className="d-flex" style={{ height: 40 }}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="What are you looking for..."
            aria-label="Search"
            style={{ width: 422, height: 40, color: "rgb(33,33,33)" }}
          />
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
            }}
          >
            <Search style={{ marginRight: 8 }} />
            Search
          </button>
          <button
            className="btn "
            style={{
              height: 40,
              margin: "0 10px",
              maxWidth: 129,
              fontSize: 16,
              backgroundColor: "#f14d54",
              color: "white",
              width: 120,
            }}
          >
            Cancel
          </button>
        </div>
      </section>
    </>
  );
}
export default Header;
