import React, { useEffect, useState } from "react";
import PageHeading from "../component/PageHeading";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import bookService from "../services/bookService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationDialog from "../component/ConfirmationDialog";

const Books = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);
  const [filters, setFilters] = useState({
    pageIndex: 1,
    pageSize: 10,
    keyword: "",
  });
  const [bookRecords, setBookRecords] = useState({
    pageIndex: 0,
    pageSize: 10,
    totalPages: 1,
    items: [],
    totalItems: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filters.keyword === "") delete filters.keyword;
      searchAllBooks({ ...filters });
    }, 500);
    return () => clearTimeout(timer);
  }, [filters]);

  const searchAllBooks = async (filters) => {
    await bookService.GetAllBooks(filters).then((res) => {
      setBookRecords(res.data.result);
    });
  };

  const handleDelete = async (id) => {
    await bookService
      .DeleteBook(id)
      .then((res) => {
        if (res && res.status === 200) {
          setOpen(false);
          toast.success("Record deleted successfully!", {
            position: "bottom-right",
          });
          navigate("/books");
        }
      })
      .catch((err) => {
        toast.error(err.response.data.error, { position: "bottom-right" });
      });
  };

  const columns = [
    { id: "name", label: "Book Name", minWidth: 100 },
    { id: "price", label: "Price", minWidth: 100 },
    { id: "category", label: "Category", minWidth: 100 },
  ];

  return (
    <>
      <PageHeading heading="Book" />
      <div
        className="books-page container"
        style={{ marginTop: 45, fontFamily: "'Roboto', sans-serif" }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search..."
            aria-label="Search"
            style={{
              width: 300,
              height: 40,
              color: "rgb(65,65,65)",
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
          <button
            className="btn"
            style={{
              width: 100,
              height: 40,
              color: "white",
              backgroundColor: "#f14d54",
              borderRadius: 0,
            }}
            onClick={() => navigate("/add-book")}
          >
            Add
          </button>
        </div>
        <div style={{ marginTop: 32, marginBottom: 80 }}>
          <TableContainer>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => {
                    return (
                      <TableCell
                        key={column.id}
                        style={{
                          minWidth: column.minWidth,
                          fontWeight: 600,
                          fontSize: 14,
                          color: "#212121",
                        }}
                      >
                        {column.label}
                      </TableCell>
                    );
                  })}
                  <TableCell style={{ width: 10 }}> </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookRecords?.items?.map((book, index) => {
                  return (
                    <TableRow
                      key={index}
                      style={{ fontSize: 14, color: "#212121" }}
                    >
                      <TableCell align="left">{book.name}</TableCell>
                      <TableCell align="left">{book.price}</TableCell>
                      <TableCell align="left">{book.category}</TableCell>
                      <TableCell align="right" style={{ width: 250 }}>
                        <button
                          className="btn"
                          style={{
                            border: "2px solid #80BF32",
                            color: "#80BF32",
                            marginRight: 10,
                            width: 80,
                            height: 30,
                            padding: "3px 10px",
                          }}
                          onClick={() => navigate(`/edit-book/${book.id}`)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn"
                          style={{
                            border: "2px solid #f14d54",
                            color: "#f14d54",
                            width: 80,
                            height: 30,
                            padding: 3,
                          }}
                          onClick={() => {
                            setId(book.id);
                            setOpen(true);
                          }}
                        >
                          Delete
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {bookRecords?.items?.length === 0 && (
                  <TableRow className="w-100">
                    <TableCell align="center" colSpan={4}>
                      No Book Found..
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <div style={{ margin: "40px auto 80px auto" }}>
            <TablePagination
              rowsPerPageOptions={[2, 5, 10, 100]}
              component="div"
              count={bookRecords.totalItems}
              rowsPerPage={filters.pageSize || 0}
              page={filters.pageIndex - 1}
              onPageChange={(e, newPage) => {
                setFilters({ ...filters, pageIndex: newPage + 1 });
              }}
              onRowsPerPageChange={(e) => {
                setFilters({
                  ...filters,
                  pageIndex: 1,
                  pageSize: Number(e.target.value),
                });
              }}
            />
          </div>
        </div>
        <ConfirmationDialog
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={() => handleDelete(id)}
          title="Delete book"
          description="Are you sure you want to delete this book?"
        />
      </div>
    </>
  );
};

export default Books;
