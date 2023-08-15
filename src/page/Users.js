import React, { useContext, useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationDialog from "../component/ConfirmationDialog";
import userService from "../services/userService";
import { AuthContext } from "../context/authContext";

const Users = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);
  const [filters, setFilters] = useState({
    pageIndex: 1,
    pageSize: 10,
    keyword: "",
  });
  const [userRecords, setUserRecords] = useState({
    pageIndex: 0,
    pageSize: 10,
    totalPages: 1,
    items: [],
    totalItems: 0,
  });
  const context = useContext(AuthContext);
  const { user } = context;
  const currUserId = user.id;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filters.keyword === "") delete filters.keyword;
      searchAllUsers({ ...filters });
    }, 500);
    return () => clearTimeout(timer);
  }, [filters]);

  const searchAllUsers = async (filters) => {
    await userService.GetAllUsers(filters).then((res) => {
      setUserRecords(res.data.result);
    });
  };

  const handleDelete = async (id) => {
    await userService
      .DeleteUser(id)
      .then((res) => {
        if (res && res.status === 200) {
          setOpen(false);
          toast.success("User deleted successfully!", {
            position: "bottom-right",
          });
          navigate("/users");
        }
      })
      .catch((err) => {
        toast.error(err.message, { position: "bottom-right" });
      });
  };

  const columns = [
    { id: "firstName", label: "First Name", minWidth: 100 },
    { id: "lastName", label: "Last Name", minWidth: 100 },
    { id: "email", label: "Email", minWidth: 100 },
    { id: "role", label: "Role", minWidth: 100 },
  ];

  return (
    <>
      <PageHeading heading="User" />
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
          {/* <button
            className="btn"
            style={{
              width: 100,
              height: 40,
              color: "white",
              backgroundColor: "#f14d54",
              borderRadius: 0,
            }}
            onClick={() => navigate("/add-user")}
          >
            Add
          </button> */}
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
                {userRecords?.items?.map((user, index) => {
                  return (
                    <TableRow
                      key={index}
                      style={{ fontSize: 14, color: "#212121" }}
                    >
                      <TableCell align="left">{user.firstName}</TableCell>
                      <TableCell align="left">{user.lastName}</TableCell>
                      <TableCell align="left">{user.email}</TableCell>
                      <TableCell align="left">{user.role}</TableCell>
                      <TableCell align="right" style={{ width: 250 }}>
                        <button
                          className="btn"
                          style={{
                            border: "2px solid #80BF32",
                            color: "#80BF32",

                            width: 80,
                            height: 30,
                            padding: "3px 10px",
                          }}
                          onClick={() => navigate(`/edit-user/${user.id}`)}
                        >
                          Edit
                        </button>
                        {currUserId !== user.id && (
                          <button
                            className="btn"
                            style={{
                              border: "2px solid #f14d54",
                              color: "#f14d54",
                              width: 80,
                              marginLeft: 10,
                              height: 30,
                              padding: 3,
                            }}
                            onClick={() => {
                              setId(user.id);
                              setOpen(true);
                            }}
                          >
                            Delete
                          </button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
                {userRecords?.items?.length === 0 && (
                  <TableRow>
                    <TableCell align="center" colSpan={5}>
                      No User Found..
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              {/* <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={3}
                    count={5}
                    rowsPerPage={5}
                    page={4}
                    SelectProps={{
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    }}
                    onPageChange={(e, newPage) => {
                      setFilters({ ...filters, pageIndex: newPage });
                    }}
                    onRowsPerPageChange={(e, newSize) => {
                      setFilters({ ...filters, pageSize: newSize });
                    }}
                    ActionsComponent={(e, newSize) => {
                      setFilters({ ...filters, pageSize: newSize });
                    }}
                  />
                </TableRow>
              </TableFooter> */}
            </Table>
          </TableContainer>
          <div style={{ margin: "40px auto 80px auto" }}>
            {/* <Pagination
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              color="error"
              count={bookRecords.totalPages}
              page={filters.pageIndex}
              onChange={(e, newPage) => {
                setFilters({ ...filters, pageIndex: newPage });
              }}
            /> */}
            <TablePagination
              rowsPerPageOptions={[2, 5, 10, 100]}
              component="div"
              count={userRecords.totalItems}
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
          title="Delete User"
          description="Are you sure you want to delete this user?"
        />
      </div>
    </>
  );
};

export default Users;
