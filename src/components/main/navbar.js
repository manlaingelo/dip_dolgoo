import NextLink from "next/link";
import { Stack, Button, Container, Typography, Toolbar } from "@mui/material";
import { Logo } from "../logo";

function Navbar() {
  return (
    <>
      <header style={{ borderBottom: "1px solid #ebebeb" }}>
        <Container sx={{}}>
          <Toolbar
            sx={{
              padding: 0,
              margin: 0,
              justifyContent: "space-between",
            }}
          >
            {/* <Button size="small">Зарууд</Button> */}

            <NextLink href="/" passHref>
              <Typography
                component="h2"
                variant="h5"
                color="inherit"
                sx={{
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                  justifyItems: "center",
                }}
              >
                <Logo />
                <span style={{ marginY: "auto", marginLeft: "1rem" }}>RealEstate</span>
              </Typography>
            </NextLink>
            {/* <IconButton>
          <SearchIcon />
        </IconButton> */}

            <NextLink href="/login" passHref>
              <a style={{ textDecoration: "none" }}>
                <Button variant="outlined" size="small">
                  Нэвтрэх
                </Button>
              </a>
            </NextLink>
          </Toolbar>
        </Container>
      </header>
    </>
  );
}

export default Navbar;
