import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { products } from "../../__mocks__/products";
import { PostListToolbar } from "../../components/post/post-list-toolbar";
import { PostCard } from "../../components/post/post-card";
import Navbar from "../../components/main/navbar";

const Posts = () => (
  <>
    <Head>
      <title>Зарууд</title>
    </Head>
    <Navbar />
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <PostListToolbar />
        <Box sx={{ pt: 3 }}>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item key={product.id} lg={4} md={6} xs={12}>
                <PostCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 3,
          }}
        >
          <Pagination color="primary" count={3} size="small" />
        </Box>
      </Container>
    </Box>
  </>
);

Posts.getLayout = (page) => <>{page}</>;

export default Posts;
