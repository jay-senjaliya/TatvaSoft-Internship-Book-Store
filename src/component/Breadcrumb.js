import { Breadcrumbs, Typography } from "@mui/material";
import React from "react";
import Link from "@mui/material/Link";

const Breadcrumb = ({ value }) => {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="black" to="/">
      Home
    </Link>,
    <Typography key="2" color="#f14d54">
      {value}
    </Typography>,
  ];
  return (
    <div style={{ height: 65 }}>
      <Breadcrumbs
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "50px auto",
        }}
        separator="›"
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </div>
  );
};

export default Breadcrumb;
