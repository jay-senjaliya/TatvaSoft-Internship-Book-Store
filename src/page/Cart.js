import React, { useEffect, useState } from "react";
import PageHeading from "../component/PageHeading";
import image from "./../img/site-logo.svg";
import { useAuthContext } from "../context/authContext";
import cartService from "../services/cartService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCartContext } from "../context/cartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const context = useAuthContext();
  const cartContext = useCartContext();
  const navigate = useNavigate();
  const { user } = context;
  const { cartData, updateCart } = cartContext;
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    setCartList(cartData);
    setTotalItems(cartData.length);
    updateTotalPrice(cartData);
  }, [cartData]);

  const updateTotalPrice = (data) => {
    if (Array.isArray(data)) {
      let price = 0;
      data.forEach((item) => {
        price += item.quantity * parseInt(item.book.price);
      });

      setTotalPrice(price);
    }
  };

  const removeItem = async (id) => {
    const res = await cartService
      .removeItem(id)
      .then((res) => {
        if (res && res.status === 200) {
          cartContext.updateCart();
          toast.success("Item removed successfully!", {
            position: "bottom-right",
          });
        }
      })
      .catch((err) => {
        toast.error(err.response.data.error, { position: "bottom-right" });
      });
  };

  const updateQuantity = (data, text) => {
    if (text === "dec" && data.quantity === 1) {
      toast.error("can't decrement to zero!", { position: "bottom-right" });
      return;
    }
    if (text === "inc") {
      const payload = {
        id: data.id,
        userId: user.id,
        bookId: data.book.id,
        quantity: data.quantity + 1,
      };
      console.log(payload);
      cartService.UpdateCart(payload).then((res) => {
        const updatedCartList = cartList.map((item) =>
          item.id === data.id ? { ...item, quantity: data.quantity + 1 } : item
        );
        updateCart(updatedCartList);
        updateTotalPrice();
        toast.success("quanttity updated");
      });
    }
    if (text === "dec") {
      const payload = {
        id: data.id,
        userId: user.id,
        bookId: data.book.id,
        quantity: data.quantity - 1,
      };
      cartService.UpdateCart(payload).then((res) => {
        const updatedCartList = cartList.map((item) =>
          item.id === data.id ? { ...item, quantity: data.quantity - 1 } : item
        );
        updateCart(updatedCartList);
        updateTotalPrice();
        toast.success("quanttity updated", { position: "bottom-right" });
      });
    }
  };

  const placeOrder = async () => {
    if (user.id) {
      const userCart = cartData;
      if (userCart.length) {
        let cartIds = userCart.map((element) => element.id);
        const newOrder = {
          userId: user.id,
          cartIds,
        };
        cartService
          .Order(newOrder)
          .then((res) => {
            cartContext.updateCart();
            navigate("/");
            toast.success("Order Placed!", { position: "bottom-right" });
          })
          .catch((err) => {
            toast.error(err.response.data.error, { position: "bottom-right" });
          });
      } else {
        toast.error("Your cart is empty", { position: "bottom-right" });
      }
    }
  };

  return (
    <>
      <PageHeading heading="Cart Page" />
      <div
        className=" mx-auto"
        style={{
          marginTop: 50,
          fontFamily: "'Roboto', sans-serif",
          width: 585.2,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1 style={{ fontSize: 18, color: "#414141" }}>
            My Shopping Bag ({totalItems} Items)
          </h1>
          <p style={{ fontSize: 15, color: "#414141" }}>
            Total price: {totalPrice}
          </p>
        </div>
        <div className="cart-items">
          {cartList.map((item) => {
            return (
              <div
                className="cart-item-card"
                style={{
                  display: "flex",
                  border: "1px solid #cacaca",
                  borderRadius: 4,
                  padding: 15,
                  marginTop: 30,
                }}
              >
                <div>
                  <img
                    src={item.book.base64image}
                    alt="cart-item-img"
                    style={{
                      height: 117.2,
                      width: 150,
                      borderRadius: 2,
                    }}
                  />
                </div>
                <div
                  className="px-4 w-100"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: 15,
                        color: "#414141",
                        fontWeight: 700,
                        marginBottom: 10,
                        height: 15,
                      }}
                    >
                      {item.book.name}
                    </p>
                    <p
                      style={{
                        color: "#f14d54",
                        fontSize: 14,
                        marginBottom: 15,
                        height: 14,
                      }}
                    >
                      Cart item name
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <button
                        className="btn"
                        style={{
                          height: 25,
                          width: 25,
                          backgroundColor: "#f14d54",
                          color: "white",
                          fontWeight: 600,
                          borderRadius: 0,
                          border: "none",
                          padding: 0.5,
                        }}
                        onClick={() => {
                          updateQuantity(item, "inc");
                        }}
                      >
                        +
                      </button>
                      <button
                        className="btn"
                        style={{
                          height: 25,
                          width: 25,
                          color: "#414141",
                          fontWeight: 500,
                          borderRadius: 0,
                          border: "1px solid #cacaca",
                          padding: 0.5,
                        }}
                      >
                        {item.quantity}
                      </button>
                      <button
                        className="btn"
                        style={{
                          height: 25,
                          width: 25,
                          backgroundColor: "#f14d54",
                          color: "white",
                          fontWeight: 600,
                          borderRadius: 0,
                          border: "none",
                          padding: 0.5,
                        }}
                        onClick={() => {
                          updateQuantity(item, "dec");
                        }}
                      >
                        -
                      </button>
                    </div>
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: 15,
                        color: "#414141",
                        fontWeight: 700,
                        marginBottom: 5,
                        height: 15,
                        textAlign: "right",
                      }}
                    >
                      MRP &#8377;{item.book.price}
                    </p>
                    <p
                      style={{
                        color: "#f14d54",
                        fontSize: 14,
                        marginBottom: 20,
                        height: 14,
                        textAlign: "right",
                        fontWeight: 700,
                      }}
                    ></p>
                    <p
                      className="cart-remove-btn"
                      style={{
                        color: "#f14d54",
                        fontSize: 14,
                        marginBottom: 15,
                        height: 14,
                        textAlign: "right",
                      }}
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 35, marginBottom: 80 }}>
          <button
            className="btn"
            style={{
              backgroundColor: "#f14d54",
              color: "white",
              width: 139.75,
              height: 40,
              fontWeight: 600,
              borderRadius: 0,
            }}
            onClick={placeOrder}
          >
            Place order
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
