import React from "react";

const PageHeading = ({ heading }) => {
  return (
    <>
      <h1
        style={{
          marginTop: 50,
          marginBottom: 25,
          textAlign: "center",
          fontFamily: "'Roboto', sans-serif",
          color: "#414141",
          fontWeight: 700,
          fontSize: 32,
        }}
      >
        {heading}
      </h1>
      <div
        style={{
          backgroundColor: "#f14d54",
          height: 3,
          width: "14%",
          margin: "0px auto",
        }}
      ></div>
    </>
  );
};

export default PageHeading;
