import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { TotalProducts } from "../../components/admin/total-products";
import { LatestListings } from "../../components/admin/latest-listings";
import { LatestProducts } from "../../components/admin/latest-products";
import { TotalCustomers } from "../../components/admin/total-customers";
import { AdminLayout } from "../../components/admin-layout";
import { useEffect, useState } from "react";

const PAGE_SIZE = 6;

export async function getServerSideProps() {
  // Fetch data from external API
  const apiURL = `http://localhost:8081/api/posts?maxArea=&maxPrice=&minArea=&minPrice=&page=0&searchPattern=%20&size=${PAGE_SIZE}`;
  const res = await fetch(apiURL, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  const posts = await res.json();

  // Pass data to the page via props
  return { props: { posts } };
}

const Dashboard = ({ posts }) => {
  const [totalElements, setTotalElements] = useState(0);
  const [customers, setCustomers] = useState([]);

  const getCustomers = () => {
    const token = localStorage.getItem("accessToken");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const setterData = {
      page: 0,
      searchValue: "",
      size: PAGE_SIZE,
    };
    const raw = JSON.stringify(setterData);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    // console.log(post);
    fetch("/api/customers/get", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const { users } = data;
        setTotalElements(users.totalElements);
        setCustomers(users.content);
        console.log(users);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <>
      <Head>
        <title>Админ самбар</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={6} sm={6} xl={6} xs={12}>
              <TotalProducts totalElements={posts.totalElements} />
            </Grid>
            <Grid item xl={6} lg={6} sm={6} xs={12}>
              <TotalCustomers totalElements={totalElements} />
            </Grid>

            <Grid item lg={4} md={6} xl={3} xs={12}>
              <LatestProducts posts={posts.content} sx={{ height: "100%" }} />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <LatestListings customers={customers} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Dashboard.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default Dashboard;
