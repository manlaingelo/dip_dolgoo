import * as React from "react";
import NextLink from "next/link";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import { Logo } from "../logo";

function Navbar() {
  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        {/* <Button size="small">Зарууд</Button> */}
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          <Logo />
        </Typography>
        {/* <IconButton>
          <SearchIcon />
        </IconButton> */}

        <NextLink href="/login" passHref>
          <a style={{ textDecoration: "none" }}>
            <Button variant="outlined" size="small" >
              Нэвтрэх
            </Button>
          </a>
        </NextLink>
      </Toolbar>
    </React.Fragment>
  );
}

export default Navbar;
