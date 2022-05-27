import Head from "next/head";
import { useState } from "react";
import { Box, Container, Grid, Pagination, Typography } from "@mui/material";
import { products } from "../../__mocks__/products";
import { PostListToolbar } from "../../components/post/post-list-toolbar";
import { PostCard } from "../../components/post/post-card";
import Navbar from "../../components/main/navbar";

const Posts = () => {
  const [posts, setPosts] = useState(products);
  const [postsCount, setPostsCount] = useState(32);
  return (
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

          <Typography gutterBottom variant="h5" component="div" mt={3}>
            Олдсон зарууд{" "}
            <span style={{ fontSize: "12px", color: "#65748b" }}>
              (хайлтад {postsCount} тохирсон)
            </span>
          </Typography>
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              {posts.map((post) => (
                <Grid item key={post.id} lg={4} md={6} xs={12}>
                  <PostCard post={post} />
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
};
Posts.getLayout = (page) => <>{page}</>;

export default Posts;
