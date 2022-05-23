import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { TotalProducts } from "../../components/dashboard/total-products";
import { LatestProducts } from "../../components/dashboard/latest-products";
import { DashboardLayout } from "../../components/dashboard-layout";

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
  const data = await res.json();
  console.log(data);

  // Pass data to the page via props
  return { props: { data } };
}

const Dashboard = ({ data }) => {
  return (
    <>
      <Head>
        <title>Хэрэглэгчийн самбар</title>
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
            <Grid item xs={12}>
              <TotalProducts totalElements={data?.totalElements} />
            </Grid>

            <Grid item xs={12}>
              <LatestProducts products={data?.content} sx={{ height: "100%" }} />
            </Grid>
          </Grid>
          <pre>{}</pre>
        </Container>
      </Box>
    </>
  );
};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
