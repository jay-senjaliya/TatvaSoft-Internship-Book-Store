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
    <div>
      <Breadcrumbs
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
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
