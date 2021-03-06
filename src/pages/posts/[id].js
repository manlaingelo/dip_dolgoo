import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  Stack,
  Paper,
  Container,
  Divider,
  Typography,
  CircularProgress,
  Grid,
  Box,
} from "@mui/material";
import { products } from "../../__mocks__/products";
import Navbar from "../../components/main/navbar";
import EmblaCarousel from "../../components/post/embla-carousel";

const SLIDE_COUNT = 10;
const slides = Array.from(Array(SLIDE_COUNT).keys());
export async function getServerSideProps(context) {
  const { id } = context.params;
  // console.log(id)
  // Fetch data from external API
  const apiURL = `http://localhost:8081/api/posts/${id}`;
  const res = await fetch(apiURL, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

const PostDetail = ({ data }) => {
  // console.log(data)
  const router = useRouter();
  const [postData, setPostData] = useState(data);
  const [loading, setLoading] = useState(false);
  const { id } = router.query;

  // useEffect(() => {
  //   //   todo: set true for fetch data
  //   setLoading(false);
  //   const currentPost = products.filter((post) => post.id == id);
  //   setPostData(products[0]);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 3000);
  // }, [id]);

  return (
    <>
      <Head>
        <title>{postData?.title}</title>
      </Head>
      <Navbar />
      {loading ? (
        <Stack sx={{ display: "flex", justifyContent: "center", alignItems: "center", my: 5 }}>
          <CircularProgress />
        </Stack>
      ) : (
        <Container>
          <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
              <Typography gutterBottom variant="h5" component="div" mt={3}>
                {postData?.title}
              </Typography>
            </Grid>
            <Divider />
            <Grid item xs={12} md={5}>
              <Box>
                <Paper direction="row" spacing={2} m={4} p={3} sx={{ bgcolor: "#4338ca" }}>
                  <Box sx={{ textAlign: "center", p: 2, color: "white" }}>
                    <h2>??????</h2>
                    {postData?.price}???
                  </Box>
                </Paper>
                <Paper sx={{ p: 1, mt: 4, bgcolor: "#6366f1" }}>
                  <Box sx={{ textAlign: "center", p: 2, color: "white" }}>
                    <h2>????????????</h2>
                    {postData?.area}m^2
                  </Box>
                </Paper>
                <Paper sx={{ p: 3, mt: 4 }}>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    ?????????????? ??????
                  </Typography>
                  <h2>{postData?.rooms || 4}</h2>
                </Paper>
                <Paper sx={{ p: 3, mt: 4 }}>
                  <h2>??????????????</h2>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    {postData?.address || `??????-??????  River Garden`}
                  </Typography>
                </Paper>
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              <Paper sx={{ p: 3 }}>
                <EmblaCarousel slides={postData?.postImages} />
                <Box sx={{ mt: 2 }}>
                  <h2>??????????????????????</h2>
                  <Typography variant="body2" color="text.secondary" mt={3}>
                    {postData?.description}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      )}

      {/* <span>Post: {id}</span>
      <span>Post: {postData?.id}</span> */}
    </>
  );
};

export default PostDetail;
