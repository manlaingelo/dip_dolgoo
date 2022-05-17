import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { TotalProducts } from "../../components/admin/total-products";
import { LatestListings } from "../../components/admin/latest-listings";
import { LatestProducts } from "../../components/admin/latest-products";
import { TotalCustomers } from "../../components/admin/total-customers";
import { AdminLayout } from "../../components/admin-layout";


export async function getServerSideProps() {
  // Fetch data from external API
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2ZmQ1N2I0Zi1lYTE0LTQ1MWQtOGFmZC02OGI2YWNkNzhhYzAiLCJhdXRoIjoiUk9MRV9BRE1JTiIsImlhdCI6MTY1Mjc5NDU3NSwiZXhwIjoxNjU0MjY1ODA0fQ.EKulCJVV07-fBDg0GJ9cQBs3uAvi0ian2S9rrL52uFc";

  console.log(token);
  const apiURL = `http://localhost:8081/api/posts?maxArea=100&maxPrice=10000000&minArea=0&minPrice=0&page=0&searchPattern=%20&size=20`;
  const res = await fetch(apiURL, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`, // notice the Bearer before your token
    },
  });
  const data = await res.json();
  console.log(data);

  // Pass data to the page via props
  return { props: { data } };
}

const Dashboard = ({data}) => (
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
            <TotalProducts />
          </Grid>
          <Grid item xl={6} lg={6} sm={6} xs={12}>
            <TotalCustomers />
          </Grid>

          <Grid item lg={4} md={6} xl={3} xs={12}>
            <LatestProducts sx={{ height: "100%" }} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <LatestListings />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Dashboard.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default Dashboard;
