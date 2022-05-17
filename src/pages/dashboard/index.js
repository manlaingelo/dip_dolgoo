import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { TotalProducts } from "../../components/dashboard/total-products";
import { LatestListings } from "../../components/dashboard/latest-listings";
import { LatestProducts } from "../../components/dashboard/latest-products";
import { Sales } from "../../components/dashboard/sales";
import { TasksProgress } from "../../components/dashboard/tasks-progress";
import { TotalCustomers } from "../../components/dashboard/total-customers";
import { TotalProfit } from "../../components/dashboard/total-profit";
import { TrafficByDevice } from "../../components/dashboard/traffic-by-device";
import { DashboardLayout } from "../../components/dashboard-layout";

export async function getServerSideProps() {
  // Fetch data from external API
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwYTVlMzIxYS1iYjcxLTRmMTgtYWNkNC01MjI4NDQzMjcxMmEiLCJhdXRoIjoiUk9MRV9VU0VSIiwiaWF0IjoxNjUyODAyMDAxLCJleHAiOjE2NTQyNzMyMzB9.OUtQMNNRPCCKFzOOZljK51MJgTRJoeA9NZgCdlOpMuA";
  const apiURL = `http://localhost:8081/api/posts?maxArea=100&maxPrice=10000000000&minArea=0&minPrice=0&page=0&searchPattern=%20&size=0`;
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

const Dashboard = ({ data }) => (
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
            <LatestProducts sx={{ height: "100%" }} />
          </Grid>
        </Grid>
        <pre>{}</pre>
      </Container>
    </Box>
  </>
);

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
