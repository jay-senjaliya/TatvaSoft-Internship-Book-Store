import React from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Header from "./component/Header";
import Footer from "./component/Footer";
import { Auth } from "./context/authContext";
import MainNavigation from "./component/MainNavigation";
import { BrowserRouter as Router } from "react-router-dom";
import { CartWrraper } from "./context/cartContext";

function App() {
  return (
    <React.Suspense fallback={<></>}>
      <Router>
        <Auth>
          <CartWrraper>
            <div id="main">
              <Header />
              <main>
                <MainNavigation />
              </main>
              <Footer />
              <ToastContainer />
            </div>
          </CartWrraper>
        </Auth>
      </Router>
    </React.Suspense>
  );
}

export default App;
