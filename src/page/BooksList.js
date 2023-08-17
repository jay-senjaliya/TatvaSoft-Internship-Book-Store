import React, { useEffect, useMemo, useState } from "react";
import PageHeading from "../component/PageHeading";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Pagination,
  Typography,
} from "@mui/material";
import bookService from "../services/bookService";
import categoryService from "../services/categoryService";
import { useCartContext } from "../context/cartContext";
import { useAuthContext } from "../context/authContext";
import cartService from "../services/cartService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BooksList = () => {
  const cartContext = useCartContext();
  const context = useAuthContext();
  const { user } = context;
  const { cartData, updateCart } = cartContext;
  const [bookResponse, setBookResponse] = useState({
    pageIndex: 0,
    pageSize: 10,
    totalPages: 1,
    items: [],
    totalItems: 0,
  });
  const [categories, setCategories] = useState();
  const [sortBy, setSortBy] = useState("");
  const [filters, setFilters] = useState({
    pageIndex: 1,
    pageSize: 10,
    keyword: "",
  });

  useEffect(() => {
    GetAllCategories();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filters.keyword === "") delete filters.keyword;
      searchAllBooks({ ...filters });
    }, 500);
    return () => clearTimeout(timer);
  }, [filters]);

  const searchAllBooks = async (filters) => {
    await bookService.GetAllBooks(filters).then((res) => {
      setBookResponse(res.data.result);
    });
  };

  const GetAllCategories = async () => {
    await categoryService.GetAllCategory().then((res) => {
      if (res && res.status === 200) {
        setCategories(res.data.result);
      }
    });
  };

  const books = useMemo(() => {
    const bookList = [...bookResponse.items];
    if (bookList) {
      return bookList;
    }
    return [];
    // eslint-disable-next-line
  }, [categories, bookResponse]);

  const handleSort = (e) => {
    setSortBy(e.target.value);
    const bookList = [...bookResponse.items];

    bookList.sort((a, b) => {
      if (a.name < b.name) {
        return e.target.value === "a-z" ? -1 : 1;
      }
      if (a.name > b.name) {
        return e.target.value === "a-z" ? 1 : -1;
      }
      return 0;
    });
    setBookResponse({ ...bookResponse, items: bookList });
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

  return (
    <>
      <PageHeading heading="Book Listing " />
      <div
        className="book-list-page  "
        style={{
          fontFamily: "'Roboto', sans-serif",
          margin: "50px auto 0px auto",
          width: 1090,
        }}
      >
        <div
          className="book-list-page-upperpart"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 0px",
          }}
        >
          <p style={{ fontSize: 18, color: "#414141", margin: "auto 0px" }}>
            {`Total - ${bookResponse.totalItems} items`}
          </p>
          <div
            style={{
              width: 550,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search..."
              aria-label="Search"
              style={{
                width: 259.33,
                height: 33.8,
                color: "rgb(33,33,33)",
                borderRadius: 0,
              }}
              value={filters.keyword}
              onChange={(e) => {
                setFilters({
                  ...filters,
                  keyword: e.target.value,
                  pageIndex: 1,
                });
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  fontSize: 16,
                  color: "#9f9696",
                  margin: "auto 5px auto auto",
                }}
              >
                Sort By
              </p>
              <select
                className="form-select"
                aria-label="Default select example"
                style={{
                  heigth: 40,
                  width: 200,
                  borderRadius: 0,
                }}
                value={sortBy}
                onChange={handleSort}
              >
                <option value="" hidden></option>
                <option value="a-z">a - z</option>
                <option value="z-a">z - a</option>
              </select>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            maxWidth: 1120,
            flexWrap: "wrap",
            gap: 30,
            marginTop: 10,
          }}
        >
          {books.map((book, index) => {
            return (
              <Card
                key={index}
                sx={{
                  width: 250,
                  border: "1px solid #cacaca",
                  boxShadow: "none",
                  borderRadius: 2,
                }}
              >
                <CardMedia
                  sx={{ height: 200, width: 250 }}
                  image={book.base64image}
                  title={book.name}
                />
                <CardContent sx={{ padding: "15px 12px" }}>
                  <div style={{ height: 28 }}>
                    <p
                      style={{
                        fontSize: 22,
                        color: "blck",
                        fontWeight: 600,
                        margin: "0px auto 2px 0px",
                        padding: 0,
                        width: 226,
                      }}
                    >
                      {/* {book.name} */}
                      {book.name.slice(0, 17) +
                        `${book.name.length > 17 ? "..." : ""}`}
                    </p>
                  </div>
                  <div style={{ height: 30 }}>
                    <p
                      style={{
                        color: "#838383",
                        fontSize: 15,
                        margin: "0px auto 5px 0px",
                        paddingBottom: 8,
                        fontWeight: 500,
                        height: 10,
                      }}
                    >
                      {book.category}
                    </p>
                  </div>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontWeight: 500, height: 35, color: "rgb(65,65,65)" }}
                  >
                    {book.description.slice(0, 55) +
                      `${book.description.length > 55 ? "..." : ""}`}
                  </Typography>
                  <div style={{ height: 20 }}>
                    <p
                      style={{
                        color: "#838383",
                        fontWeight: 500,
                        margin: "20px auto 0px 0px",
                      }}
                    >
                      MRP &#8377; {book.price}
                    </p>
                  </div>
                </CardContent>
                <CardActions>
                  <button
                    className="btn"
                    style={{
                      backgroundColor: "#f14d54",
                      width: "100%",
                      fontWeight: 600,
                      color: "white",
                      margin: "2px 3px 8px 3px",
                      bottom: 8,
                    }}
                    onClick={() => addItem(book)}
                  >
                    ADD TO CART
                  </button>
                </CardActions>
              </Card>
            );
          })}
        </div>
        <div style={{ margin: "40px auto 80px auto" }}>
          <Pagination
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            color="error"
            count={bookResponse.totalPages}
            page={filters.pageIndex}
            onChange={(e, newPage) => {
              setFilters({ ...filters, pageIndex: newPage });
            }}
          />
        </div>
      </div>
    </>
  );
};

export default BooksList;
