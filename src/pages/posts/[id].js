import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Stack, Paper, Container, Divider, Typography, CircularProgress } from "@mui/material";
import { products } from "../../__mocks__/products";
import Navbar from "../../components/main/navbar";
import EmblaCarousel from "../../components/post/embla-carousel";

const SLIDE_COUNT = 10;
const slides = Array.from(Array(SLIDE_COUNT).keys());

const PostDetail = () => {
  const router = useRouter();
  const [postData, setPostData] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = router.query;

  useEffect(() => {
    //   todo: set true for fetch data
    setLoading(false);

    console.log(products);
    const currentPost = products.filter((post) => post.id == id);
    console.log(currentPost);
    setPostData(currentPost[0]);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [id]);

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
          <Typography gutterBottom variant="h5" component="div" mt={3}>
            {postData?.title}
          </Typography>

          <Divider />
          <Stack direction="row" spacing={2} mt={2}>
            <Paper sx={{ textAlign: "center", p: 2 }}>{postData?.price}₮</Paper>
            <Paper sx={{ textAlign: "center", p: 2 }}>{postData?.area}m^2</Paper>
          </Stack>
          <EmblaCarousel slides={slides} />
          <Typography variant="body2" color="text.secondary">
              {postData?.description}
            </Typography>
        </Container>
      )}

      {/* <span>Post: {id}</span>
      <span>Post: {postData?.id}</span> */}
    </>
  );
};

export default PostDetail;
