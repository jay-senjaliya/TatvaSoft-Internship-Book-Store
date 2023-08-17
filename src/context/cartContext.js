import React, { createContext, useContext, useEffect, useState } from "react";
import cartService from "../services/cartService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bookService from "../services/bookService";
import { useAuthContext } from "./authContext";

const initialState = {
  cartData: [],
  updateCart: () => {},
  emptyCart: () => {},
};

export const CartContext = createContext(initialState);

export const CartWrraper = ({ children }) => {
  const context = useAuthContext();
  const { user } = context;
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    updateCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  const updateCart = (updatedCartList) => {
    if (updatedCartList) {
      setCartData(updatedCartList);
    } else if (user.id) {
      cartService
        .GetCartItems(user.id)
        .then((res) => setCartData(res.data.result));
    }
  };
  const emptyCart = () => {
    setCartData([]);
  };
  let value = {
    cartData,
    updateCart,
    emptyCart,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  return useContext(CartContext);
};
