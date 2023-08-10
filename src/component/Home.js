import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import WithAuth from "../layout/WithAuth";

const Home = () => {
  const navigate = useNavigate();
  const handleName = () => {
    navigate("/book-name");
  };
  const handlePrice = () => {
    navigate("/book-price");
  };
  const handleHome = () => {
    navigate("/");
  };
  const handleForm = () => {
    navigate("/form");
  };
  return (
    <div className="home-container">
      {/* <Typography variant='h1' style={{"margin": "80px"}}>What you want to know? </Typography> */}
      {/* <div className="home-btn" style={{ marginTop: "50px" }}>
        <Button
          variant="contained"
          style={{ width: "150px" }}
          onClick={handleName}
        >
          Name
        </Button>
        <Button
          variant="contained"
          style={{ width: "150px" }}
          onClick={handlePrice}
        >
          Price
        </Button>
        <Button
          variant="contained"
          style={{ width: "150px" }}
          onClick={handleHome}
        >
          Home
        </Button>
        <Button
          variant="contained"
          style={{ width: "150px" }}
          onClick={handleForm}
        >
          Form
        </Button>
      </div> */}
    </div>
  );
};

export default WithAuth(Home);
